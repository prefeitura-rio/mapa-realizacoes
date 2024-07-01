import SubprefeituraDescriptionBar from "./SubprefeituraDescriptionBar";
import { setUnderSearchBar } from "../../../redux/active/actions";
import { connect, useDispatch } from "react-redux";

import { setDescriptionData } from "../../../redux/place/actions";
import { loadData } from "../../../redux/place/actions";
import { setActiveBar,setPhotoGallery } from "../../../redux/active/actions";
import { useEffect } from "react";
import { loadDadosAgregadosAbaProgramasSubprefeitura, loadDadosAgregadosAbaSumarioInfoBasicasSubprefeitura, loadDadosAgregadosAbaSumarioStatusEntregasSubprefeitura, loadDadosAgregadosAbaTemaSubprefeitura, loadSubprefeituraData } from "../../../redux/subprefeituras/actions";
import { loadAllImagesSubprefeitura,setImagesType } from "../../../redux/images/actions";


const SubprefeituraDescriptionContainer = (props) => {

  // console.log("SubprefeituraDescriptionContainer.js props: ", props)

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loadSubprefeituraData(props.descriptionData));
    // dispatch(loadAllImagesSubprefeitura(props.descriptionData));
    // dispatch(loadDadosAgregadosAbaSumarioInfoBasicasSubprefeitura(props.descriptionData));
    // dispatch(loadDadosAgregadosAbaSumarioStatusEntregasSubprefeitura(props.descriptionData));
    // dispatch(loadDadosAgregadosAbaTemaSubprefeitura(props.descriptionData));
    // dispatch(loadDadosAgregadosAbaProgramasSubprefeitura(props.descriptionData));
  }, [props.descriptionData]);

  return (
      <SubprefeituraDescriptionBar
        underSearchBar={props.underSearchBar}
        images_subprefeitura={props.images_subprefeitura}
        subprefeitura={props.subprefeitura}
        dadosAgregadosAbaTemaSubprefeitura={props.dadosAgregadosAbaTemaSubprefeitura}
        dadosAgregadosAbaProgramasSubprefeitura={props.dadosAgregadosAbaProgramasSubprefeitura}
        dadosAgregadosAbaSumarioInfoBasicasSubprefeitura={props.dadosAgregadosAbaSumarioInfoBasicasSubprefeitura}
        dadosAgregadosAbaSumarioStatusEntregasSubprefeitura={props.dadosAgregadosAbaSumarioStatusEntregasSubprefeitura}
        setUnderSearchBar={props.setUnderSearchBar}
        setActiveBar={props.setActiveBar}
        setDescriptionData={props.setDescriptionData}
        loadData={props.loadData}
        setPhotoGallery={props.setPhotoGallery}
        setImagesType={props.setImagesType}
        openedPopup={props.openedPopup}
        tema={props.tema}
        programa={props.programa}

        // remove if not useful
        profile={props.profile}
        login={props.login}
        anyLoading={props.anyLoading}
      />
  );
};

const mapStateToProps = (state) => {
  return {
    underSearchBar: state.active.underSearchBar,
    activeBar: state.active.activeBar,
    descriptionData: state.subprefeituras.descriptionData,
    subprefeitura: state.subprefeituras.content?.nome,
    images_subprefeitura: state.images.allImagesSubprefeitura,
    profile: state.auth.profile,
    anyLoading: state.places.loading || state.place.loading,
    dadosAgregadosAbaTemaSubprefeitura: state.subprefeituras.dadosAgregadosAbaTemaSubprefeitura,
    dadosAgregadosAbaProgramasSubprefeitura: state.subprefeituras.dadosAgregadosAbaProgramasSubprefeitura,
    dadosAgregadosAbaSumarioInfoBasicasSubprefeitura: state.subprefeituras.dadosAgregadosAbaSumarioInfoBasicasSubprefeitura,
    dadosAgregadosAbaSumarioStatusEntregasSubprefeitura: state.subprefeituras.dadosAgregadosAbaSumarioStatusEntregasSubprefeitura,
    setImagesType: state.images.setImagesType,  
    subprefeitura: state.filtros.subprefeitura,
    openedPopup: state.active.openedPopup,
    tema: state.filtros.tema,
    programa: state.filtros.programa,
    
  };
};

const mapDispatchToProps = {
  setUnderSearchBar,
  setActiveBar,
  setDescriptionData,
  loadData,
  setPhotoGallery,
  setImagesType,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SubprefeituraDescriptionContainer);
