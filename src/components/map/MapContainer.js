import Map from "./Map";
import { setZoomDelta } from "../../redux/actions";
import { connect, useDispatch } from "react-redux";
import { setOpenEditInfo } from "./../../redux/active/actions";
import { setContent, setContentSnapshot } from "./../../redux/place/actions";
import { useEffect } from "react";
// import { loadAllPoints } from "../../redux/points/actions";
import { setDescriptionData } from "./../../redux/place/actions";
import { setActiveBar, setUnderSearchBar } from "./../../redux/active/actions";
import { setRota } from "./../../redux/rota/actions";
import { loadData } from "../../redux/place/actions";
import { loadAllCidades } from "../../redux/cidade/actions";
import { loadAllPlaces } from "../../redux/places/actions";
import { useParams } from "react-router-dom"

const MapContainer = (props) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loadAllPlaces());
  }, []);

  const { id } = useParams();

  return (
    <Map
      zoomDelta={props.zoomDelta}
      setZoomDelta={props.setZoomDelta}
      setOpenEditInfo={props.setOpenEditInfo}
      setContent={props.setContent}
      setContentSnapshot={props.setContentSnapshot}
      points={props.points}
      setDescriptionData={props.setDescriptionData}
      setActiveBar={props.setActiveBar}
      loadData={props.loadData}
      loadAllPlaces={props.loadAllPlaces}
      setUnderSearchBar={props.setUnderSearchBar}
      currentCoords={props.currentCoords}
      profile={props.profile}
      filtros={props.filtros}	
      bairroNome={props.bairroNome}	
      subprefeituraNome={props.subprefeituraNome?.nome}	
      realizacaoId = {id}
      rota = {props.rota}
      setRota = {props.setRota}
      underSearchBar = {props.underSearchBar}
    />
  );
};

const mapStateToProps = (state) => {
  return {
    zoomDelta: state.app.zoomDelta,
    points: state.places.allPlaces,
    currentCoords: state.map.coords,
    profile: state.auth.profile,
    filtros: state.filtros.filtros,
    bairroNome: state.bairros.descriptionData,
    subprefeituraNome: state.subprefeituras.content,
    rota: state.rota,
    underSearchBar: state.active.underSearchBar
  };
};

const mapDispatchToProps = {
  setZoomDelta,
  setOpenEditInfo,
  setContent,
  setContentSnapshot,
  setActiveBar,
  setDescriptionData,
  loadData,
  setUnderSearchBar,
  loadAllPlaces,
  setRota
};

export default connect(mapStateToProps, mapDispatchToProps)(MapContainer);
