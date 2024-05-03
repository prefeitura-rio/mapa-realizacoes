import firebase from "firebase";
import "firebase/firestore";
import firebaseCredentials from "./firebaseconfig";
import { toSnakeCase, toTitleCase, concatSnakeCase, snakeToCapitalized } from "./utils/formatFile";
import * as turf from "@turf/turf";
import { compareContent } from "./utils/data";

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

export async function getRefMultipleRealizacaoOrgao(idRealizacao) {
  return await db
    .collection("realizacao_orgao")
    .where("id_realizacao", "==", idRealizacao);
}

export async function getRefMultipleRealizacaoPrograma(idRealizacao) {
  return await db
    .collection("realizacao_programa")
    .where("id_realizacao", "==", idRealizacao);
}

export async function getRefMultipleRealizacaoTema(idRealizacao) {
  return await db
    .collection("realizacao_tema")
    .where("id_realizacao", "==", idRealizacao);
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

export async function getRealizacaoInfo(document) {
  let data = await db
    .collection("realizacao")
    .doc(document)
    .get()
    .then((doc) => doc.data());
  // get status
  let dataStatus = await readStatus(data.id_status);
  data.status = dataStatus.nome;
  // get bairro
  let dataBairro = await readBairro(data.id_bairro);
  data.bairro = dataBairro.nome;
  // get subprefeitura
  let dataSubprefeitura = await readSubprefeitura(dataBairro.id_subprefeitura);
  data.subprefeitura = dataSubprefeitura.nome;
  // get temas
  let idTemas = await db
    .collection("realizacao_tema")
    .where("id_realizacao", "==", document)
    .get()
    .then((querySnapshot) => {
      return querySnapshot.docs.map((doc) => doc.data().id_tema);
    });
  let temas = [];
  for (let i = 0; i < idTemas.length; i++) {
    let dataTema = await readTema(idTemas[i]);
    temas.push(dataTema.nome);
  }
  data.tema = temas;
  // get orgaos
  let idOrgaos = await db
    .collection("realizacao_orgao")
    .where("id_realizacao", "==", document)
    .get()
    .then((querySnapshot) => {
      return querySnapshot.docs.map((doc) => doc.data().id_orgao);
    });
  let orgaos = [];
  for (let i = 0; i < idOrgaos.length; i++) {
    let dataOrgao = await readOrgao(idOrgaos[i]);
    orgaos.push(dataOrgao.nome);
  }
  data.orgao = orgaos;
  // get programas
  let idProgramas = await db
    .collection("realizacao_programa")
    .where("id_realizacao", "==", document)
    .get()
    .then((querySnapshot) => {
      return querySnapshot.docs.map((doc) => doc.data().id_programa);
    });
  let programas = [];
  for (let i = 0; i < idProgramas.length; i++) {
    let dataPrograma = await readPrograma(idProgramas[i]);
    programas.push(dataPrograma.nome);
  }
  data.programa = programas;
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

export async function getRealizacoesPrograma(idPrograma) {
  return await db
    .collection("realizacao_programa")
    .where("id_programa", "==", idPrograma)
    .get();
}

export async function getRealizacoesTema(idTema) {
  return await db
    .collection("realizacao_tema")
    .where("id_tema", "==", idTema)
    .get();
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
    return contagemStatus;
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
        const realizacoesTheme = await getRealizacoesTema(theme.id);
        const realizacoesThemeDocs = realizacoesTheme.docs;
        // If length is 0, skip this theme
        if (realizacoesThemeDocs.length === 0) {
          return;
        }
        // Append each realizacao to this theme's aggregate data
        const realizacoesIds = realizacoesThemeDocs.map((realizacao) => {
          return realizacao.data().id_realizacao;
        });
        let realizacoes = await getListRealizacaoData(realizacoesIds);
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
        if (!aggregateRealizacaoTheme[theme.nome]) {
          aggregateRealizacaoTheme[theme.nome] = [];
        }
        await Promise.all(
          realizacoes.map(async (realizacao) => {
            const realizacaoTheme = {
              titulo: realizacao.nome,
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
        const realizacoesPrograma = await getRealizacoesPrograma(programa.id);
        const realizacoesProgramaDocs = realizacoesPrograma.docs;
        // If length is 0, skip this programa
        if (realizacoesProgramaDocs.length === 0) {
          return;
        }
        // Append each realizacao to this programa's aggregate data
        const realizacoesIds = realizacoesProgramaDocs.map((realizacao) => {
          return realizacao.data().id_realizacao;
        });
        let realizacoes = await getListRealizacaoData(realizacoesIds);
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

export async function getRealizacaoOrgaoIds() {
  try {
    const snapshot = await db.collection('realizacao_orgao').get();
    const ids = snapshot.docs.map((doc) => doc.id);
    return ids;
  } catch (error) {
    console.error('Erro ao obter os IDs dos documentos:', error);
    throw error;
  }
}

export async function getRealizacaoProgramaIds() {
  try {
    const snapshot = await db.collection('realizacao_programa').get();
    const ids = snapshot.docs.map((doc) => doc.id);
    return ids;
  } catch (error) {
    console.error('Erro ao obter os IDs dos documentos:', error);
    throw error;
  }
}

export async function getRealizacaoTemaIds() {
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

export async function getListRealizacaoTemaIds() {
  try {
    const snapshot = await db.collection('realizacao_tema').get();
  const ids = snapshot.docs.map((doc) => snakeToCapitalized(doc.data().id_tema));
    return ids;
  } catch (error) {
    console.error('Erro ao obter os IDs dos documentos:', error);
    throw error;
  }
}

export async function getListRealizacaoProgramaIds() {
  try {
    const snapshot = await db.collection('realizacao_programa').get();
  const ids = snapshot.docs.map((doc) => snakeToCapitalized(doc.data().id_programa));
    return ids;
  } catch (error) {
    console.error('Erro ao obter os IDs dos documentos:', error);
    throw error;
  }
}

export async function getListRealizacaoOrgaoIds() {
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
  // return await db
  //   .collection("programas_tema")
  //   .where("id_tema", "==", id_tema)
  //   .get();

  //@Gabriel => Ajustar para o modelo de dados

   // Mock data
   const programas_tema_educação_e_desevolvimento = ['GETs'];
 
   if (id_tema == 'educação_e_desenvolvimento') {
     return programas_tema_educação_e_desevolvimento;
   } else {
     return ["escolha o tema Educação e desenvolvimento"];
   }

}

export async function getListRealizacoesPrograma(id_programa) {
  // return await db
  //   .collection("realizacoes_programa")
  //   .where("id_programa", "==", id_programa)
  //   .get();

  //@Gabriel => Ajustar para o modelo de dados

   // Mock data
   const realizacoes_programa_gets = ['GET Atenas', 'GET Bolívar', 'GET Cardeal Leme'];
 
   if (id_programa == 'gets') {
     return realizacoes_programa_gets;
   } else {
     return [];
   }

}
