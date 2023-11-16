import firebase from "firebase";
import "firebase/firestore";
import firebaseCredentials from "./firebaseconfig";
import { toSnakeCase, toTitleCase, concatSnakeCase } from "./utils/formatFile";
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

export async function createUpdateBairro(data) {
  if (!data.nome) {
    throw new Error("Nome do bairro não pode ser vazio");
  }
  const documentData = {
    domicilios: data.domicilios,
    geo: data.geo,
    habitantes: data.habitantes,
    id_subprefeitura: data.id_subprefeitura,
    ips: data.ips,
    nome: data.nome,
    ranking_ips: data.ranking_ips,
  };
  const documentName = toSnakeCase(data.nome);
  const ref = db.collection("bairro").doc(documentName);
  await ref.set(documentData);
}

export async function createUpdateCidade(data) {
  if (!data.nome) {
    throw new Error("Nome da cidade não pode ser vazio");
  }
  const documentData = {
    nome: data.nome,
  };
  const documentName = toSnakeCase(data.nome);
  const ref = db.collection("cidade").doc(documentName);
  await ref.set(documentData);
}

export async function createUpdateOrgao(data) {
  if (!data.nome) {
    throw new Error("Nome do orgão não pode ser vazio");
  }
  const documentData = {
    nome: data.nome,
    sigla: data.sigla,
  };
  const documentName = toSnakeCase(data.nome);
  const ref = db.collection("orgao").doc(documentName);
  await ref.set(documentData);
}

export async function createUpdatePrograma(data) {
  if (!data.nome) {
    throw new Error("Nome do programa não pode ser vazio");
  }
  const documentData = {
    nome: data.nome,
    descricao: data.descricao,
  };
  const documentName = toSnakeCase(data.nome);
  const ref = db.collection("programa").doc(documentName);
  await ref.set(documentData);
}

export async function createUpdateRealizacao(data) {
  if (!data.nome) {
    throw new Error("Nome da realização não pode ser vazio");
  }
  const documentData = {
    cariocas_atendidos: data.cariocas_atendidos,
    coords: data.coords,
    data_fim: data.data_fim,
    data_inicio: data.data_inicio,
    descricao: data.descricao,
    id_bairro: data.id_bairro,
    id_status: data.id_status,
    id_tipo: data.id_tipo,
    image_folder: data.image_folder,
    investimento: data.investimento,
    nome: data.nome,
  };
  const documentName = toSnakeCase(data.nome);
  const ref = db.collection("realizacao").doc(documentName);
  await ref.set(documentData);
}

export async function createUpdateRealizacaoOrgao(data) {
  if (!data.id_orgao) {
    throw new Error("ID do orgão não pode ser vazio");
  }
  if (!data.id_realizacao) {
    throw new Error("ID da realização não pode ser vazio");
  }
  const documentData = {
    id_orgao: data.id_orgao,
    id_realizacao: data.id_realizacao,
  };
  const documentName = concatSnakeCase(data.id_realizacao, data.id_orgao);
  const ref = db.collection("realizacao_orgao").doc(documentName);
  await ref.set(documentData);
}

export async function createUpdateRealizacaoPrograma(data) {
  if (!data.id_programa) {
    throw new Error("ID do programa não pode ser vazio");
  }
  if (!data.id_realizacao) {
    throw new Error("ID da realização não pode ser vazio");
  }
  const documentData = {
    id_programa: data.id_programa,
    id_realizacao: data.id_realizacao,
  };
  const documentName = concatSnakeCase(data.id_realizacao, data.id_programa);
  const ref = db.collection("realizacao_programa").doc(documentName);
  await ref.set(documentData);
}

export async function createUpdateRealizacaoTema(data) {
  if (!data.id_tema) {
    throw new Error("ID do tema não pode ser vazio");
  }
  if (!data.id_realizacao) {
    throw new Error("ID da realização não pode ser vazio");
  }
  const documentData = {
    id_tema: data.id_tema,
    id_realizacao: data.id_realizacao,
  };
  const documentName = concatSnakeCase(data.id_realizacao, data.id_tema);
  const ref = db.collection("realizacao_tema").doc(documentName);
  await ref.set(documentData);
}

