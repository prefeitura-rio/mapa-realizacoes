export const SET_FILTROS_OPTIONS = "SET_FILTROS_OPTIONS";

export const setFiltros = (filtros) => {
  return {
    type: SET_FILTROS_OPTIONS,
    payload: filtros,
  };
};
