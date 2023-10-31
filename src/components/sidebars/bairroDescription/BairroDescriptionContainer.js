import BairroDescriptionBar from "./BairroDescriptionBar";
import { setUnderSearchBar } from "../../../redux/active/actions";
import { connect, useDispatch } from "react-redux";

import { setDescriptionData } from "../../../redux/place/actions";
import { setActiveBar } from "../../../redux/active/actions";
import { useEffect } from "react";
import { loadBairroData, loadDadosAgregadosAbaSumarioStatusEntregasBairro, loadDadosAgregadosAbaTemaBairro } from "../../../redux/bairros/actions";
import { loadAllImagesBairro } from "../../../redux/images/actions";


const BairroDescriptionContainer = (props) => {

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loadBairroData());
    dispatch(loadAllImagesBairro());
    dispatch(loadDadosAgregadosAbaTemaBairro());
    dispatch(loadDadosAgregadosAbaSumarioStatusEntregasBairro());
  }, []);

  return (
      <BairroDescriptionBar
        underSearchBar={props.underSearchBar}
        setUnderSearchBar={props.setUnderSearchBar}
        setDescriptionData={props.setDescriptionData}
        images_bairro={props.images_bairro}
        bairro={props.bairro}
        dadosAgregadosAbaSumarioStatusEntregasBairro={props.dadosAgregadosAbaSumarioStatusEntregasBairro}
        dadosAgregadosAbaTemaBairro={props.dadosAgregadosAbaTemaBairro}

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
    descriptionData: state.bairros.descriptionData,
    bairro: state.bairros.content,
    dadosAgregadosAbaSumarioStatusEntregasBairro: state.bairros.dadosAgregadosAbaSumarioStatusEntregasBairro,
    images_bairro: state.images.allImagesBairro,
    dadosAgregadosAbaTemaBairro: state.bairros.dadosAgregadosAbaTemaBairro,
    profile: state.auth.profile,
    anyLoading: state.places.loading || state.place.loading,
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
)(BairroDescriptionContainer);
