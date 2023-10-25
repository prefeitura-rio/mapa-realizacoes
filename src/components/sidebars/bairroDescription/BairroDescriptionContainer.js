import BairroDescriptionBar from "./BairroDescriptionBar";
import { setUnderSearchBar } from "../../../redux/active/actions";
import { connect, useDispatch } from "react-redux";

import { setDescriptionData } from "../../../redux/place/actions";
import { setActiveBar } from "../../../redux/active/actions";
import { useEffect } from "react";
import { loadBairroData } from "../../../redux/bairros/actions";


const BairroDescriptionContainer = (props) => {

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loadBairroData());
  }, []);

  return (
      <BairroDescriptionBar
        underSearchBar={props.underSearchBar}
        setUnderSearchBar={props.setUnderSearchBar}
        setDescriptionData={props.setDescriptionData}
        content={props.content}
        images={props.images}
        bairros={props.bairros}

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
    // content: state.place.content,
    bairros: state.bairros.all,
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
)(BairroDescriptionContainer);
