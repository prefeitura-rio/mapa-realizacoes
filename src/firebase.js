import firebase from "firebase";
import "firebase/firestore";
import firebaseCredentials from "./firebaseconfig";
import { toSnakeCase, toTitleCase, concatSnakeCase, snakeToCapitalized } from "./utils/formatFile";
import * as turf from "@turf/turf";
import { compareContent } from "./utils/data";
import store from './redux/store';

const firebaseConfig = {
  apiKey: firebaseCredentials.apiKey,
  authDomain: firebaseCredentials.authDomain,
  projectId: firebaseCredentials.projectId,
  storageBucket: firebaseCredentials.storageBucket,
  messagingSenderId: firebaseCredentials.messagingSenderId,
  appId: firebaseCredentials.appId,
};

firebase.initializeApp(firebaseConfig);

export const db = firebase.firestore();
export const firestore = firebase.firestore;
export const storageRef = firebase.storage().ref();
export const auth = firebase.auth();

//
// Raw CRUD functions
//
export async function getAllCidades(collection = "cidade") {
  var res = await db.collection(collection).get();
  return res.docs.map((doc) => doc.data());
}

export async function readBairro(id) {
  const doc = await db.collection("bairro").doc(id).get();
  return doc.data();
}

export async function readOrgao(id) {
  const doc = await db.collection("orgao").doc(id).get();
  return doc.data();
}

export async function readPrograma(id) {
  const doc = await db.collection("programa").doc(id).get();
  return doc.data();
}

export async function readRealizacao(id) {
  const doc = await db.collection("realizacao").doc(id).get();
  return doc.data();
}

export async function readStatus(id) {
  const doc = await db.collection("status").doc(id).get();
  return doc.data();
}

export async function readSubprefeitura(id) {
  const doc = await db.collection("subprefeitura").doc(id).get();
  return doc.data();
}

export async function readTema(id) {
  const doc = await db.collection("tema").doc(id).get();
  return doc.data();
}

//
// Utilities
//

export async function getIdBairro(name) {
  // query the collection "Bairros" for where the field "nome" is equal to the name
  const bairrosRef = db.collection("bairro");
  const bairrosSnapshot = await bairrosRef.where("nome", "==", name).get();
  // if there are documents, return the first document's id
  if (!bairrosSnapshot.empty) {
    return bairrosSnapshot.docs[0].id;
  }
  // otherwise, raise an error
  throw new Error("Bairro não encontrado");
}

export async function getIdCidade(name) {
  // query the collection "Cidades" for where the field "nome" is equal to the name
  const cidadesRef = db.collection("cidade");
  const cidadesSnapshot = await cidadesRef.where("nome", "==", name).get();
  // if there are documents, return the first document's id
  if (!cidadesSnapshot.empty) {
    return cidadesSnapshot.docs[0].id;
  }
  // otherwise, raise an error
  throw new Error("Cidade não encontrada");
}

export async function getIdRealizacao(name) {
  // query the collection "Realizacoes" for where the field "nome" is equal to the name
  const realizacoesRef = db.collection("realizacao");
  const realizacoesSnapshot = await realizacoesRef
    .where("nome", "==", name)
    .get();
  // if there are documents, return the first document's id
  if (!realizacoesSnapshot.empty) {
    return realizacoesSnapshot.docs[0].id;
  }
  // otherwise, raise an error
  throw new Error("Realização não encontrada");

}

export async function getIdSubprefeitura(name) {
  // query the collection "Subprefeituras" for where the field "nome" is equal to the name
  const subprefeiturasRef = db.collection("subprefeitura");
  const subprefeiturasSnapshot = await subprefeiturasRef
    .where("nome", "==", name)
    .get();
  // if there are documents, return the first document's id
  if (!subprefeiturasSnapshot.empty) {
    return subprefeiturasSnapshot.docs[0].id;
  }
  // otherwise, raise an error
  throw new Error("Subprefeitura não encontrada");
}

