// import PlaceDescriptionBar from "./PlaceDescriptionBar";
// import { setDescriptionData } from "./../../../redux/place/actions";
// import { setActiveBar, setPhotoGallery } from "./../../../redux/active/actions";
// import { connect, useDispatch } from "react-redux";
// import { loadComments } from "../../../redux/comments/actions";
// import { login } from "../../../redux/auth/actions";
// import { setImagesType } from "../../../redux/images/actions";

// import {
//   setAddComment,
//   setOpenEdit,
//   setOpenUploadPhoto,
//   setOpenCompletePhoto,
// } from "./../../../redux/active/actions";

// const PlaceDescriptionContainer = (props) => {
//   return (
//     <>
//       {props.content && (
//         <PlaceDescriptionBar
//         setActiveBar={props.setActiveBar}
//         content={props.content}
//         images={props.images}
//         setOpenEdit={props.setOpenEdit}
//         setOpenUploadPhoto={props.setOpenUploadPhoto}
//         profile={props.profile}
//         login={props.login}
//         anyLoading={props.anyLoading}
//         setPhotoGallery={props.setPhotoGallery}
//         setImagesType={props.setImagesType}
//         // setDescriptionData={props.setDescriptionData}
//           // loadComments={props.loadComments}
//           // places={props.places}
//           // comments={props.comments}
//           // setAddComment={props.setAddComment}
//         />
//       )}
//     </>
//   );
// };

// const mapStateToProps = (state) => {
//   return {
//     content: state.place.content,
//     images: state.images.images,
//     openCompletePhoto: state.active.openCompletePhoto,
//     profile: state.auth.profile,
//     anyLoading: state.places.loading || state.place.loading,
//     // places: state.places.places,
//     // descriptionData: state.place.descriptionData,
//     // comments: state.comments.all,
//   };
// };

// const mapDispatchToProps = {
//   setActiveBar,
//   setAddComment,
//   setOpenEdit,
//   setOpenUploadPhoto,
//   setOpenCompletePhoto,
//   loadComments,
//   login,
//   setPhotoGallery,
//   setImagesType,
// };

// export default connect(
//   mapStateToProps,
//   mapDispatchToProps
// )(PlaceDescriptionContainer);


import PlaceDescriptionBar from "./PlaceDescriptionBar";
import { setUnderSearchBar } from "../../../redux/active/actions";
import { connect, useDispatch } from "react-redux";
import { setShownMore } from "./../../../redux/active/actions";
import { Fade, Grow, Slide } from "@material-ui/core";
import { setDescriptionData } from "./../../../redux/place/actions";
import { loadData } from "./../../../redux/place/actions";
import {
  setOpenCompletePhoto, setActiveBar, setPhotoGallery
} from "./../../../redux/active/actions";
import { setImagesType } from "../../../redux/images/actions";
import { useEffect } from "react";
import { loadAllCidades, loadDadosAgregadosAbaProgramasCidade, loadDadosAgregadosAbaSumarioInfoBasicasCidade, loadDadosAgregadosAbaSumarioStatusEntregasCidade, loadDadosAgregadosAbaTemaCidade } from "../../../redux/cidade/actions";

const PlaceDescriptionContainer = (props) => {

  const dispatch = useDispatch();
  useEffect(() => {
    // dispatch(loadAllCidades());
    // dispatch(loadDadosAgregadosAbaSumarioInfoBasicasCidade());
    // dispatch(loadDadosAgregadosAbaSumarioStatusEntregasCidade());
    // dispatch(loadDadosAgregadosAbaTemaCidade());
    // dispatch(loadDadosAgregadosAbaProgramasCidade());
  }, []);

  return (
      <PlaceDescriptionBar
        underSearchBar={props.underSearchBar}
        content={props.content}
        images_cidade={props.images_cidade}
        cidades={props.cidades}
        dadosAgregadosAbaTemaCidade={props.dadosAgregadosAbaTemaCidade}
        dadosAgregadosAbaProgramasCidade={props.dadosAgregadosAbaProgramasCidade}
        dadosAgregadosAbaSumarioInfoBasicasCidade={props.dadosAgregadosAbaSumarioInfoBasicasCidade}
        dadosAgregadosAbaSumarioStatusEntregasCidade={props.dadosAgregadosAbaSumarioStatusEntregasCidade}
        setUnderSearchBar={props.setUnderSearchBar}
        setActiveBar={props.setActiveBar}
        setDescriptionData={props.setDescriptionData}
        loadData={props.loadData}
        

        // remove if not useful
        profile={props.profile}
        login={props.login}
        anyLoading={props.anyLoading}
        setPhotoGallery={props.setPhotoGallery}
        setImagesType={props.setImagesType}


        tema={props.tema}
        programa={props.programa}
        realizacao={props.realizacao}
      />
  );
};

const mapStateToProps = (state) => {
  return {
    underSearchBar: state.active.underSearchBar,
    content: state.place.content,
    cidades: state.cidades.all,
    dadosAgregadosAbaTemaCidade: state.cidades.dadosAgregadosAbaTemaCidade,
    dadosAgregadosAbaProgramasCidade: state.cidades.dadosAgregadosAbaProgramasCidade,
    dadosAgregadosAbaSumarioInfoBasicasCidade: state.cidades.dadosAgregadosAbaSumarioInfoBasicasCidade,
    dadosAgregadosAbaSumarioStatusEntregasCidade: state.cidades.dadosAgregadosAbaSumarioStatusEntregasCidade,
    images_cidade: state.images.allImagesCidade,
    profile: state.auth.profile,
    anyLoading: state.places.loading || state.place.loading,
    openCompletePhoto: state.active.openCompletePhoto,
    setImagesType: state.images.setImagesType,  


    tema: state.filtros.tema,
    programa: state.filtros.programa,
    realizacao: state.filtros.realizacao,
  };
};

const mapDispatchToProps = {
  setUnderSearchBar,
  setActiveBar,
  setDescriptionData,
  loadData,
  setPhotoGallery,
  setImagesType,
  setOpenCompletePhoto,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PlaceDescriptionContainer);
