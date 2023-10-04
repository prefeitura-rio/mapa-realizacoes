function lon2tile(lon, zoom) {
  return Math.floor(((lon + 180) / 360) * Math.pow(2, zoom));
}
function lat2tile(lat, zoom) {
  return Math.floor(
    ((1 -
      Math.log(
        Math.tan((lat * Math.PI) / 180) + 1 / Math.cos((lat * Math.PI) / 180)
      ) /
        Math.PI) /
      2) *
      Math.pow(2, zoom)
  );
}

export const getTileImage = (coords) => {
  const id = "mapbox/outdoors-v11";
  const zoom = 15;

  const accessToken =
    " 'pk.eyJ1IjoiZXNjcml0b3Jpb2RlZGFkb3MiLCJhIjoiY2t3bWdmcHpjMmJ2cTJucWJ4MGQ1Mm1kbiJ9.4hHJX-1pSevYoBbja7Pq4w'";
  return `https://api.mapbox.com/styles/v1/${id}/tiles/512/${zoom}/${lon2tile(
    coords.longitude,
    zoom
  )}/${lat2tile(coords.latitude, zoom)}?access_token=${accessToken}`;
};