export async function createUpdateStatus(data) {
  if (!data.nome) {
    throw new Error("Nome do status não pode ser vazio");
  }
  const documentData = {
    nome: data.nome,
  };
  const documentName = toSnakeCase(data.nome);
  const ref = db.collection("status").doc(documentName);
  await ref.set(documentData);
}

export async function createUpdateSubprefeitura(data) {
  if (!data.nome) {
    throw new Error("Nome da subprefeitura não pode ser vazio");
  }
  const documentData = {
    id_cidade: data.id_cidade,
    nome: data.nome,
  };
  const documentName = toSnakeCase(data.nome);
  const ref = db.collection("subprefeitura").doc(documentName);
  await ref.set(documentData);
}

export async function createUpdateTema(data) {
  if (!data.nome) {
    throw new Error("Nome do tema não pode ser vazio");
  }
  const documentData = {
    nome: data.nome,
  };
  const documentName = toSnakeCase(data.nome);
  const ref = db.collection("tema").doc(documentName);
  await ref.set(documentData);
}

export async function createUpdateTipo(data) {
  if (!data.nome) {
    throw new Error("Nome do tipo não pode ser vazio");
  }
  const documentData = {
    nome: data.nome,
  };
  const documentName = toSnakeCase(data.nome);
  const ref = db.collection("tipo").doc(documentName);
  await ref.set(documentData);
}

export async function deleteBairro(id) {
  await db.collection("bairro").doc(id).delete();
}

export async function deleteCidade(id) {
  await db.collection("cidade").doc(id).delete();
}

export async function deleteOrgao(id) {
  await db.collection("orgao").doc(id).delete();
  await db
    .collection("realizacao_orgao")
    .where("id_orgao", "==", id)
    .get()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        doc.ref.delete();
      });
    });
}

export async function deletePrograma(id) {
  await db.collection("programa").doc(id).delete();
  await db
    .collection("realizacao_programa")
    .where("id_programa", "==", id)
    .get()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        doc.ref.delete();
      });
    });
}

export async function deleteRealizacao(id) {
  await db.collection("realizacao").doc(id).delete();
  await db
    .collection("realizacao_orgao")
    .where("id_realizacao", "==", id)
    .get()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        doc.ref.delete();
      });
    });
  await db
    .collection("realizacao_programa")
    .where("id_realizacao", "==", id)
    .get()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        doc.ref.delete();
      });
    });
  await db
    .collection("realizacao_tema")
    .where("id_realizacao", "==", id)
    .get()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        doc.ref.delete();
      });
    });
}

export async function deleteRealizacaoOrgao(id) {
  await db.collection("realizacao_orgao").doc(id).delete();
}

export async function deleteRealizacaoPrograma(id) {
  await db.collection("realizacao_programa").doc(id).delete();
}

export async function deleteRealizacaoTema(id) {
  await db.collection("realizacao_tema").doc(id).delete();
}

export async function deleteStatus(id) {
  await db.collection("status").doc(id).delete();
}

export async function deleteSubprefeitura(id) {
  await db.collection("subprefeitura").doc(id).delete();
}

export async function deleteTema(id) {
  await db.collection("tema").doc(id).delete();
  await db
    .collection("realizacao_tema")
    .where("id_tema", "==", id)
    .get()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        doc.ref.delete();
      });
    });
}

export async function deleteTipo(id) {
  await db.collection("tipo").doc(id).delete();
}

export async function getRefBairro(id) {
  return db.collection("bairro").doc(id);
}

export async function getRefCidade(id) {
  return db.collection("cidade").doc(id);
}

export async function getAllCidades(collection = "cidade") {
  var res = await db.collection(collection).get();
  return res.docs.map((doc) => doc.data());
}

export async function getRefOrgao(id) {
  return db.collection("orgao").doc(id);
}

export async function getRefPrograma(id) {
  return db.collection("programa").doc(id);
}

