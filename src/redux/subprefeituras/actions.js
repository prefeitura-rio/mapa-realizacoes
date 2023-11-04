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

// Dados agregados aba sumário informações básicas subprefeitura
export const LOAD_DADOS_AGREGADOS_ABA_SUMARIO_INFO_BASICAS_SUBPREFEITURA = "LOAD_DADOS_AGREGADOS_ABA_SUMARIO_INFO_BASICAS_SUBPREFEITURA";

export const loadDadosAgregadosAbaSumarioInfoBasicasSubprefeitura = () => {
  return {
    type: LOAD_DADOS_AGREGADOS_ABA_SUMARIO_INFO_BASICAS_SUBPREFEITURA,
  };
};

export const REQUEST_DADOS_AGREGADOS_ABA_SUMARIO_INFO_BASICAS_SUBPREFEITURA_SUCCESS = "REQUEST_DADOS_AGREGADOS_ABA_SUMARIO_INFO_BASICAS_SUBPREFEITURA_SUCCESS";

export const requestDadosAgregadosAbaSumarioInfoBasicasSubprefeituraSuccess = (dataFromServer) => {
  return {
    type: REQUEST_DADOS_AGREGADOS_ABA_SUMARIO_INFO_BASICAS_SUBPREFEITURA_SUCCESS,
    payload: dataFromServer,
  };
};

export const REQUEST_DADOS_AGREGADOS_ABA_SUMARIO_INFO_BASICAS_SUBPREFEITURA_FAILED = "REQUEST_DADOS_AGREGADOS_ABA_SUMARIO_INFO_BASICAS_SUBPREFEITURA_FAILED";

export const requestDadosAgregadosAbaSumarioInfoBasicasSubprefeituraFailed = () => {
  return {
    type: REQUEST_DADOS_AGREGADOS_ABA_SUMARIO_INFO_BASICAS_SUBPREFEITURA_FAILED,
  };
};

export const REQUEST_DADOS_AGREGADOS_ABA_SUMARIO_INFO_BASICAS_SUBPREFEITURA = "REQUEST_DADOS_AGREGADOS_ABA_SUMARIO_INFO_BASICAS_SUBPREFEITURA";

export const requestDadosAgregadosAbaSumarioInfoBasicasSubprefeitura = () => {
  return {
    type: REQUEST_DADOS_AGREGADOS_ABA_SUMARIO_INFO_BASICAS_SUBPREFEITURA,
  };
};


// Dados agregados aba sumário status das entregas da subprefeitura
export const LOAD_DADOS_AGREGADOS_ABA_SUMARIO_STATUS_ENTREGAS_SUBPREFEITURA = "LOAD_DADOS_AGREGADOS_ABA_SUMARIO_STATUS_ENTREGAS_SUBPREFEITURA";

export const loadDadosAgregadosAbaSumarioStatusEntregasSubprefeitura = (data) => {
  return {
    type: LOAD_DADOS_AGREGADOS_ABA_SUMARIO_STATUS_ENTREGAS_SUBPREFEITURA,
    payload: data,
  };
};

export const REQUEST_DADOS_AGREGADOS_ABA_SUMARIO_STATUS_ENTREGAS_SUBPREFEITURA_SUCCESS = "REQUEST_DADOS_AGREGADOS_ABA_SUMARIO_STATUS_ENTREGAS_SUBPREFEITURA_SUCCESS";

export const requestDadosAgregadosAbaSumarioStatusEntregasSubprefeituraSuccess = (dataFromServer) => {
  return {
    type: REQUEST_DADOS_AGREGADOS_ABA_SUMARIO_STATUS_ENTREGAS_SUBPREFEITURA_SUCCESS,
    payload: dataFromServer,
  };
};

export const REQUEST_DADOS_AGREGADOS_ABA_SUMARIO_STATUS_ENTREGAS_SUBPREFEITURA_FAILED = "REQUEST_DADOS_AGREGADOS_ABA_SUMARIO_STATUS_ENTREGAS_SUBPREFEITURA_FAILED";

export const requestDadosAgregadosAbaSumarioStatusEntregasSubprefeituraFailed = () => {
  return {
    type: REQUEST_DADOS_AGREGADOS_ABA_SUMARIO_STATUS_ENTREGAS_SUBPREFEITURA_FAILED,
  };
};

