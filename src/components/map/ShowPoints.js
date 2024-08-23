import React, { useCallback, useEffect, useState } from 'react';
import L from 'leaflet';
import {
  useMap,
  Marker,
  Tooltip,
} from "react-leaflet";
import useSupercluster from 'use-supercluster';
import { useDispatch, useSelector } from 'react-redux';
import { toSnakeCase, toTitleCase } from '../../utils/formatFile';
import { DESCRIPTION_BAR } from '../../redux/active/actions';
import { getIcon } from '../../icons/typeIcons';
import { useNavigate } from 'react-router-dom';
import './ShowPoints.css';
import { Card, CardActionArea, CardContent, CardMedia, styled, Typography } from '@material-ui/core';
import { isDesktop } from '../../redux/active/reducers';
import MarkerClusterGroup from 'react-leaflet-markercluster';

function ShowPoints({
  points,
  setActiveBar,
  setDescriptionData,
  loadData,
  setRota,
  tema,
  programa,
  realizacao,
  bairro,
  subprefeitura,
  currentClickedPoint,
  gestao,
  setRealizacao,
  userLocation,
  setCurrentClickedPoint
}) {
  const navigate = useNavigate();
  const maxZoom = 22;
  const [bounds, setBounds] = useState(null);
  const [zoom, setZoom] = useState(12);
  const map = useMap();

  const icons = {};
  const fetchIcon = (count, size) => {
    return L.divIcon({
      html: `<span>${count}</span>`,
      className: 'marker-cluster-custom-leaflet',
      iconSize: L.point(40, 40, true),
    });
  };

  const fetchOldIcon = (count, size) => {
    return L.divIcon({
      html: `<span>${count}</span>`,
      className: 'marker-old-points-cluster-custom-leaflet',
      iconSize: L.point(40, 40, true),
    });
  };

  const createClusterCustomIcon = function (cluster) {
    return L.divIcon({
      html: `<span>${cluster.getChildCount()}</span>`,
      className: 'marker-cluster-custom-leaflet',
      iconSize: L.point(40, 40, true),
    });
  };
  const createOldPointsClusterCustomIcon = function (cluster) {
    return L.divIcon({
      html: `<span>${cluster.getChildCount()}</span>`,
      className: 'marker-old-points-cluster-custom-leaflet',
      iconSize: L.point(40, 40, true),
    });
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

  const iconMapping = {
    "brts_transolímpica": "brts_transolimpicas_icon",
    "brts_transbrasil": "brts_transbrasil_icon",
    "brts_transoeste": "brts_transoeste_icon",
    "brts_transcarioca": "brts_transcarioca_icon",
    'estações_alerta_rio': 'estações_alerta_rio',
    'câmeras': 'câmeras',
    'sirenes': 'sirenes'
  };

  const onMarkerClick = (point) => {
    setDescriptionData(toSnakeCase(point.nome));
    setActiveBar(DESCRIPTION_BAR);
    loadData(toSnakeCase(point.nome));
    navigate(`/${toSnakeCase(point.nome)}`);
    if (map) {
      const currentZoom = map.getZoom();
      const targetZoom = currentZoom > 12 ? currentZoom : 13;
      map.setView(
        {
          lat: point?.coords?.latitude,
          lng: point?.coords?.longitude,
        },
        targetZoom
      );
    }
    setRota(toSnakeCase(point.nome));
    setCurrentClickedPoint(point);
    setRealizacao(point.nome);
  };

  const updateMap = useCallback(() => {
    const b = map.getBounds();
    setBounds([
      b.getSouthWest().lng,
      b.getSouthWest().lat,
      b.getNorthEast().lng,
      b.getNorthEast().lat,
    ]);
    setZoom(map.getZoom());
  }, [map]);

  useEffect(() => {
    updateMap();
    map.on('moveend', updateMap);
    return () => {
      map.off('moveend', updateMap);
    };
  }, [map, updateMap]);

  points = points || [];

  // Filtrar pontos para cada categoria
  const resilienciaClimaticaPoints = points.filter(point => (toSnakeCase('Resiliência Climática') === point.id_tema) && (point.gestao == "3"));
  const asfaltoLisoPoints = points.filter(point => toSnakeCase('Asfalto liso') === point.id_programa);
  const mobilidadePoints = points.filter(point => (toSnakeCase('Mobilidade') === point.id_tema) && (toSnakeCase('Asfalto liso') !== point.id_programa) && (toSnakeCase('Resiliência Climática') !== point.id_tema));
  const otherPoints = points.filter(point => (toSnakeCase('Mobilidade') !== point.id_tema) && (toSnakeCase('Asfalto liso') !== point.id_programa) && (point.gestao == "3") && (toSnakeCase('Resiliência Climática') !== point.id_tema));
  const oldPoints = points.filter(point => (toSnakeCase('Mobilidade') !== point.id_tema) && (toSnakeCase('Asfalto liso') !== point.id_programa) && (point.gestao != "3") && (toSnakeCase('Resiliência Climática') !== point.id_tema));


  const filteredResilienciaClimaticaPoints = resilienciaClimaticaPoints.filter(point => {
    const isBairroMatch = bairro ? toSnakeCase(bairro) === point.id_bairro : true;
    const isSubprefeituraMatch = subprefeitura ? toSnakeCase(subprefeitura) === point.id_subprefeitura : true;
    const isTemaMatch = tema ? toSnakeCase(tema) === point.id_tema : true;
    const isProgramaMatch = programa ? toSnakeCase(programa) === point.id_programa : true;

    return (tema || bairro || subprefeitura) && isBairroMatch && isTemaMatch && isProgramaMatch && isSubprefeituraMatch && (point.gestao != "1_2");
  });

  const filteredOtherPointsPoints = otherPoints.filter(point => {
    const isBairroMatch = bairro ? toSnakeCase(bairro) === point.id_bairro : true;
    const isSubprefeituraMatch = subprefeitura ? toSnakeCase(subprefeitura) === point.id_subprefeitura : true;
    const isTemaMatch = tema ? toSnakeCase(tema) === point.id_tema : true;
    const isProgramaMatch = programa ? toSnakeCase(programa) === point.id_programa : true;

    return isBairroMatch && isTemaMatch && isProgramaMatch && isSubprefeituraMatch && (gestao == null || gestao == "3" || gestao == "1_2_3");
  });

  const filteredOldPoints = oldPoints.filter(point => {
    const isBairroMatch = bairro ? toSnakeCase(bairro) === point.id_bairro : true;
    const isSubprefeituraMatch = subprefeitura ? toSnakeCase(subprefeitura) === point.id_subprefeitura : true;
    const isTemaMatch = tema ? toSnakeCase(tema) === point.id_tema : true;
    const isProgramaMatch = programa ? toSnakeCase(programa) === point.id_programa : true;

    return isBairroMatch && isTemaMatch && isProgramaMatch && isSubprefeituraMatch && (gestao == "1_2" || gestao == "1_2_3")
  });


  // Criar clusters para cada conjunto de pontos
  const resilienciaClimaticaClusters = useSupercluster({
    points: filteredResilienciaClimaticaPoints.map(point => ({
      type: 'Feature',
      properties: {
        cluster: false,
        pointId: point.id,
        category: point.category,
        pointData: point,
      },
      geometry: {
        type: 'Point',
        coordinates: [
          parseFloat(point.coords.longitude),
          parseFloat(point.coords.latitude),
        ],
      },
    })),
    bounds: bounds,
    zoom: zoom,
    options: { radius: 100, maxZoom: 17 },
  });

  const otherPointsClusters = useSupercluster({
    points: filteredOtherPointsPoints.map(point => ({
      type: 'Feature',
      properties: {
        cluster: false,
        pointId: point.id,
        category: point.category,
        pointData: point,
      },
      geometry: {
        type: 'Point',
        coordinates: [
          parseFloat(point.coords.longitude),
          parseFloat(point.coords.latitude),
        ],
      },
    })),
    bounds: bounds,
    zoom: zoom,
    options: { radius: 100, maxZoom: 17 },
  });

  const oldPointsClusters = useSupercluster({
    points: filteredOldPoints.map(point => ({
      type: 'Feature',
      properties: {
        cluster: false,
        pointId: point.id,
        category: point.category,
        pointData: point,
      },
      geometry: {
        type: 'Point',
        coordinates: [
          parseFloat(point.coords.longitude),
          parseFloat(point.coords.latitude),
        ],
      },
    })),
    bounds: bounds,
    zoom: zoom,
    options: { radius: 100, maxZoom: 17 },
  });

  const renderClusters = (clusters, supercluster, fetchIconFunction) => {
    //
    return (
      <MarkerClusterGroup
        spiderfyDistanceMultiplier={2}
        showCoverageOnHover={true}
        // with this value set to 0, we manage the cluster radius withe the use-supercluster lib
        maxClusterRadius={0}
        spiderfyOnMaxZoom={true}
        iconCreateFunction={fetchIconFunction == fetchIcon ? createClusterCustomIcon : createOldPointsClusterCustomIcon}>

        {clusters.map((cluster, index) => {
          const [longitude, latitude] = cluster.geometry.coordinates;
          const { cluster: isCluster, point_count: pointCount, pointData } = cluster.properties;

          if (isCluster) {
            return (
              <Marker
                key={`cluster-${cluster.id}`}
                position={[latitude, longitude]}
                icon={fetchIconFunction == fetchIcon ? fetchIcon(pointCount, 10 + (pointCount / points.length) * 40) : fetchOldIcon(pointCount, 10 + (pointCount / points.length) * 40)}
                eventHandlers={{
                  click: () => {
                    const expansionZoom = Math.min(
                      supercluster.getClusterExpansionZoom(cluster.id),
                      maxZoom
                    );
                    map.setView([latitude, longitude], expansionZoom, {
                      animate: true,
                    });
                  },
                }}
              />
            );
          }

          return renderMarker(pointData, index);
        })}
      </MarkerClusterGroup>
    );
  };

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
          <CustomTooltip direction="right" opacity={1} sticky>
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
                    {point.id_programa === 'rio_em_forma' ? `Rio em Forma - ${point.nome}` : point.id_tema == "educação_e_desenvolvimento" ? point.nome + " - " + toTitleCase(point.id_tipo) : point.nome}
                  </Typography>
                  {point.id_bairro && (
                    <Typography variant="body2" color="text.secondary" style={{ backgroundColor: 'transparent' }}>
                      Bairro: {toTitleCase(point.id_bairro ?? '')}
                    </Typography>
                  )}
                  {/* {point.id_tema == "educação_e_desenvolvimento" && (
                    <Typography variant="body2" color="text.secondary" style={{ backgroundColor: 'transparent' }}>
                      Tipo: {toTitleCase(point.id_tipo ?? '')}
                    </Typography>
                  )} */}
                </CardContent>
              </CardActionArea>
            </CustomCard>
          </CustomTooltip>
        }
      </Marker>
    );
  }

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
      {renderClusters(resilienciaClimaticaClusters.clusters, resilienciaClimaticaClusters.supercluster, fetchIcon)}
      {renderClusters(otherPointsClusters.clusters, otherPointsClusters.supercluster, fetchIcon)}
      {renderClusters(oldPointsClusters.clusters, oldPointsClusters.supercluster, fetchOldIcon)}
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

    </>
  );
}

export default ShowPoints;