export async function getListImageUrls(
  filters = {
    id_bairro: null,
    id_subprefeitura: null,
    name_bairro: null,
    name_subprefeitura: null,
  },
) {
  let inputFilters = {
    id_bairro: null,
    id_subprefeitura: null,
    name_bairro: null,
    name_subprefeitura: null,
    ...filters,
  };
  if (inputFilters.name_bairro) {
    inputFilters.id_bairro = await getIdBairro(inputFilters.name_bairro);
  }
  if (inputFilters.name_subprefeitura) {
    inputFilters.id_subprefeitura = await getIdSubprefeitura(
      inputFilters.name_subprefeitura,
    );
  }
  let realizacaoIds = await getListRealizacaoIds(inputFilters);
  let realizacoes = await getListRealizacaoData(realizacaoIds);
  let realizacoesNomes = realizacoes.map((realizacao) => realizacao.nome);
  let result = [];
  let res = await storageRef.listAll();
  res = res.prefixes.filter((folderRef) =>
    realizacoesNomes.includes(folderRef.name),
  );
  let promises = res.map((folderRef) => folderRef.listAll());
  const folders = await Promise.all(promises);
  for (var folder of folders) {
    for (var item of folder.items) {
      result.push(item);
    }
  }
  promises = result.map((imageRef) => imageRef.getDownloadURL());
  return await Promise.all(promises);
}

export async function getRealizacaoFirstImageUrl(name_realizacao) {
  try {
    const id_realizacao = await getIdRealizacao(name_realizacao);
    const folderRef = storageRef.child(id_realizacao);
    const res = await folderRef.listAll();
    const imageRef = res.items[0];
    return await imageRef.getDownloadURL();  
  }
  catch (e) {
    return null;
  }
}

export function getListOrgaoName() {
  // return a list of all orgao names
  const orgaoRef = db.collection("orgao");
  return orgaoRef.get().then((querySnapshot) => {
    return querySnapshot.docs.map((doc) => doc.data().nome);
  });
}

export function getListTemaName() {
  // return a list of all tema names
  const temaRef = db.collection("tema");
  return temaRef.get().then((querySnapshot) => {
    return querySnapshot.docs.map((doc) => doc.data().nome);
  });
}

export async function getListProgramaData() {
  var res = await db.collection("programa").get();
  return res.docs.map((doc) => {
    return { ...doc.data(), id: doc.id };
  });
}

export async function getListRealizacaoData(ids = null) {
  let results = [];
  let idsChunks = [];
  if (ids) {
    if (ids.length === 0) {
      return [];
    } else if (ids.length > 10) {
      // Firestore only allows 10 ids per query
      for (let i = 0; i < ids.length; i += 10) {
        idsChunks.push(ids.slice(i, i + 10));
      }
    } else {
      idsChunks = [ids];
    }
    for (let i = 0; i < idsChunks.length; i++) {
      if (idsChunks.length === 0) {
        break;
      }
      var res = await db
        .collection("realizacao")
        .where(firebase.firestore.FieldPath.documentId(), "in", idsChunks[i])
        .get();
      results.push(
        ...res.docs.map((doc) => {
          return { ...doc.data(), id: doc.id };
        }),
      );
    }
  } else {
    var res = await db.collection("realizacao").get();
    results = res.docs.map((doc) => {
      return { ...doc.data(), id: doc.id };
    });
  }
  return results;
}

export async function getListRealizacaoIds(
  filters = {
    id_cidade: null,
    id_bairro: null,
    id_subprefeitura: null,
    name_cidade: null,
    name_bairro: null,
    name_subprefeitura: null,
  },
) {
  let inputFilters = {
    id_cidade: null,
    id_bairro: null,
    id_subprefeitura: null,
    name_cidade: null,
    name_bairro: null,
    name_subprefeitura: null,
    ...filters,
  };
  if (inputFilters.name_cidade) {
    inputFilters.id_cidade = await getIdCidade(inputFilters.name_cidade);
  }
  if (inputFilters.name_subprefeitura) {
    inputFilters.id_subprefeitura = await getIdSubprefeitura(
      inputFilters.name_subprefeitura,
    );
  }
  if (inputFilters.name_bairro) {
    inputFilters.id_bairro = await getIdBairro(inputFilters.name_bairro);
  }
  let results = [];
  if (inputFilters.id_cidade) {
    // Get list of id_realizacao
    var res = await db
      .collection("realizacao")
      .where("id_cidade", "==", inputFilters.id_cidade)
      .get();
    results.push(...res.docs.map((doc) => doc.id));
  } else if (inputFilters.id_subprefeitura) {
    // Get list of id_realizacao
    var res = await db
      .collection("realizacao")
      .where("id_subprefeitura", "==", inputFilters.id_subprefeitura)
      .get();
    results.push(...res.docs.map((doc) => doc.id));
  } else if (inputFilters.id_bairro) {
    // Get list of id_realizacao
    var res = await db
      .collection("realizacao")
      .where("id_bairro", "==", inputFilters.id_bairro)
      .get();
    results.push(...res.docs.map((doc) => doc.id));
  } else {
    var res = await db.collection("realizacao").get();
    results = res.docs.map((doc) => doc.id);
  }
  return results;
}

