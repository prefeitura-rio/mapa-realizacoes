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
import { loadAllCidades, loadDadosAgregadosAbaTemaCidade } from "../../../redux/cidade/actions";

const MainUnderSearchContainer = (props) => {

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loadAllCidades());
    dispatch(loadDadosAgregadosAbaTemaCidade());
  }, []);

  return (
      <MainUnderSearchBar
        underSearchBar={props.underSearchBar}
        setUnderSearchBar={props.setUnderSearchBar}
        setDescriptionData={props.setDescriptionData}
        content={props.content}
        images_cidade={props.images_cidade}
        cidades={props.cidades}
        dadosAgregadosTema={props.dadosAgregadosTema}

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
    dadosAgregadosTema: state.cidades.dadosAgregadosAbaTemaCidade,
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
