import { SET_FILTROS_OPTIONS } from "./actions";

const defaultState = {
  filtros: [],
};

export const filtrosReducer = (state = defaultState, action) => {
  switch (action.type) {
    case SET_FILTROS_OPTIONS:
      return {
        ...state,
        filtros: [action.payload],
      };
  }
  return state;
};