export async function getListStatusData() {
  var res = await db.collection("status").get();
  return res.docs.map((doc) => {
    return { ...doc.data(), id: doc.id };
  });
}

export function getListStatusName() {
  // return a list of all status names
  const statusRef = db.collection("status");
  return statusRef.get().then((querySnapshot) => {
    return querySnapshot.docs.map((doc) => doc.data().nome);
  });
}

export async function getListTemaData() {
  var res = await db.collection("tema").get();
  return res.docs.map((doc) => {
    return { ...doc.data(), id: doc.id };
  });
}

export function getListProgramaName() {
  // return a list of all programa names
  const programaRef = db.collection("programa");
  return programaRef.get().then((querySnapshot) => {
    return querySnapshot.docs.map((doc) => doc.data().nome);
  });
}

export async function getListBairroData(
  filters = { id_subprefeitura: null, id_cidade: null },
) {
  let inputFilters = {
    id_subprefeitura: null,
    id_cidade: null,
    ...filters,
  };
  let results = [];
  if (inputFilters.id_subprefeitura) {
    var res = await db
      .collection("bairro")
      .where("id_subprefeitura", "==", inputFilters.id_subprefeitura)
      .get();
    results.push(
      ...res.docs.map((doc) => {
        return { ...doc.data(), id: doc.id };
      }),
    );
  } else if (inputFilters.id_cidade) {
    var res = await db
      .collection("bairro")
      .where("id_cidade", "==", inputFilters.id_cidade)
      .get();
    results.push(
      ...res.docs.map((doc) => {
        return { ...doc.data(), id: doc.id };
      }),
    );
  } else {
    var res = await db.collection("bairro").get();
    results = res.docs.map((doc) => {
      return { ...doc.data(), id: doc.id };
    });
  }
  return results;
}

export async function getListBairroName() {
  try {
    const neighborhoodRef = db.collection("bairro");
    const neighborhoodSnapshot = await neighborhoodRef.get();

    return neighborhoodSnapshot;
  } catch (error) {
    throw error;
  }
}

export async function getListSubprefeituraName() {
  try {
    const subprefeitura = db.collection("subprefeitura");
    const subprefeituraSnapshot = await subprefeitura.get();

    return subprefeituraSnapshot;
  } catch (error) {
    throw error;
  }
}

// export async function getRealizacaoInfo(document) {
//   let data = await db
//     .collection("realizacao")
//     .doc(document)
//     .get()
//     .then((doc) => doc.data());
//   // get status
//   let dataStatus = await readStatus(data.id_status);
//   data.status = dataStatus.nome;
//   // get bairro
//   let dataBairro = await readBairro(data.id_bairro);
//   data.bairro = dataBairro.nome;
//   // get subprefeitura
//   let dataSubprefeitura = await readSubprefeitura(dataBairro.id_subprefeitura);
//   data.subprefeitura = dataSubprefeitura.nome;
//   // in the "tema" collection, get the name of the tema with the id "data.id_tema"
//   let dataTema = await readTema(data.id_tema);
//   let temas = [dataTema.nome];
//   data.tema = temas;
//   // in the "orgao" collection, get the name of the tema with the id "data.id_orgao"
//   let dataOrgao = await readOrgao(data.id_orgao);
//   let orgaos = [dataOrgao.nome];
//   data.orgao = orgaos;
//   // in the "programa" collection, get the name of the tema with the id "data.id_programa"
//   let dataPrograma = await readPrograma(data.id_programa);
//   let programas = [dataPrograma.nome];
//   data.programa = programas;
//   return data;
// }

//@Gabriel, solução temporária para o problema de performance. 
export async function getRealizacaoInfo(document) {
  const state = store.getState();
  const realizacoes = state.places.allPlaces;

  let data = await realizacoes.find((place) => place.id === document);
  // get status

  data.status = snakeToCapitalized(data.id_status??"");
  // get bairro
  data.bairro = snakeToCapitalized(data.id_bairro??"");
  // get subprefeitura
  data.subprefeitura = snakeToCapitalized(data.id_subprefeitura??"");
  // get tema
  data.tema =snakeToCapitalized(data.id_tema??"") ;
  // get orgao
  data.orgao = snakeToCapitalized(data.id_orgao??"");
  // get programa
  data.programa = snakeToCapitalized(data.id_programa??"");
  return data;
}

