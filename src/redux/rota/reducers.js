import { SET_ROTA } from "./actions";

const defaultState = {
  rota: null,
};

export const rotaReducer = (state = defaultState, action) => {
  switch (action.type) {
    case SET_ROTA:
      return {
        ...state,
        rota: action.payload,
      };
  }
  return state;
};
