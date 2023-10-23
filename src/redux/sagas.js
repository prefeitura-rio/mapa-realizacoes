import { takeEvery, put, call, fork, all } from "redux-saga/effects";
import { auth, getRealizacaoInfo, getListRealizacaoData, storageRef } from "../firebase";
// import {
//   LOAD_COMMENTS,
//   requestComments,
//   requestCommentsFailed,
//   requestCommentsSuccess,
// } from "./comments/actions";
import {
  LOAD_DATA,
  requestData,
  requestDataFailed,
  requestDataSuccess,
} from "./place/actions";
import {
  LOAD_IMAGES,
  requestImages,
  requesImagesFailed,
  requestImagesSuccess,
  LOAD_ALL_IMAGES,
  requestAllImages,
  requestAllImagesFailed,
  requestAllImagesSuccess,
} from "./images/actions";
import {
  loadPlaces,
  LOAD_PLACES,
  requestPlaces,
  requestPlacesFailed,
  requestPlacesSuccess,
  LOAD_ALL_PLACES,
  requestAllPlaces,
  requestAllPlacesFailed,
  requestAllPlacesSuccess,
} from "./places/actions";
import {
  LOAD_ALL_POINTS,
  requestAllPoints,
  requestAllPointsFailed,
  requestAllPointsSuccess,
} from "./points/actions";
import { 
  LOAD_ALL_CIDADES, 
  requestAllCidades, 
  requestAllCidadesFailed, 
  requestAllCidadesSuccess
} from "./cidade/actions";
import { byCategory } from "../components/modals/editCategory/categoryItems";
import {
  LOGIN,
  loginFail,
  loginRequest,
  loginSuccess,
  logOut,
  LOG_OUT,
} from "./auth/actions";

import firebase from "firebase/app";


function* workerLoadData(action) {
  try {
    yield put(requestData());
    const data = yield call(getRealizacaoInfo, action.payload);
    console.log("workerLoadData: ", data)
    yield put(requestDataSuccess(data));
  } catch (error) {
    yield put(requestDataFailed());
  }
}

export function* watchLoadData() {
  yield takeEvery(LOAD_DATA, workerLoadData);
}

// ----------------------------

async function fetchAllImages() {
  let result = [];
  let res = await storageRef.listAll();
  let promises = res.prefixes.map((folderRef) => folderRef.listAll());
  const folders = await Promise.all(promises);
  for (var folder of folders) {
    for (var item of folder.items) {
      result.push(item);
    }
  }
  promises = result.map((imageRef) => imageRef.getDownloadURL());
  return await Promise.all(promises);
}

function* workerLoadAllImages() {
  try {
    yield put(requestAllImages());
    const data = yield call(fetchAllImages);
    yield put(requestAllImagesSuccess(data));
  } catch (error) {
    yield put(requestAllImagesFailed());
  }
}

export function* watchLoadAllImages() {
  yield takeEvery(LOAD_ALL_IMAGES, workerLoadAllImages);
}

async function fetchImages(keyword) {
  var res = await storageRef.child(keyword).listAll();

  const promises = res.items.map((imageRef) => imageRef.getDownloadURL());
  return await Promise.all(promises);
}

function* workerLoadImages(action) {
  try {
    yield put(requestImages());
    const data = yield call(fetchImages, action.payload);
    yield put(requestImagesSuccess(data));
  } catch (error) {
    yield put(requesImagesFailed());
  }
}

export function* watchLoadImages() {
  yield takeEvery(LOAD_IMAGES, workerLoadImages);
}

async function fetchPlaces(refs) {
  async function getDataByRef(ref) {
    var doc = await ref.get();
    return doc.data();
  }

  const promises = refs.map((ref) => getDataByRef(ref));
  return await Promise.all(promises);
}

function* workerLoadPlaces(action) {
  try {
    yield put(requestPlaces());
    const data = yield call(fetchPlaces, action.payload);
    yield put(requestPlacesSuccess(data));
  } catch (error) {
    yield put(requestPlacesFailed());
  }
}

export function* watchLoadPlaces() {
  yield takeEvery(LOAD_PLACES, workerLoadPlaces);
}

// ----------------------------

function* workerLoadAllPlaces(action) {
  try {
    yield put(requestAllPlaces());
    const data = yield call(getListRealizacaoData, action.payload);
    console.log("Data em workerLoadAllPlaces:", data); // Imprime o valor de "data" no console
    yield put(requestAllPlacesSuccess(data));
  } catch (error) {
    console.log("Erro em workerLoadAllPlaces:", error); // Imprime o erro no console
    yield put(requestAllPlacesFailed());
  }
}

export function* watchLoadAllPlaces() {
  yield takeEvery(LOAD_ALL_PLACES, workerLoadAllPlaces);
}

function* workerLoadAllPoints() {
  try {
    yield put(requestAllPoints());
    const data = yield call(getListRealizacaoData);
    console.log("data: ", data)
    yield put(requestAllPointsSuccess(data));
  } catch (error) {
    console.error("Erro2: "+error);
    yield put(requestAllPointsFailed());
  }
}

export function* watchLoadAllPoints() {
  yield takeEvery(LOAD_ALL_POINTS, workerLoadAllPoints);
}

async function fetchAllCidades(collection = "Cidades") {
  var res = await db.collection(collection).get();
  return res.docs.map((doc) => doc.data());
}

function* workerLoadAllCidades() {
  try {
    yield put(requestAllCidades());
    const data = yield call(fetchAllCidades);
    console.log(data)
    yield put(requestAllCidadesSuccess(data));
  } catch (error) {
    console.error("Erro2: "+error);
    yield put(requestAllCidadesFailed());
  }
}

export function* watchLoadAllCidades() {
  yield takeEvery(LOAD_ALL_CIDADES, workerLoadAllCidades);
}

async function loginFirebase() {
  const provider = new firebase.auth.GoogleAuthProvider();
  const res = await auth.signInWithPopup(provider);
  const profile = {
    name: res.additionalUserInfo.profile.name,
    photoURL: res.additionalUserInfo.profile.picture,
    email: res.additionalUserInfo.profile.email,
  };
  sessionStorage.setItem("gmc-user", JSON.stringify(profile));
  return profile;
}
function* workerLogin() {
  try {
    yield put(loginRequest());
    const data = yield call(loginFirebase);
    yield put(loginSuccess(data));
  } catch (error) {
    console.log(error);
    yield put(loginFail());
  }
}
export function* watchLogin() {
  yield takeEvery(LOGIN, workerLogin);
}
async function logOutFirebase() {
  await auth.signOut()
  sessionStorage.removeItem("gmc-user");
}
function* workerLogOut() {
  try {
    yield call(logOutFirebase);
  } catch (error) {
    console.log(error);
  }
}
export function* watchLogOut() {
  yield takeEvery(LOG_OUT, workerLogOut);
}

// ----------------------------

export function* rootSaga() {
  yield all([
    fork(watchLoadImages),
    fork(watchLoadAllImages),
    fork(watchLoadData),
    fork(watchLoadPlaces),
    fork(watchLoadAllPlaces),
    fork(watchLoadAllCidades),
    fork(watchLoadAllPoints),
    fork(watchLogin),
    fork(watchLogOut),
  ]);
}
