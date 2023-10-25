export const LOAD_BAIRRO_DATA = "LOAD_BAIRRO_DATA";
export const REQUEST_BAIRRO_DATA_SUCCESS = "REQUEST_BAIRRO_DATA_SUCCESS";
export const REQUEST_BAIRRO_DATA_FAILED = "REQUEST_BAIRRO_DATA_FAILED";
export const REQUEST_BAIRRO_DATA = "REQUEST_BAIRRO_DATA";
export const SET_BAIRRO_CONTENT = "SET_BAIRRO_CONTENT"
export const SET_BAIRRO_CONTENT_SNAPSHOT = "SET_BAIRRO_CONTENT_SNAPSHOT"


export const requestBairroDataSuccess = (dataFromServer) => {
  return {
    type: REQUEST_BAIRRO_DATA_SUCCESS,
    payload: dataFromServer,
  };
};

export const requestBairroDataFailed = () => {
  return {
    type: REQUEST_BAIRRO_DATA_FAILED,
  };
};

export const requestBairroData = () => {
  return {
    type: REQUEST_BAIRRO_DATA,
  };
};

export const loadBairroData = (data) => {
  return {
    type: LOAD_BAIRRO_DATA,
    payload: data,
  };
};

export const setBairroContent = (data) => {
  return {
    type: SET_BAIRRO_CONTENT,
    payload: data,
  };
};

export const setBairroContentSnapshot = (data) => {
  return {
    type: SET_BAIRRO_CONTENT_SNAPSHOT,
    payload: data,
  };
};


