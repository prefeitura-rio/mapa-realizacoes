export const LOAD_SUBPREFEITURA_DATA = "LOAD_SUBPREFEITURA_DATA";
export const REQUEST_SUBPREFEITURA_DATA_SUCCESS = "REQUEST_SUBPREFEITURA_DATA_SUCCESS";
export const REQUEST_SUBPREFEITURA_DATA_FAILED = "REQUEST_SUBPREFEITURA_DATA_FAILED";
export const REQUEST_SUBPREFEITURA_DATA = "REQUEST_SUBPREFEITURA_DATA";
export const SET_SUBPREFEITURA_CONTENT = "SET_SUBPREFEITURA_CONTENT"
export const SET_SUBPREFEITURA_CONTENT_SNAPSHOT = "SET_SUBPREFEITURA_CONTENT_SNAPSHOT"


export const requestSubprefeituraDataSuccess = (dataFromServer) => {
  return {
    type: REQUEST_SUBPREFEITURA_DATA_SUCCESS,
    payload: dataFromServer,
  };
};

export const requestSubprefeituraDataFailed = () => {
  return {
    type: REQUEST_SUBPREFEITURA_DATA_FAILED,
  };
};

export const requestSubprefeituraData = () => {
  return {
    type: REQUEST_SUBPREFEITURA_DATA,
  };
};

export const loadSubprefeituraData = (data) => {
  return {
    type: LOAD_SUBPREFEITURA_DATA,
    payload: data,
  };
};

export const setSubprefeituraContent = (data) => {
  return {
    type: SET_SUBPREFEITURA_CONTENT,
    payload: data,
  };
};

export const setSubprefeituraContentSnapshot = (data) => {
  return {
    type: SET_SUBPREFEITURA_CONTENT_SNAPSHOT,
    payload: data,
  };
};

export const SET_SUBPREFEITURA_DATA = "SET_SUBPREFEITURA_DATA";

export const setSubprefeituraData = (data) => {
  return {
    type: SET_SUBPREFEITURA_DATA,
    payload: data,
  };
};




