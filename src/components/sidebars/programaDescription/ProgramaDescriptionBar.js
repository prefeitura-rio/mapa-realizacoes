import {
  Fab,
  makeStyles,
  ThemeProvider,
  createTheme,
  Slide,
  Paper,
  Box,
  Typography
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
import ProgramaDescriptionContainer from "./ProgramaDescriptionContainer";
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

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
      height: "70px",
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
      top:  "calc(4vh + 70px )", // 3vh + 70px + 1vh
      right: "3vh",
      width: "25vw",
      minWidth: "385px",
      height: "calc(91vh - 390px)",
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
    underSearch3: {
      position: "fixed",
      top: "calc(96vh - 320px)", //4vh + 70px + 91vh - 390px + 1vh
      // bottom: "30px",
      right: "3vh",
      width: "25vw",
      minWidth: "385px",
      height: "70px",
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
    underSearch4: {
      position: "fixed",
      top: "calc(96vh - 320px + 70px + 1vh)", // 96vh - 320px + 70px + 1vh
      right: "3vh",
      width: "25vw",
      minWidth: "385px",
      height: "250px",
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
  },
  basicInfo: {
    padding: "3px 20px",
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
  programa: {
    // whiteSpace: "nowrap",
    // overflow: "hidden",
    // textOverflow: "ellipsis",
    // width: "20vw",
    minWidth: "350px",
    fontSize: "1.5rem",
    fontWeight: "bold",
    marginBottom: "-5px",
    lineHeight:"20px",
    paddingBottom:"5px"
  },
  subtitulo: {
    // marginTop: "15px", 
    opacity: 0.6,
  },
  sobreMunicipio: {
    fontSize: "1.5rem",
    fontWeight: "bold",
    // marginBottom:"-5px"
  },
  subtituloMunicipio: {
    // marginTop: "15px", 
    opacity: 0.8
  }

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
const ProgramaDescriptionBar = forwardRef(
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

    tema,
    programa



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
              <Typography className={classes.programa}>{programa}</Typography>
              <Typography className={classes.subtitulo}> {tema}</Typography>
            </div>
          </Paper>
        </Slide>
        <Slide direction="left" timeout={1000} in={underSearchBar} mountOnEnter unmountOnExit>
          <Paper
            elevation={6}
            className={classes.underSearch2}
          >
            <div className={classes.basicInfo}>
              <Stack direction="row">

                <Typography className={classes.sobreMunicipio}>Sobre</Typography>
                <Tooltip placement="right" title={`Detalhe sobre o ${programa}`}>
                  <IconButton>
                    <InfoIcon sx={{ color: "black" }} />
                  </IconButton>
                </Tooltip>
              </Stack>
              <Typography className={classes.subtituloMunicipio}>Programa Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. </Typography>
            </div>
          </Paper>
        </Slide>
        <Slide direction="left" timeout={1000} in={underSearchBar} mountOnEnter unmountOnExit>
          <Paper
            elevation={6}
            className={classes.underSearch3}
          >

            <Box height="70px" display="flex" justifyContent="space-between" alignItems="center">
              <Box pl={2} display="flex" >
                <AccountBalanceIcon />
                <Box pl={0.5}>
                  {/* TODO: valor agregado da qntdd de obras. */}
                  <Typography>G obras</Typography>
                </Box>
              </Box>
              <Box display="flex" >
                <AccountBalanceIcon />
                <Box pl={0.5}>
                  {/* TODO: valor agregado das obras. */}
                  <Typography>G bilhões</Typography>
                </Box>
              </Box>
              <Box pr={2} display="flex">
                <AccountBalanceIcon />
                <Box pl={0.5}>
                  {/* TODO: Puxar valor real */}
                  <Typography>G mi de m²</Typography>
                </Box>
              </Box>

            </Box>

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
export default ProgramaDescriptionBar;