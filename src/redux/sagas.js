import { takeEvery, put, call, fork, all } from "redux-saga/effects";
import { auth, getRealizacaoInfo, getListRealizacaoData, storageRef, getAllCidades, getBairroInfo, getSubprefeituraInfo, getDadosAgregadosAbaTema, getDadosAgregadosAbaProgramas, getDadosAgregadosAbaSumarioInfoBasicasCidade, getDadosAgregadosAbaSumarioStatusEntregas, getDadosAgregadosAbaSumarioInfoBasicasSubprefeitura, getListImageUrls, getAggregatedData, getListDestaquesMunicipio } from "../firebase";
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
  requestAllImagesBairro,
  requestAllImagesBairroFailed,
  requestAllImagesBairroSuccess,
  requestAllImagesSubprefeitura,
  requestAllImagesSubprefeituraFailed,
  requestAllImagesSubprefeituraSuccess,
  LOAD_ALL_IMAGES_BAIRRO,
  LOAD_ALL_IMAGES_SUBPREFEITURA,
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
  LOAD_DADOS_AGREGADOS_ABA_PROGRAMAS_CIDADE, 
  LOAD_DADOS_AGREGADOS_ABA_SUMARIO_INFO_BASICAS_CIDADE, 
  LOAD_DADOS_AGREGADOS_ABA_TEMA_CIDADE, 
  LOAD_DADOS_AGREGADOS_CIDADE, 
  LOAD_DESTAQUES_CIDADE, 
  requestAllCidades, 
  requestAllCidadesFailed, 
  requestAllCidadesSuccess,
  requestDadosAgregadosAbaProgramasCidade,
  requestDadosAgregadosAbaProgramasCidadeFailed,
  requestDadosAgregadosAbaProgramasCidadeSuccess,
  requestDadosAgregadosAbaSumarioInfoBasicasCidade,
  requestDadosAgregadosAbaSumarioInfoBasicasCidadeFailed,
  requestDadosAgregadosAbaSumarioInfoBasicasCidadeSuccess,
  requestDadosAgregadosAbaSumarioStatusEntregasCidade,
  requestDadosAgregadosAbaSumarioStatusEntregasCidadeFailed,
  requestDadosAgregadosAbaSumarioStatusEntregasCidadeSuccess,
  requestDadosAgregadosAbaTemaCidade,
  requestDadosAgregadosAbaTemaCidadeFailed,
  requestDadosAgregadosAbaTemaCidadeSuccess,
  requestDadosAgregadosCidade,
  requestDadosAgregadosCidadeFailed,
  requestDadosAgregadosCidadeSuccess,
  requestDestaquesCidade,
  requestDestaquesCidadeFailed,
  requestDestaquesCidadeSuccess
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
import { LOAD_ALL_BAIRROS, LOAD_BAIRRO_DATA, LOAD_DADOS_AGREGADOS_ABA_PROGRAMA_BAIRRO, LOAD_DADOS_AGREGADOS_ABA_SUMARIO_STATUS_ENTREGAS_BAIRRO, LOAD_DADOS_AGREGADOS_ABA_TEMA_BAIRRO, requestAllBAIRROSSuccess, requestAllBairros, requestAllBairrosFailed, requestBairroData, requestBairroDataFailed, requestBairroDataSuccess, requestDadosAgregadosAbaProgramaBairro, requestDadosAgregadosAbaProgramaBairroFailed, requestDadosAgregadosAbaProgramaBairroSuccess, requestDadosAgregadosAbaSumarioStatusEntregasBairro, requestDadosAgregadosAbaSumarioStatusEntregasBairroFailed, requestDadosAgregadosAbaSumarioStatusEntregasBairroSuccess,requestDadosAgregadosAbaTemaBairro, requestDadosAgregadosAbaTemaBairroFailed, requestDadosAgregadosAbaTemaBairroSuccess } from "./bairros/actions";
import { toSnakeCase } from "../utils/formatFile";
import { LOAD_DADOS_AGREGADOS_ABA_PROGRAMAS_SUBPREFEITURA, LOAD_DADOS_AGREGADOS_ABA_SUMARIO_INFO_BASICAS_SUBPREFEITURA, LOAD_DADOS_AGREGADOS_ABA_TEMA_SUBPREFEITURA, LOAD_SUBPREFEITURA_DATA, requestDadosAgregadosAbaProgramasSubprefeitura, requestDadosAgregadosAbaProgramasSubprefeituraFailed, requestDadosAgregadosAbaProgramasSubprefeituraSuccess, requestDadosAgregadosAbaSumarioInfoBasicasSubprefeitura, requestDadosAgregadosAbaSumarioInfoBasicasSubprefeituraFailed, requestDadosAgregadosAbaSumarioInfoBasicasSubprefeituraSuccess, requestDadosAgregadosAbaSumarioStatusEntregasSubprefeitura, requestDadosAgregadosAbaSumarioStatusEntregasSubprefeituraFailed, requestDadosAgregadosAbaSumarioStatusEntregasSubprefeituraSuccess, requestDadosAgregadosAbaTemaSubprefeitura, requestDadosAgregadosAbaTemaSubprefeituraFailed, requestDadosAgregadosAbaTemaSubprefeituraSuccess, requestSubprefeituraData, requestSubprefeituraDataFailed, requestSubprefeituraDataSuccess } from "./subprefeituras/actions";


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

