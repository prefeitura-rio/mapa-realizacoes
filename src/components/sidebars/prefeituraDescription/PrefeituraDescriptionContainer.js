import PrefeituraDescriptionBar from "./PrefeituraDescriptionBar";
import { setUnderSearchBar } from "../../../redux/active/actions";
import { connect, useDispatch } from "react-redux";

import { setDescriptionData } from "../../../redux/place/actions";
import { setActiveBar } from "../../../redux/active/actions";
import { useEffect } from "react";
import { loadAllCidades } from "../../../redux/cidade/actions";
import PrefeituraDescriptionBar from "./PrefeituraDescriptionBar";
import PrefeituraDescriptionBar from "./PrefeituraDescriptionBar";

const MainUnderSearchContainer = (props) => {

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loadAllCidades());
  }, []);

  return (
      <PrefeituraDescriptionBar
        underSearchBar={props.underSearchBar}
        setUnderSearchBar={props.setUnderSearchBar}
        setDescriptionData={props.setDescriptionData}
        content={props.content}
        images={props.images}
        cidades={props.cidades}

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
)(MainUnderSearchContainer);