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

export const SET_BAIRRO_DATA = "SET_BAIRRO_DATA";

export const setBairroData = (data) => {
  return {
    type: SET_BAIRRO_DATA,
    payload: data,
  };
};

// Dados agregados aba tema BAIRRO
export const LOAD_DADOS_AGREGADOS_ABA_TEMA_BAIRRO = "LOAD_DADOS_AGREGADOS_ABA_TEMA_BAIRRO";

export const loadDadosAgregadosAbaTemaBairro = () => {
  return {
    type: LOAD_DADOS_AGREGADOS_ABA_TEMA_BAIRRO,
  };
};

export const REQUEST_DADOS_AGREGADOS_ABA_TEMA_BAIRRO_SUCCESS = "REQUEST_DADOS_AGREGADOS_ABA_TEMA_BAIRRO_SUCCESS";

export const requestDadosAgregadosAbaTemaBairroSuccess = (dataFromServer) => {
  return {
    type: REQUEST_DADOS_AGREGADOS_ABA_TEMA_BAIRRO_SUCCESS,
    payload: dataFromServer,
  };
};

export const REQUEST_DADOS_AGREGADOS_ABA_TEMA_BAIRRO_FAILED = "REQUEST_DADOS_AGREGADOS_ABA_TEMA_BAIRRO_FAILED";

export const requestDadosAgregadosAbaTemaBairroFailed = () => {
  return {
    type: REQUEST_DADOS_AGREGADOS_ABA_TEMA_BAIRRO_FAILED,
  };
};

export const REQUEST_DADOS_AGREGADOS_ABA_TEMA_BAIRRO = "REQUEST_DADOS_AGREGADOS_ABA_TEMA_BAIRRO";

export const requestDadosAgregadosAbaTemaBairro = () => {
  return {
    type: REQUEST_DADOS_AGREGADOS_ABA_TEMA_BAIRRO,
  };
};
// Dados agregados aba programa BAIRRO
export const LOAD_DADOS_AGREGADOS_ABA_PROGRAMA_BAIRRO = "LOAD_DADOS_AGREGADOS_ABA_PROGRAMA_BAIRRO";

export const loadDadosAgregadosAbaProgramaBairro = () => {
  return {
    type: LOAD_DADOS_AGREGADOS_ABA_PROGRAMA_BAIRRO,
  };
};

export const REQUEST_DADOS_AGREGADOS_ABA_PROGRAMA_BAIRRO_SUCCESS = "REQUEST_DADOS_AGREGADOS_ABA_PROGRAMA_BAIRRO_SUCCESS";

export const requestDadosAgregadosAbaProgramaBairroSuccess = (dataFromServer) => {
  return {
    type: REQUEST_DADOS_AGREGADOS_ABA_PROGRAMA_BAIRRO_SUCCESS,
    payload: dataFromServer,
  };
};

export const REQUEST_DADOS_AGREGADOS_ABA_PROGRAMA_BAIRRO_FAILED = "REQUEST_DADOS_AGREGADOS_ABA_PROGRAMA_BAIRRO_FAILED";

export const requestDadosAgregadosAbaProgramaBairroFailed = () => {
  return {
    type: REQUEST_DADOS_AGREGADOS_ABA_PROGRAMA_BAIRRO_FAILED,
  };
};

export const REQUEST_DADOS_AGREGADOS_ABA_PROGRAMA_BAIRRO = "REQUEST_DADOS_AGREGADOS_ABA_PROGRAMA_BAIRRO";

export const requestDadosAgregadosAbaProgramaBairro = () => {
  return {
    type: REQUEST_DADOS_AGREGADOS_ABA_PROGRAMA_BAIRRO,
  };
};


// Dados agregados aba sumário status das entregas do bairro
export const LOAD_DADOS_AGREGADOS_ABA_SUMARIO_STATUS_ENTREGAS_BAIRRO = "LOAD_DADOS_AGREGADOS_ABA_SUMARIO_STATUS_ENTREGAS_BAIRRO";

export const loadDadosAgregadosAbaSumarioStatusEntregasBairro = () => {
  return {
    type: LOAD_DADOS_AGREGADOS_ABA_SUMARIO_STATUS_ENTREGAS_BAIRRO,
  };
};

export const REQUEST_DADOS_AGREGADOS_ABA_SUMARIO_STATUS_ENTREGAS_BAIRRO_SUCCESS = "REQUEST_DADOS_AGREGADOS_ABA_SUMARIO_STATUS_ENTREGAS_BAIRRO_SUCCESS";

export const requestDadosAgregadosAbaSumarioStatusEntregasBairroSuccess = (dataFromServer) => {
  return {
    type: REQUEST_DADOS_AGREGADOS_ABA_SUMARIO_STATUS_ENTREGAS_BAIRRO_SUCCESS,
    payload: dataFromServer,
  };
};

export const REQUEST_DADOS_AGREGADOS_ABA_SUMARIO_STATUS_ENTREGAS_BAIRRO_FAILED = "REQUEST_DADOS_AGREGADOS_ABA_SUMARIO_STATUS_ENTREGAS_BAIRRO_FAILED";

export const requestDadosAgregadosAbaSumarioStatusEntregasBairroFailed = () => {
  return {
    type: REQUEST_DADOS_AGREGADOS_ABA_SUMARIO_STATUS_ENTREGAS_BAIRRO_FAILED,
  };
};

export const REQUEST_DADOS_AGREGADOS_ABA_SUMARIO_STATUS_ENTREGAS_BAIRRO = "REQUEST_DADOS_AGREGADOS_ABA_SUMARIO_STATUS_ENTREGAS_BAIRRO";

export const requestDadosAgregadosAbaSumarioStatusEntregasBairro = () => {
  return {
    type: REQUEST_DADOS_AGREGADOS_ABA_SUMARIO_STATUS_ENTREGAS_BAIRRO,
  };
};

