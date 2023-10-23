export const LOAD_ALL_CIDADES = "LOAD_ALL_CIDADES";

export const loadAllCidades = () => {
  return {
    type: LOAD_ALL_CIDADES,
  };
};

export const REQUEST_ALL_CIDADES_SUCCESS = "REQUEST_ALL_CIDADES_SUCCESS";

export const requestAllCidadesSuccess = (dataFromServer) => {
  return {
    type: REQUEST_ALL_CIDADES_SUCCESS,
    payload: dataFromServer,
  };
};
export const REQUEST_ALL_CIDADES_FAILED = "REQUEST_ALL_CIDADES_FAILED";

export const requestAllCidadesFailed = () => {
  return {
    type: REQUEST_ALL_CIDADES_FAILED,
  };
};

export const REQUEST_ALL_CIDADES = "REQUEST_ALL_CIDADES";

export const requestAllCidades = () => {
  return {
    type: REQUEST_ALL_CIDADES,
  };
};