export async function getBairroInfo(document) {
  return await db
    .collection("bairro")
    .doc(document)
    .get()
    .then((doc) => doc.data());
}

export async function getSubprefeituraInfo(document) {
  return await db
    .collection("subprefeitura")
    .doc(document)
    .get()
    .then((doc) => doc.data());
}

// Município
export async function getDadosAgregadosAbaSumarioInfoBasicasCidade() {
  try {
    const bairros = await getListBairroData();

    // Faza soma dos domicílios e habitantes dos bairros.
    const resultado = bairros.reduce(
      (acumulador, bairro) => {
        acumulador.domicilios += bairro.domicilios;
        acumulador.habitantes += bairro.habitantes;
        return acumulador;
      },
      { domicilios: 0, habitantes: 0 },
    );

    return resultado;
  } catch (error) {
    console.error("Erro ao obter dados agregados da cidade:", error);
    throw error;
  }
}

export async function getDadosAgregadosAbaSumarioStatusEntregas(
  filters = {
    id_cidade: null,
    id_bairro: null,
    id_subprefeitura: null,
    name_cidade: null,
    name_bairro: null,
    name_subprefeitura: null,
  },
) {
  let inputFilters = {
    id_cidade: null,
    id_bairro: null,
    id_subprefeitura: null,
    ...filters,
  };
  try { 
    const realizacaoIds = await getListRealizacaoIds(inputFilters);
    const data = await getListRealizacaoData(realizacaoIds);
    const contagemStatus = {
      em_andamento: 0,
      concluida: 0,
      interrompida: 0,
      em_licitacao: 0,
    };
    const investimentoTotal = data.reduce((acc, realizacao) => {
      acc += realizacao.investimento;
      return acc;
    }, 0);

    data.forEach((realizacao) => {
      switch (realizacao.id_status) {
        case "em_andamento":
          contagemStatus.em_andamento++;
          break;
        case "concluído":
          contagemStatus.concluida++;
          break;
        case "interrompida":
          contagemStatus.interrompida++;
          break;
        case "em_licitação":
          contagemStatus.em_licitacao++;
          break;
        default:
          break;
      }
    });
    return [contagemStatus, investimentoTotal];

  } catch (error) {
    console.error(
      "Erro ao obter dados agregados (informações básicas):",
      error,
    );
    throw error;
  }
}

export async function getDadosAgregadosAbaTema(
  filters = {
    id_cidade: null,
    id_bairro: null,
    id_subprefeitura: null,
    name_cidade: null,
    name_bairro: null,
    name_subprefeitura: null,
  },
) {
  if (filters.name_cidade) {
    filters.id_cidade = await getIdCidade(filters.name_cidade);
  }
  if (filters.name_bairro) {
    filters.id_bairro = await getIdBairro(filters.name_bairro);
  }
  if (filters.name_subprefeitura) {
    filters.id_subprefeitura = await getIdSubprefeitura(
      filters.name_subprefeitura,
    );
  }
  let inputFilters = {
    id_cidade: null,
    id_bairro: null,
    id_subprefeitura: null,
    ...filters,
  };
  try {
    const themeData = await getListTemaData();
    const statusData = await getListStatusData();
    // Convert statusData to a map
    const statusDataMap = {};
    statusData.forEach((status) => {
      statusDataMap[status.id] = status.nome;
    });
    let aggregateRealizacaoTheme = {};
    await Promise.all(
      themeData.map(async (theme) => {
        // Look for realizacoes that have this theme
        const realizacoesByTheme = await db.collection("realizacao").where("id_tema", "==", theme.id).get();
        const realizacoesDocs = realizacoesByTheme.docs;
        // If length is 0, skip this theme
        if (realizacoesDocs.length === 0) {
          return;
        }
        // Check for filters
        let realizacoes = realizacoesDocs.map((doc) => doc.data());
        if (inputFilters.id_bairro) {
          realizacoes = realizacoes.filter(
            (realizacao) => realizacao.id_bairro === inputFilters.id_bairro,
          );
        }
        if (inputFilters.id_subprefeitura) {
          realizacoes = realizacoes.filter(
            (realizacao) => realizacao.id_subprefeitura === inputFilters.id_subprefeitura,
          );
        }
        if (inputFilters.id_cidade) {
          realizacoes = realizacoes.filter(
            (realizacao) => realizacao.id_cidade === inputFilters.id_cidade,
          );
        }
        // If we don't have any realizacoes left, skip this theme
        if (realizacoes.length === 0) {
          return;
        }
        // Initialize this theme's aggregate data
        if (!aggregateRealizacaoTheme[theme.nome]) {
          aggregateRealizacaoTheme[theme.nome] = [];
        }
        await Promise.all(
          realizacoes.map(async (realizacao) => {
            const realizacaoTheme = {
              titulo: realizacao.nome,
              // pra calcular o investimento total
              investimento: realizacao.investimento,
              status: statusDataMap[realizacao.id_status],
              imageUrl: await getRealizacaoFirstImageUrl(realizacao.nome) || "https://maps.gstatic.com/tactile/pane/result-no-thumbnail-2x.png",
            };
            aggregateRealizacaoTheme[theme.nome].push(realizacaoTheme);
          })
        );
      }),
    );
    let panelId = 1;
    let res = [];
    for (const theme in aggregateRealizacaoTheme) {
      res.push({
        id: `panel${panelId}`,
        tema: theme,
        realizacoes: aggregateRealizacaoTheme[theme],
      });
      panelId++;
    }
    return res;
  } catch (error) {
    console.error("Erro ao obter dados agregados de tema/cidade:", error);
    throw error;
  }
}

export async function getDadosAgregadosAbaProgramas(
  filters = {
    id_cidade: null,
    id_bairro: null,
    id_subprefeitura: null,
    name_cidade: null,
    name_bairro: null,
    name_subprefeitura: null,
  },
) {
  if (filters.name_cidade) {
    filters.id_cidade = await getIdCidade(filters.name_cidade);
  }
  if (filters.name_bairro) {
    filters.id_bairro = await getIdBairro(filters.name_bairro);
  }
  if (filters.name_subprefeitura) {
    filters.id_subprefeitura = await getIdSubprefeitura(
      filters.name_subprefeitura,
    );
  }
  let inputFilters = {
    id_cidade: null,
    id_bairro: null,
    id_subprefeitura: null,
    ...filters,
  };
  try {
    const programaData = await getListProgramaData();
    const statusData = await getListStatusData();
    // Convert statusData to a map
    const statusDataMap = {};
    statusData.forEach((status) => {
      statusDataMap[status.id] = status.nome;
    });
    let aggregateRealizacaoPrograma = {};
    await Promise.all(
      programaData.map(async (programa) => {
        // Look for realizacoes that have this programa
        const realizacoesByPrograma = await db.collection("realizacao").where("id_programa", "==", programa.id).get();
        const realizacoesDocs = realizacoesByPrograma.docs;
        // If length is 0, skip this programa
        if (realizacoesDocs.length === 0) {
          return;
        }
        // Append each realizacao to this programa's aggregate data
        let realizacoes = realizacoesDocs.map((doc) => doc.data());
        // Check for filters
        if (inputFilters.id_bairro) {
          realizacoes = realizacoes.filter(
            (realizacao) => realizacao.id_bairro === inputFilters.id_bairro,
          );
        }
        if (inputFilters.id_subprefeitura) {
          realizacoes = realizacoes.filter(
            (realizacao) => realizacao.id_subprefeitura === inputFilters.id_subprefeitura,
          );
        }
        if (inputFilters.id_cidade) {
          realizacoes = realizacoes.filter(
            (realizacao) => realizacao.id_cidade === inputFilters.id_cidade,
          );
        }
        // If we don't have any realizacoes left, skip this theme
        if (realizacoes.length === 0) {
          return;
        }
        // Initialize this theme's aggregate data
        if (!aggregateRealizacaoPrograma[programa.nome]) {
          aggregateRealizacaoPrograma[programa.nome] = [];
        }
        await Promise.all(
          realizacoes.map(async (realizacao) => {
            const realizacaoPrograma = {
              titulo: realizacao.nome,
                 // pra calcular o investimento total
                 investimento: realizacao.investimento,
              status: statusDataMap[realizacao.id_status],
              imageUrl: await getRealizacaoFirstImageUrl(realizacao.nome) || "https://maps.gstatic.com/tactile/pane/result-no-thumbnail-2x.png",
            };
            aggregateRealizacaoPrograma[programa.nome].push(realizacaoPrograma);
          })
        );
      }),
    );
    let panelId = 1;
    let res = [];
    for (const programa in aggregateRealizacaoPrograma) {
      res.push({
        id: `panel${panelId}`,
        tema: programa,
        realizacoes: aggregateRealizacaoPrograma[programa],
      });
      panelId++;
    }
    return res;
  } catch (error) {
    console.error("Erro ao obter dados agregados de programa/cidade:", error);
    throw error;
  }
}

