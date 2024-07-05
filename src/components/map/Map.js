import {
  MapContainer,
  Marker,
  TileLayer,
  Tooltip,
} from "react-leaflet";
import L from 'leaflet';
import "leaflet/dist/leaflet.css";
import "./map.css";
import { useEffect, useRef, useState } from "react";
import ContextMenu from "./ContextMenu";
import { getIcon } from "../../icons/typeIcons";
import { DESCRIPTION_BAR, MAIN_UNDERSEARCH_BAR, setCurrentClickedPoint } from "../../redux/active/actions";
import { getRealizacaoOrgaoIds, getRealizacaoProgramaIds, getRealizacaoTemaIds } from "../../firebase";
import { isDesktop } from "../../redux/active/reducers";
import { useNavigate } from 'react-router-dom';
import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import bairros_centros from "./centroideBairros";
import subprefeituras_centros from "./centroideSubprefeituras";
import MarkerClusterGroup from "react-leaflet-markercluster";
import shapeFileBairros from "./shapeFileBairros.json"
import shapeFileSubprefeituras from "./shapeFileSubprefeituras.json"
import { parse } from 'terraformer-wkt-parser';
import { toTitleCase } from "../../utils/formatFile";
import { useDispatch } from "react-redux";
import brtsLines from "./brtsLines.json";
import { styled } from '@mui/material/styles';
import { Button, Card, CardActionArea, CardActions, CardContent, CardMedia, Typography } from "@material-ui/core";
import '@luomus/leaflet-smooth-wheel-zoom';

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
  realizacaoId,
  rota,
  setRota,
  underSearchBar,
  tema,
  programa,
  realizacao,
  bairro,
  subprefeitura,
  zoomDefault,
  currentClickedPoint,
  setOpenedPopup,
  gestao
}) => {
  const [map, setMap] = useState(null);
  const [filtered, setFiltered] = useState([]);
  points = points || [];

  const [realizacaoOk2, setRealizacaoOk] = useState(null)
  const [alertOpen, setAlertOpen] = useState(false);
  const [contextCoords, setContextCoords] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    // console.log("ROTAROTA " + JSON.stringify(rota.rota))
    if (rota == null && map) {
      const coords = isDesktopDevice ? [-22.9200, -43.3250] : [-22.9800, -43.4400];
      map.flyTo(coords, isDesktopDevice ? 11 : 10)
    }
  }, [rota]);

  // useEffect(() => {
  //   // console.log("underSearchBar " + underSearchBar)
  //   if (map && !underSearchBar) {
  //     const coords = [-22.9200, -43.4250];
  //     map.flyTo(coords, 12)
  //   } else if (map && underSearchBar) {
  //     const coords = isDesktopDevice ? [-22.9200, -43.3250] : [-22.9800, -43.4400];
  //     map.flyTo(coords, isDesktopDevice ? 11 : 10)
  //   }
  // }, [underSearchBar])

  useEffect(() => {
    // console.log("zoomDefault " + zoomDefault)

    if (map && zoomDefault != 0) {
      const coords = isDesktopDevice ? [-22.9200, -43.3250] : [-22.9800, -43.4400];
      map.flyTo(coords, isDesktopDevice ? 11 : 10)
    }
  }, [zoomDefault])

  useEffect(() => {

    if (map) {
      // console.log("map", map)
    }
  }, [map])

  const currentLayerTransBrasil = useRef(null);
  const currentLayerTransOeste = useRef(null);
  const currentLayerTransCarioca = useRef(null);
  const currentLayerTransOlímpica = useRef(null);

  const filterLines = (nome) => {
    return {
      ...brtsLines,
      features: brtsLines.features.filter(feature => feature.properties.nome === nome)
    };
  };

  useEffect(() => {
    const removeLayers = () => {
      if (currentLayerTransBrasil.current) {
        map.removeLayer(currentLayerTransBrasil.current);
      }
      if (currentLayerTransOeste.current) {
        map.removeLayer(currentLayerTransOeste.current);
      }
      if (currentLayerTransCarioca.current) {
        map.removeLayer(currentLayerTransCarioca.current);
      }
      if (currentLayerTransOlímpica.current) {
        map.removeLayer(currentLayerTransOlímpica.current);
      }
    };

    if (map) {
      if (tema == "Mobilidade") {
        const addLayer = (nome, layerRef, color) => {
          if (layerRef.current) {
            map.removeLayer(layerRef.current);
          }
          layerRef.current = L.geoJSON(filterLines(nome), {
            style: { color: color, weight: 4 }
          }).addTo(map);
        };

        addLayer('TransBrasil', currentLayerTransBrasil, '#ED3237');
        addLayer('TransOeste', currentLayerTransOeste, '#208DCD');
        addLayer('TransCarioca', currentLayerTransCarioca, '#ED7422');
        addLayer('TransOlímpica', currentLayerTransOlímpica, '#1DA64D');
      } else {
        removeLayers();
      }
    }
  }, [map, tema]);

  useEffect(() => {
    if (map && programa) {
      const removeLayers = () => {
        if (currentLayerTransBrasil.current) {
          map.removeLayer(currentLayerTransBrasil.current);
        }
        if (currentLayerTransOeste.current) {
          map.removeLayer(currentLayerTransOeste.current);
        }
        if (currentLayerTransCarioca.current) {
          map.removeLayer(currentLayerTransCarioca.current);
        }
        if (currentLayerTransOlímpica.current) {
          map.removeLayer(currentLayerTransOlímpica.current);
        }
      };

      const addLayer = (nome, layerRef, color) => {
        layerRef.current = L.geoJSON(filterLines(nome), {
          style: { color: color, weight: 4 }
        }).addTo(map);
      };

      removeLayers();

      if (programa == "BRTs Transbrasil") {
        addLayer('TransBrasil', currentLayerTransBrasil, '#ED3237');
      } else if (programa == "BRTs Transoeste") {
        addLayer('TransOeste', currentLayerTransOeste, '#208DCD');
      } else if (programa == "BRTs Transcarioca") {
        addLayer('TransCarioca', currentLayerTransCarioca, '#ED7422');
      } else if (programa == "BRTs Transolímpica") {
        addLayer('TransOlímpica', currentLayerTransOlímpica, '#1DA64D');
      }
    }
  }, [map, programa]);



  // Use a ref to store the current layer
  const currentLayer = useRef(null);

  useEffect(() => {
    if (map && bairro) {
      // Converte o nome do bairro para o formato correto (considerando acentuação)
      const bairroFormatado = bairro.toLowerCase();

      // Busca as informações do bairro no novo formato
      const bairro_centro = bairros_centros[bairroFormatado];


      if (bairro_centro) {
        const coords = [bairro_centro.lat, bairro_centro.lng];
        map.flyTo(coords, 13);

      }
      // Find the correct bairro object
      const bairroData = shapeFileBairros.find(b => (b.nome).toLowerCase() === (bairro).toLowerCase());
      if (bairroData) {
        // Convert WKT to GeoJSON
        const geoJsonData = parse(bairroData.geometry_wkt);

        // If there's a current layer, remove it from the map
        if (currentLayer.current) {
          map.removeLayer(currentLayer.current);
        }
        // Create a new GeoJSON layer and add it to the map
        currentLayer.current = L.geoJSON(geoJsonData, {
          style: {
            color: '#007E7D',  // Boundary color
            weight: 3, // Boundary thickness 
            fillColor: '#007E7D',  //BG
            fillOpacity: 0.2  // BGs opacity  (0 is fully transparent, 1 is fully opaque)
          }
        }).addTo(map);
      }
    }
  }, [bairro, map]);

  useEffect(() => {
    if (map) {
      if (!bairro) {
        map.removeLayer(currentLayer.current);
      }
    }
  }, [bairro]);

  // Use a ref to store the current layer
  const currentLayerSubprefeitura = useRef(null);

  useEffect(() => {
    if (map && subprefeitura) {
      // Converte o nome do bairro para o formato correto (considerando acentuação)
      const subprefeituraFormatada = subprefeitura;

      // Busca as informações da subprefeitura no novo formato
      const subprefeitura_centro = subprefeituras_centros[subprefeituraFormatada];
      // console.log("subprefeitura ", subprefeitura);

      if (subprefeitura_centro) {
        map.setView({
          lat: subprefeitura_centro.lat,
          lng: subprefeitura_centro.lng
        }, 12);
      }
      // Find the correct bairro object
      const subprefeituraData = shapeFileSubprefeituras.find(s => (s.subprefeitura).toLowerCase() === (subprefeitura).toLowerCase());
      if (subprefeituraData) {
        // Convert WKT to GeoJSON
        const geoJsonData = parse(subprefeituraData.geometry_wkt);

        // If there's a current layer, remove it from the map
        if (currentLayerSubprefeitura.current) {
          map.removeLayer(currentLayerSubprefeitura.current);
        }
        // Create a new GeoJSON layer and add it to the map
        currentLayerSubprefeitura.current = L.geoJSON(geoJsonData, {
          style: {
            color: '#007E7D',  // Boundary color
            weight: 3, // Boundary thickness 
            fillColor: '#007E7D',  //BG
            fillOpacity: 0.2  // BGs opacity  (0 is fully transparent, 1 is fully opaque)
          }
        }).addTo(map);
      }
    }
  }, [subprefeitura, map]);

  useEffect(() => {
    if (map) {
      if (!subprefeitura) {
        map.removeLayer(currentLayerSubprefeitura.current);
      }
    }
  }, [subprefeitura]);

  const realizacaoOk = points.find(point => realizacaoId === toSnakeCase(point.nome));

  useEffect(() => {
    if (realizacaoOk?.nome) {
      setRealizacaoOk(realizacaoOk.id)
    }
  }, [realizacaoOk])

  useEffect(() => {

    // console.log(">> realizacaoOk2: ", realizacaoOk2?.nome);

    if (realizacaoId && points.length != 0) {
      // setUnderSearchBar(true);
      setDescriptionData(realizacaoId);
      setActiveBar(DESCRIPTION_BAR);
      loadData(realizacaoId);
      setAlertOpen(false)
    }
    if (realizacaoId && realizacaoOk == undefined) {
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


  useEffect(() => {
    if (map) {
      if (realizacao) {
        let point = points.find(point => realizacao === point.nome);
        if (point) {
          let currentZoom = map.getZoom();
          let targetZoom = currentZoom > 13 ? currentZoom : 13;
          map.setView({
            lat: point?.coords?.latitude,
            lng: point?.coords?.longitude,
          }, targetZoom);
          dispatch(setCurrentClickedPoint(point))
        }
      }
    }
  }, [realizacao]);

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
    // setUnderSearchBar(true);
    setDescriptionData(toSnakeCase(point.nome));
    setActiveBar(DESCRIPTION_BAR);
    loadData(toSnakeCase(point.nome));
    navigate(`/${toSnakeCase(point.nome)}`);
    if (map) {
      if (point) {
        let currentZoom = map.getZoom();
        let targetZoom = currentZoom > 12 ? currentZoom : 13;
        map.setView({
          lat: point?.coords?.latitude,
          lng: point?.coords?.longitude,
        }, targetZoom);
        // });
      }
    }
    setRota(toSnakeCase(point.nome))
    dispatch(setCurrentClickedPoint(point));
  };


  const [opened, setOpened] = useState(false);

  const createClusterCustomIcon = function (cluster) {
    return L.divIcon({
      html: `<span>${cluster.getChildCount()}</span>`,
      className: 'marker-cluster-custom',
      iconSize: L.point(40, 40, true),
    });
  };

  const iconMapping = {
    "brts_transolímpica": "brts_transolimpicas_icon",
    "brts_transbrasil": "brts_transbrasil_icon",
    "brts_transoeste": "brts_transoeste_icon",
    "brts_transcarioca": "brts_transcarioca_icon"
  };


  const CustomTooltip = styled(Tooltip)(({ theme }) => ({
    '&.leaflet-tooltip': {
      backgroundColor: 'transparent !important', 
      border: 'none !important',
      boxShadow: 'none !important',
      maxWidth: 'none',
      padding: 0, 
    },
    '&.leaflet-tooltip-right::before': {
      borderRightColor: 'transparent !important', 
    },
    '&.leaflet-tooltip-left::before': {
      borderLeftColor: 'transparent !important', 
    },
    '&.leaflet-tooltip-top::before': {
      borderTopColor: 'transparent !important', 
    },
    '&.leaflet-tooltip-bottom::before': {
      borderBottomColor: 'transparent !important', 
    },
  }));
  const CustomCard = styled(Card)(({ theme }) => ({
    width: 300,
  }));


  // Função auxiliar para renderizar o marcador
  function renderMarker(point, index) {
    return (
      <Marker
      key={point.id + index}
      position={Object.values(point.coords)}
      icon={getIcon(iconMapping[point.id_programa] || (point === currentClickedPoint ? 'redicon' : 'anyIcon'), point === currentClickedPoint, point.gestao !== '3')}
      eventHandlers={{
        click: () => onMarkerClick(point),
      }}
    >
      <CustomTooltip direction="right" offset={[-8, -2]} opacity={1} sticky>
        {point.id_programa === 'rio_em_forma' ? (
          <span style={{ backgroundColor: 'transparent' }}>Rio em Forma - {point.nome}</span>
        ) : (
          <CustomCard>
            <CardActionArea>
              {point.image_url && (
                <CardMedia
                  component="img"
                  height="140"
                  image={point.image_url}
                  alt={point.nome}
                />
              )}
              <CardContent>
                <Typography
                  gutterBottom
                  variant="h6"
                  component="div"
                  style={{
                    display: '-webkit-box',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    WebkitBoxOrient: 'vertical',
                    WebkitLineClamp: 2,
                    whiteSpace: 'normal',
                    wordWrap: 'break-word',
                    lineHeight: '1.2',
                    backgroundColor: 'transparent', // Ensure no background here
                  }}
                >
                  {point.nome}
                </Typography>
                {point.id_bairro && (
                  <Typography variant="body2" color="text.secondary" style={{ backgroundColor: 'transparent' }}>
                    Bairro: {toTitleCase(point.id_bairro ?? '')}
                  </Typography>
                )}
              </CardContent>
            </CardActionArea>
          </CustomCard>
        )}
      </CustomTooltip>
    </Marker>
    );
  }

  const mobilidadePoints = points.filter(point => toSnakeCase('Mobilidade') === point.id_tema);
  const otherPoints = points.filter(point => (toSnakeCase('Mobilidade') !== point.id_tema) && (point.gestao == "3"));
  const oldPoints = points.filter(point => (toSnakeCase('Mobilidade') !== point.id_tema) && (point.gestao != "3"));

  return (
    <>
      <Snackbar open={alertOpen} autoHideDuration={6000} anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }} onClose={() => setAlertOpen(false)}>
        <Alert onClose={() => setAlertOpen(false)} severity="warning">
          A URL deve conter o id da realização.<br></br> Para mais informações entre em contato com o Escritório de Dados.
        </Alert>
      </Snackbar>
      <MapContainer
        center={isDesktopDevice ? [-22.9200, -43.3250] : [-22.9800, -43.4400]}  // Coordenadas para o Rio de Janeiro
        zoom={isDesktopDevice ? 11 : 10}
        scrollWheelZoom={false}
        smoothWheelZoom= {true}
        smoothSensitivity= {1}
        zoomControl={false}
        whenCreated={setMap}
        className="markercluster-map"
      >
        <TileLayer
          url="https://api.mapbox.com/styles/v1/escritoriodedados/clwjhapz4001r01phheax6qvi/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoiZXNjcml0b3Jpb2RlZGFkb3MiLCJhIjoiY2t3bWdmcHpjMmJ2cTJucWJ4MGQ1Mm1kbiJ9.4hHJX-1pSevYoBbja7Pq4w"
          maxZoom={19}
          minZoom={isDesktopDevice ? 11 : 10}
          tileSize={512}
          zoomOffset={-1}
        />
        <MarkerClusterGroup showCoverageOnHover={false}
          spiderfyDistanceMultiplier={2}
          iconCreateFunction={createClusterCustomIcon}>
          {otherPoints.map((point, index) => {

            // Verifica se o ponto corresponde ao bairro selecionado
            const isBairroMatch = bairro ? toSnakeCase(bairro) === point.id_bairro : true;

            // Verifica se o ponto corresponde ao subprefeitura selecionado
            const isSubprefeituraMatch = subprefeitura ? toSnakeCase(subprefeitura) === point.id_subprefeitura : true;

            // Verifica se o ponto corresponde ao tema selecionado
            const isTemaMatch = tema ? toSnakeCase(tema) === point.id_tema : true;

            const isProgramaMatch = programa ? toSnakeCase(programa) === point.id_programa : true;


            // Renderiza o marcador se corresponder ao bairro e aos demais
            // if ((tema || bairro || subprefeitura) && isBairroMatch && isTemaMatch && isProgramaMatch && isSubprefeituraMatch) {
            if (isBairroMatch && isTemaMatch && isProgramaMatch && isSubprefeituraMatch) {
              return renderMarker(point, index);
            }

          })}
        </MarkerClusterGroup>

        {oldPoints.map((point, index) => {

          // Verifica se o ponto corresponde ao bairro selecionado
          const isBairroMatch = bairro ? toSnakeCase(bairro) === point.id_bairro : true;

          // Verifica se o ponto corresponde ao subprefeitura selecionado
          const isSubprefeituraMatch = subprefeitura ? toSnakeCase(subprefeitura) === point.id_subprefeitura : true;

          // Verifica se o ponto corresponde ao tema selecionado
          const isTemaMatch = tema ? toSnakeCase(tema) === point.id_tema : true;

          const isProgramaMatch = programa ? toSnakeCase(programa) === point.id_programa : true;


          // Renderiza o marcador se corresponder ao bairro e aos demais
          // if ((tema || bairro || subprefeitura) && isBairroMatch && isTemaMatch && isProgramaMatch && isSubprefeituraMatch) {
          if (isBairroMatch && isTemaMatch && isProgramaMatch && isSubprefeituraMatch && gestao != "3") {
            return renderMarker(point, index);
          }

        })}

        {tema == "Mobilidade" && mobilidadePoints.map((point, index) => {
          const isProgramaMatch = programa ? toSnakeCase(programa) === point.id_programa : true;
          // Render the marker for points with the "Mobilidade" theme
          if (isProgramaMatch && point.gestao == "3") {
            return renderMarker(point, index);
          }
        })}

        {tema == "Mobilidade" && !programa && mobilidadePoints.map((point, index) => {
          if (gestao != "3" && point.gestao != "3") {
            return renderMarker(point, index);
          }
        })}

        {realizacao && points.map((point, index) => {
          if (realizacao === point.nome) {
            return renderMarker(point, index);
          }
        })}

      </MapContainer>
    </>
  );
};

export default Map;
