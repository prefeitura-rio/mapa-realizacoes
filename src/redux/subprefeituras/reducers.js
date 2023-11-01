import {
  REQUEST_DADOS_AGREGADOS_ABA_PROGRAMAS_SUBPREFEITURA,
  REQUEST_DADOS_AGREGADOS_ABA_PROGRAMAS_SUBPREFEITURA_FAILED,
  REQUEST_DADOS_AGREGADOS_ABA_PROGRAMAS_SUBPREFEITURA_SUCCESS,
  REQUEST_DADOS_AGREGADOS_ABA_SUMARIO_INFO_BASICAS_SUBPREFEITURA,
  REQUEST_DADOS_AGREGADOS_ABA_SUMARIO_INFO_BASICAS_SUBPREFEITURA_FAILED,
  REQUEST_DADOS_AGREGADOS_ABA_SUMARIO_INFO_BASICAS_SUBPREFEITURA_SUCCESS,
  REQUEST_DADOS_AGREGADOS_ABA_SUMARIO_STATUS_ENTREGAS_SUBPREFEITURA,
  REQUEST_DADOS_AGREGADOS_ABA_SUMARIO_STATUS_ENTREGAS_SUBPREFEITURA_FAILED,
  REQUEST_DADOS_AGREGADOS_ABA_SUMARIO_STATUS_ENTREGAS_SUBPREFEITURA_SUCCESS,
  REQUEST_DADOS_AGREGADOS_ABA_TEMA_SUBPREFEITURA,
  REQUEST_DADOS_AGREGADOS_ABA_TEMA_SUBPREFEITURA_FAILED,
  REQUEST_DADOS_AGREGADOS_ABA_TEMA_SUBPREFEITURA_SUCCESS,
  REQUEST_SUBPREFEITURA_DATA,
  REQUEST_SUBPREFEITURA_DATA_FAILED,
  REQUEST_SUBPREFEITURA_DATA_SUCCESS,
  SET_SUBPREFEITURA_CONTENT,
  SET_SUBPREFEITURA_CONTENT_SNAPSHOT,
  SET_SUBPREFEITURA_DATA
} from "./actions";

const defaultState = {
  content: null,
  loading: false,
  error: false,
  contentSnapshot: null,
  descriptionData: null,
};

const subprefeiturasReducer = (state = defaultState, action) => {
  switch (action.type) {
    case REQUEST_SUBPREFEITURA_DATA:
      return {
        ...state,
        content: null,
        contentSnapshot: null,
        loading: true,
        error: false,
      };
    case REQUEST_SUBPREFEITURA_DATA_SUCCESS:
      return {
        ...state,
        content: action.payload,
        contentSnapshot: JSON.parse(JSON.stringify(action.payload)),
        loading: false,
        error: false,
      };
    case REQUEST_SUBPREFEITURA_DATA_FAILED:
      return {
        ...state,
        content: null,
        contentSnapshot: null,
        loading: false,
        error: true,
      };
    case SET_SUBPREFEITURA_CONTENT:
      return {
        ...state,
        content: action.payload,
      };

    case SET_SUBPREFEITURA_CONTENT_SNAPSHOT:
      return {
        ...state,
        contentSnapshot: action.payload,
      };
      case SET_SUBPREFEITURA_DATA:
        return {
          ...state,
          descriptionData: action.payload,
        };
        case REQUEST_DADOS_AGREGADOS_ABA_TEMA_SUBPREFEITURA:
          return {
            ...state,
            dadosAgregadosAbaTemaSubprefeitura: null,
            loading: true,
            error: false,
          };
        case REQUEST_DADOS_AGREGADOS_ABA_TEMA_SUBPREFEITURA_SUCCESS:
          return {
            ...state,
            dadosAgregadosAbaTemaSubprefeitura: action.payload,
            loading: false,
            error: false,
          };
        case REQUEST_DADOS_AGREGADOS_ABA_TEMA_SUBPREFEITURA_FAILED:
          return {
            ...state,
            dadosAgregadosAbaTemaSubprefeitura: null,
            loading: false,
            error: true,
          };
        case REQUEST_DADOS_AGREGADOS_ABA_PROGRAMAS_SUBPREFEITURA:
          return {
            ...state,
            dadosAgregadosAbaProgramasSubprefeitura: null,
            loading: true,
            error: false,
          };
        case REQUEST_DADOS_AGREGADOS_ABA_PROGRAMAS_SUBPREFEITURA_SUCCESS:
          return {
            ...state,
            dadosAgregadosAbaProgramasSubprefeitura: action.payload,
            loading: false,
            error: false,
          };
        case REQUEST_DADOS_AGREGADOS_ABA_PROGRAMAS_SUBPREFEITURA_FAILED:
          return {
            ...state,
            dadosAgregadosAbaProgramasSubprefeitura: null,
            loading: false,
            error: true,
          };
    
        case REQUEST_DADOS_AGREGADOS_ABA_SUMARIO_INFO_BASICAS_SUBPREFEITURA:
          return {
            ...state,
            dadosAgregadosAbaSumarioInfoBasicasSubprefeitura: null,
            loading: true,
            error: false,
          };
        case REQUEST_DADOS_AGREGADOS_ABA_SUMARIO_INFO_BASICAS_SUBPREFEITURA_SUCCESS:
          return {
            ...state,
            dadosAgregadosAbaSumarioInfoBasicasSubprefeitura: action.payload,
            loading: false,
            error: false,
          };
        case REQUEST_DADOS_AGREGADOS_ABA_SUMARIO_INFO_BASICAS_SUBPREFEITURA_FAILED:
          return {
            ...state,
            dadosAgregadosAbaSumarioInfoBasicasSubprefeitura: null,
            loading: false,
            error: true,
          };
          
        case REQUEST_DADOS_AGREGADOS_ABA_SUMARIO_STATUS_ENTREGAS_SUBPREFEITURA:
          return {
            ...state,
            dadosAgregadosAbaSumarioStatusEntregasSubprefeitura: null,
            loading: true,
            error: false,
          };
        case REQUEST_DADOS_AGREGADOS_ABA_SUMARIO_STATUS_ENTREGAS_SUBPREFEITURA_SUCCESS:
          return {
            ...state,
            dadosAgregadosAbaSumarioStatusEntregasSubprefeitura: action.payload,
            loading: false,
            error: false,
          };
        case REQUEST_DADOS_AGREGADOS_ABA_SUMARIO_STATUS_ENTREGAS_SUBPREFEITURA_FAILED:
          return {
            ...state,
            dadosAgregadosAbaSumarioStatusEntregasSubprefeitura: null,
            loading: false,
            error: true,
          };
      
  }
  return state;
};

export default subprefeiturasReducer;
