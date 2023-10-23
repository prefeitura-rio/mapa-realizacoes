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
  }
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
  }
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
  }
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
  }
  const documentName = toSnakeCase(data.nome);
  const ref = db.collection("programa").doc(documentName);
  await ref.set(documentData);
}

export async function createUpdateRealizacao(data) {
  console.log("createUpdateRealizacao(data)", data);
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
  }
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
  }
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
  }
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
  }
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
  }
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
  }
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
  }
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
  }
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

export async function getAllCidades(collection = "Cidades") {
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
  let idBairro, idBairroOld, idStatus, idStatusOld = null;

  // Deconstruct data
  var { content, photos, profile, contentSnapshot } = data;

  // Assert that we have all required fields
  const requiredFields = [
    "cariocasAtendidos",
    "coords",
    "dataFim",
    "dataInicio",
    "descricao",
    "status",
    "totalInvestido",
    "titulo",
  ]
  for (let field of requiredFields) {
    if (!content[field]) {
      throw new Error(`Campo ${field} não pode ser vazio`);
    }
  }

  // Sanity checks: title must be in expected format, photo folder must be set
  content.titulo = toTitleCase(toSnakeCase(content.titulo));
  content.photoFolder = content.photoFolder || content.titulo;
  const idRealizacao = toSnakeCase(content.titulo);

  // Upload photos (if any)
  try {
    if (photos) {
      var promises = photos.map((file) =>
        uploadPhotoFirebase(file, content.photoFolder),
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
      cariocas_atendidos: content.cariocasAtendidos,
      coords: new firebase.firestore.GeoPoint(
        content.coords.latitude,
        content.coords.longitude,
      ),
      data_fim: content.dataFim,
      data_inicio: content.dataInicio,
      descricao: content.descricao,
      id_bairro: idBairro,
      id_status: idStatus,
      id_tipo: "obra", // TODO (future): add tipo to form
      image_folder: content.photoFolder,
      investimento: content.totalInvestido,
      nome: content.titulo,
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
      await deleteRealizacaoOrgao(
        concatSnakeCase(idRealizacao, idOrgao),
      );
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
      await deleteRealizacaoPrograma(
        concatSnakeCase(idRealizacao, idPrograma),
      );
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
      await deleteRealizacaoTema(
        concatSnakeCase(idRealizacao, idTema),
      );
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
      cariocas_atendidos: contentSnapshot.cariocasAtendidos,
      coords: oldCoords,
      data_fim: contentSnapshot.dataFim,
      data_inicio: contentSnapshot.dataInicio,
      descricao: contentSnapshot.descricao,
      id_bairro: idBairroOld,
      id_status: idStatusOld,
      id_tipo: null, // TODO (future): add tipo to form
      image_folder: contentSnapshot.photoFolder,
      investimento: contentSnapshot.totalInvestido,
      nome: contentSnapshot.titulo,
    }
    createUserLog(docContent, oldDocContent, profile);

    // Delete old documents (if title changed)
    if (contentSnapshot.titulo && content.titulo !== contentSnapshot.titulo) {
      const oldDocId = toSnakeCase(contentSnapshot.titulo);
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

    console.log("Document successfully updated!");
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
        const polygon = turf.polygon(
          JSON.parse(bairroData.geo).geometry.coordinates,
        );
        if (turf.booleanPointInPolygon(point, polygon)) {
          idBairro = bairrosSnapshot[i].id;
          break;
        }
      } catch (e) {
        console.error(
          "Erro ao processar polígono pro bairro: ",
          bairroData.nome,
          e,
        );
      }
    }
  }

  if (idBairro) {
    return db.collection("bairro").doc(idBairro);
  }

  throw new Error("Bairro não encontrado para as coordenadas informadas");
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
  console.log("getIdStatus, name=", name);
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

export function getListOrgaoName() {
  // return a list of all orgao names
  const orgaoRef = db.collection("orgao");
  return orgaoRef.get().then((querySnapshot) => {
    return querySnapshot.docs.map((doc) => doc.data().nome);
  });
}

export function getListProgramaName() {
  // return a list of all programa names
  const programaRef = db.collection("programa");
  return programaRef.get().then((querySnapshot) => {
    return querySnapshot.docs.map((doc) => doc.data().nome);
  });
}

export async function getListRealizacaoData() {
  var res = await db.collection("realizacao").get();
  return res.docs.map((doc) => doc.data());
}

export function getListStatusName() {
  // return a list of all status names
  const statusRef = db.collection("status");
  return statusRef.get().then((querySnapshot) => {
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

export async function getRealizacaoOrgaos(idRealizacao) {
  return await db
    .collection("realizacao_orgao")
    .where("id_realizacao", "==", idRealizacao);
}

export async function getRealizacaoProgramas(idRealizacao) {
  return await db
    .collection("realizacao_programa")
    .where("id_realizacao", "==", idRealizacao);
}

export async function getRealizacaoTemas(idRealizacao) {
  return await db
    .collection("realizacao_tema")
    .where("id_realizacao", "==", idRealizacao);
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
    console.log("Done", res);
    return await fileRef.getDownloadURL();
  } catch (e) {
    console.error(e);
  }
}
