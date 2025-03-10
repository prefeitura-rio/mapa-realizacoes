import PlaceDescriptionBar from "./PlaceDescriptionBar";
import { setUnderSearchBar } from "../../../redux/active/actions";
import { connect, useDispatch } from "react-redux";
import { setShownMore } from "./../../../redux/active/actions";
import { Fade, Grow, Slide } from "@material-ui/core";
import { setDescriptionData } from "./../../../redux/place/actions";
import { loadData } from "./../../../redux/place/actions";
import {
  setOpenCompletePhoto, setActiveBar, setPhotoGallery
} from "./../../../redux/active/actions";
import { setImagesType } from "../../../redux/images/actions";
import { useEffect } from "react";
import { loadAllCidades, loadDadosAgregadosAbaProgramasCidade, loadDadosAgregadosAbaSumarioInfoBasicasCidade, loadDadosAgregadosAbaSumarioStatusEntregasCidade, loadDadosAgregadosAbaTemaCidade } from "../../../redux/cidade/actions";
import { setPrograma, setTema } from "../../../redux/filtros/actions";

const PlaceDescriptionContainer = (props) => {

  const dispatch = useDispatch();
  useEffect(() => {
    // dispatch(loadAllCidades());
    // dispatch(loadDadosAgregadosAbaSumarioInfoBasicasCidade());
    // dispatch(loadDadosAgregadosAbaSumarioStatusEntregasCidade());
    // dispatch(loadDadosAgregadosAbaTemaCidade());
    // dispatch(loadDadosAgregadosAbaProgramasCidade());
  }, []);

  return (
    <PlaceDescriptionBar
      underSearchBar={props.underSearchBar}
      content={props.content}
      images_cidade={props.images_cidade}
      cidades={props.cidades}
      dadosAgregadosAbaTemaCidade={props.dadosAgregadosAbaTemaCidade}
      dadosAgregadosAbaProgramasCidade={props.dadosAgregadosAbaProgramasCidade}
      dadosAgregadosAbaSumarioInfoBasicasCidade={props.dadosAgregadosAbaSumarioInfoBasicasCidade}
      dadosAgregadosAbaSumarioStatusEntregasCidade={props.dadosAgregadosAbaSumarioStatusEntregasCidade}
      setUnderSearchBar={props.setUnderSearchBar}
      setActiveBar={props.setActiveBar}
      setDescriptionData={props.setDescriptionData}
      loadData={props.loadData}


      // remove if not useful
      profile={props.profile}
      login={props.login}
      anyLoading={props.anyLoading}
      setPhotoGallery={props.setPhotoGallery}
      setImagesType={props.setImagesType}


      tema={props.tema}
      programa={props.programa}
      realizacao={props.realizacao}
      error={props.error}
      openedPopup={props.openedPopup}
      rota={props.rota}
      activeBar={props.activeBar}
      setPrograma={props.setPrograma}
      setTema={props.setTema}
      programaData={props.programaData}
    />
  );
};

const mapStateToProps = (state) => {
  return {
    underSearchBar: state.active.underSearchBar,
    content: state.place.content,
    error: state.place.error,
    cidades: state.cidades.all,
    dadosAgregadosAbaTemaCidade: state.cidades.dadosAgregadosAbaTemaCidade,
    dadosAgregadosAbaProgramasCidade: state.cidades.dadosAgregadosAbaProgramasCidade,
    dadosAgregadosAbaSumarioInfoBasicasCidade: state.cidades.dadosAgregadosAbaSumarioInfoBasicasCidade,
    dadosAgregadosAbaSumarioStatusEntregasCidade: state.cidades.dadosAgregadosAbaSumarioStatusEntregasCidade,
    images_cidade: state.images.allImagesCidade,
    profile: state.auth.profile,
    anyLoading: state.places.loading || state.place.loading,
    openCompletePhoto: state.active.openCompletePhoto,
    setImagesType: state.images.setImagesType,
    activeBar: state.active.activeBar,



    tema: state.filtros.tema,
    programa: state.filtros.programa,
    realizacao: state.filtros.realizacao,
    openedPopup: state.active.openedPopup,
    rota: state.rota.rota,
    programaData: state.filtros.programaData,

  };
};

const mapDispatchToProps = {
  setUnderSearchBar,
  setActiveBar,
  setDescriptionData,
  loadData,
  setPhotoGallery,
  setImagesType,
  setOpenCompletePhoto,
  setPrograma,
  setTema,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PlaceDescriptionContainer);
