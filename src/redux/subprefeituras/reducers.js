import {
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
      
  }
  return state;
};

export default subprefeiturasReducer;
