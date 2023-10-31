import { REQUEST_DADOS_AGREGADOS_ABA_TEMA_CIDADE_FAILED } from "../cidade/actions";
import {
  REQUEST_BAIRRO_DATA,
  REQUEST_BAIRRO_DATA_FAILED,
  REQUEST_BAIRRO_DATA_SUCCESS,
  REQUEST_DADOS_AGREGADOS_ABA_SUMARIO_STATUS_ENTREGAS_BAIRRO,
  REQUEST_DADOS_AGREGADOS_ABA_SUMARIO_STATUS_ENTREGAS_BAIRRO_FAILED,
  REQUEST_DADOS_AGREGADOS_ABA_SUMARIO_STATUS_ENTREGAS_BAIRRO_SUCCESS,
  REQUEST_DADOS_AGREGADOS_ABA_TEMA_BAIRRO,
  REQUEST_DADOS_AGREGADOS_ABA_TEMA_BAIRRO_SUCCESS,
  SET_BAIRRO_CONTENT,
  SET_BAIRRO_CONTENT_SNAPSHOT,
  SET_BAIRRO_DATA
} from "./actions";

const defaultState = {
  content: null,
  loading: false,
  error: false,
  contentSnapshot: null,
  descriptionData: null,
};

const bairrosReducer = (state = defaultState, action) => {
  switch (action.type) {
    case REQUEST_BAIRRO_DATA:
      return {
        ...state,
        content: null,
        contentSnapshot: null,
        loading: true,
        error: false,
      };
    case REQUEST_BAIRRO_DATA_SUCCESS:
      return {
        ...state,
        content: action.payload,
        contentSnapshot: JSON.parse(JSON.stringify(action.payload)),
        loading: false,
        error: false,
      };
    case REQUEST_BAIRRO_DATA_FAILED:
      return {
        ...state,
        content: null,
        contentSnapshot: null,
        loading: false,
        error: true,
      };
    case SET_BAIRRO_CONTENT:
      return {
        ...state,
        content: action.payload,
      };

    case SET_BAIRRO_CONTENT_SNAPSHOT:
      return {
        ...state,
        contentSnapshot: action.payload,
      };
    case SET_BAIRRO_DATA:
      return {
        ...state,
        descriptionData: action.payload,
      };
    case REQUEST_DADOS_AGREGADOS_ABA_SUMARIO_STATUS_ENTREGAS_BAIRRO:
      return {
        ...state,
        dadosAgregadosAbaSumarioStatusEntregasBairro: null,
        loading: true,
        error: false,
      };
    case REQUEST_DADOS_AGREGADOS_ABA_SUMARIO_STATUS_ENTREGAS_BAIRRO_SUCCESS:
      return {
        ...state,
        dadosAgregadosAbaSumarioStatusEntregasBairro: action.payload,
        loading: false,
        error: false,
      };
    case REQUEST_DADOS_AGREGADOS_ABA_SUMARIO_STATUS_ENTREGAS_BAIRRO_FAILED:
      return {
        ...state,
        dadosAgregadosAbaSumarioStatusEntregasBairro: null,
        loading: false,
        error: true,
      };
      case REQUEST_DADOS_AGREGADOS_ABA_TEMA_BAIRRO:
        return {
          ...state,
          dadosAgregadosAbaTemaBairro: null,
          loading: true,
          error: false,
        };
      case REQUEST_DADOS_AGREGADOS_ABA_TEMA_BAIRRO_SUCCESS:
        return {
          ...state,
          dadosAgregadosAbaTemaBairro: action.payload,
          loading: false,
          error: false,
        };
      case REQUEST_DADOS_AGREGADOS_ABA_TEMA_CIDADE_FAILED:
        return {
          ...state,
          dadosAgregadosAbaTemaBairro: null,
          loading: false,
          error: true,
        };

  }
  return state;
};

export default bairrosReducer;
