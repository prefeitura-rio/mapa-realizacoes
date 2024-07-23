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
import MarkerClusterGroup from 'react-leaflet-cluster'
import shapeFileBairros from "./shapeFileBairros.json"
import shapeFileSubprefeituras from "./shapeFileSubprefeituras.json"
import lineStringAsfaltoLiso from "./lineStringAsfaltoLiso.json"
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
  gestao,
  setRealizacao,
  userLocation,
  realizacoesPrograma
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

  useEffect(() => {

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
        if (gestao == null || gestao == "3" || gestao == "1_2_3") {
          (programa == null || programa == "BRTs Transbrasil") && addLayer('TransBrasil', currentLayerTransBrasil, '#ED3237');
          (programa == null || programa == "BRTs Transoeste") && addLayer('TransOeste', currentLayerTransOeste, '#208DCD');
          (programa == null || programa == "BRTs Transcarioca") && addLayer('TransCarioca', currentLayerTransCarioca, '#ED7422');
          (programa == null || programa == "BRTs Transolímpica") && addLayer('TransOlímpica', currentLayerTransOlímpica, '#1DA64D');
        }
      } else {
        removeLayers();
      }
    }

  }, [map, tema, programa, gestao]);

  useEffect(() => {
    if (map) {
      if (tema == "Mobilidade") {
        if (gestao == "1_2") {
          removeLayers();
        }
      }
    }
  }, [gestao]);

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

  // LINHAS ASFALTO LISO

  // Add the linestring to the map if name inside features is equal to "realizacao"
  useEffect(() => {
    let lineLayer = null; // Reference to the added line layer
    let dashedLayer = null; // Reference to the added line layer

    if (map && realizacao) {
      const lineString = lineStringAsfaltoLiso.features.find(feature => feature.properties.name === realizacao);
      if (lineString) {
        // Directly use lineString.geometry without parsing
        const line = L.geoJSON(lineString.geometry, {
          style: {
            color: '#00B7EB',  // Boundary color
            weight: 10, // Boundary thickness
            opacity: 0.5,
          }
        }).addTo(map);
        map.fitBounds(line.getBounds());

        // Create and add the dashed line
        const dashedLine = L.geoJSON(lineString.geometry, {
          style: {
            color: '#ffffff', // Dashed line color
            weight: 2, // Dashed line thickness, adjust as needed
            dashArray: '10, 20', // Pattern of dashes and gaps
          }
        }).addTo(map);

        lineLayer = line; // Store the reference to the added line layer
        dashedLayer = dashedLine; // Store the reference to the added line layer
      }
    }

    // Cleanup function to remove the previous line layer
    return () => {
      if (lineLayer) {
        map.removeLayer(lineLayer);
      }
      if (dashedLayer) {
        map.removeLayer(dashedLayer);
      }
    };
  }, [map, realizacao]);

  // Add the linestring to the map if name inside features is equal to "realizacao"
  useEffect(() => {
    let lineLayers = []; // Array to store references to all added line layers
    let dashedLayers = []; // Array to store references to all added dashed line layers

    if (map && programa == "Asfalto liso" && realizacao) {
      // If realizacao is true, remove all line and dashed line layers
      lineLayers.forEach(layer => map.removeLayer(layer));
      dashedLayers.forEach(layer => map.removeLayer(layer));
      // Clear the arrays after removing the layers
      lineLayers = [];
      dashedLayers = [];
    } else {
      if (map && programa == "Asfalto liso" && realizacoesPrograma.length > 0) {
        // Add lineString for all realizacoes inside realizacoesPrograma array 
        realizacoesPrograma.forEach(realizacao => {
          const lineString = lineStringAsfaltoLiso.features.find(feature => feature.properties.name === realizacao);

          if (lineString) {
            // Directly use lineString.geometry without parsing
            const line = L.geoJSON(lineString.geometry, {
              style: {
                color: '#00B7EB',  // Boundary color
                weight: 10, // Boundary thickness
                opacity: 0.5,
              }
            }).addTo(map);
            // map.fitBounds(line.getBounds());

            // Create and add the dashed line
            const dashedLine = L.geoJSON(lineString.geometry, {
              style: {
                color: '#ffffff', // Dashed line color
                weight: 2, // Dashed line thickness, adjust as needed
                dashArray: '10, 20', // Pattern of dashes and gaps
              }
            }).addTo(map);

            lineLayers.push(line); // Store the reference to the added line layer
            dashedLayers.push(dashedLine); // Store the reference to the added dashed line layer
          }
        });
      }
    }

    // Cleanup function to remove all added line and dashed line layers
    return () => {
      lineLayers.forEach(layer => map.removeLayer(layer));
      dashedLayers.forEach(layer => map.removeLayer(layer));
    };
  }, [map, programa, realizacao, realizacoesPrograma]);

  // ------------------------------------------------------------


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
    setRealizacao(point.nome)
  };


  const [opened, setOpened] = useState(false);

  const createClusterCustomIcon = function (cluster) {
    return L.divIcon({
      html: `<span>${cluster.getChildCount()}</span>`,
      className: 'marker-cluster-custom',
      iconSize: L.point(40, 40, true),
    });
  };
  const createOldPointsClusterCustomIcon = function (cluster) {
    return L.divIcon({
      html: `<span>${cluster.getChildCount()}</span>`,
      className: 'marker-old-points-cluster-custom',
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
        eventHandlers={point.id_programa !== 'estações_alerta_rio' && point.id_programa !== 'câmeras' && point.id_programa !== 'sirenes' ? {
          click: () => onMarkerClick(point),
        } : {}}
      >
        {isDesktop() &&
          <CustomTooltip direction="right" offset={[-8, -2]} opacity={1} sticky>
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
                    component="div"
                    style={{
                      fontSize: point.image_url ? '1.2rem' : '1.08rem',
                      display: '-webkit-box',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      WebkitBoxOrient: 'vertical',
                      WebkitLineClamp: 2,
                      whiteSpace: 'normal',
                      wordWrap: 'break-word',
                      lineHeight: point.image_url ? '1.2' : '1',
                      backgroundColor: 'transparent',
                      marginBottom: point.image_url ? "" : "0px",
                    }}
                  >
                    {point.id_programa === 'rio_em_forma' ? `Rio em Forma - ${point.nome}` : point.nome}
                  </Typography>
                  {point.id_bairro && (
                    <Typography variant="body2" color="text.secondary" style={{ backgroundColor: 'transparent' }}>
                      Bairro: {toTitleCase(point.id_bairro ?? '')}
                    </Typography>
                  )}
                </CardContent>
              </CardActionArea>
            </CustomCard>
          </CustomTooltip>
        }
      </Marker>
    );
  }

  const resilienciaClimaticaPoints = points.filter(point => toSnakeCase('Resiliência Climática') === point.id_tema);
  const asfaltoLisoPoints = points.filter(point => toSnakeCase('Asfalto liso') === point.id_programa);
  const mobilidadePoints = points.filter(point => (toSnakeCase('Mobilidade') === point.id_tema) && (toSnakeCase('Asfalto liso') !== point.id_programa) && (toSnakeCase('Resiliência Climática') !== point.id_tema));
  const otherPoints = points.filter(point => (toSnakeCase('Mobilidade') !== point.id_tema) && (toSnakeCase('Asfalto liso') !== point.id_programa) && (point.gestao == "3") && (toSnakeCase('Resiliência Climática') !== point.id_tema));
  const oldPoints = points.filter(point => (toSnakeCase('Mobilidade') !== point.id_tema) && (toSnakeCase('Asfalto liso') !== point.id_programa) && (point.gestao != "3") && (toSnakeCase('Resiliência Climática') !== point.id_tema));

  const [userLocationCoords, setUserLocationCoords] = useState(null);
  const [isZoomed, setIsZoomed] = useState(false);

  useEffect(() => {
    if (!map) return;

    let watchId;

    if (userLocation) {
      watchId = navigator.geolocation.watchPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          const newCoords = { lat: latitude, lng: longitude };
          setUserLocationCoords(newCoords);
          if (!isZoomed) {
            map.setView(newCoords, 15);
            setIsZoomed(true);
          }
        },
        (error) => {
          console.error("Error watching position:", error);
        },
        {
          enableHighAccuracy: true,
          maximumAge: 0,
          timeout: 1000,
        }
      );
    }

    return () => {
      if (watchId) {
        navigator.geolocation.clearWatch(watchId);
      }
    };
  }, [map, userLocation, isZoomed]); // Include isZoomed in the dependency array

  const svg = `
<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 23 21">
  <style>
    @-webkit-keyframes anim-pulse {
      0% { opacity: 0; -webkit-transform: scale(.5); }
      10% { opacity: 1; }
      90% { opacity: 0; }
      100% { -webkit-transform: scale(1.25); }
    }
    .core { fill: #00B7EB; stroke: white; stroke-width: 1; } /* Adicionado borda branca */
    .ring {
      opacity: 0;
      stroke: #00B7EB;
      -webkit-transform-origin: center;
      -webkit-animation: anim-pulse 2s 1s infinite;
    }
  </style>
  <g id="marker">
    <circle class="core" cx="11.3" cy="10.5" r="3"/>
    <circle class="ring" fill="none" stroke="%23000" stroke-miterlimit="10" cx="11.3" cy="10.5" r="6"/>
  </g>
</svg>
`;

  // Encode the SVG to be used as a data URL
  const svgUrl = `data:image/svg+xml,${encodeURIComponent(svg)}`;

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
        smoothWheelZoom={true}
        smoothSensitivity={2}
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
          chunkedLoading
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
            // if (!isDesktop()) {
            //   if ((tema || bairro || subprefeitura || (gestao == "3" || gestao == "1_2_3")) && isBairroMatch && isTemaMatch && isProgramaMatch && isSubprefeituraMatch) {
            //     return renderMarker(point, index);
            //   }
            // } else {
            if (isBairroMatch && isTemaMatch && isProgramaMatch && isSubprefeituraMatch && (gestao == null || gestao == "3" || gestao == "1_2_3")) {
              return renderMarker(point, index);
            }
            // }


          })}
        </MarkerClusterGroup>

        <MarkerClusterGroup showCoverageOnHover={false}
          spiderfyDistanceMultiplier={2}
          iconCreateFunction={createOldPointsClusterCustomIcon}>
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
            if (isBairroMatch && isTemaMatch && isProgramaMatch && isSubprefeituraMatch && (gestao == "1_2" || gestao == "1_2_3")) {
              return renderMarker(point, index);
            }

          })}
        </MarkerClusterGroup>

        {tema == "Mobilidade" && mobilidadePoints.map((point, index) => {
          const isProgramaMatch = programa ? toSnakeCase(programa) === point.id_programa : true;
          // Render the marker for points with the "Mobilidade" theme
          if (isProgramaMatch && point.gestao == "3" && (gestao == "3" || gestao == "1_2_3" || gestao == null)) {
            return renderMarker(point, index);
          }
        })}

        {tema == "Mobilidade" && !programa && mobilidadePoints.map((point, index) => {
          if ((gestao == null || gestao == "3" || gestao == "1_2_3") && point.gestao == "3") {
            return renderMarker(point, index);
          }
        })}

        {tema == "Mobilidade" && !programa && mobilidadePoints.map((point, index) => {
          if ((gestao == "1_2" || gestao == "1_2_3") && point.gestao != "3") {
            return renderMarker(point, index);
          }
        })}


        {realizacao && points.map((point, index) => {
          if (realizacao === point.nome) {
            return renderMarker(point, index);
          }
        })}

        {programa == "Asfalto liso" && asfaltoLisoPoints.map((point, index) => {

          return renderMarker(point, index);

        })}

        <MarkerClusterGroup showCoverageOnHover={false}
          spiderfyDistanceMultiplier={2}
          iconCreateFunction={createClusterCustomIcon}>
          {resilienciaClimaticaPoints.map((point, index) => {

            // Verifica se o ponto corresponde ao bairro selecionado
            const isBairroMatch = bairro ? toSnakeCase(bairro) === point.id_bairro : true;

            // Verifica se o ponto corresponde ao subprefeitura selecionado
            const isSubprefeituraMatch = subprefeitura ? toSnakeCase(subprefeitura) === point.id_subprefeitura : true;

            // Verifica se o ponto corresponde ao tema selecionado
            const isTemaMatch = tema ? toSnakeCase(tema) === point.id_tema : true;

            const isProgramaMatch = programa ? toSnakeCase(programa) === point.id_programa : true;


            // Renderiza o marcador se corresponder ao bairro e aos demais
            if ((tema || bairro || subprefeitura) && isBairroMatch && isTemaMatch && isProgramaMatch && isSubprefeituraMatch) {
              return renderMarker(point, index);
            }

          })}
        </MarkerClusterGroup>

        {userLocation && userLocationCoords && (
          <Marker
            position={userLocationCoords}
            icon={L.icon({ iconUrl: svgUrl, iconSize: [45, 45], iconAnchor: [12, 41] })}
          >
            <CustomTooltip direction="right" offset={[20, -40]} opacity={1}>
              <Card style={{ padding: "10px" }}>
                <Typography style={{ fontSize: "0.9rem" }} >Você está aqui.</Typography>
              </Card>
            </CustomTooltip>
          </Marker>
        )}

      </MapContainer>
    </>
  );
};

export default Map;