export const REQUEST_DADOS_AGREGADOS_ABA_SUMARIO_STATUS_ENTREGAS_SUBPREFEITURA = "REQUEST_DADOS_AGREGADOS_ABA_SUMARIO_STATUS_ENTREGAS_SUBPREFEITURA";

export const requestDadosAgregadosAbaSumarioStatusEntregasSubprefeitura = () => {
  return {
    type: REQUEST_DADOS_AGREGADOS_ABA_SUMARIO_STATUS_ENTREGAS_SUBPREFEITURA,
  };
};

// Dados agregados aba tema subprefeitura
export const LOAD_DADOS_AGREGADOS_ABA_TEMA_SUBPREFEITURA = "LOAD_DADOS_AGREGADOS_ABA_TEMA_SUBPREFEITURA";

export const loadDadosAgregadosAbaTemaSubprefeitura = (data) => {
  return {
    type: LOAD_DADOS_AGREGADOS_ABA_TEMA_SUBPREFEITURA,
    payload: data,
  };
};

export const REQUEST_DADOS_AGREGADOS_ABA_TEMA_SUBPREFEITURA_SUCCESS = "REQUEST_DADOS_AGREGADOS_ABA_TEMA_SUBPREFEITURA_SUCCESS";

export const requestDadosAgregadosAbaTemaSubprefeituraSuccess = (dataFromServer) => {
  return {
    type: REQUEST_DADOS_AGREGADOS_ABA_TEMA_SUBPREFEITURA_SUCCESS,
    payload: dataFromServer,
  };
};

export const REQUEST_DADOS_AGREGADOS_ABA_TEMA_SUBPREFEITURA_FAILED = "REQUEST_DADOS_AGREGADOS_ABA_TEMA_SUBPREFEITURA_FAILED";

export const requestDadosAgregadosAbaTemaSubprefeituraFailed = () => {
  return {
    type: REQUEST_DADOS_AGREGADOS_ABA_TEMA_SUBPREFEITURA_FAILED,
  };
};

export const REQUEST_DADOS_AGREGADOS_ABA_TEMA_SUBPREFEITURA = "REQUEST_DADOS_AGREGADOS_ABA_TEMA_SUBPREFEITURA";

export const requestDadosAgregadosAbaTemaSubprefeitura = () => {
  return {
    type: REQUEST_DADOS_AGREGADOS_ABA_TEMA_SUBPREFEITURA,
  };
};

// Dados agregados aba programas subprefeitura
export const LOAD_DADOS_AGREGADOS_ABA_PROGRAMAS_SUBPREFEITURA = "LOAD_DADOS_AGREGADOS_ABA_PROGRAMAS_SUBPREFEITURA";

export const loadDadosAgregadosAbaProgramasSubprefeitura = (data) => {
  return {
    type: LOAD_DADOS_AGREGADOS_ABA_PROGRAMAS_SUBPREFEITURA,
    payload: data,
  };
};

export const REQUEST_DADOS_AGREGADOS_ABA_PROGRAMAS_SUBPREFEITURA_SUCCESS = "REQUEST_DADOS_AGREGADOS_ABA_PROGRAMAS_SUBPREFEITURA_SUCCESS";

export const requestDadosAgregadosAbaProgramasSubprefeituraSuccess = (dataFromServer) => {
  return {
    type: REQUEST_DADOS_AGREGADOS_ABA_PROGRAMAS_SUBPREFEITURA_SUCCESS,
    payload: dataFromServer,
  };
};

export const REQUEST_DADOS_AGREGADOS_ABA_PROGRAMAS_SUBPREFEITURA_FAILED = "REQUEST_DADOS_AGREGADOS_ABA_PROGRAMAS_SUBPREFEITURA_FAILED";

export const requestDadosAgregadosAbaProgramasSubprefeituraFailed = () => {
  return {
    type: REQUEST_DADOS_AGREGADOS_ABA_PROGRAMAS_SUBPREFEITURA_FAILED,
  };
};

export const REQUEST_DADOS_AGREGADOS_ABA_PROGRAMAS_SUBPREFEITURA = "REQUEST_DADOS_AGREGADOS_ABA_PROGRAMAS_SUBPREFEITURA";

export const requestDadosAgregadosAbaProgramasSubprefeitura = () => {
  return {
    type: REQUEST_DADOS_AGREGADOS_ABA_PROGRAMAS_SUBPREFEITURA,
  };
};
