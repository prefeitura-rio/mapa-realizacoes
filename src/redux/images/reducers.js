import {
  ALL,
  REQUEST_ALL_IMAGES,
  REQUEST_ALL_IMAGES_BAIRRO,
  REQUEST_ALL_IMAGES_BAIRRO_FAILED,
  REQUEST_ALL_IMAGES_BAIRRO_SUCCESS,
  REQUEST_ALL_IMAGES_FAILED,
  REQUEST_ALL_IMAGES_SUBPREFEITURA,
  REQUEST_ALL_IMAGES_SUBPREFEITURA_FAILED,
  REQUEST_ALL_IMAGES_SUBPREFEITURA_SUCCESS,
  REQUEST_ALL_IMAGES_SUCCESS,
  REQUEST_IMAGES,
  REQUEST_IMAGES_FAILED,
  REQUEST_IMAGES_SUCCESS,
  SET_CURRENT_IMG,
  SET_IMAGES_TYPE,
} from "./actions";

const defaultState = {
  images: [],
  allImagesCidade: [],
  loading: false,
  error: false,
  imagesType: null,
  currentImg: 0,
};

const imagesReducer = (state = defaultState, action) => {
  switch (action.type) {
    case REQUEST_IMAGES:
      return {
        ...state,
        images: [],
        loading: true,
        error: false,
      };
    case REQUEST_IMAGES_SUCCESS:
      return {
        ...state,
        images: action.payload || [],
        loading: false,
        error: false,
      };
    case REQUEST_IMAGES_FAILED:
      return {
        ...state,
        images: [],
        loading: false,
        error: true,
      };
    case REQUEST_ALL_IMAGES:
      return {
        ...state,
        allImagesCidade: [],
        loading: true,
        error: false,
      };
    case REQUEST_ALL_IMAGES_SUCCESS:
      return {
        ...state,
        allImagesCidade: action.payload,
        loading: false,
        error: false,
      };
    case REQUEST_ALL_IMAGES_FAILED:
      return {
        ...state,
        allImagesCidade: [],
        loading: false,
        error: true,
      };
    case REQUEST_ALL_IMAGES_BAIRRO:
      return {
        ...state,
        allImagesBairro: [],
        loading: true,
        error: false,
      };
    case REQUEST_ALL_IMAGES_BAIRRO_SUCCESS:
      return {
        ...state,
        allImagesBairro: action.payload,
        loading: false,
        error: false,
      };
    case REQUEST_ALL_IMAGES_BAIRRO_FAILED:
      return {
        ...state,
        allImagesBairro: [],
        loading: false,
        error: true,
      };
    case REQUEST_ALL_IMAGES_SUBPREFEITURA:
      return {
        ...state,
        allImagesSubprefeitura: [],
        loading: true,
        error: false,
      };
    case REQUEST_ALL_IMAGES_SUBPREFEITURA_SUCCESS:
      return {
        ...state,
        allImagesSubprefeitura: action.payload,
        loading: false,
        error: false,
      };
    case REQUEST_ALL_IMAGES_SUBPREFEITURA_FAILED:
      return {
        ...state,
        allImagesSubprefeitura: [],
        loading: false,
        error: true,
      };
    case SET_IMAGES_TYPE:
      return {
        ...state,
        imagesType: action.payload,
      };
    case SET_CURRENT_IMG:
      return {
        ...state,
        currentImg: action.payload,
      };
  }
  return state;
};

export default imagesReducer;