// Subprefeitura
export async function getDadosAgregadosAbaSumarioInfoBasicasSubprefeitura(
  name_subprefeitura,
) {
  try {
    let id_subprefeitura = await getIdSubprefeitura(name_subprefeitura);
    const bairros = await getListBairroData({ id_subprefeitura });
    const bairrosDaSubprefeitura = bairros.map((bairro) => {
      return {
        id_bairro: bairro.id,
        habitantes: bairro.habitantes,
        domicilios: bairro.domicilios,
      };
    });
    // Faza soma dos domicílios e habitantes dos bairros da subprefeitura.
    const resultado = bairrosDaSubprefeitura.reduce(
      (acumulador, bairro) => {
        acumulador.domicilios += bairro.domicilios;
        acumulador.habitantes += bairro.habitantes;
        return acumulador;
      },
      { domicilios: 0, habitantes: 0 },
    );

    return resultado;
  } catch (error) {
    console.error("Erro ao obter dados agregados da subprefeitura:", error);
    throw error;
  }
}

// Obter array de id's de realizacao_orgao

export async function getRealizacaoOrgaoIds() { // TODO: remove
  try {
    const snapshot = await db.collection('realizacao_orgao').get();
    const ids = snapshot.docs.map((doc) => doc.id);
    return ids;
  } catch (error) {
    console.error('Erro ao obter os IDs dos documentos:', error);
    throw error;
  }
}

export async function getRealizacaoProgramaIds() { // TODO: remove
  try {
    const snapshot = await db.collection('realizacao_programa').get();
    const ids = snapshot.docs.map((doc) => doc.id);
    return ids;
  } catch (error) {
    console.error('Erro ao obter os IDs dos documentos:', error);
    throw error;
  }
}

export async function getRealizacaoTemaIds() { // TODO: remove
  try {
    const snapshot = await db.collection('realizacao_tema').get();
    const ids = snapshot.docs.map((doc) => doc.id);
    return ids;
  } catch (error) {
    console.error('Erro ao obter os IDs dos documentos:', error);
    throw error;
  }
}

// Obter array de id's de realizacao_orgao, realizacao_tema, realizacao_programa snake_case to Capitalized

export async function getListRealizacaoTemaIds() { // TODO: remove
  try {
    const snapshot = await db.collection('realizacao_tema').get();
  const ids = snapshot.docs.map((doc) => snakeToCapitalized(doc.data().id_tema));
    return ids;
  } catch (error) {
    console.error('Erro ao obter os IDs dos documentos:', error);
    throw error;
  }
}

export async function getListRealizacaoProgramaIds() { // TODO: remove
  try {
    const snapshot = await db.collection('realizacao_programa').get();
  const ids = snapshot.docs.map((doc) => snakeToCapitalized(doc.data().id_programa));
    return ids;
  } catch (error) {
    console.error('Erro ao obter os IDs dos documentos:', error);
    throw error;
  }
}

export async function getListRealizacaoOrgaoIds() { // TODO: remove
  try {
    const snapshot = await db.collection('realizacao_orgao').get();
  const ids = snapshot.docs.map((doc) => snakeToCapitalized(doc.data().id_orgao));
    return ids;
  } catch (error) {
    console.error('Erro ao obter os IDs dos documentos:', error);
    throw error;
  }
}

export async function getListProgramasTema(id_tema) {
  const programasByTheme = await db.collection("programa").where("id_tema", "==", id_tema).get();
  const programasDocs = programasByTheme.docs;
  const programas = programasDocs.map((doc) => doc.data().nome);
  return programas;
}

export async function getListRealizacoesPrograma(id_programa) {
  const realizacoesByPrograma = await db.collection("realizacao").where("id_programa", "==", id_programa).get();
  const realizacoesDocs = realizacoesByPrograma.docs;
  const realizacoes = realizacoesDocs.map((doc) => doc.data().nome);
  return realizacoes;
}

