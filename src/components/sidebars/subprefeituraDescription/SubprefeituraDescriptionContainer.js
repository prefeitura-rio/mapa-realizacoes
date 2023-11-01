import SubprefeituraDescriptionBar from "./SubprefeituraDescriptionBar";
import { setUnderSearchBar } from "../../../redux/active/actions";
import { connect, useDispatch } from "react-redux";

import { setDescriptionData } from "../../../redux/place/actions";
import { setActiveBar } from "../../../redux/active/actions";
import { useEffect } from "react";
import { loadDadosAgregadosAbaProgramasSubprefeitura, loadDadosAgregadosAbaSumarioInfoBasicasSubprefeitura, loadDadosAgregadosAbaSumarioStatusEntregasSubprefeitura, loadDadosAgregadosAbaTemaSubprefeitura, loadSubprefeituraData } from "../../../redux/subprefeituras/actions";
import { loadAllImagesSubprefeitura } from "../../../redux/images/actions";


const SubprefeituraDescriptionContainer = (props) => {

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loadSubprefeituraData());
    dispatch(loadAllImagesSubprefeitura());
    dispatch(loadDadosAgregadosAbaSumarioInfoBasicasSubprefeitura());
    dispatch(loadDadosAgregadosAbaSumarioStatusEntregasSubprefeitura());
    dispatch(loadDadosAgregadosAbaTemaSubprefeitura());
    dispatch(loadDadosAgregadosAbaProgramasSubprefeitura());
  }, []);

  return (
      <SubprefeituraDescriptionBar
        underSearchBar={props.underSearchBar}
        setUnderSearchBar={props.setUnderSearchBar}
        setDescriptionData={props.setDescriptionData}
        images_subprefeitura={props.images_subprefeitura}
        subprefeitura={props.subprefeitura}
        dadosAgregadosAbaTemaSubprefeitura={props.dadosAgregadosAbaTemaSubprefeitura}
        dadosAgregadosAbaProgramasSubdadosAgregadosAbaTemaSubprefeitura={props.dadosAgregadosAbaProgramasSubdadosAgregadosAbaTemaSubprefeitura}
        dadosAgregadosAbaSumarioInfoBasicasSubdadosAgregadosAbaTemaSubprefeitura={props.dadosAgregadosAbaSumarioInfoBasicasSubdadosAgregadosAbaTemaSubprefeitura}
        dadosAgregadosAbaSumarioStatusEntregasSubdadosAgregadosAbaTemaSubprefeitura={props.dadosAgregadosAbaSumarioStatusEntregasSubdadosAgregadosAbaTemaSubprefeitura}

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
    descriptionData: state.subprefeituras.descriptionData,
    subprefeitura: state.subprefeituras.content,
    images_subprefeitura: state.images.allImagesSubprefeitura,
    profile: state.auth.profile,
    anyLoading: state.places.loading || state.place.loading,
    dadosAgregadosAbaTemaSubprefeitura: state.subprefeituras.dadosAgregadosAbaTemaSubprefeitura,
    dadosAgregadosAbaProgramasSubprefeitura: state.subprefeituras.dadosAgregadosAbaProgramasSubprefeitura,
    dadosAgregadosAbaSumarioInfoBasicasSubprefeitura: state.subprefeituras.dadosAgregadosAbaSumarioInfoBasicasSubprefeitura,
    dadosAgregadosAbaSumarioStatusEntregasSubprefeitura: state.subprefeituras.dadosAgregadosAbaSumarioStatusEntregasSubprefeitura,
    
  };
};

const mapDispatchToProps = {
  setUnderSearchBar,
  setActiveBar,
  setDescriptionData
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SubprefeituraDescriptionContainer);
