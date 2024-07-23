import { REQUEST_PROGRAMA_DATA, REQUEST_PROGRAMA_DATA_FAILED, REQUEST_PROGRAMA_DATA_SUCCESS, SET_FILTROS_OPTIONS, SET_PROGRAMA_DATA, SET_PROGRAMA_DATA_CAMERAS, SET_PROGRAMA_DATA_SIRENES, SET_PROGRAMA_DATA_ESTACOES_ALERTA_RIO, SET_REALIZACOES_PROGRAMA, SET_TEMA_DATA } from "./actions";
import { SET_TEMA } from "./actions";
import { SET_PROGRAMA } from "./actions";
import { SET_REALIZACAO } from "./actions";
import { SET_BAIRRO } from "./actions";
import { SET_SUBPREFEITURA } from "./actions";

const defaultState = {
  filtros: [],
  tema: null,
  programa: null,
  realizacao: null,
  bairro: null,
  subprefeitura: null,
  realizacoesPrograma: [],
  programaDataSirenes: [],
  programaDataCameras: [],
  programaDataEstacoesAlertaRio: [],
};

export const filtrosReducer = (state = defaultState, action) => {
  switch (action.type) {
    case SET_FILTROS_OPTIONS:
      return {
        ...state,
        filtros: [action.payload],
      };
    case SET_TEMA:
      return {
        ...state,
        tema: action.payload,
      };
    case SET_TEMA_DATA:
      return {
        ...state,
        temaData: action.payload,
      };
    // PROGRAMA
    case SET_PROGRAMA:
      return {
        ...state,
        programa: action.payload,
      };
    case SET_PROGRAMA_DATA:
      return {
        ...state,
        programaData: action.payload,
      };
    case SET_PROGRAMA_DATA_SIRENES:
      return {
        ...state,
        programaDataSirenes: action.payload,
      };
    case SET_PROGRAMA_DATA_CAMERAS:
      return {
        ...state,
        programaDataCameras: action.payload,
      };
    case SET_PROGRAMA_DATA_ESTACOES_ALERTA_RIO:
      return {
        ...state,
        programaDataEstacoesAlertaRio: action.payload,
      };
    case REQUEST_PROGRAMA_DATA:
      return {
        ...state,
        programaData: null,
        loading: true,
        error: false,
      };
    case REQUEST_PROGRAMA_DATA_SUCCESS:
      return {
        ...state,
        programaData: action.payload,
        loading: false,
        error: false,
      };
    case REQUEST_PROGRAMA_DATA_FAILED:
      return {
        ...state,
        programaData: null,
        loading: false,
        error: true,
      };
    //
    case SET_REALIZACAO:
      return {
        ...state,
        realizacao: action.payload,
      };
    case SET_BAIRRO:
      return {
        ...state,
        bairro: action.payload,
      };
    case SET_SUBPREFEITURA:
      return {
        ...state,
        subprefeitura: action.payload,
      };
    case SET_REALIZACOES_PROGRAMA:
      return {
        ...state,
        realizacoesPrograma: action.payload,
      };
  }
  return state;
};
