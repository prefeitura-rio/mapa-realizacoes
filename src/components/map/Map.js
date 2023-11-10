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
import { getRealizacaoOrgaoIds, getRealizacaoProgramaIds, getRealizacaoTemaIds } from "../../firebase";

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
  filtros
}) => {
  const [map, setMap] = useState(null);
  const [filtered, setFiltered] = useState([]);
  points = points || [];

  const [contextCoords, setContextCoords] = useState(null);

  useEffect(() => {
    if (map) {
      map.setZoom(map.getZoom() + zoomDelta);
      setZoomDelta(0);
      map.on("contextmenu", onContextMenu);
    }
  }, [zoomDelta, map]);

  const [listRealizacaoOrgao, setOrgaosNameFilter] = useState([]);
  const [listRealizacaoPrograma, setTemasNameFilter] = useState([]);
  const [listRealizacaoTema, setProgramasNameFilter] = useState([]);

  const loadFiltrosInfo = async () => {
    try {
      const orgaoRef = await getRealizacaoOrgaoIds();
      const temaRef = await getRealizacaoProgramaIds();
      const programaRef = await getRealizacaoTemaIds();

      if (!orgaoRef.empty && !temaRef.empty && !programaRef.empty) {
        setOrgaosNameFilter(orgaoRef);
        setTemasNameFilter(temaRef);
        setProgramasNameFilter(programaRef);
      } else {
        console.error("Erro aqui <<== ");
      }
    } catch (error) {
      console.error("Erro ao buscar nomes dos filtros", error);
    }
  };

  useEffect(() => {
    loadFiltrosInfo();
  }, []); // Simula o componentDidMount - Executa apenas uma vez


  useEffect(() => {

    // console.log("filtros ===> ", filtros);
    let newFiltered = [];
    filtros.map((filtro) => {
      filtro.button1?.map((button) => {
        newFiltered.push(toSnakeCase(button));
      });
    });
    filtros.map((filtro) => {
      filtro.button2?.map((button) => {
        newFiltered.push(toSnakeCase(button));
      });
    });
    filtros.map((filtro) => {
      filtro.button3?.map((button) => {
        newFiltered.push(toSnakeCase(button));
      });
    });
    setFiltered(newFiltered);

  }, [filtros]);

  const onContextMenu = (e) => {
    setOpened(true);
    setContextCoords({ point: e.containerPoint, latlng: e.latlng });
  };

  function toSnakeCase(str) {
    return str
      .trim()  // Remove espaços no início e fim da string
      .toLowerCase()  // Converte tudo para lowercase
      .replace(/\s+/g, '_');  // Substitui um ou mais espaços por underscore (_)
  }

  const onMarkerClick = (point) => {
    setUnderSearchBar(true);
    setDescriptionData(toSnakeCase(point.nome));
    setActiveBar(DESCRIPTION_BAR);
    loadData(toSnakeCase(point.nome));
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
        map.flyTo({ lat: -22.8800, lng: -43.5600 });
      }
    }
  }, [currentCoords]);

  return (
    <>
      <MapContainer
        center={[-22.8800, -43.5600]}  // Coordenadas para o Rio de Janeiro
        zoom={11.0}
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

        {points.map((point, index) =>
          filtered.length > 0
            ? filtered.map((item) => {
              const combinedId = point.id + "__" + item;
              if (listRealizacaoOrgao.includes(combinedId) || listRealizacaoPrograma.includes(combinedId) || listRealizacaoTema.includes(combinedId)) {
                return (
                  <Marker
                    key={point.id + index}
                    position={Object.values(point.coords)}
                    icon={getIcon("anyIcon")}
                    eventHandlers={{
                      click: (e) => onMarkerClick(point),
                    }}
                  >
                    <Tooltip direction="right" offset={[-8, -2]} opacity={1} sticky>
                      <span>{point.nome}</span>
                    </Tooltip>
                  </Marker>
                );
              }
              return null;
            })
            : (
              <Marker
                key={point.id + index}
                position={Object.values(point.coords)}
                icon={getIcon("anyIcon")}
                eventHandlers={{
                  click: (e) => onMarkerClick(point),
                }}
              >
                <Tooltip direction="right" offset={[-8, -2]} opacity={1} sticky>
                  <span>{point.nome}</span>
                </Tooltip>
              </Marker>
            )
        )}

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