function* workerLoadAllImages() {
  try {
    yield put(requestAllImages());
    const data = yield call(getListImageUrls);
    yield put(requestAllImagesSuccess(data));
  } catch (error) {
    yield put(requestAllImagesFailed());
  }
}

export function* watchLoadAllImages() {
  yield takeEvery(LOAD_ALL_IMAGES, workerLoadAllImages);
}

function* workerLoadAllImagesBairro(action) {
  try {
    yield put(requestAllImagesBairro());
    const data = yield call(getListImageUrls, {name_bairro: action.payload});
    yield put(requestAllImagesBairroSuccess(data));
  } catch (error) {
    yield put(requestAllImagesBairroFailed());
  }
}

export function* watchLoadAllImagesBairro() {
  yield takeEvery(LOAD_ALL_IMAGES_BAIRRO, workerLoadAllImagesBairro);
}

function* workerLoadAllImagesSubprefeitura(action) {
  try {
    yield put(requestAllImagesSubprefeitura());
    const data = yield call(getListImageUrls, {name_subprefeitura: action.payload});
    yield put(requestAllImagesSubprefeituraSuccess(data));
  } catch (error) {
    yield put(requestAllImagesSubprefeituraFailed());
  }
}

export function* watchLoadAllImagesSubprefeitura() {
  yield takeEvery(LOAD_ALL_IMAGES_SUBPREFEITURA, workerLoadAllImagesSubprefeitura);
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
    console.log("Data em workerLoadAllPlaces:", data); 
    yield put(requestAllPlacesSuccess(data));
  } catch (error) {
    console.log("Erro em workerLoadAllPlaces:", error); 
    yield put(requestAllPlacesFailed());
  }
}

export function* watchLoadAllPlaces() {
  yield takeEvery(LOAD_ALL_PLACES, workerLoadAllPlaces);
}

function* workerLoadAllCidades() {
  try {
    yield put(requestAllCidades());
    const data = yield call(getAllCidades);
    console.log(data)
    yield put(requestAllCidadesSuccess(data));
  } catch (error) {
    console.error("Erro: "+error);
    yield put(requestAllCidadesFailed());
  }
}

export function* watchLoadAllCidades() {
  yield takeEvery(LOAD_ALL_CIDADES, workerLoadAllCidades);
}

