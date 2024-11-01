import { combineReducers } from "redux";
import { SET_ZOOM_DELTA } from "./actions";
import { SET_ZOOM_DEFAULT } from "./actions";
import modalReducer from "./modals/reducers";
import activeReducer from "./active/reducers";
import commentsReducer from "./comments/reducers";
import placeReducer from "./place/reducers";
import placesReducer from "./places/reducers";
import imagesReducer from "./images/reducers";
import pointsReducer from "./points/reducers";
import mapReducer from "./map/reducers";
import authReducer from "./auth/reducers";
import searchReducer from "./search/reducers";
import cidadesReducer from "./cidade/reducers";
import bairrosReducer from "./bairros/reducers";
import subprefeiturasReducer from "./subprefeituras/reducers";
import { filtrosReducer } from "./filtros/reducers";
import { rotaReducer } from "./rota/reducers";

const defaultState = {
  zoomDelta: 0,
  zoomDefault:0
};

export const appReducer = (state = defaultState, action) => {
  switch (action.type) {
    case SET_ZOOM_DELTA:
      return {
        ...state,
        zoomDelta: action.payload,
      };
    case SET_ZOOM_DEFAULT:
      return {
        ...state,
        zoomDefault: action.payload,
      };
  }
  return state;
};

export default combineReducers({
  app: appReducer,
  modals: modalReducer,
  active: activeReducer,
  comments: commentsReducer,
  place: placeReducer,
  places: placesReducer,
  images: imagesReducer,
  points: pointsReducer,
  cidades: cidadesReducer,
  bairros: bairrosReducer,
  subprefeituras: subprefeiturasReducer,
  map: mapReducer,
  auth: authReducer,
  search: searchReducer,
  filtros: filtrosReducer,
  rota: rotaReducer
});
