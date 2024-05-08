export const SET_FILTROS_OPTIONS = "SET_FILTROS_OPTIONS";
export const SET_TEMA = "SET_TEMA";
export const SET_PROGRAMA = "SET_PROGRAMA";
export const SET_PROGRAMA_DATA = "SET_PROGRAMA_DATA";
export const SET_TEMA_DATA = "SET_TEMA_DATA";
export const SET_REALIZACAO = "SET_REALIZACAO";
export const SET_BAIRRO = "SET_BAIRRO";
export const SET_SUBPREFEITURA = "SET_SUBPREFEITURA";


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
