import {
  REQUEST_BAIRRO_DATA,
  REQUEST_BAIRRO_DATA_FAILED,
  REQUEST_BAIRRO_DATA_SUCCESS,
  SET_BAIRRO_CONTENT,
  SET_BAIRRO_CONTENT_SNAPSHOT
} from "./actions";

const defaultState = {
  content: null,
  loading: false,
  error: false,
  contentSnapshot: null,
  descriptionData: null,
};

const placeReducer = (state = defaultState, action) => {
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
  }
  return state;
};

export default placeReducer;