// o destaque do município conterá as 3 realizacões mais caras do município, com o título e a descrição e lat long da realização
export async function getListDestaquesMunicipio(id_municipio){
  if (!id_municipio)
    id_municipio = "rio_de_janeiro"
  id_municipio = toSnakeCase(id_municipio)
  const collection = db.collection("realizacao")
  const realizacoesRef = await collection.where("id_cidade", "==", id_municipio).where("destaque", "==", true).get();
  const realizacoesData = realizacoesRef.docs.map((doc) => doc.data());
  const shuffledData = realizacoesData.sort(() => 0.5 - Math.random());
  const realizacoesDestaqueMunicipio = shuffledData.slice(0, 3).map((realizacao) => {
    return {
      title: realizacao.nome,
      description: realizacao.descricao,
    };
  });
  return realizacoesDestaqueMunicipio
}

// o destaque do bairro conterá as 3 realizacões mais caras do bairro, com o título e a descrição e lat long da realização
export async function getListDestaquesBairro(id_bairro){
  id_bairro = toSnakeCase(id_bairro)
  const realizacoesRef = await db.collection("realizacao").where("id_bairro", "==", id_bairro).where("destaque", "==", true).get();
  const realizacoesData = realizacoesRef.docs.map((doc) => doc.data());
  const shuffledData = realizacoesData.sort(() => 0.5 - Math.random());
  const realizacoesDestaqueBairro = shuffledData.slice(0, 3).map((realizacao) => {
    return {
      title: realizacao.nome,
      description: realizacao.descricao,
    };
  });
  return realizacoesDestaqueBairro
}

// o destaque da subprefeitura conterá as 3 realizacões mais caras da subprefeitura, com o título e a descrição e lat long da realização
export async function getListDestaquesSubprefeitura(id_subprefeitura){
  id_subprefeitura = toSnakeCase(id_subprefeitura)
  const realizacoesRef = await db.collection("realizacao").where("id_subprefeitura", "==", id_subprefeitura).where("destaque", "==", true).get();
  const realizacoesData = realizacoesRef.docs.map((doc) => doc.data());
  const shuffledData = realizacoesData.sort(() => 0.5 - Math.random());
  const realizacoesDestaqueSubprefeitura = shuffledData.slice(0, 3).map((realizacao) => {
    return {
      title: realizacao.nome,
      description: realizacao.descricao,
    };
  });
  return realizacoesDestaqueSubprefeitura
}

// o destaque do tema conterá as 3 realizacões mais caras do tema, com o título e a descrição e lat long da realização
export async function getListDestaquesTema(id_tema){
  id_tema = toSnakeCase(id_tema)
  const realizacoesRef = await db.collection("realizacao").where("id_tema", "==", id_tema).where("destaque", "==", true).get();
  const realizacoesData = realizacoesRef.docs.map((doc) => doc.data());
  const shuffledData = realizacoesData.sort(() => 0.5 - Math.random());
  const realizacoesDestaqueTema = shuffledData.slice(0, 3).map((realizacao) => {
    return {
      title: realizacao.nome,
      description: realizacao.descricao,
    };
  });
  return realizacoesDestaqueTema
}

export async function getAggregatedData(tema = null, programa = null, bairro = null, subprefeitura = null) {
  // Create the filters array
  let filters = [];
  if (bairro) {
      filters.push(`bairro__${bairro}`);
  }
  if (subprefeitura) {
      filters.push(`subprefeitura__${subprefeitura}`);
  }
  if (tema) {
      filters.push(`tema__${tema}`);
  }
  if (programa) {
      filters.push(`programa__${programa}`);
  }

  // Python: key = "___".join(keys) if keys else "all"
  // JavaScript:
  let key = filters.length > 0 ? filters.join("___") : "all";

  try {
      // List all documents in the collection
      const aggregatedDataCollection = await db.collection("aggregated_data").get();
      let result = { count: 0, investment: 0 };

      // For each document, look for the key. If found, return the data. Otherwise, return the default value
      aggregatedDataCollection.docs.forEach(doc => {
          const data = doc.data();
          if (data[key]) {
              result = data[key];
          }
      });

      return result;
  } catch (error) {
      console.error("Error getting documents: ", error);
      return { count: 0, investment: 0 };
  }
}
