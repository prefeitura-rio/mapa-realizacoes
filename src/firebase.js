import firebase from "firebase";
import "firebase/firestore";
import firebaseCredentials from "./firebaseconfig";
import { toSnakeCase, toTitleCase, concatSnakeCase } from "./utils/formatFile";
import * as turf from "@turf/turf";

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

// Create a root reference
export const storageRef = firebase.storage().ref();

export const auth = firebase.auth();

function compareContent(newCont, oldCont) {
  let res = {};
  for (let key of Object.keys(newCont)) {
    if (
      oldCont[key] &&
      JSON.stringify(newCont[key]) !== JSON.stringify(oldCont[key])
    ) {
      if (key == "coords") {
        res.coords = `(${oldCont[key].latitude} ${oldCont[key].longitude}) -> (${newCont[key].latitude} ${newCont[key].longitude})`;
      }
      if (
        typeof oldCont[key] === "string" ||
        typeof oldCont[key] === "number"
      ) {
        res[key] = `${oldCont[key]} -> ${newCont[key]}`;
      }
    }
  }
  return res;
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

export async function addRealizacaoOrgao(idRealizacao, nameOrgao) {
  const idOrgao = await getIdOrgao(nameOrgao);
  const ref = getRealizacaoOrgao(concatSnakeCase(idRealizacao, idOrgao));
  await ref.set({
    id_orgao: idOrgao,
    id_realizacao: idRealizacao,
  });
}

export async function addRealizacaoTema(idRealizacao, nameTema) {
  const idTema = await getIdTema(nameTema);
  const ref = getRealizacaoTema(concatSnakeCase(idRealizacao, idTema));
  await ref.set({
    id_tema: idTema,
    id_realizacao: idRealizacao,
  });
}

export async function createUpdateRealizacao(data) {
  var { content, photos, profile, contentSnapshot } = data;

  content.titulo = toTitleCase(toSnakeCase(content.titulo)); // make sure title follows the pattern
  content.photoFolder = content.photoFolder || content.titulo;

  try {
    if (photos) {
      var promises = photos.map((file) =>
        uploadPhotoFirebase(file, content.photoFolder),
      );
      photos = await Promise.all(promises);
    }

    const docId = toSnakeCase(content.titulo);
    const ref = getRealizacao(docId);

    const newContent = {
      ...content,
      imageUrl: content.imageUrl || photos[0] || null,
      coords: new firebase.firestore.GeoPoint(
        content.coords.latitude,
        content.coords.longitude,
      ),
    };

    const { inside, ...rest } = newContent; // remove .inside

    await ref.set(rest);

    if (content.coords) {
      // Add related orgaos
      for (let i = 0; i < content.orgao.length; i++) {
        addRealizacaoOrgao(docId, content.orgao[i]);
      }

      // Add related temas
      for (let i = 0; i < content.tema.length; i++) {
        addRealizacaoTema(docId, content.tema[i]);
      }

      // Get the bairro ref for the coords
      const refBairro = await getBairro(content.coords);
      const idBairro = refBairro.id;

      // Debugging console.log statements
      console.log("=======> ID do bairro:", idBairro);

      await ref.update({
        id_bairro: idBairro,
      });
    }

    // Log changes
    createUserLog(rest, contentSnapshot, profile)

    // Delete old documents (if title changed)
    if (content.titulo !== contentSnapshot.titulo) {
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
    console.error("Error updating document: ", e);
  }
}

export async function createUserLog(newContent, oldContent, profile) {
  const nowDate = Date.now();
  const logRef = db.collection("changelog").doc(nowDate.toString());
  await logRef.set({
    data: compareContent(newContent, oldContent),
    doc: newContent.titulo,
    name: profile.name,
    email: profile.email,
    date: firebase.firestore.Timestamp.fromDate(nowDate),
  });
}

export async function deleteRealizacao(id) {
  await db.collection("realizacao").doc(id).delete();
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

export async function getBairro(coords) {
  // query the collection "bairro" for choosing based on the coords
  const point = turf.point([coords.longitude, coords.latitude]);
  const bairrosRef = db.collection("bairro");
  const bairrosSnapshot = await bairrosRef.get();

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


export async function getRealizacao(document) {
  return db
  .collection("realizacao")
  .doc(document)
  .get()
  .then((doc) => doc.data());;
}

export async function getRealizacoes() {
  var res = await db.collection("realizacao").get();
  return res.docs.map((doc) => doc.data());
}


export function getRealizacaoOrgao(id) {
  return db.collection("realizacao_orgao").doc(id);
}

export async function getRealizacaoOrgaos(idRealizacao) {
  return await db.collection("realizacao_orgao").where("id_realizacao", "==", idRealizacao);
}

export function getRealizacaoPrograma(id) {
  return db.collection("realizacao_programa").doc(id);
}

export async function getRealizacaoProgramas(idRealizacao) {
  return await db.collection("realizacao_programa").where("id_realizacao", "==", idRealizacao);
}

export function getRealizacaoTema(id) {
  return db.collection("realizacao_tema").doc(id);
}

export async function getRealizacaoTemas(idRealizacao) {
  return await db.collection("realizacao_tema").where("id_realizacao", "==", idRealizacao);
}

