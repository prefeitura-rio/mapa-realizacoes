//
import { useEffect, useState } from "react";
import { Divider, makeStyles } from "@material-ui/core";

import CreateOutlinedIcon from "@material-ui/icons/CreateOutlined";

import CameraAltOutlinedIcon from "@material-ui/icons/CameraAltOutlined";
import PhotoCards from "./../../inlines/PhotoCards";
import ListInfo from "./../../inlines/ListInfo";
import BasicInfo from "./../../inlines/BasicInfo";
import HeaderBar from "./../../inlines/HeaderBar";
import BottomButton from "./../../inlines/BottomButton";

const useStyles = makeStyles((theme) => ({
  topImage: {
    overflow: "hidden",
    width: "100%",
    objectFit: "cover",
    height: "100%",
    borderBottomLeftRadius: "15px",
    borderBottomRightRadius: "15px",
  },

  listInfo: {
    padding: "6px 0",
  },

  photos: {
    // padding: "12px",
  },

  directoryInput: {
    border: "1px solid",
    boxSizing: "border-box",
    borderRadius: "8px",
    borderColor: "rgba(0, 0, 0, 0.23)",
    padding: "0 16px",
    marginBottom: "8px",
    height: "36px",

    "&:focus": {
      border: "2px solid",
      padding: "0 15px",
      borderColor: theme.palette.primary.main,
    },
  },

  directoryFilters: {
    padding: "0 5%",
  },

  directoryInputWrapper: {
    width: "97%",
    margin: "0 1.5%",
  },

  iconButton: {
    border: "1px solid blue",
    fontSize: "1rem",
  },

  subheaderButton: {
    borderRadius: "100px",
    padding: "5px 15px",
    minWidth: "35px",
  },
  // searchShadow: {
  //   position: "fixed",
  //   width: "423px",
  //   height: "80px",
  //   background: "-webkit-linear-gradient(rgba(0,0,0,0.25),rgba(0,0,0,0))",
  // },
  signInButton: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    margin: "8px",
    whiteSpace: "nowrap",
  },
  addPhoto: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    margin: "8px",
    whiteSpace: "nowrap",
  },
  bottomInfo:{
    marginBottom:"80px"
  }
}));

const PlaceDescriptionBar = ({
  content,
  images,
  setOpenEdit,
  setOpenUploadPhoto,
  profile,
  login,
  setPhotoGallery,
  setImagesType
}) => {
  const [imagesList, setImagesList] = useState(images);
  const classes = useStyles();

  useEffect(() => {
  setImagesList(images);
  setTopImgSrc(images.length > 0 ? images[0] : "https://maps.gstatic.com/tactile/pane/default_geocode-2x.png");
}, [images]);

  const handleOpenEdit = () => {
    setOpenEdit(true);
  };

  const handleOpenUploadPhoto = () => {
    setOpenUploadPhoto(true);
  };

  const [topImgSrc, setTopImgSrc] = useState(
    imagesList[0] ||
      "https://maps.gstatic.com/tactile/pane/default_geocode-2x.png"
  );

  const onTopImageError = () => {
    setTopImgSrc(
      "https://maps.gstatic.com/tactile/pane/default_geocode-2x.png"
    );
  };

  return (
    <div className={classes.root}>
      <div className={classes.searchShadow}></div>
      <img
        src={topImgSrc}
        onError={onTopImageError}
        alt="top image"
        className={classes.topImage}
      />
      <BasicInfo content={content} />
      <Divider />
      <div className={classes.listInfo}>
        <ListInfo content={content} />
          
        <br></br>
        {}
        {profile ? (
          <BottomButton
            title="Editar informações"
            startIcon={CreateOutlinedIcon}
            onClick={handleOpenEdit}
          />
        ) : (
          <div className={classes.signInButton}>
            <BottomButton onClick={login}
            title= "Faça login para editar"/>
          </div>
        )}

      </div>
     
      <Divider />
      <div className={classes.photos}>
        <HeaderBar title="Fotos" />
        <PhotoCards images={imagesList} setPhotoGallery={setPhotoGallery} setImagesType={setImagesType}/>
        {profile ? (
           <div className={classes.addPhoto}> 
          <BottomButton
            title="Adicionar uma foto"
            startIcon={CameraAltOutlinedIcon}
            onClick={handleOpenUploadPhoto}
          />
          </div>
        ) : (
          <div className={classes.signInButton}>           
            <BottomButton title="Faça login para editar" color="primary" variant="outlined" onClick={login}/>
          </div>
        )}

      </div>
      <div className={classes.bottomInfo}></div>
      <Divider/>
     
    </div>
  );
};

export default PlaceDescriptionBar;
