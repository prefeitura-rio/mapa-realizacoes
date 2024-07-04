import Map from "./Map";
import { setZoomDelta } from "../../redux/actions";
import { connect, useDispatch } from "react-redux";
import { setCurrentClickedPoint, setOpenEditInfo, setOpenedPopup } from "./../../redux/active/actions";
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
    props.loadAllPlaces();
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
      tema = {props.tema}
      programa = {props.programa}
      realizacao = {props.realizacao}
      bairro = {props.bairro}
      subprefeitura = {props.subprefeitura}
      zoomDefault={props.zoomDefault}
      currentClickedPoint={props.currentClickedPoint}
      setOpenedPopup={props.setOpenedPopup}
      gestao = {props.gestao}
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
    rota: state.rota.rota,
    underSearchBar: state.active.underSearchBar,
    tema: state.filtros.tema,
    programa: state.filtros.programa,
    realizacao: state.filtros.realizacao,
    bairro: state.filtros.bairro,
    subprefeitura: state.filtros.subprefeitura,
    zoomDefault: state.app.zoomDefault,
    currentClickedPoint: state.active.currentClickedPoint,
    gestao: state.active.gestao
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
  setRota,
  setOpenedPopup,
};

export default connect(mapStateToProps, mapDispatchToProps)(MapContainer);