export async function getRefRealizacao(id) {
  return db.collection("realizacao").doc(id);
}

export async function getRefRealizacaoOrgao(id) {
  return db.collection("realizacao_orgao").doc(id);
}

export async function getRefMultipleRealizacaoOrgao(idRealizacao) {
  return await db
    .collection("realizacao_orgao")
    .where("id_realizacao", "==", idRealizacao);
}

export async function getRefRealizacaoPrograma(id) {
  return db.collection("realizacao_programa").doc(id);
}

export async function getRefMultipleRealizacaoPrograma(idRealizacao) {
  return await db
    .collection("realizacao_programa")
    .where("id_realizacao", "==", idRealizacao);
}

export async function getRefRealizacaoTema(id) {
  return db.collection("realizacao_tema").doc(id);
}

export async function getRefMultipleRealizacaoTema(idRealizacao) {
  return await db
    .collection("realizacao_tema")
    .where("id_realizacao", "==", idRealizacao);
}

export async function getRefStatus(id) {
  return db.collection("status").doc(id);
}

export async function getRefSubprefeitura(id) {
  return db.collection("subprefeitura").doc(id);
}

export async function getRefTema(id) {
  return db.collection("tema").doc(id);
}

export async function getRefTipo(id) {
  return db.collection("tipo").doc(id);
}

export async function readBairro(id) {
  const doc = await db.collection("bairro").doc(id).get();
  return doc.data();
}

