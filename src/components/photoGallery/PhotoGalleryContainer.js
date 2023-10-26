import { connect } from "react-redux";
import PhotoGallery from "./PhotoGallery";
import { setPhotoGallery } from "./../../redux/active/actions";
import { setOpenUploadPhoto } from "../../redux/active/actions";
import { TYPE_ALL_PHOTOS, setCurrentImg } from "../../redux/images/actions";
import { TYPE_ALL } from "../../redux/images/actions";
import { useEffect, useState } from "react";

const PhotoGalleryContainer = (props) => {
  const [images, setImages] = useState(props.allImagesCidade);
  const [title, setTitle] = useState(props.title);

  useEffect(() => {
    setImages(props.imagesType === TYPE_ALL_PHOTOS ? props.allImagesCidade : props.images);
    setTitle(props.imagesType === TYPE_ALL ? "All" : props.title);
  }, [props.imagesType, props.content, props.images]);

  return ((props.content && props.images) || props.allImagesCidade) &&
    props.photoGallery ? (
    <PhotoGallery
      title={title}
      images={images}
      setOpenUploadPhoto={props.setOpenUploadPhoto}
      photoGallery={props.photoGallery}
      setPhotoGallery={props.setPhotoGallery}
      currentImg={props.currentImg}
      setCurrentImg={props.setCurrentImg}
    />
  ) : null;
};

const mapStateToProps = (state) => {
  return {
    title: state.place.content?.nome,
    images: state.images.images,
    allImagesCidade: state.images.allImagesCidade,
    photoGallery: state.active.photoGallery,
    imagesType: state.images.imagesType,
    content: state.place.content,
    currentImg: state.images.currentImg,
  };
};

const mapDispatchToProps = {
  setPhotoGallery,
  setOpenUploadPhoto,
  setCurrentImg,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PhotoGalleryContainer);
