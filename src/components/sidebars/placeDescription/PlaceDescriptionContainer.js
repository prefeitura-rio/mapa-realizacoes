import PlaceDescriptionBar from "./PlaceDescriptionBar";
import { setDescriptionData } from "./../../../redux/place/actions";
import { setActiveBar, setPhotoGallery } from "./../../../redux/active/actions";
import { connect, useDispatch } from "react-redux";
import { loadComments } from "../../../redux/comments/actions";
import { login } from "../../../redux/auth/actions";
import { setImagesType } from "../../../redux/images/actions";

import {
  setAddComment,
  setOpenEdit,
  setOpenUploadPhoto,
  setOpenCompletePhoto,
} from "./../../../redux/active/actions";

const PlaceDescriptionContainer = (props) => {
  return (
    <>
      {props.content && (
        <PlaceDescriptionBar
        setActiveBar={props.setActiveBar}
        content={props.content}
        images={props.images}
        setOpenEdit={props.setOpenEdit}
        setOpenUploadPhoto={props.setOpenUploadPhoto}
        profile={props.profile}
        login={props.login}
        anyLoading={props.anyLoading}
        setPhotoGallery={props.setPhotoGallery}
        setImagesType={props.setImagesType}
        // setDescriptionData={props.setDescriptionData}
          // loadComments={props.loadComments}
          // places={props.places}
          // comments={props.comments}
          // setAddComment={props.setAddComment}
        />
      )}
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    content: state.place.content,
    images: state.images.images,
    openCompletePhoto: state.active.openCompletePhoto,
    profile: state.auth.profile,
    anyLoading: state.places.loading || state.place.loading,
    // places: state.places.places,
    // descriptionData: state.place.descriptionData,
    // comments: state.comments.all,
  };
};

const mapDispatchToProps = {
  setActiveBar,
  setAddComment,
  setOpenEdit,
  setOpenUploadPhoto,
  setOpenCompletePhoto,
  loadComments,
  login,
  setPhotoGallery,
  setImagesType,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PlaceDescriptionContainer);
