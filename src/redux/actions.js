export const SET_ZOOM_DELTA = "SET_ZOOM_DELTA";
export const SET_ZOOM_DEFAULT = "SET_ZOOM_DEFAULT";

export const setZoomDelta = (zoomDelta) => {
  return {
    type: SET_ZOOM_DELTA,
    payload: zoomDelta,
  };
};

export const setZoomDefault = (zoomDefault) => {
  return {
    type: SET_ZOOM_DEFAULT,
    payload:zoomDefault ,
  };
};
