import BairroDescriptionBar from "./BairroDescriptionBar";
import { setUnderSearchBar } from "../../../redux/active/actions";
import { connect, useDispatch } from "react-redux";

import { setDescriptionData } from "../../../redux/place/actions";
import { loadData } from "../../../redux/place/actions";
import { setActiveBar, setPhotoGallery} from "../../../redux/active/actions";
import { useEffect } from "react";
import { loadBairroData, loadDadosAgregadosAbaProgramaBairro, loadDadosAgregadosAbaSumarioStatusEntregasBairro, loadDadosAgregadosAbaTemaBairro } from "../../../redux/bairros/actions";
import { loadAllImagesBairro,setImagesType } from "../../../redux/images/actions";


const BairroDescriptionContainer = (props) => {

  // console.log("BairroDescriptionContainer.js props: ", props)

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loadBairroData(props.descriptionData));
    // dispatch(loadAllImagesBairro(props.descriptionData));
    // dispatch(loadDadosAgregadosAbaTemaBairro(props.descriptionData));
    // dispatch(loadDadosAgregadosAbaProgramaBairro(props.descriptionData));
    // dispatch(loadDadosAgregadosAbaSumarioStatusEntregasBairro(props.descriptionData));
  }, [props.descriptionData]);

  return (
      <BairroDescriptionBar
        underSearchBar={props.underSearchBar}
        images_bairro={props.images_bairro}
        bairro={props.bairro}
        dadosAgregadosAbaSumarioStatusEntregasBairro={props.dadosAgregadosAbaSumarioStatusEntregasBairro}
        dadosAgregadosAbaTemaBairro={props.dadosAgregadosAbaTemaBairro}
        dadosAgregadosAbaProgramaBairro={props.dadosAgregadosAbaProgramaBairro}
        setUnderSearchBar={props.setUnderSearchBar}
        setActiveBar={props.setActiveBar}
        setDescriptionData={props.setDescriptionData}
        loadData={props.loadData}
        setPhotoGallery={props.setPhotoGallery}
        setImagesType={props.setImagesType}
        tema={props.tema}
        programa={props.programa}
        
        // remove if not useful
        profile={props.profile}
        login={props.login}
        anyLoading={props.anyLoading}
        openedPopup={props.openedPopup}

      />
  );
};

const mapStateToProps = (state) => {
  return {
    underSearchBar: state.active.underSearchBar,
    activeBar: state.active.activeBar,
    descriptionData: state.bairros.descriptionData,
    // bairro: state.bairros.content,
    dadosAgregadosAbaSumarioStatusEntregasBairro: state.bairros.dadosAgregadosAbaSumarioStatusEntregasBairro,
    images_bairro: state.images.allImagesBairro,
    dadosAgregadosAbaTemaBairro: state.bairros.dadosAgregadosAbaTemaBairro,
    dadosAgregadosAbaProgramaBairro: state.bairros.dadosAgregadosAbaProgramaBairro,
    profile: state.auth.profile,
    anyLoading: state.places.loading || state.place.loading,
    setImagesType: state.images.setImagesType,  
    openedPopup: state.active.openedPopup,
    tema: state.filtros.tema,
    programa: state.filtros.programa,
    bairro: state.filtros.bairro,
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
)(BairroDescriptionContainer);
