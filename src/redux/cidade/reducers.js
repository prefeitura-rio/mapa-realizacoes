import {
  REQUEST_ALL_CIDADES,
  REQUEST_ALL_CIDADES_FAILED,
  REQUEST_ALL_CIDADES_SUCCESS,
  REQUEST_DADOS_AGREGAGOS_ABA_PROGRAMAS_CIDADE,
  REQUEST_DADOS_AGREGAGOS_ABA_PROGRAMAS_CIDADE_FAILED,
  REQUEST_DADOS_AGREGAGOS_ABA_PROGRAMAS_CIDADE_SUCCESS,
  REQUEST_DADOS_AGREGAGOS_ABA_SUMARIO_INFO_BASICAS,
  REQUEST_DADOS_AGREGAGOS_ABA_SUMARIO_INFO_BASICAS_FAILED,
  REQUEST_DADOS_AGREGAGOS_ABA_SUMARIO_INFO_BASICAS_SUCCESS,
  REQUEST_DADOS_AGREGAGOS_ABA_SUMARIO_STATUS_ENTREGAS,
  REQUEST_DADOS_AGREGAGOS_ABA_SUMARIO_STATUS_ENTREGAS_FAILED,
  REQUEST_DADOS_AGREGAGOS_ABA_SUMARIO_STATUS_ENTREGAS_SUCCESS,
  REQUEST_DADOS_AGREGAGOS_ABA_TEMA_CIDADE,
  REQUEST_DADOS_AGREGAGOS_ABA_TEMA_CIDADE_FAILED,
  REQUEST_DADOS_AGREGAGOS_ABA_TEMA_CIDADE_SUCCESS,
} from "./actions";

const defaultState = {
  all: null,
  loading: false,
  error: false,
};

const cidadesReducer = (state = defaultState, action) => {
  switch (action.type) {
    case REQUEST_ALL_CIDADES:
      return {
        ...state,
        all: null,
        loading: true,
        error: false,
      };
    case REQUEST_ALL_CIDADES_SUCCESS:
      return {
        ...state,
        all: action.payload,
        loading: false,
        error: false,
      };
    case REQUEST_ALL_CIDADES_FAILED:
      return {
        ...state,
        all: null,
        loading: false,
        error: true,
      };

    case REQUEST_DADOS_AGREGAGOS_ABA_TEMA_CIDADE:
      return {
        ...state,
        dadosAgregadosAbaTemaCidade: null,
        loading: true,
        error: false,
      };
    case REQUEST_DADOS_AGREGAGOS_ABA_TEMA_CIDADE_SUCCESS:
      return {
        ...state,
        dadosAgregadosAbaTemaCidade: action.payload,
        loading: false,
        error: false,
      };
    case REQUEST_DADOS_AGREGAGOS_ABA_TEMA_CIDADE_FAILED:
      return {
        ...state,
        dadosAgregadosAbaTemaCidade: null,
        loading: false,
        error: true,
      };
    case REQUEST_DADOS_AGREGAGOS_ABA_PROGRAMAS_CIDADE:
      return {
        ...state,
        dadosAgregadosAbaProgramasCidade: null,
        loading: true,
        error: false,
      };
    case REQUEST_DADOS_AGREGAGOS_ABA_PROGRAMAS_CIDADE_SUCCESS:
      return {
        ...state,
        dadosAgregadosAbaProgramasCidade: action.payload,
        loading: false,
        error: false,
      };
    case REQUEST_DADOS_AGREGAGOS_ABA_PROGRAMAS_CIDADE_FAILED:
      return {
        ...state,
        dadosAgregadosAbaProgramasCidade: null,
        loading: false,
        error: true,
      };

    case REQUEST_DADOS_AGREGAGOS_ABA_SUMARIO_INFO_BASICAS:
      return {
        ...state,
        dadosAgregadosAbaSumarioInfoBasicas: null,
        loading: true,
        error: false,
      };
    case REQUEST_DADOS_AGREGAGOS_ABA_SUMARIO_INFO_BASICAS_SUCCESS:
      return {
        ...state,
        dadosAgregadosAbaSumarioInfoBasicas: action.payload,
        loading: false,
        error: false,
      };
    case REQUEST_DADOS_AGREGAGOS_ABA_SUMARIO_INFO_BASICAS_FAILED:
      return {
        ...state,
        dadosAgregadosAbaSumarioInfoBasicas: null,
        loading: false,
        error: true,
      };
      
    case REQUEST_DADOS_AGREGAGOS_ABA_SUMARIO_STATUS_ENTREGAS:
      return {
        ...state,
        dadosAgregadosAbaSumarioStatusEntregas: null,
        loading: true,
        error: false,
      };
    case REQUEST_DADOS_AGREGAGOS_ABA_SUMARIO_STATUS_ENTREGAS_SUCCESS:
      return {
        ...state,
        dadosAgregadosAbaSumarioStatusEntregas: action.payload,
        loading: false,
        error: false,
      };
    case REQUEST_DADOS_AGREGAGOS_ABA_SUMARIO_STATUS_ENTREGAS_FAILED:
      return {
        ...state,
        dadosAgregadosAbaSumarioStatusEntregas: null,
        loading: false,
        error: true,
      };
  }
  return state;
};

export default cidadesReducer;
