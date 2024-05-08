// //
// import { useEffect, useState } from "react";
// import { Divider, Typography, makeStyles } from "@material-ui/core";

// import CreateOutlinedIcon from "@material-ui/icons/CreateOutlined";

// import CameraAltOutlinedIcon from "@material-ui/icons/CameraAltOutlined";
// import PhotoCards from "./../../inlines/PhotoCards";
// import ListInfo from "./../../inlines/ListInfo";
// import BasicInfo from "./../../inlines/BasicInfo";
// import HeaderBar from "./../../inlines/HeaderBar";
// import BottomButton from "./../../inlines/BottomButton";
// import PlaceHolder from "../../assets/placeholder_blue.jpg"

// const useStyles = makeStyles((theme) => ({
//   topImage: {
//     overflow: "hidden",
//     width: "100%",
//     objectFit: "cover",
//     height: "100%",
//     borderBottomLeftRadius: "15px",
//     borderBottomRightRadius: "15px",
//   },

//   listInfo: {
//     padding: "6px 0",
//   },

//   photos: {
//     // padding: "12px",
//   },
//   title:{
//     fontSize: "15px",
//     fontWeight: "bold",
//     padding: "4px 24px 9px 24px",
//   },

//   directoryInput: {
//     border: "1px solid",
//     boxSizing: "border-box",
//     borderRadius: "8px",
//     borderColor: "rgba(0, 0, 0, 0.23)",
//     padding: "0 16px",
//     marginBottom: "8px",
//     height: "36px",

//     "&:focus": {
//       border: "2px solid",
//       padding: "0 15px",
//       borderColor: theme.palette.primary.main,
//     },
//   },

//   directoryFilters: {
//     padding: "0 5%",
//   },

//   directoryInputWrapper: {
//     width: "97%",
//     margin: "0 1.5%",
//   },

//   iconButton: {
//     border: "1px solid blue",
//     fontSize: "1rem",
//   },

//   subheaderButton: {
//     borderRadius: "100px",
//     padding: "5px 15px",
//     minWidth: "35px",
//   },
//   // searchShadow: {
//   //   position: "fixed",
//   //   width: "423px",
//   //   height: "80px",
//   //   background: "-webkit-linear-gradient(rgba(0,0,0,0.25),rgba(0,0,0,0))",
//   // },
//   signInButton: {
//     display: "flex",
//     justifyContent: "center",
//     alignItems: "center",
//     margin: "8px",
//     whiteSpace: "nowrap",
//   },
//   addPhoto: {
//     display: "flex",
//     justifyContent: "center",
//     alignItems: "center",
//     margin: "8px",
//     whiteSpace: "nowrap",
//   },
//   bottomInfo:{
//     marginBottom:"80px"
//   }
// }));

// const PlaceDescriptionBar = ({
//   content,
//   images,
//   setOpenEdit,
//   setOpenUploadPhoto,
//   profile,
//   login,
//   setPhotoGallery,
//   setImagesType
// }) => {
//   const [imagesList, setImagesList] = useState(images);
//   const classes = useStyles();

//   useEffect(() => {
//   setImagesList(images);
//   setTopImgSrc(images.length > 0 ? images[0] : PlaceHolder);
// }, [images]);

//   const handleOpenEdit = () => {
//     setOpenEdit(true);
//   };

//   const handleOpenUploadPhoto = () => {
//     setOpenUploadPhoto(true);
//   };

//   const [topImgSrc, setTopImgSrc] = useState(
//     imagesList[0] ||
//       PlaceHolder
//   );

//   const onTopImageError = () => {
//     setTopImgSrc(
//       PlaceHolder
//     );
//   };

//   return (
//     <div className={classes.root}>
//       <div className={classes.searchShadow}></div>
//       <img
//         src={topImgSrc}
//         onError={onTopImageError}
//         alt="top image"
//         className={classes.topImage}
//       />
//       <BasicInfo content={content} />
//       <Divider />
//       <div className={classes.listInfo}>
//         <ListInfo content={content} />

