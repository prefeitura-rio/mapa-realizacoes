export const LOAD_IMAGES = "LOAD_IMAGES";
export const REQUEST_IMAGES_SUCCESS = "REQUEST_IMAGES_SUCCESS";
export const REQUEST_IMAGES_FAILED = "REQUEST_IMAGES_FAILED";
export const REQUEST_IMAGES = "REQUEST_IMAGES";

export const requestImagesSuccess = (dataFromServer) => {
  return {
    type: REQUEST_IMAGES_SUCCESS,
    payload: dataFromServer,
  };
};

export const requesImagesFailed = () => {
  return {
    type: REQUEST_IMAGES_FAILED,
  };
};

export const requestImages = () => {
  return {
    type: REQUEST_IMAGES,
  };
};

export const loadImages = (data) => {
  return {
    type: LOAD_IMAGES,
    payload: data,
  };
};

export const LOAD_ALL_IMAGES = "LOAD_ALL_IMAGES";
export const REQUEST_ALL_IMAGES_SUCCESS = "REQUEST_ALL_IMAGES_SUCCESS";
export const REQUEST_ALL_IMAGES_FAILED = "REQUEST_ALL_IMAGES_FAILED";
export const REQUEST_ALL_IMAGES = "REQUEST_ALL_IMAGES";
export const LOAD_ALL_IMAGES_BAIRRO = "LOAD_ALL_IMAGES_BAIRRO";
export const REQUEST_ALL_IMAGES_BAIRRO_SUCCESS = "REQUEST_ALL_IMAGES_BAIRRO_SUCCESS";
export const REQUEST_ALL_IMAGES_BAIRRO_FAILED = "REQUEST_ALL_IMAGES_BAIRRO_FAILED";
export const REQUEST_ALL_IMAGES_BAIRRO = "REQUEST_ALL_IMAGES_BAIRRO";
export const LOAD_ALL_IMAGES_SUBPREFEITURA = "LOAD_ALL_IMAGES_SUBPREFEITURA";
export const REQUEST_ALL_IMAGES_SUBPREFEITURA_SUCCESS = "REQUEST_ALL_IMAGES_SUBPREFEITURA_SUCCESS";
export const REQUEST_ALL_IMAGES_SUBPREFEITURA_FAILED = "REQUEST_ALL_IMAGES_SUBPREFEITURA_FAILED";
export const REQUEST_ALL_IMAGES_SUBPREFEITURA = "REQUEST_ALL_IMAGES_SUBPREFEITURA";

export const requestAllImagesSuccess = (dataFromServer) => {
  return {
    type: REQUEST_ALL_IMAGES_SUCCESS,
    payload: dataFromServer,
  };
};

export const requestAllImagesFailed = () => {
  return {
    type: REQUEST_ALL_IMAGES_FAILED,
  };
};

export const requestAllImages = () => {
  return {
    type: REQUEST_ALL_IMAGES,
  };
};

export const loadAllImages = (data) => {
  return {
    type: LOAD_ALL_IMAGES,
    payload: data,
  };
};

export const requestAllImagesBairroSuccess = (dataFromServer) => {
  return {
    type: REQUEST_ALL_IMAGES_BAIRRO_SUCCESS,
    payload: dataFromServer,
  };
};

export const requestAllImagesBairroFailed = () => {
  return {
    type: REQUEST_ALL_IMAGES_BAIRRO_FAILED,
  };
};

export const requestAllImagesBairro = () => {
  return {
    type: REQUEST_ALL_IMAGES_BAIRRO,
  };
};

export const loadAllImagesBairro = (data) => {
  return {
    type: LOAD_ALL_IMAGES_BAIRRO,
    payload: data,
  };
};
export const requestAllImagesSubprefeituraSuccess = (dataFromServer) => {
  return {
    type: REQUEST_ALL_IMAGES_SUBPREFEITURA_SUCCESS,
    payload: dataFromServer,
  };
};

export const requestAllImagesSubprefeituraFailed = () => {
  return {
    type: REQUEST_ALL_IMAGES_SUBPREFEITURA_FAILED,
  };
};

export const requestAllImagesSubprefeitura = () => {
  return {
    type: REQUEST_ALL_IMAGES_SUBPREFEITURA,
  };
};

export const loadAllImagesSubprefeitura = (data) => {
  return {
    type: LOAD_ALL_IMAGES_SUBPREFEITURA,
    payload: data,
  };
};

export const SET_IMAGES_TYPE = "SET_IMAGES_TYPE";
export const TYPE_ALL = "TYPE_ALL";
export const TYPE_PLACE = "TYPE_PLACE";
export const TYPE_ALL_PHOTOS_MUNICIPIO = "TYPE_ALL_PHOTOS_MUNICIPIO";
export const TYPE_ALL_PHOTOS_BAIRRO = "TYPE_ALL_PHOTOS_BAIRRO";
export const TYPE_ALL_PHOTOS_SUBPREFEITURA = "TYPE_ALL_PHOTOS_SUBPREFEITURA";

export const setImagesType = (data) => {
  return {
    type: SET_IMAGES_TYPE,
    payload: data,
  };
};

export const SET_CURRENT_IMG = "SET_CURRENT_IMG";

export const setCurrentImg = (data) => {
  return {
    type: SET_CURRENT_IMG,
    payload: data,
  };
};
