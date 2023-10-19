import {
  REQUEST_ALL_CIDADES,
  REQUEST_ALL_CIDADES_FAILED,
  REQUEST_ALL_CIDADES_SUCCESS,
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
  }
  return state;
};

export default cidadesReducer;
