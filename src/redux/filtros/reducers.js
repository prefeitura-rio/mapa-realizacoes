import { SET_FILTROS_OPTIONS, SET_PROGRAMA_DATA, SET_TEMA_DATA } from "./actions";
import { SET_TEMA } from "./actions";
import { SET_PROGRAMA } from "./actions";
import { SET_REALIZACAO } from "./actions";
import { SET_BAIRRO } from "./actions";
import { SET_SUBPREFEITURA } from "./actions";

const defaultState = {
  filtros: [],
  tema: null,
  programa: null,
  realizacao: null,
  bairro: null,
  subprefeitura: null
};

export const filtrosReducer = (state = defaultState, action) => {
  switch (action.type) {
    case SET_FILTROS_OPTIONS:
      return {
        ...state,
        filtros: [action.payload],
      };
    case SET_TEMA:
      return {
        ...state,
        tema: action.payload,
      };
    case SET_TEMA_DATA:
      return {
        ...state,
        temaData: action.payload,
      };
    case SET_PROGRAMA:
      return {
        ...state,
        programa: action.payload,
      };
    case SET_PROGRAMA_DATA:
      return {
        ...state,
        programaData: action.payload,
      };
    case SET_REALIZACAO:
      return {
        ...state,
        realizacao: action.payload,
      };
    case SET_BAIRRO:
      return {
        ...state,
        bairro: action.payload,
      };
    case SET_SUBPREFEITURA:
      return {
        ...state,
        subprefeitura: action.payload,
      };
  }
  return state;
};