//         <br></br>
//         {}
//         {/* {profile ? (
//           <BottomButton
//             title="Editar informações"
//             startIcon={CreateOutlinedIcon}
//             onClick={handleOpenEdit}
//           />
//         ) : (
//           <div className={classes.signInButton}>
//             <BottomButton onClick={login}
//             title= "Faça login para editar"/>
//           </div>
//         )} */}

//       </div>

//       <Divider />
//       <div className={classes.photos}>
//         <Typography className={classes.title}>
//           Fotos
//         </Typography>
//         <PhotoCards images={imagesList} setPhotoGallery={setPhotoGallery} setImagesType={setImagesType}/>
//         {/* {profile ? (
//            <div className={classes.addPhoto}> 
//           <BottomButton
//             title="Adicionar uma foto"
//             startIcon={CameraAltOutlinedIcon}
//             onClick={handleOpenUploadPhoto}
//           />
//           </div>
//         ) : (
//           <div className={classes.signInButton}>           
//             <BottomButton title="Faça login para editar" color="primary" variant="outlined" onClick={login}/>
//           </div>
//         )} */}

//       </div>
//       <div className={classes.bottomInfo}></div>
//       <Divider/>

//     </div>
//   );
// };

// export default PlaceDescriptionBar;

import {
  Fab,
  makeStyles,
  ThemeProvider,
  createTheme,
  Slide,
  Paper,
  Box,
  Typography,
  CircularProgress,
  Button,
  List
} from "@material-ui/core";

import ExpandLessIcon from "@material-ui/icons/ExpandLess";
import { forwardRef, useEffect } from "react";
import { useState } from "react";
import DadosAgregados from "../../inlines/dadosAgregados/DadosAgregados";
import rio_cover from "../../assets/rio_cover.jpg"
import clsx from "clsx";
import { Stack } from "@mui/material";
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import InfoIcon from '@mui/icons-material/Info';
import { useDispatch } from "react-redux";
import { loadDadosAgregadosAbaSumarioStatusEntregasCidade } from "../../../redux/cidade/actions";
import PlaceDescriptionContainer from "./PlaceDescriptionContainer";
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ListInfo from "../../inlines/ListInfo";

const useStyles = makeStyles((theme) => ({

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
  fabContainer: {
    display: "flex",
    justifyContent: "center",
  },


  directoryInputWrapper: {
    width: "97%",
    margin: "0 1.5%",
  },

  fab: {
    position: "fixed",
    bottom: "20px",
    backgroundColor: "white",

    textTransform: "none",
    border: "1px solid #dadce0",
    boxShadow: "0 1px 6px #007E7D",

    "&:hover": {
      borderColor: " #DADCE0",
      backgroundColor: "#F1F3F4",
      transition: "none",
    },
  },

  searchShadow: {
    position: "fixed",
    width: "423px",
    height: "80px",
    background: "-webkit-linear-gradient(rgba(0,0,0,0.25),rgba(0,0,0,0))",
  },

  textSmall: {
    fontSize: "0.75rem",
  },
  marginZero: {
    margin: 0,
  },
  bottomInfo: {
    marginBottom: "30px"
  },
  visible: {
    display: "block",
  },

  close: {
    display: "none",
  },
  "@media screen and (max-width: 540px)": {
    underSearch: {
      height: "100vh",
      width: "100vw",
      overflow: "auto",
      position: "relative",
    },
  },
  "@media screen and (min-width: 540px)": {
    underSearch: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      position: "fixed",
      top: "3vh",
      right: "3vh",
      width: "25vw",
      minWidth: "385px",
      height: "80px",
      borderRadius: "15px",
      overflowY: "scroll",
      "-ms-overflow-style": "none", /* Ocultar a barra de rolagem no Internet Explorer */
      scrollbarWidth: "none", /* Ocultar a barra de rolagem no Firefox */
      "&::-webkit-scrollbar": {
        width: "0.5em",
        display: "none",
      },
      "&::-webkit-scrollbar-thumb": {
        display: "none",
      },
    },
    underSearch2: {
      position: "fixed",
      top: "calc(4vh + 80px )", // 3vh + 70px + 1vh
      right: "3vh",
      width: "25vw",
      minWidth: "385px",
      height: "calc(45.5vh - 160px)",
      borderRadius: "15px",
      overflowY: "scroll",
      "-ms-overflow-style": "none", /* Ocultar a barra de rolagem no Internet Explorer */
      scrollbarWidth: "none", /* Ocultar a barra de rolagem no Firefox */
      "&::-webkit-scrollbar": {
        width: "0.2em",
        display: "none",
      },
      "&::-webkit-scrollbar-thumb": {
        display: "none",
      },
    },
    underSearch3: {
      position: "fixed",
      top: "calc(50.5vh - 80px )", //4vh + 80px + 45.5vh -160px 
      // bottom: "30px",
      right: "3vh",
      width: "25vw",
      minWidth: "385px",
      height: "calc(45.5vh - 160px)",
      borderRadius: "15px",
      overflowY: "scroll",
      "-ms-overflow-style": "none", /* Ocultar a barra de rolagem no Internet Explorer */
      scrollbarWidth: "none", /* Ocultar a barra de rolagem no Firefox */
      "&::-webkit-scrollbar": {
        width: "0.2em",
        // display: "none",
      },
      // "&::-webkit-scrollbar-thumb": {
      //   display: "none",
      // },
      overflow: "auto"
    },
    underSearch4: {
      position: "fixed",
      top: "calc(96vh - 320px + 80px + 1vh)", // 96vh - 320px + 80px + 1vh
      right: "3vh",
      width: "25vw",
      minWidth: "385px",
      height: "240px",
      borderRadius: "15px",
      overflowY: "scroll",
      "-ms-overflow-style": "none", /* Ocultar a barra de rolagem no Internet Explorer */
      scrollbarWidth: "none", /* Ocultar a barra de rolagem no Firefox */
      "&::-webkit-scrollbar": {
        width: "0.2em",
        display: "none",
      },
      "&::-webkit-scrollbar-thumb": {
        display: "none",
      },
    },
  },
  basicInfo: {
    padding: "3px 20px",
  },
  sumarioInfo: {
    // padding: "3px 20px",
    maxWidth: "25vw"
  },
  dadosAgregadosCidade: {
    // padding: "3px 20px",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
  },
  statusButton: {
    pointerEvents: "none",
    borderRadius: "39px",
    backgroundColor: "#007E7D",
    color: "#FFFFFF",
    padding: "1px 8px 1px 8px"
  },
  titulo: {
    // position:"relative",
    lineHeight: "26px",
    fontSize: "1.5rem",
    fontWeight: "bold",
    display: '-webkit-box',
    '-webkit-line-clamp': 2,
    '-webkit-box-orient': 'vertical',
    overflow: 'hidden',
    marginTop:"-1px",
    marginBottom:"-1px"
  },
  subtitulo: {
    // marginTop: "15px", 
    opacity: 0.6,
    display: '-webkit-box',
    '-webkit-line-clamp': 1,
    '-webkit-box-orient': 'vertical',
    overflow: 'hidden',
  },
  sobreMunicipio: {
    fontSize: "1.5rem",
    fontWeight: "bold",
    // marginBottom:"-5px"
  },
  subtituloRealizacao: {
    opacity: 0.8,
    height: "10.5vh",
    // overflow: 'hidden',
    textOverflow: 'ellipsis',
    // whiteSpace: 'nowrap',
  },
  buttonStatus: {
    position: 'absolute',
    top: '12px',
    right: '20px',
  },
  statusButton: {
    pointerEvents: "none",
    borderRadius: "39px",
    backgroundColor: "#007E7D",
    color: "#FFFFFF",
    padding: "1px 8px 1px 8px",
    fontSize: "12px"
  },

}));