// Municipio
function* workerLoadDadosAgregadosCidade() {
  try {
    yield put(requestDadosAgregadosCidade());
    const data = yield call(getAggregatedData);
    yield put(requestDadosAgregadosCidadeSuccess(data));
  } catch (error) {
    console.error("Erro: "+ error);
    yield put(requestDadosAgregadosCidadeFailed());
  }
}
export function* watchLoadDadosAgregadosCidade() {
  yield takeEvery(LOAD_DADOS_AGREGADOS_CIDADE, workerLoadDadosAgregadosCidade);
}
// destaques
function* workerLoadDestaquesCidade() {
  try {
    yield put(requestDestaquesCidade());
    const data = yield call(getListDestaquesMunicipio);
    yield put(requestDestaquesCidadeSuccess(data));
  } catch (error) {
    console.error("Erro: "+ error);
    yield put(requestDestaquesCidadeFailed());
  }
}
export function* watchLoadDestaquesCidade() {
  yield takeEvery(LOAD_DESTAQUES_CIDADE, workerLoadDestaquesCidade);
}

function* workerLoadDadosAgregadosAbaProgramasCidade() {
  try {
    yield put(requestDadosAgregadosAbaProgramasCidade());
    const data = yield call(getDadosAgregadosAbaProgramas, {id_cidade: "rio_de_janeiro"});
    console.log("dados aba bairro programa cidade: ", data)
    yield put(requestDadosAgregadosAbaProgramasCidadeSuccess(data));
  } catch (error) {
    console.error("Erro: "+ error);
    yield put(requestDadosAgregadosAbaProgramasCidadeFailed());
  }
}
export function* watchLoadDadosAgregadosAbaProgramasCidade() {
  yield takeEvery(LOAD_DADOS_AGREGADOS_ABA_PROGRAMAS_CIDADE, workerLoadDadosAgregadosAbaProgramasCidade);
}

function* workerLoadDadosAgregadosAbaSumarioInfoBasicasCidade() {
  try {
    yield put(requestDadosAgregadosAbaSumarioInfoBasicasCidade());
    const data = yield call(getDadosAgregadosAbaSumarioInfoBasicasCidade);
    console.log("dados aba cidade info basica: ", data)
    yield put(requestDadosAgregadosAbaSumarioInfoBasicasCidadeSuccess(data));
  } catch (error) {
    console.error("Erro: "+ error);
    yield put(requestDadosAgregadosAbaSumarioInfoBasicasCidadeFailed());
  }
}
export function* watchLoadDadosAgregadosAbaSumarioInfoBasicasCidade() {
  yield takeEvery(LOAD_DADOS_AGREGADOS_ABA_SUMARIO_INFO_BASICAS_CIDADE, workerLoadDadosAgregadosAbaSumarioInfoBasicasCidade);
}

function* workerLoadDadosAgregadosAbaSumarioStatusEntregasCidade() {
  try {
    yield put(requestDadosAgregadosAbaSumarioStatusEntregasCidade());
    const data = yield call(getDadosAgregadosAbaSumarioStatusEntregas, {id_cidade: "rio_de_janeiro"});
    console.log("dados aba cidade status entregas: ", data)
    yield put(requestDadosAgregadosAbaSumarioStatusEntregasCidadeSuccess(data));
  } catch (error) {
    console.error("Erro: "+ error);
    yield put(requestDadosAgregadosAbaSumarioStatusEntregasCidadeFailed());
  }
}
export function* watchLoadDadosAgregadosAbaSumarioStatusEntregasCidade() {
  yield takeEvery(LOAD_DADOS_AGREGADOS_ABA_SUMARIO_INFO_BASICAS_CIDADE, workerLoadDadosAgregadosAbaSumarioStatusEntregasCidade);
}

// Subprefeitura
function* workerLoadDadosAgregadosAbaTemaSubprefeitura(action) {
  try {
    yield put(requestDadosAgregadosAbaTemaSubprefeitura());
    const data = yield call(getDadosAgregadosAbaTema, {name_subprefeitura: action.payload});
    console.log("dados aba cidade: ", data)
    yield put(requestDadosAgregadosAbaTemaSubprefeituraSuccess(data));
  } catch (error) {
    console.error("Erro: "+ error);
    yield put(requestDadosAgregadosAbaTemaSubprefeituraFailed());
  }
}
export function* watchLoadDadosAgregadosAbaTemaSubprefeitura() {
  yield takeEvery(LOAD_DADOS_AGREGADOS_ABA_TEMA_SUBPREFEITURA, workerLoadDadosAgregadosAbaTemaSubprefeitura);
}

