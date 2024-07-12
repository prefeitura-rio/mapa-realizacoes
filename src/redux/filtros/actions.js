export const SET_FILTROS_OPTIONS = "SET_FILTROS_OPTIONS";
export const SET_TEMA = "SET_TEMA";
export const SET_PROGRAMA = "SET_PROGRAMA";
export const SET_PROGRAMA_DATA = "SET_PROGRAMA_DATA";
export const LOAD_PROGRAMA_DATA = "LOAD_PROGRAMA_DATA";
export const SET_TEMA_DATA = "SET_TEMA_DATA";
export const SET_REALIZACAO = "SET_REALIZACAO";
export const SET_BAIRRO = "SET_BAIRRO";
export const SET_SUBPREFEITURA = "SET_SUBPREFEITURA";
export const SET_REALIZACOES_PROGRAMA = "SET_REALIZACOES_PROGRAMA";


export const setFiltros = (filtros) => {
  return {
    type: SET_FILTROS_OPTIONS,
    payload: filtros,
  };
};

export const setTema = (tema) => {
  return {
    type: SET_TEMA,
    payload: tema,
  };
};
export const setTemaData = (tema) => {
  return {
    type: SET_TEMA_DATA,
    payload: tema,
  };
};
export const setPrograma = (programa) => {
  return {
    type: SET_PROGRAMA,
    payload: programa,
  };
};
export const loadProgramaData = (programa) => {
  return {
    type: LOAD_PROGRAMA_DATA,
    payload: programa,
  };
};
export const REQUEST_PROGRAMA_DATA_SUCCESS = "REQUEST_PROGRAMA_DATA_SUCCESS";

export const requestProgramaDataSuccess = (dataFromServer) => {
  return {
    type: REQUEST_PROGRAMA_DATA_SUCCESS,
    payload: dataFromServer,
  };
};

export const REQUEST_PROGRAMA_DATA_FAILED = "REQUEST_PROGRAMA_DATA_FAILED";

export const requestProgramaDataFailed = () => {
  return {
    type: REQUEST_PROGRAMA_DATA_FAILED,
  };
};

export const REQUEST_PROGRAMA_DATA = "REQUEST_PROGRAMA_DATA";

export const requestProgramaData = () => {
  return {
    type: REQUEST_PROGRAMA_DATA,
  };
};
export const setProgramaData = (programa) => {
  return {
    type: SET_PROGRAMA_DATA,
    payload: programa,
  };
};
export const setRealizacao= (realizacao) => {
  return {
    type: SET_REALIZACAO,
    payload: realizacao,
  };
};
export const setBairro = (bairro) => {
  return {
    type: SET_BAIRRO,
    payload: bairro,
  };
};
export const setSubprefeitura = (subprefeitura) => {
  return {
    type: SET_SUBPREFEITURA,
    payload: subprefeitura,
  };
};

export const setRealizacoesProgramaRedux = (realizacoesPrograma) => {
  return {
    type: SET_REALIZACOES_PROGRAMA,
    payload: realizacoesPrograma,
  };
};
