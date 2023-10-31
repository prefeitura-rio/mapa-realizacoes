import MainUnderSearchBar from "./MainUnderSearchBar";
import { setUnderSearchBar } from "../../../redux/active/actions";
import { connect, useDispatch } from "react-redux";
import { setShownMore } from "./../../../redux/active/actions";
import { Fade, Grow, Slide } from "@material-ui/core";
import { setDescriptionData } from "./../../../redux/place/actions";
import {
  setOpenCompletePhoto, setActiveBar, setPhotoGallery
} from "./../../../redux/active/actions";
import { setImagesType } from "../../../redux/images/actions";
import { useEffect } from "react";
import { loadAllCidades, loadDadosAgregadosAbaProgramasCidade, loadDadosAgregadosAbaSumarioInfoBasicasCidade, loadDadosAgregadosAbaSumarioStatusEntregasCidade, loadDadosAgregadosAbaTemaCidade } from "../../../redux/cidade/actions";

const MainUnderSearchContainer = (props) => {

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loadAllCidades());
    dispatch(loadDadosAgregadosAbaSumarioInfoBasicasCidade());
    dispatch(loadDadosAgregadosAbaSumarioStatusEntregasCidade());
    dispatch(loadDadosAgregadosAbaTemaCidade());
    dispatch(loadDadosAgregadosAbaProgramasCidade());
  }, []);

  return (
      <MainUnderSearchBar
        underSearchBar={props.underSearchBar}
        setUnderSearchBar={props.setUnderSearchBar}
        setDescriptionData={props.setDescriptionData}
        content={props.content}
        images_cidade={props.images_cidade}
        cidades={props.cidades}
        dadosAgregadosAbaTemaCidade={props.dadosAgregadosAbaTemaCidade}
        dadosAgregadosAbaProgramasCidade={props.dadosAgregadosAbaProgramasCidade}
        dadosAgregadosAbaSumarioInfoBasicasCidade={props.dadosAgregadosAbaSumarioInfoBasicasCidade}
        dadosAgregadosAbaSumarioStatusEntregasCidade={props.dadosAgregadosAbaSumarioStatusEntregasCidade}

        // remove if not useful
        profile={props.profile}
        login={props.login}
        anyLoading={props.anyLoading}
        setPhotoGallery={props.setPhotoGallery}
        setImagesType={props.setImagesType}
      />
  );
};

const mapStateToProps = (state) => {
  return {
    underSearchBar: state.active.underSearchBar,
    activeBar: state.active.activeBar,
    descriptionData: state.place.descriptionData,
    content: state.place.content,
    cidades: state.cidades.all,
    dadosAgregadosAbaTemaCidade: state.cidades.dadosAgregadosAbaTemaCidade,
    dadosAgregadosAbaProgramasCidade: state.cidades.dadosAgregadosAbaProgramasCidade,
    dadosAgregadosAbaSumarioInfoBasicasCidade: state.cidades.dadosAgregadosAbaSumarioInfoBasicasCidade,
    dadosAgregadosAbaSumarioStatusEntregasCidade: state.cidades.dadosAgregadosAbaSumarioStatusEntregasCidade,
    images_cidade: state.images.allImagesCidade,
    profile: state.auth.profile,
    anyLoading: state.places.loading || state.place.loading,
    openCompletePhoto: state.active.openCompletePhoto,
  };
};

const mapDispatchToProps = {
  setUnderSearchBar,
  setActiveBar,
  setDescriptionData,
  setPhotoGallery,
  setImagesType,
  setOpenCompletePhoto,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MainUnderSearchContainer);
