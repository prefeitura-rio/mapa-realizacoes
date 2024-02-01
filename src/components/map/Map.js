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
import { DESCRIPTION_BAR, MAIN_UNDERSEARCH_BAR } from "../../redux/active/actions";
import { getRealizacaoOrgaoIds, getRealizacaoProgramaIds, getRealizacaoTemaIds } from "../../firebase";
import { isDesktop } from "../../redux/active/reducers";
import { useNavigate } from 'react-router-dom';

const capitalizeFirstLetter = (str) => {
  return str.toLowerCase().replace(/(^|\s)\S/g, (char) => char.toUpperCase());
};

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
  filtros,
  bairroNome,
  subprefeituraNome,
  realizacaoId
}) => {
  const [map, setMap] = useState(null);
  const [filtered, setFiltered] = useState([]);
  points = points || [];

  const [contextCoords, setContextCoords] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (map && bairroNome) {
       const bairro = points.find(point => toSnakeCase(bairroNome) === point.id_bairro);
       if (bairro) {
         const coords = Object.values(bairro.coords);
         console.log("AAAAAAAAAABBBBBBBBB: " + coords)
         map.flyTo(coords,13);
       }
    }
   }, [bairroNome, map]);

  useEffect(() => {
    if (realizacaoId){
    // const realizacaoOk = points.find(point => realizacaoId === toSnakeCase(point.nome));
    // if (realizacaoOk){
    setUnderSearchBar(true);
    setDescriptionData(realizacaoId);
    setActiveBar(DESCRIPTION_BAR);
    loadData(realizacaoId);
    }
    // }

   }, [realizacaoId]);

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

  const isDesktopDevice = isDesktop();

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
    navigate(`/${toSnakeCase(point.nome)}`);
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
        map.flyTo({ lat: -22.8800, lng: -43.4600 });
      }
    }
  }, [currentCoords]);

  if(MAIN_UNDERSEARCH_BAR){
    if (map) {
    const coords = [-22.9200, -43.4250];
    map.flyTo(coords,12)
    }
  }

  // Função auxiliar para renderizar o marcador
  function renderMarker(point, index) {
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
          <span>{capitalizeFirstLetter(point.nome)}</span>
        </Tooltip>
      </Marker>
    );
  }

  return (
    <>
      <MapContainer
        center={isDesktopDevice ? [-22.9200, -43.4250] : [-22.8800, -43.4200]}  // Coordenadas para o Rio de Janeiro
        zoom={11.50}
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
        {console.log("bairroNome: " + bairroNome)}
        {points.map((point, index) => {
          // Verifica se deve exibir todos os pontos
          if (filtered.length === 0 && bairroNome === null && subprefeituraNome === null ) {
            return renderMarker(point, index);
          }

          // Verifica se o ponto corresponde ao bairro selecionado
          const isBairroMatch = bairroNome ? toSnakeCase(bairroNome) === point.id_bairro : true;
        
          // Verifica se o ponto corresponde ao subprefeitura selecionado
          // const isSubprefeituraMatch = subprefeituraNome ? toSnakeCase(subprefeituraNome) === point.id_subprefeitura : true;

          // Verifica se o ponto corresponde aos filtros aplicados
          const isFilterMatch = filtered.length > 0 ? filtered.every((item) => {
            const combinedId = point.id + "__" + item;
            return listRealizacaoOrgao.includes(combinedId) || listRealizacaoPrograma.includes(combinedId) || listRealizacaoTema.includes(combinedId);
          }) : true;

          // Renderiza o marcador se corresponder ao bairro e aos filtros
          if (isBairroMatch && isFilterMatch) {
            return renderMarker(point, index);
          }

          // // Renderiza o marcador se corresponder ao bairro e aos filtros
          // if (isSubprefeituraMatch && isFilterMatch) {
          //   return renderMarker(point, index);
          // }

          return null;
        })}

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