const theme = createTheme({
  palette: {
    primary: {
      main: "#007E7D",
    },
  },
});
const ImageCarousel = ({ images }) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <Slider {...settings}>
      {images.map((image, index) => (
        <div key={index}>
          <img src={image} alt={`carousel-${index}`} style={{ width: '100%', height: 'auto' }} />
        </div>
      ))}
    </Slider>
  );
};
const PlaceDescriptionBar = forwardRef(
  ({ underSearchBar,
    cidades,
    dadosAgregadosAbaTemaCidade,
    dadosAgregadosAbaProgramasCidade,
    dadosAgregadosAbaSumarioInfoBasicasCidade,
    dadosAgregadosAbaSumarioStatusEntregasCidade,
    images_cidade,
    setPhotoGallery,
    setImagesType,
    setActiveBar,
    setDescriptionData,
    setUnderSearchBar,
    loadData,

    content,
    tema,
    programa,
    realizacao



  }, ref) => {

    const classes = useStyles();

    const [dadosAgregadosAbaSumarioStatusEntregasCidadeTotal, setDadosAgregadosAbaSumarioStatusEntregasCidadeTotal] = useState(0)

    const dispatch = useDispatch();

    useEffect(() => {
      if (dadosAgregadosAbaSumarioStatusEntregasCidade) {
        const total = dadosAgregadosAbaSumarioStatusEntregasCidade?.em_andamento + dadosAgregadosAbaSumarioStatusEntregasCidade?.concluida + dadosAgregadosAbaSumarioStatusEntregasCidade?.interrompida + dadosAgregadosAbaSumarioStatusEntregasCidade?.em_licitacao;
        setDadosAgregadosAbaSumarioStatusEntregasCidadeTotal(total);
      }
    }, [dadosAgregadosAbaSumarioStatusEntregasCidade]);

    const images = [
      "https://placehold.co/600x400",
      "https://placehold.co/600x400",
      "https://placehold.co/600x400"
    ]
    return (
      <>

        <Slide direction="down" timeout={1000} in={underSearchBar} mountOnEnter unmountOnExit>
          <Paper
            elevation={6}
            ref={ref}
            className={classes.underSearch}
          >
            <div className={classes.basicInfo}>
              <Typography className={classes.titulo}>{realizacao ? realizacao : (content ? content.nome : <CircularProgress size={25} />)}</Typography>
              <Typography className={classes.subtitulo}> {programa ? programa : content?.programa}</Typography>
            </div>
          </Paper>
        </Slide>
        <Slide direction="left" timeout={1000} in={underSearchBar} mountOnEnter unmountOnExit>
          <Paper
            elevation={6}
            className={classes.underSearch2}
          >
            <div className={classes.basicInfo}>
              {realizacao || content?.nome ? (
                <>
                  <Stack direction="row">
                    <Typography className={classes.sobreMunicipio}>Sobre</Typography>
                    <Tooltip placement="right" title={`Detalhe sobre a realizacao ${realizacao ? realizacao : content?.nome}`}>
                      <IconButton>
                        <InfoIcon sx={{ color: "black" }} />
                      </IconButton>
                    </Tooltip>
                  </Stack>
                  <Typography className={classes.subtituloRealizacao}>{content?.descricao}</Typography>
                </>
              ) : (
                <CircularProgress style={{ marginTop:"1rem"}} size={25} />
              )}
            </div>
            {content?.status &&
              <span className={classes.buttonStatus}>
                <Button variant="contained" className={classes.statusButton}>
                  {content?.status}
                </Button>
              </span>
            }
          </Paper>
        </Slide>
        <Slide direction="left" timeout={1000} in={underSearchBar} mountOnEnter unmountOnExit>
          <Paper
            elevation={6}
            className={classes.underSearch3}
          >

            <div className={classes.sumarioInfo} style={{ display: 'flex' }}>
              {content ? <ListInfo content={content ? content : []} style={{ flexGrow: 1 }} /> : <CircularProgress style={{ marginTop:"1rem",marginLeft:"1.2rem"}} size={25} />}
            </div>
          </Paper>
        </Slide>
        <Slide direction="up" timeout={1000} in={underSearchBar} mountOnEnter unmountOnExit>
          <Paper
            elevation={6}
            className={classes.underSearch4}
          >
            <ImageCarousel images={images} />
          </Paper>
        </Slide>
      </>
    );
  }
);
export default PlaceDescriptionBar;
