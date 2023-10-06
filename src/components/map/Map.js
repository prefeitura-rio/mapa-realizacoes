import {
  MapContainer,
  Marker,
  TileLayer,
  Tooltip,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "./map.css";
import { useEffect, useState } from "react";
import ContextMenu from "./ContextMenu";
import { getIcon } from "../../icons/typeIcons";
import { DESCRIPTION_BAR } from "../../redux/active/actions";

const Map = ({
  zoomDelta,
  setZoomDelta,
  setOpenEditInfo,
  setContent,
  setContentSnapshot,
  points,
  setActiveBar,
  setDescriptionData,
  loadData,
  setUnderSearchBar,
  currentCoords,
  profile,
}) => {
  const [map, setMap] = useState(null);

  points = points || [];

  const [contextCoords, setContextCoords] = useState(null);

  useEffect(() => {
    if (map) {
      map.setZoom(map.getZoom() + zoomDelta);
      setZoomDelta(0);
      map.on("contextmenu", onContextMenu);
    }
  }, [zoomDelta, map]);

  const onContextMenu = (e) => {
    setOpened(true);
    setContextCoords({ point: e.containerPoint, latlng: e.latlng });
  };

  const onMarkerClick = (point) => {
    setUnderSearchBar(true);
    setDescriptionData(point.nome);
    setActiveBar(DESCRIPTION_BAR);
    loadData(point.nome);
    console.log(point)
  };

  const [opened, setOpened] = useState(false);

  useEffect(() => {
    if (map) {
      if (currentCoords && currentCoords.latitude) {
        map.flyTo({
          lat: currentCoords.latitude,
          lng: currentCoords.longitude,
        });
      } else {
        map.flyTo({ lat: 52.2, lng: 104.2 });
      }
    }
  }, [currentCoords]);

  return (
    <>
      <MapContainer
        center={[-22.9068, -43.3999]}  // Coordenadas para o Rio de Janeiro
        zoom={11.5}
        scrollWheelZoom={true}
        zoomControl={false}
        whenCreated={setMap}
      >
        <TileLayer
          url="https://api.maptiler.com/maps/streets-v2/{z}/{x}/{y}@2x.png?key=aqjLoB2kRuhWSZjNO6YJ"
          // attribution='<a href="https://www.maptiler.com/copyright/\" target="_blank">MapTiler</a> &copy; <a href="https://www.openstreetmap.org/copyright" target="_blank">OpenStreetMap</a> contributors | Prefeitura do Rio de Janeiro <a href="https://prefeitura.rio/" target="_blank"></a>'
          maxZoom={18}
          tileSize={512}
          zoomOffset={-1}
        />
        {points.map((point) => (
          <Marker
            key={Object.values(point.coords).join("")}
            position={Object.values(point.coords)}
            icon={getIcon("anyIcon")}
            eventHandlers={{
              click: (e) => onMarkerClick(point),
            }}
          >
            <Tooltip direction="right" offset={[-8, -2]} opacity={1} sticky>
              <span>{point.id}</span>
            </Tooltip>
          </Marker>
        ))}
      </MapContainer>

      {contextCoords && opened ? (
        <ContextMenu
          screenCoords={contextCoords.point}
          geoCoords={contextCoords.latlng}
          setOpened={setOpened}
          setOpenEditInfo={setOpenEditInfo}
          setContent={setContent}
          setContentSnapshot={setContentSnapshot}
          profile={profile}
        />
      ) : null}
    </>
  );
};

export default Map;