export async function readCidade(id) {
  const doc = await db.collection("cidade").doc(id).get();
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

export async function readRealizacaoNested(id) {
  const doc = await db.collection("realizacao").doc(id).get();
  const data = doc.data();
  const orgaoRefs = await getRefMultipleRealizacaoOrgao(id);
  const orgaoDocs = await orgaoRefs.get();
  const orgaos = orgaoDocs.docs.map((doc) => doc.data());
  const programaRefs = await getRefMultipleRealizacaoPrograma(id);
  const programaDocs = await programaRefs.get();
  const programas = programaDocs.docs.map((doc) => doc.data());
  const temaRefs = await getRefMultipleRealizacaoTema(id);
  const temaDocs = await temaRefs.get();
  const temas = temaDocs.docs.map((doc) => doc.data());
  return { ...data, orgaos, programas, temas };
}

export async function readRealizacaoOrgao(id) {
  const doc = await db.collection("realizacao_orgao").doc(id).get();
  return doc.data();
}

export async function readRealizacaoPrograma(id) {
  const doc = await db.collection("realizacao_programa").doc(id).get();
  return doc.data();
}

export async function readRealizacaoTema(id) {
  const doc = await db.collection("realizacao_tema").doc(id).get();
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

export async function readTipo(id) {
  const doc = await db.collection("tipo").doc(id).get();
  return doc.data();
}

//
// Utilities
//

export async function createUpdateRealizacaoFromForm(data) {
  // Initialize few variables
  let idBairro,
    idBairroOld,
    idStatus,
    idStatusOld = null;

  // Deconstruct data
  var { content, photos, profile, contentSnapshot } = data;

  // Assert that we have all required fields
  const requiredFields = [
    "cariocas_atendidos",
    "coords",
    "data_fim",
    "data_inicio",
    "descricao",
    "investimento",
    "nome",
    "status",
  ];
  for (let field of requiredFields) {
    if (!content[field]) {
      throw new Error(`Campo ${field} não pode ser vazio`);
    }
  }

  // Sanity checks: title must be in expected format, photo folder must be set
  content.nome = toTitleCase(toSnakeCase(content.nome));
  content.image_folder = contentSnapshot.image_folder || content.nome;
  const idRealizacao = toSnakeCase(content.nome);

  // Upload photos (if any)
  try {
    if (photos) {
      var promises = photos.map((file) =>
        uploadPhotoFirebase(file, content.image_folder),
      );
      photos = await Promise.all(promises);
    }
  } catch (e) {
    throw new Error("Error uploading photos: ", e);
  }

  // Get bairro from coordinates
  try {
    const refBairro = await getBairroFromCoords(content.coords);
    idBairro = refBairro.id;
    if (contentSnapshot.coords) {
      const refBairroOld = await getBairroFromCoords(contentSnapshot.coords);
      idBairroOld = refBairroOld.id;
    }
  } catch (e) {
    throw new Error("Error getting bairro from coordinates: ", e);
  }

  // Get idStatus from name
  try {
    idStatus = await getIdStatus(content.status);
    if (contentSnapshot.status) {
      idStatusOld = await getIdStatus(contentSnapshot.status);
    }
  } catch (e) {
    throw new Error("Error getting status from name: ", e);
  }

  try {
    // Build realizacao document
    const docContent = {
      cariocas_atendidos: content.cariocas_atendidos,
      coords: new firebase.firestore.GeoPoint(
        content.coords.latitude,
        content.coords.longitude,
      ),
      data_fim: content.data_fim,
      data_inicio: content.data_inicio,
      descricao: content.descricao,
      id_bairro: idBairro,
      id_status: idStatus,
      id_tipo: "obra", // TODO (future): add tipo to form
      image_folder: content.image_folder,
      investimento: content.investimento,
      nome: content.nome,
    };
    await createUpdateRealizacao(docContent);

    // Create or update related orgaos
    for (let i = 0; i < content.orgao.length; i++) {
      const idOrgao = await getIdOrgao(content.orgao[i]);
      await createUpdateRealizacaoOrgao({
        id_orgao: idOrgao,
        id_realizacao: idRealizacao,
      });
    }

    // Get removed orgaos and delete related realizacao_orgaos
    const removedOrgaos = contentSnapshot.orgao.filter(
      (x) => !content.orgao.includes(x),
    );
    for (let i = 0; i < removedOrgaos.length; i++) {
      const idOrgao = await getIdOrgao(removedOrgaos[i]);
      await deleteRealizacaoOrgao(concatSnakeCase(idRealizacao, idOrgao));
    }

    // Create or update related programas
    for (let i = 0; i < content.programa.length; i++) {
      const idPrograma = await getIdPrograma(content.programa[i]);
      await createUpdateRealizacaoPrograma({
        id_programa: idPrograma,
        id_realizacao: idRealizacao,
      });
    }

    // Get removed programas and delete related realizacao_programas
    const removedProgramas = contentSnapshot.programa.filter(
      (x) => !content.programa.includes(x),
    );
    for (let i = 0; i < removedProgramas.length; i++) {
      const idPrograma = await getIdPrograma(removedProgramas[i]);
      await deleteRealizacaoPrograma(concatSnakeCase(idRealizacao, idPrograma));
    }

    // Create or update related temas
    for (let i = 0; i < content.tema.length; i++) {
      const idTema = await getIdTema(content.tema[i]);
      await createUpdateRealizacaoTema({
        id_tema: idTema,
        id_realizacao: idRealizacao,
      });
    }

    // Get removed temas and delete related realizacao_temas
    const removedTemas = contentSnapshot.tema.filter(
      (x) => !content.tema.includes(x),
    );
    for (let i = 0; i < removedTemas.length; i++) {
      const idTema = await getIdTema(removedTemas[i]);
      await deleteRealizacaoTema(concatSnakeCase(idRealizacao, idTema));
    }

    // Log changes
    let oldCoords = null;
    if (contentSnapshot.coords) {
      oldCoords = new firebase.firestore.GeoPoint(
        contentSnapshot.coords.latitude,
        contentSnapshot.coords.longitude,
      );
    }
    const oldDocContent = {
      cariocas_atendidos: contentSnapshot.cariocas_atendidos,
      coords: oldCoords,
      data_fim: contentSnapshot.data_fim,
      data_inicio: contentSnapshot.data_inicio,
      descricao: contentSnapshot.descricao,
      id_bairro: idBairroOld,
      id_status: idStatusOld,
      id_tipo: null, // TODO (future): add tipo to form
      image_folder: contentSnapshot.image_folder,
      investimento: contentSnapshot.investimento,
      nome: contentSnapshot.nome,
    };
    createUserLog(docContent, oldDocContent, profile);

    // Delete old documents (if title changed)
    if (contentSnapshot.nome && content.nome !== contentSnapshot.nome) {
      const oldDocId = toSnakeCase(contentSnapshot.nome);
      deleteRealizacao(oldDocId);
      const realizacaoOrgaos = await getRealizacaoOrgaos(oldDocId);
      for (let realizacaoOrgao of realizacaoOrgaos.docs) {
        deleteRealizacaoOrgao(realizacaoOrgao.id);
      }
      const realizacaoProgramas = await getRealizacaoProgramas(oldDocId);
      for (let realizacaoPrograma of realizacaoProgramas.docs) {
        deleteRealizacaoPrograma(realizacaoPrograma.id);
      }
      const realizacaoTemas = await getRealizacaoTemas(oldDocId);
      for (let realizacaoTema of realizacaoTemas.docs) {
        deleteRealizacaoTema(realizacaoTema.id);
      }
    }
  } catch (e) {
    throw new Error("Error updating document: ", e);
  }
}

export async function createUserLog(newContent, oldContent, profile) {
  const logRef = db.collection("changelog").doc(Date.now().toString());
  await logRef.set({
    data: compareContent(newContent, oldContent),
    doc: newContent.nome,
    name: profile.name,
    email: profile.email,
    date: firebase.firestore.Timestamp.fromDate(new Date()),
  });
}

export async function getBairroFromCoords(coords) {
  // parse coordinates as point
  const point = turf.point([coords.longitude, coords.latitude]);
  // query the collection "bairro" for all documents
  const bairrosRef = db.collection("bairro");
  const bairrosSnapshot = (await bairrosRef.get()).docs;

  let idBairro = null;

  for (let i = 0; i < bairrosSnapshot.length; i++) {
    const bairroData = bairrosSnapshot[i].data();
    if (JSON.parse(bairroData.geo) && JSON.parse(bairroData.geo).geometry) {
      try {
        const geometryData = JSON.parse(bairroData.geo).geometry;
        
        if (geometryData.type === 'Polygon') {
          console.log("1 AHSUHSUAUHASHUASHUASUHAS")
          const polygon = turf.polygon(geometryData.coordinates);
          if (turf.booleanPointInPolygon(point, polygon)) {
            idBairro = bairrosSnapshot[i].id;
            break;
          }
        } else if (geometryData.type === 'MultiPolygon') {
          console.log("2 AHSUHSUAUHASHUASHUASUHAS")
          for (const coords of geometryData.coordinates) {
            const polygon = turf.polygon(coords);
            if (turf.booleanPointInPolygon(point, polygon)) {
              idBairro = bairrosSnapshot[i].id;
              break;
            }
          }
          if (idBairro) break;
        } 
      } catch (e) {
        console.error(
          "Erro ao processar geometria para o bairro: ",
          bairroData.nome,
          e,
        );
      }
    }
  }

  if (idBairro) {
    return db.collection("bairro").doc(idBairro);
  }
  else throw new Error("Bairro não encontrado para as coordenadas informadas");


}


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

export async function getIdOrgao(name) {
  // query the collection "Orgaos" for where the field "nome" is equal to the name
  const orgaosRef = db.collection("orgao");
  const orgaosSnapshot = await orgaosRef.where("nome", "==", name).get();
  // if there are documents, return the first document's id
  if (!orgaosSnapshot.empty) {
    return orgaosSnapshot.docs[0].id;
  }
  // otherwise, raise an error
  throw new Error("Orgão não encontrado");
}

export async function getIdPrograma(name) {
  // query the collection "Programas" for where the field "nome" is equal to the name
  const programasRef = db.collection("programa");
  const programasSnapshot = await programasRef.where("nome", "==", name).get();
  // if there are documents, return the first document's id
  if (!programasSnapshot.empty) {
    return programasSnapshot.docs[0].id;
  }
  // otherwise, raise an error
  throw new Error("Programa não encontrado");
}

export async function getIdStatus(name) {
  // query the collection "Status" for where the field "nome" is equal to the name
  const statusRef = db.collection("status");
  const statusSnapshot = await statusRef.where("nome", "==", name).get();
  // if there are documents, return the first document's id
  if (!statusSnapshot.empty) {
    return statusSnapshot.docs[0].id;
  }
  // otherwise, raise an error
  throw new Error("Status não encontrado");
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

export async function getIdTema(name) {
  // query the collection "Temas" for where the field "nome" is equal to the name
  const temasRef = db.collection("tema");
  const temasSnapshot = await temasRef.where("nome", "==", name).get();
  // if there are documents, return the first document's id
  if (!temasSnapshot.empty) {
    return temasSnapshot.docs[0].id;
  }
  // otherwise, raise an error
  throw new Error("Tema não encontrado");
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
    const folderRef = storageRef.child(name_realizacao);
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
    // Get list of id_subprefeitura, then a list of id_bairro, then a list of id_realizacao
    var subpref_ids = await db
      .collection("subprefeitura")
      .where("id_cidade", "==", inputFilters.id_cidade)
      .get()
      .then((querySnapshot) => {
        return querySnapshot.docs.map((doc) => doc.id);
      });
    let bairro_ids = [];
    let subpref_ids_chunks = [];
    if (subpref_ids.length > 10) {
      // Firestore only allows 10 ids per query
      for (let i = 0; i < subpref_ids.length; i += 10) {
        subpref_ids_chunks.push(subpref_ids.slice(i, i + 10));
      }
    } else {
      subpref_ids_chunks = [subpref_ids];
    }
    for (let i = 0; i < subpref_ids_chunks.length; i++) {
      if (subpref_ids_chunks.length === 0) {
        break;
      }
      var res = await db
        .collection("bairro")
        .where("id_subprefeitura", "in", subpref_ids_chunks[i])
        .get();
      bairro_ids.push(...res.docs.map((doc) => doc.id));
    }
    let bairro_ids_chunks = [];
    if (bairro_ids.length > 10) {
      // Firestore only allows 10 ids per query
      for (let i = 0; i < bairro_ids.length; i += 10) {
        bairro_ids_chunks.push(bairro_ids.slice(i, i + 10));
      }
    } else {
      bairro_ids_chunks = [bairro_ids];
    }
    for (let i = 0; i < bairro_ids_chunks.length; i++) {
      if (bairro_ids_chunks.length === 0) {
        break;
      }
      var res = await db
        .collection("realizacao")
        .where("id_bairro", "in", bairro_ids_chunks[i])
        .get();
      results.push(...res.docs.map((doc) => doc.id));
    }
  } else if (inputFilters.id_subprefeitura) {
    // Get list of id_bairro, then a list of id_realizacao
    var bairro_ids = await db
      .collection("bairro")
      .where("id_subprefeitura", "==", inputFilters.id_subprefeitura)
      .get()
      .then((querySnapshot) => {
        return querySnapshot.docs.map((doc) => doc.id);
      });
    let bairro_ids_chunks = [];
    if (bairro_ids.length > 10) {
      // Firestore only allows 10 ids per query
      for (let i = 0; i < bairro_ids.length; i += 10) {
        bairro_ids_chunks.push(bairro_ids.slice(i, i + 10));
      }
    } else {
      bairro_ids_chunks = [bairro_ids];
    }
    for (let i = 0; i < bairro_ids_chunks.length; i++) {
      if (bairro_ids_chunks.length === 0) {
        break;
      }
      var res = await db
        .collection("realizacao")
        .where("id_bairro", "in", bairro_ids_chunks[i])
        .get();
      results.push(...res.docs.map((doc) => doc.id));
    }
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
    var subpref_ids = await db
      .collection("subprefeitura")
      .where("id_cidade", "==", inputFilters.id_cidade)
      .get()
      .then((querySnapshot) => {
        return querySnapshot.docs.map((doc) => doc.id);
      });
    let subpref_ids_chunks = [];
    if (subpref_ids.length > 10) {
      // Firestore only allows 10 ids per query
      for (let i = 0; i < subpref_ids.length; i += 10) {
        subpref_ids_chunks.push(subpref_ids.slice(i, i + 10));
      }
    }
    else {
      subpref_ids_chunks = [subpref_ids];
    }
    for (let i = 0; i < subpref_ids_chunks.length; i++) {
      if (subpref_ids_chunks.length === 0) {
        break;
      }
      var res = await db
        .collection("bairro")
        .where("id_subprefeitura", "in", subpref_ids_chunks[i])
        .get();
      results.push(
        ...res.docs.map((doc) => {
          return { ...doc.data(), id: doc.id };
        }),
      );
    }
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

export async function getRealizacaoOrgaos(idRealizacao) {
  return await db
    .collection("realizacao_orgao")
    .where("id_realizacao", "==", idRealizacao)
    .get();
}

export async function getRealizacaoProgramas(idRealizacao) {
  return await db
    .collection("realizacao_programa")
    .where("id_realizacao", "==", idRealizacao)
    .get();
}

export async function getRealizacoesPrograma(idPrograma) {
  return await db
    .collection("realizacao_programa")
    .where("id_programa", "==", idPrograma)
    .get();
}

export async function getRealizacaoTemas(idRealizacao) {
  return await db
    .collection("realizacao_tema")
    .where("id_realizacao", "==", idRealizacao)
    .get();
}

export async function getRealizacoesTema(idTema) {
  return await db
    .collection("realizacao_tema")
    .where("id_tema", "==", idTema)
    .get();
}

export async function uploadPhotoFirebase(file, keyword = "All") {
  var fileRef;
  if (keyword === "All") {
    fileRef = storageRef.child(file.name);
  } else {
    fileRef = storageRef.child(`${keyword}/${file.name}`);
  }

  try {
    await fileRef.put(file);
    var res;
    if (keyword === "All") {
      res = await storageRef.root.listAll();
    } else {
      res = await storageRef.child(`${keyword}/uid`).listAll();
    }
    return await fileRef.getDownloadURL();
  } catch (e) {
    console.error(e);
  }
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
        if (inputFilters.id_cidade) {
          const bairros = await getListBairroData({
            id_cidade: inputFilters.id_cidade,
          });
          const bairroIds = bairros.map((bairro) => bairro.id);
          realizacoes = realizacoes.filter((realizacao) => {
            return bairroIds.includes(realizacao.id_bairro);
          });
        }
        if (inputFilters.id_subprefeitura) {
          const bairros = await getListBairroData({
            id_subprefeitura: inputFilters.id_subprefeitura,
          });
          const bairroIds = bairros.map((bairro) => bairro.id);
          realizacoes = realizacoes.filter((realizacao) => {
            return bairroIds.includes(realizacao.id_bairro);
          });
        }
        if (inputFilters.id_bairro) {
          realizacoes = realizacoes.filter(
            (realizacao) => realizacao.id_bairro === inputFilters.id_bairro,
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
        if (inputFilters.id_cidade) {
          const bairros = await getListBairroData({
            id_cidade: inputFilters.id_cidade,
          });
          const bairroIds = bairros.map((bairro) => bairro.id);
          realizacoes = realizacoes.filter((realizacao) => {
            return bairroIds.includes(realizacao.id_bairro);
          });
        }
        if (inputFilters.id_subprefeitura) {
          const bairros = await getListBairroData({
            id_subprefeitura: inputFilters.id_subprefeitura,
          });
          const bairroIds = bairros.map((bairro) => bairro.id);
          realizacoes = realizacoes.filter((realizacao) => {
            return bairroIds.includes(realizacao.id_bairro);
          });
        }
        if (inputFilters.id_bairro) {
          realizacoes = realizacoes.filter(
            (realizacao) => realizacao.id_bairro === inputFilters.id_bairro,
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
// export function getListOrgaoName() {
//   // return a list of all orgao names
//   const orgaoRef = db.collection("orgao");
//   return orgaoRef.get().then((querySnapshot) => {
//     return querySnapshot.docs.map((doc) => doc.data().nome);
//   });
// }