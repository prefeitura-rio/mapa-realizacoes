import { SET_FILTROS_OPTIONS } from "./actions";
import { SET_TEMA } from "./actions";
import { SET_PROGRAMA } from "./actions";
import { SET_REALIZACAO } from "./actions";

const defaultState = {
  filtros: [],
  tema: null,
  programa: null,
  realizacao: null
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
    case SET_PROGRAMA:
      return {
        ...state,
        programa: action.payload,
      };
    case SET_REALIZACAO:
      return {
        ...state,
        realizacao: action.payload,
      };
  }
  return state;
};
