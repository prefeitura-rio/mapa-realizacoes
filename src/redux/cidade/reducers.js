import {
  REQUEST_ALL_CIDADES,
  REQUEST_ALL_CIDADES_FAILED,
  REQUEST_ALL_CIDADES_SUCCESS,
  REQUEST_DADOS_AGREGADOS_ABA_PROGRAMAS_CIDADE,
  REQUEST_DADOS_AGREGADOS_ABA_PROGRAMAS_CIDADE_FAILED,
  REQUEST_DADOS_AGREGADOS_ABA_PROGRAMAS_CIDADE_SUCCESS,
  REQUEST_DADOS_AGREGADOS_ABA_SUMARIO_INFO_BASICAS_CIDADE,
  REQUEST_DADOS_AGREGADOS_ABA_SUMARIO_INFO_BASICAS_CIDADE_FAILED,
  REQUEST_DADOS_AGREGADOS_ABA_SUMARIO_INFO_BASICAS_CIDADE_SUCCESS,
  REQUEST_DADOS_AGREGADOS_ABA_SUMARIO_STATUS_ENTREGAS_CIDADE,
  REQUEST_DADOS_AGREGADOS_ABA_SUMARIO_STATUS_ENTREGAS_CIDADE_FAILED,
  REQUEST_DADOS_AGREGADOS_ABA_SUMARIO_STATUS_ENTREGAS_CIDADE_SUCCESS,
  REQUEST_DADOS_AGREGADOS_CIDADE,
  REQUEST_DADOS_AGREGADOS_CIDADE_FAILED,
  REQUEST_DADOS_AGREGADOS_CIDADE_SUCCESS,
  REQUEST_DESTAQUES_CIDADE,
  REQUEST_DESTAQUES_CIDADE_FAILED,
  REQUEST_DESTAQUES_CIDADE_SUCCESS,
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

    case REQUEST_DADOS_AGREGADOS_CIDADE:
      return {
        ...state,
        dadosAgregadosCidade: null,
        loading: true,
        error: false,
      };
    case REQUEST_DADOS_AGREGADOS_CIDADE_SUCCESS:
      return {
        ...state,
        dadosAgregadosCidade: action.payload,
        loading: false,
        error: false,
      };
    case REQUEST_DADOS_AGREGADOS_CIDADE_FAILED:
      return {
        ...state,
        dadosAgregadosCidade: null,
        loading: false,
        error: true,
      };

    case REQUEST_DESTAQUES_CIDADE:
      return {
        ...state,
        dadosDestaquesCidade: null,
        loading: true,
        error: false,
      };
    case REQUEST_DESTAQUES_CIDADE_SUCCESS:
      return {
        ...state,
        dadosDestaquesCidade: action.payload,
        loading: false,
        error: false,
      };
    case REQUEST_DESTAQUES_CIDADE_FAILED:
      return {
        ...state,
        dadosDestaquesCidade: null,
        loading: false,
        error: true,
      };
    case REQUEST_DADOS_AGREGADOS_ABA_PROGRAMAS_CIDADE:
      return {
        ...state,
        dadosAgregadosAbaProgramasCidade: null,
        loading: true,
        error: false,
      };
    case REQUEST_DADOS_AGREGADOS_ABA_PROGRAMAS_CIDADE_SUCCESS:
      return {
        ...state,
        dadosAgregadosAbaProgramasCidade: action.payload,
        loading: false,
        error: false,
      };
    case REQUEST_DADOS_AGREGADOS_ABA_PROGRAMAS_CIDADE_FAILED:
      return {
        ...state,
        dadosAgregadosAbaProgramasCidade: null,
        loading: false,
        error: true,
      };

    case REQUEST_DADOS_AGREGADOS_ABA_SUMARIO_INFO_BASICAS_CIDADE:
      return {
        ...state,
        dadosAgregadosAbaSumarioInfoBasicasCidade: null,
        loading: true,
        error: false,
      };
    case REQUEST_DADOS_AGREGADOS_ABA_SUMARIO_INFO_BASICAS_CIDADE_SUCCESS:
      return {
        ...state,
        dadosAgregadosAbaSumarioInfoBasicasCidade: action.payload,
        loading: false,
        error: false,
      };
    case REQUEST_DADOS_AGREGADOS_ABA_SUMARIO_INFO_BASICAS_CIDADE_FAILED:
      return {
        ...state,
        dadosAgregadosAbaSumarioInfoBasicasCidade: null,
        loading: false,
        error: true,
      };
      
    case REQUEST_DADOS_AGREGADOS_ABA_SUMARIO_STATUS_ENTREGAS_CIDADE:
      return {
        ...state,
        dadosAgregadosAbaSumarioStatusEntregasCidade: null,
        loading: true,
        error: false,
      };
    case REQUEST_DADOS_AGREGADOS_ABA_SUMARIO_STATUS_ENTREGAS_CIDADE_SUCCESS:
      return {
        ...state,
        dadosAgregadosAbaSumarioStatusEntregasCidade: action.payload,
        loading: false,
        error: false,
      };
    case REQUEST_DADOS_AGREGADOS_ABA_SUMARIO_STATUS_ENTREGAS_CIDADE_FAILED:
      return {
        ...state,
        dadosAgregadosAbaSumarioStatusEntregasCidade: null,
        loading: false,
        error: true,
      };
  }
  return state;
};

export default cidadesReducer;
