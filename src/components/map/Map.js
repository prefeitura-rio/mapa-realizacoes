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
import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import bairros_centros from "./centroideBairros";



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
  realizacaoId,
  rota,
  setRota
}) => {
  const [map, setMap] = useState(null);
  const [filtered, setFiltered] = useState([]);
  points = points || [];

  const [realizacaoOk2, setRealizacaoOk]= useState(null)
  const [alertOpen, setAlertOpen] = useState(false);
  const [contextCoords, setContextCoords] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    console.log("ROTAROTA " + JSON.stringify(rota.rota))
    if (rota.rota == null && map) {
      const coords = [-22.9200, -43.4250];
      map.flyTo(coords, 12)
    }
  }, [rota]);

  useEffect(() => {
    if (map && bairroNome) {
      // Converte o nome do bairro para o formato correto (considerando acentuação)
      const bairroFormatado = bairroNome.toLowerCase();

      // Busca as informações do bairro no novo formato
      const bairro = bairros_centros[bairroFormatado];
      console.log("bairro ", bairro);

      if (bairro) {
        const coords = [bairro.lat, bairro.lng];
        map.flyTo(coords, 13);
      }
    }
  }, [bairroNome, map]);

 
  const realizacaoOk = points.find(point => realizacaoId === toSnakeCase(point.nome));

  useEffect(()=>{
   if( realizacaoOk?.nome){
    setRealizacaoOk(realizacaoOk.image_folder)
   }
  },[realizacaoOk])

  useEffect(() => {

    console.log(">> realizacaoOk2: ", realizacaoOk2?.nome);
    
    if (realizacaoId && realizacaoOk2){
      setUnderSearchBar(true);
      setDescriptionData(realizacaoId);
      setActiveBar(DESCRIPTION_BAR);
      loadData(realizacaoId);
      setAlertOpen(false)
    }
    if (realizacaoId && realizacaoOk == undefined){
      setAlertOpen(true)
    }
  }, [realizacaoOk2]);

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
    if (map) {
      if (point) {
        map.flyTo({
          lat: point.coords.latitude,
          lng: point.coords.longitude,
        }, 14);
      }
    }
    setRota(toSnakeCase(point.nome))
  };

  const [opened, setOpened] = useState(false);

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
      <Snackbar open={alertOpen} autoHideDuration={6000}  anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }} onClose={() => setAlertOpen(false)}>
        <Alert onClose={() => setAlertOpen(false)} severity="warning">
         A URL deve conter o id da realização.<br></br> Para mais informações entre em contato com o Escritório de Dados.
        </Alert>
      </Snackbar>
      <MapContainer
        center={isDesktopDevice ? [-22.9200, -43.4250] : [-22.8800, -43.4200]}  // Coordenadas para o Rio de Janeiro
        zoom={11.50}
        scrollWheelZoom={true}
        zoomControl={false}
        whenCreated={setMap}
      >
        <TileLayer
          url="https://api.mapbox.com/styles/v1/escritoriodedados/clsdkt2mc00ri01qrfzbl28n6/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoiZXNjcml0b3Jpb2RlZGFkb3MiLCJhIjoiY2t3bWdmcHpjMmJ2cTJucWJ4MGQ1Mm1kbiJ9.4hHJX-1pSevYoBbja7Pq4w"
          maxZoom={14}
          minZoom={11}
          tileSize={512}
          zoomOffset={-1}
        />
        {console.log("bairroNome: " + bairroNome)}
        {points.map((point, index) => {
          // Verifica se deve exibir todos os pontos
          if (filtered.length === 0 && bairroNome === null && subprefeituraNome === null) {
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
