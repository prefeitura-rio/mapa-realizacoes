import firebase from "firebase";
import "firebase/firestore";
import firebaseCredentials from "./firebaseconfig";
import { toSnakeCase, concatenaEmSnakeCase, obterSiglaOrgao } from './utils/formatFile';
import * as turf from '@turf/turf';
import { mapearSubprefeitura } from "./components/inlines/subprefeituras";

const firebaseConfig = {
  apiKey: firebaseCredentials.apiKey,
  authDomain: firebaseCredentials.authDomain,
  projectId: firebaseCredentials.projectId,
  storageBucket:firebaseCredentials.storageBucket,
  messagingSenderId: firebaseCredentials.messagingSenderId,
  appId: firebaseCredentials.appId
};

firebase.initializeApp(firebaseConfig);

export const db = firebase.firestore();
export const firestore = firebase.firestore;

// Create a root reference
export const storageRef = firebase.storage().ref();

export const auth = firebase.auth();

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


export async function editarRealizacao(data) {
  var { content, photos, profile, contentSnapshot } = data;

  content.photoFolder = content.photoFolder || content.titulo;

  try {
    if (photos) {
      var promises = photos.map((file) =>
        uploadPhotoFirebase(file, content.photoFolder)
      );
      photos = await Promise.all(promises);
    }

    const ref = db.collection("Realizacoes").doc(toSnakeCase(content.titulo));


    const newContent = {
      ...content,
      imageUrl: content.imageUrl || photos[0] || null,
      coords: new firebase.firestore.GeoPoint(
        content.coords.latitude,
        content.coords.longitude
      ),
    };

    const { inside, ...rest } = newContent; // remove .inside

    await ref.set(rest);

    if (content.coords) {
      for (let i = 0; i < content.tema.length; i++) {
        const ref1 = db.collection("RealizacaoOrgao").doc(concatenaEmSnakeCase(content.titulo,obterSiglaOrgao(content.orgao[i]).toLowerCase()));
        await ref1.set({
          id_orgao: obterSiglaOrgao(content.orgao[i]),
          id_realizacao: toSnakeCase(content.titulo)
      });
    }

      for (let i = 0; i < content.tema.length; i++) {
        // Criar uma referência para um novo documento usando o valor atual de content.tema[i]
        const ref2 = db.collection("RealizacaoTema").doc(concatenaEmSnakeCase(content.titulo, content.tema[i].toLowerCase()));
        
        // Definir os dados para o novo documento
        await ref2.set({
          id_tema: toSnakeCase(content.tema[i]),
          id_realizacao: toSnakeCase(content.titulo)
        });
      }

      const ref3 = db.collection("Places").doc(toSnakeCase(content.titulo));
      await ref3.set({
        id: content.titulo,
        nome: toSnakeCase(content.titulo),
        coords: new firebase.firestore.GeoPoint(
          content.coords.latitude,
          content.coords.longitude
        ),
      });

        // Verifique em qual bairro a realização está localizada
        const point = turf.point([content.coords.longitude, content.coords.latitude]);
        const bairrosRef = db.collection("Bairros");
        const bairrosSnapshot = await bairrosRef.get();
  
        let bairroEncontrado = null;
  
        bairrosSnapshot.forEach(doc => {
          const bairroData = JSON.parse(JSON.stringify(doc.data()));
          if (JSON.parse(bairroData.geo) && JSON.parse(bairroData.geo).geometry) {
            try {
              const polygon = turf.polygon(JSON.parse(bairroData.geo).geometry.coordinates);
              if (turf.booleanPointInPolygon(point, polygon)) {
                bairroEncontrado = bairroData.nome;
                return;
              }
            } catch (e) {
              console.error("Erro ao processar polígono pro bairro: ", bairroData.nome, e);
            }
          }
        });
  
        // Debugging console.log statements
        if (bairroEncontrado) {
          console.log("=======> Bairro encontrado:", bairroEncontrado);
          await ref.update({
            bairro: bairroEncontrado,
            subprefeitura: mapearSubprefeitura(bairroEncontrado)
          });
        } else {
          console.log("=======> Bairro não foi encontrado.");
        }
    }

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

    const logref = db.collection("LogUsuarios").doc(Date.now().toString());
    await logref.set({
      data: compareContent(rest, contentSnapshot),
      doc: content.titulo,
      name: profile.name,
      email: profile.email,
      date: firebase.firestore.Timestamp.fromDate(new Date()),
    });

    if (content.titulo !== contentSnapshot.titulo) {
      await db.collection("Realizacoes").doc(toSnakeCase(contentSnapshot.titulo)).delete();
      await db.collection("RealizacaoOrgao").doc(toSnakeCase(contentSnapshot.titulo)).delete();
      await db.collection("RealizacaoTema").doc(toSnakeCase(contentSnapshot.titulo)).delete();
      await db.collection("Places").doc(toSnakeCase(contentSnapshot.titulo)).delete();
      console.log("Document successfully moved!");
      console.log("contentSnapshot", contentSnapshot);
      console.log("content", content);
    }

    console.log("Document successfully updated!");
  } catch (e) {
    console.error("Error updating document: ", e);
  }
}




