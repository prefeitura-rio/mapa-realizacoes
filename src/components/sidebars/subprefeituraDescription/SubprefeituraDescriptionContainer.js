import SubprefeituraDescriptionBar from "./SubprefeituraDescriptionBar";
import { setUnderSearchBar } from "../../../redux/active/actions";
import { connect, useDispatch } from "react-redux";

import { setDescriptionData } from "../../../redux/place/actions";
import { setActiveBar } from "../../../redux/active/actions";
import { useEffect } from "react";
import { loadSubprefeituraData } from "../../../redux/subprefeituras/actions";


const SubprefeituraDescriptionContainer = (props) => {

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loadSubprefeituraData());
  }, []);

  return (
      <SubprefeituraDescriptionBar
        underSearchBar={props.underSearchBar}
        setUnderSearchBar={props.setUnderSearchBar}
        setDescriptionData={props.setDescriptionData}
        images={props.images}
        subprefeitura={props.subprefeitura}

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
    images: state.images.images,
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
)(SubprefeituraDescriptionContainer);
