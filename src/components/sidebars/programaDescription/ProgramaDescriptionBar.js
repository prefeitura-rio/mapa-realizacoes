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
  Button
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
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import GroupsIcon from '@mui/icons-material/Groups';

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
      borderRadius: "10px",
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
      height: "calc(82.5vh - 330px)",
      borderRadius: "10px",
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
      top: "calc(4vh + 80px + 82.5vh - 330px + 1vh)", //4vh + 70px + 91vh - 390px + 1vh
      // bottom: "30px",
      right: "3vh",
      width: "25vw",
      minWidth: "385px",
      height: "8.5vh",
      borderRadius: "10px",
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
      top: "calc(4vh + 80px + 82.5vh - 330px + 1vh + 8.5vh + 1vh)", // 96vh - 320px + 70px + 1vh
      right: "3vh",
      width: "25vw",
      minWidth: "385px",
      height: "250px",
      borderRadius: "10px",
      overflowY: "hide",
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
    paddingLeft: "25px",
    paddingRight: "25px",
    paddingTop: "13px",
    paddingBottom: "13px",
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
  subtituloMunicipio: {
    // marginTop: "15px", 
    textAlign: "justify",
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
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows:false
  };

  const handleImageError = (e) => {
    e.target.src = 'broken-image.png'; 
  };

  return (
    <Slider {...settings}>
      {images.map((image, index) => (
        <div key={index}>
          {!image ? 
          <div style={{display:"flex",justifyContent:"center", alignItems:"center", height:"250px"}}>
          < CircularProgress size={80}/>
          </div>
           :
          <img 
            src={image} 
            alt={`carousel-${index}`} 
            style={{ borderRadius: "10px",width: '100%', height: 'auto' }} 
            loading="lazy"
            onError={handleImageError}
          />
          }
        </div>
      ))}
    </Slider>
  );
};

const ProgramaDescriptionBar = forwardRef(
  ({ underSearchBar,
    cidades,
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
    programa,
    programaData


  }, ref) => {

    const classes = useStyles();

    const [programaLength, setProgramaLength] = useState(0)
    const [programaTotalInvestiment, setProgramaTotalInvestiment] = useState(0)


    useEffect(() => {
      if (dadosAgregadosAbaProgramasCidade) {

        const calculateLengthOfPrograma = (dadosAgregadosAbaProgramasCidade, programa) => {
          // filter the array baset on the programa value
          const filteredData = dadosAgregadosAbaProgramasCidade.filter(item => item.tema === programa);

          // grab the length of the "realizacoes" array for each filtered item
          const length = filteredData.reduce((total, item) => total + item.realizacoes.length, 0);

          console.log("dadosAgregadosAbaProgramasCidade", dadosAgregadosAbaProgramasCidade)
          return length;
        }
        const calculateTotalInvestment = (dadosAgregadosAbaProgramasCidade, programa) => {
          // filter the array based on the programa value
          const filteredData = dadosAgregadosAbaProgramasCidade.filter(item => item.tema === programa);

          // sum up the investiments values for each realizacao item in the filtered data
          const totalInvestment = filteredData.reduce((total, item) => {
            return total + item.realizacoes.reduce((subTotal, realizacao) => subTotal + realizacao.investimento, 0);
          }, 0);

          return totalInvestment;
        }
        setProgramaLength(calculateLengthOfPrograma(dadosAgregadosAbaProgramasCidade, programa))
        setProgramaTotalInvestiment(calculateTotalInvestment(dadosAgregadosAbaProgramasCidade, programa))
      }
    }, [dadosAgregadosAbaProgramasCidade]);

    const [windowHeight, setWindowHeight] = useState(window.innerHeight);

    useEffect(() => {
      const handleResize = () => setWindowHeight(window.innerHeight);
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }, []);

    useEffect(() => {
      if (windowHeight <= 500) {
        setTextScreen500(true);
        setTextScreen900(false);
      }
      else if (windowHeight > 500 && windowHeight <= 900) {
        setTextScreen900(true);
        setTextScreen500(false);
      }
      else if (windowHeight >= 900) {
        setTextScreen500(false);
        setTextScreen900(false);
      }
    }, [windowHeight]);

    const [isTextExpanded, setTextExpanded] = useState(false);
    const [isScreen900, setTextScreen900] = useState(false);
    const [isScreen500, setTextScreen500] = useState(false);


    const fullText = programaData?.descricao;

    // Calcule o número de caracteres com base na altura da janela
    const numChars = Math.floor(windowHeight / (isScreen900 ? 3.3 : (isScreen500 ? 4 : 1.1)));

    const shortText = `${fullText?.substring(0, numChars)} ...`;

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
              <Typography className={classes.subtitulo}> Programas</Typography>
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
                {/* <Tooltip placement="right" title={`Detalhe sobre o ${programa}`}>
                  <IconButton>
                    <InfoIcon sx={{ color: "black" }} />
                  </IconButton>
                </Tooltip> */}
              </Stack>

              <Typography className={classes.subtituloMunicipio}>
                {isTextExpanded ? fullText : shortText == "undefined ..." ? "Desculpe, ainda não possuímos descrição para este tema. Por favor, tente novamente mais tarde." : (fullText + " ..." === shortText)?fullText:shortText}

                {fullText + " ..." === shortText ? null :
                <Button onClick={() => setTextExpanded(!isTextExpanded)}>
                  {isTextExpanded ? 'Leia menos' : 'Leia mais'}
                </Button>
  }
              </Typography>
            </div>
          </Paper>
        </Slide>
        <Slide direction="left" timeout={1000} in={underSearchBar} mountOnEnter unmountOnExit>
          <Paper
            elevation={6}
            className={classes.underSearch3}
          >

            <Box height="8.5vh" display="flex" justifyContent="center" alignItems="center">
              {(!programaLength || !programaTotalInvestiment) ? < CircularProgress /> :
                <>
                  <Tooltip title="Realizações">
                    <Box display="flex" >
                      <AccountBalanceIcon />
                      <Box pl={0.5}>
                        {/* TODO: valor agregado da qntdd de obras. */}
                        <Typography> {programaLength && programaLength} </Typography>
                      </Box>
                    </Box>
                  </Tooltip>
                  <span style={{ paddingLeft: "20px", paddingRight: "20px" }}></span>
                  <Tooltip title="Investimento">
                    <Box display="flex" >
                      <AttachMoneyIcon />
                      <Box pl={0.5}>
                        {/* TODO: valor agregado das obras. */}
                        <Typography >{programaTotalInvestiment.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL', minimumFractionDigits: 0, maximumFractionDigits: 0 })}</Typography>
                      </Box>
                    </Box>
                  </Tooltip>

                </>
              }
            </Box>

          </Paper>
        </Slide>
        <Slide direction="up" timeout={1000} in={underSearchBar} mountOnEnter unmountOnExit>
          <Paper
            elevation={6}
            className={classes.underSearch4}
          >
            <ImageCarousel images={[programaData?.image_url]} />
          </Paper>
        </Slide>
      </>
    );
  }
);
export default ProgramaDescriptionBar;
