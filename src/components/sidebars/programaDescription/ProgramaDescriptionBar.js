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
import { forwardRef, useEffect, useRef } from "react";
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
import { toSnakeCase } from "../../../utils/formatFile";
import { getAggregatedData, getListRealizacoesPrograma } from "../../../firebase";
import { isDesktop } from "../../../redux/active/reducers";
import { BottomSheet } from "react-spring-bottom-sheet";


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
    underSearchMobile: {
      padding: "12px 0",
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
      height: "90px",
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
      top: "calc(4vh + 90px )", // 3vh + 70px + 1vh
      right: "3vh",
      width: "25vw",
      minWidth: "385px",
      height: "calc(100vh - 17.5vh - 340px)",
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
      top: "calc(100vh - 17.5vh - 340px + 4vh + 90px + 1vh)", //4vh + 70px + 91vh - 390px + 1vh
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
      top: "calc(100vh - 17.5vh - 340px + 4vh + 90px + 1vh + 8.5vh + 1vh)", // 96vh - 320px + 70px + 1vh
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
    marginTop: "-1px",
    marginBottom: "-1px"
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
    arrows: false
  };

  const handleImageError = (e) => {
    e.target.src = 'broken-image.png';
  };

  return (
    <Slider {...settings}>
      {images.map((image, index) => (
        <div key={index}>
          {!image ?
            <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "250px" }}>
              < CircularProgress size={80} />
            </div>
            :
            <img

              src={image}
              alt={`carousel-${index}`}
              style={{ borderRadius: "10px", width: "100%", height: "250px", objectFit: "cover" }}
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
    programaData,
    bairro,
    openedPopup,
    programaDataSirenes,
    programaDataCameras,
    programaDataEstacoesAlertaRio,


  }, ref) => {

    const classes = useStyles();

    const [dadosAgregadosAbaSumarioStatusEntregasPrograma, setDadosAgregadosAbaSumarioStatusEntregasPrograma] = useState(0)

    useEffect(() => {
      const loadDadosAgregadosPrograma = async () => {
        // for place loading everytime the programa/bairro changes
        setDadosAgregadosAbaSumarioStatusEntregasPrograma(null);

        try {
          let dadosAgregadosPrograma;
          if (!bairro) {
            dadosAgregadosPrograma = await getAggregatedData(null, toSnakeCase(programa), null, null);
          } else {
            dadosAgregadosPrograma = await getAggregatedData(null, toSnakeCase(programa), toSnakeCase(bairro), null);
          }
          // console.log("dadosAgregadosPrograma", dadosAgregadosPrograma)
          setDadosAgregadosAbaSumarioStatusEntregasPrograma(dadosAgregadosPrograma)

        } catch (error) {
          console.error("Erro", error);
        }
      };
      loadDadosAgregadosPrograma();
    }, [programa, bairro]);

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


    const fullText = programaData?.descricao?.replace(/;\s*-/g, ';<br />-').replace(/-/g, '<b>-</b>');
    // .replace(/(\\r\\n)/g, '<br />')

    // Calcule o número de caracteres com base na altura da janela
    const numChars = Math.floor(windowHeight / (isScreen900 ? 3.9 : (isScreen500 ? 4 : 1.1)));

    const shortText = `${fullText?.substring(0, numChars)} ...`;
    function SheetContentProgramaDescriptionBar() {
      return (
        <Stack m={2} mt={2} spacing={2}>
          <Paper
            elevation={6}
            ref={ref}
            className={classes.underSearchMobile}
          >
            <div style={{ paddingLeft: "25px", paddingRight: "25px" }}>
              <Typography className={classes.programa}>{programa}</Typography>
              <Typography className={classes.subtitulo}> Programas</Typography>
            </div>
          </Paper>

          <Paper
            elevation={6}
            className={classes.underSearch2Mobile}
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
                {isTextExpanded ? fullText : shortText == "undefined ..." ? "Desculpe, ainda não possuímos descrição para este programa. Por favor, tente novamente mais tarde." : (fullText + " ..." === shortText) ? fullText : shortText}

                {fullText && fullText !== "" && fullText + " ..." !== shortText &&
                  <Button onClick={() => setTextExpanded(!isTextExpanded)}>
                    {isTextExpanded ? 'Leia menos' : 'Leia mais'}
                  </Button>
                }
              </Typography>
            </div>
          </Paper>

          <Paper
            elevation={6}
            className={classes.underSearch3Mobile}
          >
            <Box height="8.5vh" display="flex" justifyContent="center" alignItems="center">
              {!dadosAgregadosAbaSumarioStatusEntregasPrograma ? (
                <CircularProgress />
              ) : dadosAgregadosAbaSumarioStatusEntregasPrograma.count === 0 && (programa != "Sirenes") && (programa != "Câmeras") && (programa != "Estações Alerta Rio") ? (
                <Box pl={3} pr={3} style={{ opacity: 0.8 }} >
                  <Typography>Não há realização deste tema ou programa no bairro selecionado.</Typography>
                </Box>
              ) : (
                <>
                  {/* <Tooltip title="Realizações"> */}
                  <Box display="flex" style={{ display: "flex", height: "8.5vh", alignItems: "center" }}>
                    <AccountBalanceIcon />
                    <Box>
                      {(programa == "Câmeras") &&
                        <Typography style={{ fontSize: "14px", paddingLeft: "5px" }}>{programaDataCameras?.length} Realizações</Typography>
                      }
                      {(programa == "Sirenes") &&
                        <Typography style={{ fontSize: "14px", paddingLeft: "5px" }}>{programaDataSirenes?.length} Realizações</Typography>
                      }
                      {(programa == "Estações Alerta Rio") &&
                        <Typography style={{ fontSize: "14px", paddingLeft: "5px" }}>{programaDataEstacoesAlertaRio?.length} Realizações</Typography>
                      }
                      {(programa != "Sirenes") && (programa != "Câmeras") && (programa != "Estações Alerta Rio") &&
                        <Typography style={{ fontSize: "14px", paddingLeft: "5px" }}>{dadosAgregadosAbaSumarioStatusEntregasPrograma.count + " "}Realizaç{dadosAgregadosAbaSumarioStatusEntregasPrograma.count > 1 ? "ões" : "ão"}</Typography>
                      }                    </Box>
                  </Box>
                  {/* </Tooltip> */}
                  {/* {programa != "BRTs Transbrasil" && (
                            <>
                  <span style={{ paddingLeft: "5px", paddingRight: "5px" }}></span>
                  {dadosAgregadosAbaSumarioStatusEntregasPrograma?.investment !== 0 && (
                      <Box display="flex" style={{display:"flex", height:"8.5vh", alignItems:"center"}}>
                        <AttachMoneyIcon />
                        <Box >
                          <Typography style={{fontSize:"14px"}}>
                            {dadosAgregadosAbaSumarioStatusEntregasPrograma?.investment.toLocaleString('pt-BR', {
                              style: 'currency',
                              currency: 'BRL',
                              minimumFractionDigits: 0,
                              maximumFractionDigits: 0,
                            })+ " "}
                                Investidos
                          </Typography>
                        </Box>
                      </Box>
                  )}
                  </>
                  )} */}
                </>
              )}
            </Box>


          </Paper>

          <Paper
            elevation={6}
            className={classes.underSearch4Mobile}
          >
            <ImageCarousel images={[programaData?.image_url]} />
          </Paper>
        </Stack>
      );
    }

    const [value, setValue] = useState(1);
    const [openSheet, setOpenSheet] = useState(0);
    const sheetRef = useRef();

    const handleOpenSheet = (sheet) => {
      setOpenSheet(sheet);
    };


    const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(true);

    const handleCloseSheet = () => {
      setIsBottomSheetOpen(false);
    };

    useEffect(() => {
      if (openedPopup == null && programa) {
        setIsBottomSheetOpen(true);
      }
    }, [openedPopup]);

    // const [realizacoesCamera, setRealizacoesCamera] = useState([]);
    // const [realizacoesSirene, setRealizacoesSirene] = useState([]);

    // useEffect(() => {
    //   const loadRealizacoesPrograma = async (p) => {
    //     try {
    //       const realizacoesProgramaRef = await getListRealizacoesPrograma(toSnakeCase(p));
    //       if (p == "Sirenes") setRealizacoesSirene(realizacoesProgramaRef);
    //       if (p == "Câmeras") setRealizacoesCamera(realizacoesProgramaRef);
    //     } catch (error) {
    //       console.error("Erro", error);
    //     }

    //   };

    //   if (programa == "Câmeras") {
    //     loadRealizacoesPrograma("Câmeras");
    //   }
    //   if (programa == "Sirenes") {
    //     loadRealizacoesPrograma("Sirenes");
    //   }
    // }, [programa]);

    return (
      <>
        {isDesktop() && (
          <div >

            <Slide direction="down" timeout={1000} in={underSearchBar} mountOnEnter unmountOnExit>
              <Paper
                elevation={6}
                ref={ref}
                className={classes.underSearch}
              >
                <div style={{ paddingLeft: "25px", paddingRight: "25px" }}>
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
                    <span dangerouslySetInnerHTML={{ __html: isTextExpanded ? fullText : shortText == "undefined ..." ? "Desculpe, ainda não possuímos descrição para este programa. Por favor, tente novamente mais tarde." : (fullText + " ..." === shortText) ? fullText : shortText }} />
                    {fullText && fullText !== "" && fullText + " ..." !== shortText &&
                      <Button onClick={() => setTextExpanded(!isTextExpanded)}>
                        {isTextExpanded ? 'Leia menos' : 'Leia mais'}
                      </Button>
                    }
                  </Typography>
                </div>
              </Paper>
            </Slide>
            {/* {dadosAgregadosAbaSumarioStatusEntregasPrograma?.count != 0 && */}
            <Slide direction="left" timeout={1000} in={underSearchBar} mountOnEnter unmountOnExit>
              <Paper
                elevation={6}
                className={classes.underSearch3}
              >
                <Box pl={1} pr={1} height="8.5vh" display="flex" justifyContent="center" alignItems="center">
                  {!dadosAgregadosAbaSumarioStatusEntregasPrograma ? (
                    <CircularProgress />
                  ) : dadosAgregadosAbaSumarioStatusEntregasPrograma.count === 0 && (programa != "Sirenes") && (programa != "Câmeras") && (programa != "Estações Alerta Rio") ? (
                    <Box pl={3} pr={3} style={{ opacity: 0.8 }} >
                      <Typography>Não há realização deste tema ou programa no bairro selecionado.</Typography>
                    </Box>
                  ) : (
                    <>
                      {/* <Tooltip title="Realizações"> */}
                      <Box display="flex">
                        <AccountBalanceIcon />
                        <Box>
                          {(programa == "Câmeras") &&
                            <Typography style={{ fontSize: "14px", paddingLeft: "5px" }}>{programaDataCameras?.length} Realizações</Typography>
                          }
                          {(programa == "Sirenes") &&
                            <Typography style={{ fontSize: "14px", paddingLeft: "5px" }}>{programaDataSirenes?.length} Realizações</Typography>
                          }
                          {(programa == "Estações Alerta Rio") &&
                            <Typography style={{ fontSize: "14px", paddingLeft: "5px" }}>{programaDataEstacoesAlertaRio?.length} Realizações</Typography>
                          }
                          {(programa != "Sirenes") && (programa != "Câmeras") && (programa != "Estações Alerta Rio") &&
                            <Typography style={{ fontSize: "14px", paddingLeft: "5px" }}>{dadosAgregadosAbaSumarioStatusEntregasPrograma.count + " "}Realizaç{dadosAgregadosAbaSumarioStatusEntregasPrograma.count > 1 ? "ões" : "ão"}</Typography>
                          }
                        </Box>
                      </Box>
                      {/* </Tooltip> */}
                      {programa != "BRTs Transbrasil" && (
                        <>
                          {/* <span style={{ paddingLeft: "5px", paddingRight: "5px" }}></span>
                              {dadosAgregadosAbaSumarioStatusEntregasPrograma.investment !== 0 && (
                                <Box display="flex">
                                  <AttachMoneyIcon />
                                  <Box>
                                    <Typography style={{ fontSize: "14px" }}>
                                      {dadosAgregadosAbaSumarioStatusEntregasPrograma.investment.toLocaleString('pt-BR', {
                                        style: 'currency',
                                        currency: 'BRL',
                                        minimumFractionDigits: 0,
                                        maximumFractionDigits: 0,
                                      }) + " "}
                                      Investidos
                                    </Typography>
                                  </Box>
                                </Box>
                              )} */}
                        </>
                      )}

                    </>
                  )}
                </Box>


              </Paper>
            </Slide>
            {/* } */}
            {programaData?.image_url &&
              <Slide direction="up" timeout={1000} in={underSearchBar} mountOnEnter unmountOnExit>
                <Paper
                  elevation={6}
                  className={classes.underSearch4}
                >
                  <ImageCarousel images={[programaData?.image_url]} />
                </Paper>
              </Slide>
            }
          </div>
        )}

        {!isDesktop() && openedPopup == null && programa && (
          <div>

            <BottomSheet
              style={{ zIndex: 507, position: "absolute" }}
              open={isBottomSheetOpen}
              onDismiss={handleCloseSheet}
              ref={sheetRef}
              defaultSnap={({ maxHeight }) => maxHeight / 2}
              snapPoints={({ maxHeight }) => [
                maxHeight - maxHeight / 10,
                maxHeight / 4,
                maxHeight * 0.6,
              ]}
            >
              <SheetContentProgramaDescriptionBar />
            </BottomSheet>
          </div>
        )}
      </>
    );
  }
);
export default ProgramaDescriptionBar;
