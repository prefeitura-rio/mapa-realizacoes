import SubprefeituraDescriptionBar from "./SubprefeituraDescriptionBar";
import { setUnderSearchBar } from "../../../redux/active/actions";
import { connect, useDispatch } from "react-redux";

import { setDescriptionData } from "../../../redux/place/actions";
import { setActiveBar } from "../../../redux/active/actions";
import { useEffect } from "react";
import { loadDadosAgregadosAbaProgramasSubprefeitura, loadDadosAgregadosAbaSumarioInfoBasicasSubprefeitura, loadDadosAgregadosAbaSumarioStatusEntregasSubprefeitura, loadDadosAgregadosAbaTemaSubprefeitura, loadSubprefeituraData } from "../../../redux/subprefeituras/actions";
import { loadAllImagesSubprefeitura } from "../../../redux/images/actions";


const SubprefeituraDescriptionContainer = (props) => {

  console.log("SubprefeituraDescriptionContainer.js props: ", props)

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loadSubprefeituraData(props.descriptionData));
    dispatch(loadAllImagesSubprefeitura(props.descriptionData));
    dispatch(loadDadosAgregadosAbaSumarioInfoBasicasSubprefeitura(props.descriptionData));
    dispatch(loadDadosAgregadosAbaSumarioStatusEntregasSubprefeitura(props.descriptionData));
    dispatch(loadDadosAgregadosAbaTemaSubprefeitura(props.descriptionData));
    dispatch(loadDadosAgregadosAbaProgramasSubprefeitura(props.descriptionData));
  }, []);

  return (
      <SubprefeituraDescriptionBar
        underSearchBar={props.underSearchBar}
        setUnderSearchBar={props.setUnderSearchBar}
        setDescriptionData={props.setDescriptionData}
        images_subprefeitura={props.images_subprefeitura}
        subprefeituras={props.subprefeituras}
        dadosAgregadosAbaTemaSubprefeitura={props.dadosAgregadosAbaTemaSubprefeitura}
        dadosAgregadosAbaProgramasSubprefeitura={props.dadosAgregadosAbaProgramasSubprefeitura}
        dadosAgregadosAbaSumarioInfoBasicasSubprefeitura={props.dadosAgregadosAbaSumarioInfoBasicasSubprefeitura}
        dadosAgregadosAbaSumarioStatusEntregasSubprefeitura={props.dadosAgregadosAbaSumarioStatusEntregasSubprefeitura}
       
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
    subprefeituras: state.subprefeituras.content,
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