function* workerLoadDadosAgregadosAbaProgramasSubprefeitura(action) {
  try {
    yield put(requestDadosAgregadosAbaProgramasSubprefeitura());
    const data = yield call(getDadosAgregadosAbaProgramas, {name_subprefeitura: action.payload});
    console.log("dados aba bairro programa subprefeitura: ", data)
    yield put(requestDadosAgregadosAbaProgramasSubprefeituraSuccess(data));
  } catch (error) {
    console.error("Erro: "+ error);
    yield put(requestDadosAgregadosAbaProgramasSubprefeituraFailed());
  }
}
export function* watchLoadDadosAgregadosAbaProgramasSubprefeitura() {
  yield takeEvery(LOAD_DADOS_AGREGADOS_ABA_PROGRAMAS_SUBPREFEITURA, workerLoadDadosAgregadosAbaProgramasSubprefeitura);
}

function* workerLoadDadosAgregadosAbaSumarioInfoBasicasSubprefeitura(action) {
  try {
    yield put(requestDadosAgregadosAbaSumarioInfoBasicasSubprefeitura());
    const data = yield call(getDadosAgregadosAbaSumarioInfoBasicasSubprefeitura, action.payload);
    yield put(requestDadosAgregadosAbaSumarioInfoBasicasSubprefeituraSuccess(data));
  } catch (error) {
    console.error("Erro: "+ error);
    yield put(requestDadosAgregadosAbaSumarioInfoBasicasSubprefeituraFailed());
  }
}
export function* watchLoadDadosAgregadosAbaSumarioInfoBasicasSubprefeitura() {
  yield takeEvery(LOAD_DADOS_AGREGADOS_ABA_SUMARIO_INFO_BASICAS_SUBPREFEITURA, workerLoadDadosAgregadosAbaSumarioInfoBasicasSubprefeitura);
}

function* workerLoadDadosAgregadosAbaSumarioStatusEntregasSubprefeitura(action) {
  try {
    yield put(requestDadosAgregadosAbaSumarioStatusEntregasSubprefeitura());
    const data = yield call(getDadosAgregadosAbaSumarioStatusEntregas, {name_subprefeitura: action.payload});
    console.log("dados aba cidade status entregas: ", data)
    yield put(requestDadosAgregadosAbaSumarioStatusEntregasSubprefeituraSuccess(data));
  } catch (error) {
    console.error("Erro: "+ error);
    yield put(requestDadosAgregadosAbaSumarioStatusEntregasSubprefeituraFailed());
  }
}
export function* watchLoadDadosAgregadosAbaSumarioStatusEntregasSubprefeitura() {
  yield takeEvery(LOAD_DADOS_AGREGADOS_ABA_SUMARIO_INFO_BASICAS_SUBPREFEITURA, workerLoadDadosAgregadosAbaSumarioStatusEntregasSubprefeitura);
}


// Bairro

function* workerLoadDadosAgregadosAbaTemaBairro(action) {
  try {
    yield put(requestDadosAgregadosAbaTemaBairro());
    const data = yield call(getDadosAgregadosAbaTema, {name_bairro: action.payload});
    console.log("dados aba tema bairro: ", data)
    yield put(requestDadosAgregadosAbaTemaBairroSuccess(data));
  } catch (error) {
    console.error("Erro: "+ error);
    yield put(requestDadosAgregadosAbaTemaBairroFailed());
  }
}
export function* watchLoadDadosAgregadosAbaTemaBairro() {
  yield takeEvery(LOAD_DADOS_AGREGADOS_ABA_TEMA_BAIRRO, workerLoadDadosAgregadosAbaTemaBairro);
}

function* workerLoadDadosAgregadosAbaProgramaBairro(action) {
  try {
    yield put(requestDadosAgregadosAbaProgramaBairro());
    const data = yield call(getDadosAgregadosAbaProgramas, {name_bairro: action.payload});
    console.log("dados aba bairro programa: ", data)
    yield put(requestDadosAgregadosAbaProgramaBairroSuccess(data));
  } catch (error) {
    console.error("Erro: "+ error);
    yield put(requestDadosAgregadosAbaProgramaBairroFailed());
  }
}
export function* watchLoadDadosAgregadosAbaProgramaBairro() {
  yield takeEvery(LOAD_DADOS_AGREGADOS_ABA_PROGRAMA_BAIRRO, workerLoadDadosAgregadosAbaProgramaBairro);
}

function* workerLoadDadosAgregadosAbaSumarioStatusEntregasBairro(action) {
  try {
    yield put(requestDadosAgregadosAbaSumarioStatusEntregasBairro());
    const data = yield call(getDadosAgregadosAbaSumarioStatusEntregas, {name_bairro: action.payload});
    console.log("dados aba bairro status entregas: ", data)
    yield put(requestDadosAgregadosAbaSumarioStatusEntregasBairroSuccess(data));
  } catch (error) {
    console.error("Erro: "+ error);
    yield put(requestDadosAgregadosAbaSumarioStatusEntregasBairroFailed());
  }
}
export function* watchLoadDadosAgregadosAbaSumarioStatusEntregaBairro() {
  yield takeEvery(LOAD_DADOS_AGREGADOS_ABA_SUMARIO_STATUS_ENTREGAS_BAIRRO, workerLoadDadosAgregadosAbaSumarioStatusEntregasBairro);
}


function* workerLoadBairroData(action) {
  try {
    yield put(requestBairroData());
    const data = yield call(getBairroInfo, toSnakeCase(action.payload));
    console.log("action.payload: ", data)
    yield put(requestBairroDataSuccess(data));
  } catch (error) {
    yield put(requestBairroDataFailed());
  }
}

export function* watchLoadBairroData() {
  yield takeEvery(LOAD_BAIRRO_DATA, workerLoadBairroData);
}


function* workerLoadSubprefeituraData(action) {
  try {
    yield put(requestSubprefeituraData());
    const data = yield call(getSubprefeituraInfo, toSnakeCase(action.payload));
    console.log("agora action.payload: ", data)
    yield put(requestSubprefeituraDataSuccess(data));
  } catch (error) {
    yield put(requestSubprefeituraDataFailed());
  }
}

export function* watchLoadSubprefeituraData() {
  yield takeEvery(LOAD_SUBPREFEITURA_DATA, workerLoadSubprefeituraData);
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
    fork(watchLoadAllImagesBairro),
    fork(watchLoadAllImagesSubprefeitura),
    fork(watchLoadData),
    fork(watchLoadPlaces),
    fork(watchLoadAllPlaces),
    fork(watchLoadAllCidades),
    fork(watchLoadDadosAgregadosCidade),
    fork(watchLoadDestaquesCidade),
    fork(watchLoadDadosAgregadosAbaProgramasCidade),
    fork(watchLoadDadosAgregadosAbaSumarioInfoBasicasCidade),
    fork(watchLoadDadosAgregadosAbaSumarioStatusEntregasCidade),
    fork(watchLoadDadosAgregadosAbaTemaSubprefeitura),
    fork(watchLoadDadosAgregadosAbaProgramasSubprefeitura),
    fork(watchLoadDadosAgregadosAbaSumarioInfoBasicasSubprefeitura),
    fork(watchLoadDadosAgregadosAbaSumarioStatusEntregasSubprefeitura),
    fork(watchLoadDadosAgregadosAbaTemaBairro),
    fork(watchLoadDadosAgregadosAbaProgramaBairro),
    fork(watchLoadDadosAgregadosAbaSumarioStatusEntregaBairro),
    fork(watchLoadBairroData),
    fork(watchLoadSubprefeituraData),
    fork(watchLogin),
    fork(watchLogOut),
  ]);
}
