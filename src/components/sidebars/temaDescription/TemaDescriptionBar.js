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
import { Skeleton, Stack } from "@mui/material";
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import InfoIcon from '@mui/icons-material/Info';
import { useDispatch } from "react-redux";
import { loadDadosAgregadosAbaSumarioStatusEntregasCidade } from "../../../redux/cidade/actions";
import TemaDescriptionContainer from "./TemaDescriptionContainer";
import { getAggregatedData, getListDestaquesTema, getListRealizacoesPrograma } from "../../../firebase";
import { toSnakeCase } from "../../../utils/formatFile";
import { DESCRIPTION_BAR } from "../../../redux/active/actions";
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import GroupsIcon from '@mui/icons-material/Groups';
import ArrowOutwardIcon from '@mui/icons-material/ArrowOutward';
import { isDesktop } from "../../../redux/active/reducers";
import { BottomSheet } from "react-spring-bottom-sheet";
import { setProgramaDataSirenes } from "../../../redux/filtros/actions";

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
      top: "calc( 80px + 4vh )", //80px + 3.0vh 1vh
      // bottom: "30px",
      right: "3vh",
      width: "25vw",
      minWidth: "385px",
      height: "calc( 41.5vh - 40px )",
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
      top: "calc( 80px + 4vh + 41.5vh - 40px + 1vh )", //
      // bottom: "30px",
      right: "3vh",
      width: "25vw",
      minWidth: "385px",
      height: "8.5vh", // 
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
      top: "calc( 80px + 4vh + 41.5vh - 40px + 1vh + 8.5vh + 1vh )", // 47.5vh + 8.5vh + 1vh = 55.5vh
      right: "3vh",
      width: "25vw",
      minWidth: "385px",
      height: "calc( 41.5vh - 40px )",
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
  titulo: {
    minWidth: "350px",
    fontSize: "1.5rem",
    fontWeight: "bold",
    marginBottom: "-5px",
    // lineHeight: "20px",
    display: '-webkit-box',
    '-webkit-line-clamp': 2,
    '-webkit-box-orient': 'vertical',
    overflow: 'hidden',

  },
  subtitulo: {
    // marginTop: "15px", 
    opacity: 0.6,
  },
  sobreMunicipio: {
    fontSize: "1.1rem",
    fontWeight: "bold",
    // marginBottom:"-5px"
  },
  subtituloMunicipio: {
    opacity: 0.8,
    textAlign: "justify",

  },
  subtituloDestaques: {
    opacity: 0.8,
    display: '-webkit-box',
    '-webkit-line-clamp': 4,
    '-webkit-box-orient': 'vertical',
    overflow: 'hidden',
    fontSize: "0.85rem",
    paddingRight: "20px",
    textAlign: "justify",
  },
  title_li: {
    fontWeight: "bold",
    cursor: "pointer",
    fontSize: "0.9rem",
    display: '-webkit-box',
    '-webkit-line-clamp': 2,
    '-webkit-box-orient': 'vertical',
    overflow: 'hidden',
  },
  listStyle: {
    overflowY: "scroll",
    "-ms-overflow-style": "auto",

    scrollbarWidth: "auto", /* Ocultar a barra de rolagem no Firefox */
    "&::-webkit-scrollbar": {
      width: "0.2em",
      // display: "auto",
    },
    "&::-webkit-scrollbar-thumb": {
      borderRadius: "10px",
      // display: "auto",
    },
  }

}));

const theme = createTheme({
  palette: {
    primary: {
      main: "#007E7D",
    },
  },
});

const TemaDescriptionBar = forwardRef(
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
    temaData,
    bairro,
    openedPopup,
    programaDataCameras,
    programaDataSirenes,
    programaDataEstacoesAlertaRio,
    setProgramaDataCameras,
    setProgramaDataSirenes,
    setProgramaDataEstacoesAlertaRio,
    gestao



  }, ref) => {

    const classes = useStyles();

    const [dadosAgregadosAbaSumarioStatusEntregasTema, setDadosAgregadosAbaSumarioStatusEntregasTema] = useState(0)

    useEffect(() => {
      const loadDadosAgregadosTema = async () => {
        // for place loading everytime the tema/bairro changes
        setDadosAgregadosAbaSumarioStatusEntregasTema(null);
        try {
          let dadosAgregadosTema;
          if (!bairro) {
            dadosAgregadosTema = await getAggregatedData(toSnakeCase(tema), null, null, null);;
          } else {
            dadosAgregadosTema = await getAggregatedData(toSnakeCase(tema), null, toSnakeCase(bairro), null);
          }
          // console.log("dadosAgregadosTema", dadosAgregadosTema)
          setDadosAgregadosAbaSumarioStatusEntregasTema(dadosAgregadosTema)

        } catch (error) {
          console.error("Erro", error);
        }
      };
      loadDadosAgregadosTema();
    }, [tema, bairro]);


    const handleTitleClick = (value) => {
      // setUnderSearchBar(true);
      setDescriptionData(toSnakeCase(value));
      setActiveBar(DESCRIPTION_BAR);
      loadData(toSnakeCase(value));
      // console.log("clickei")
    };

    // o destaque conterá as 3 realizacões mais caras do tema, com o título e a descrição e lat long da realização
    const [destaquesTema, setDestaquesTema] = useState([]);
    useEffect(() => {
      const loadDestaquesTema = async (id_tema) => {
        setDestaquesTema([]);
        try {
          const destaquesTemaRef = await getListDestaquesTema(id_tema);

          setDestaquesTema(destaquesTemaRef);

        } catch (error) {
          console.error("Erro", error);
        }
      };

      loadDestaquesTema(tema);
    }, [tema]);

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


    const fullText = temaData?.descricao
      ?.replace(/&lt;br \/&gt;/g, '<br />')
      .replace(/- /g, '• ');

    console.log("fullText", fullText)
    // Calcule o número de caracteres com base na altura da janela
    const numChars = Math.floor(windowHeight / (isScreen900 ? 3 : (isScreen500 ? 4 : 1.8)));

    const shortText = `${fullText?.substring(0, numChars)} ...`;

    useEffect(() => {
      const loadRealizacoesPrograma = async () => {
        try {
          const realizacoesProgramaSirenesRef = await getListRealizacoesPrograma(toSnakeCase("Sirenes"));
          const realizacoesProgramaCameraRef = await getListRealizacoesPrograma(toSnakeCase("Câmeras"));
          const realizacoesProgramaEstacoesAlertaRioRef = await getListRealizacoesPrograma(toSnakeCase("Estações Alerta Rio"));
          setProgramaDataCameras(realizacoesProgramaCameraRef);
          setProgramaDataSirenes(realizacoesProgramaSirenesRef);
          setProgramaDataEstacoesAlertaRio(realizacoesProgramaEstacoesAlertaRioRef);
        } catch (error) {
          console.error("Erro", error);
        }

      };

      if (tema == "Resiliência Climática") {
        loadRealizacoesPrograma();
      }
    }, [tema]);


    function SheetContentTemaDescriptionBar() {
      return (
        <Stack m={2} mt={2} spacing={2}>
          <Paper
            elevation={6}
            ref={ref}
            className={classes.underSearchMobile}
          >
            <div style={{ paddingLeft: "25px" }}>
              <Typography className={classes.titulo}>{tema}</Typography>
              <Typography className={classes.subtitulo}> Temas</Typography>
            </div>
          </Paper>

          <Paper
            elevation={6}
            className={classes.underSearch2Mobile}
          >
            <div className={classes.basicInfo}>
              <Stack direction="row">

                <Typography className={classes.sobreMunicipio}>Sobre</Typography>
                {/* <Tooltip placement="right" title={`Detalhe sobre o ${tema}`}>
                  <IconButton>
                    <InfoIcon sx={{color:"black"}}/>
                  </IconButton>
                </Tooltip> */}
              </Stack>


              <Typography className={classes.subtituloMunicipio}>
                <span dangerouslySetInnerHTML={{ __html: isTextExpanded ? fullText : shortText == "undefined ..." ? "Desculpe, ainda não possuímos descrição para este tema. Por favor, tente novamente mais tarde." : (fullText + " ..." === shortText) ? fullText : shortText }} />

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
              {!dadosAgregadosAbaSumarioStatusEntregasTema ? (
                <CircularProgress />
              ) : dadosAgregadosAbaSumarioStatusEntregasTema.count === 0 && (tema != "Resiliência Climática") ? (
                <Box pl={3} pr={3} style={{ opacity: 0.8 }} >
                  <Typography>Não há realização deste tema ou programa no bairro selecionado.</Typography>
                </Box>
              ) : (
                <>
                  {/* <Tooltip title="Realizações"> */}
                  <Box display="flex" style={{ display: "flex", height: "8.5vh", alignItems: "center" }}>
                    <AccountBalanceIcon />
                    <Box>
                      {/* TODO: valor agregado da qntdd de obras. */}
                      {(tema == "Resiliência Climática") &&
                        <Typography style={{ fontSize: "14px", paddingLeft: "5px" }}>{dadosAgregadosAbaSumarioStatusEntregasTema.count + programaDataCameras.length + programaDataSirenes.length + programaDataEstacoesAlertaRio.length + " "} Realizações</Typography>
                      }
                      {
                        (tema != "Resiliência Climática") &&
                        <Typography style={{ fontSize: "14px", paddingLeft: "5px" }}>{dadosAgregadosAbaSumarioStatusEntregasTema.count + " "}Realizaç{dadosAgregadosAbaSumarioStatusEntregasTema.count > 1 ? "ões" : "ão"}</Typography>
                      }
                    </Box>
                  </Box>
                  {/* </Tooltip> */}
                  {/* <span style={{ paddingLeft: "5px", paddingRight: "5px" }}></span>               
                     {dadosAgregadosAbaSumarioStatusEntregasTema.investment !== 0 && (
                    <Box display="flex"style={{display:"flex", height:"8.5vh", alignItems:"center"}}>
                        <AttachMoneyIcon />
                        <Box>
                        <Typography style={{fontSize:"14px"}}>
                        {dadosAgregadosAbaSumarioStatusEntregasTema.investment.toLocaleString('pt-BR', {
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
            </Box>

          </Paper>

          {gestao != "1_2" &&
            <Paper
              elevation={6}
              className={classes.underSearch4Mobile}
            >
              <div className={classes.basicInfo}>
                <Typography className={classes.sobreMunicipio}>Destaques</Typography>
                <ul className={classes.listStyle} style={{ listStyleType: 'none', padding: 0, textAlign: "left", }}>
                  {destaquesTema.length == 0 ? (
                    <>
                      <Skeleton variant="text" />
                      <Skeleton height="15px" width="80%" />
                      <Skeleton height="15px" width="60%" />
                      <Skeleton height="15px" width="73%" />
                      <br></br>
                      <Skeleton variant="text" />
                      <Skeleton height="15px" width="40%" />
                      <Skeleton height="15px" width="60%" />
                      <Skeleton height="15px" width="73%" />
                    </>
                  )
                    :
                    (
                      destaquesTema.map((item, index) => (
                        <li key={index} style={{ paddingBottom: "15px" }}>
                          <Typography className={classes.title_li} onClick={() => handleTitleClick(item.title)}>{item.title} <ArrowOutwardIcon sx={{ paddingLeft: "20px", marginBottom: "-5px" }} /></Typography>
                          <Typography className={classes.subtituloDestaques}>{item.description}</Typography>
                        </li>
                      ))
                    )}
                </ul>
              </div>
            </Paper>
          }

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
      if (openedPopup == null && tema) {
        setIsBottomSheetOpen(true);
      }
    }, [openedPopup]);


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
                <div style={{ paddingLeft: "25px" }}>
                  <Typography className={classes.titulo}>{tema}</Typography>
                  <Typography className={classes.subtitulo}> Temas</Typography>
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
                    {/* <Tooltip placement="right" title={`Detalhe sobre o ${tema}`}>
                  <IconButton>
                    <InfoIcon sx={{color:"black"}}/>
                  </IconButton>
                </Tooltip> */}
                  </Stack>


                  <Typography className={classes.subtituloMunicipio}>
                    <span dangerouslySetInnerHTML={{ __html: isTextExpanded ? fullText : shortText == "undefined ..." ? "Desculpe, ainda não possuímos descrição para este tema. Por favor, tente novamente mais tarde." : (fullText + " ..." === shortText) ? fullText : shortText }} />
                    {fullText && fullText !== "" && fullText + " ..." !== shortText &&
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

                <Box pl={1} pr={1} height="8.5vh" display="flex" justifyContent="center" alignItems="center">
                  {!dadosAgregadosAbaSumarioStatusEntregasTema ? (
                    <CircularProgress />
                  ) : dadosAgregadosAbaSumarioStatusEntregasTema.count === 0 && (tema != "Resiliência Climática") ? (
                    <Box pl={3} pr={3} style={{ opacity: 0.8 }} >
                      <Typography>Não há realização deste tema ou programa no bairro selecionado.</Typography>
                    </Box>
                  ) : (
                    <>
                      {/* <Tooltip title="Realizações"> */}
                      <Box display="flex" style={{ display: "flex", height: "8.5vh", alignItems: "center" }}>
                        <AccountBalanceIcon />
                        <Box >
                          {(tema == "Resiliência Climática") && programaDataCameras.length > 0 && programaDataSirenes.length > 0 && programaDataEstacoesAlertaRio.length > 0 &&
                            <Typography style={{ fontSize: "14px", paddingLeft: "5px" }}>{dadosAgregadosAbaSumarioStatusEntregasTema.count + programaDataCameras.length + programaDataSirenes.length + programaDataEstacoesAlertaRio.length + " "} Realizações</Typography>
                          }
                          {
                            (tema != "Resiliência Climática") &&
                            <Typography style={{ fontSize: "14px", paddingLeft: "5px" }}>{dadosAgregadosAbaSumarioStatusEntregasTema.count + " "}Realizaç{dadosAgregadosAbaSumarioStatusEntregasTema.count > 1 ? "ões" : "ão"}</Typography>
                          }
                        </Box>
                      </Box>
                      {/* </Tooltip> */}
                      {tema != "Mobilidade" && (
                        <>
                          {/* <span style={{ paddingLeft: "5px", paddingRight: "5px" }}></span>
                      {dadosAgregadosAbaSumarioStatusEntregasTema.investment !== 0 && (
                          <Box display="flex"style={{display:"flex", height:"8.5vh", alignItems:"center"}}>
                            <AttachMoneyIcon />
                            <Box>
                              <Typography style={{fontSize:"14px"}}>
                                {dadosAgregadosAbaSumarioStatusEntregasTema.investment.toLocaleString('pt-BR', {
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

            <Slide direction="up" timeout={1000} in={gestao != "1_2"} mountOnEnter unmountOnExit>
              <Paper
                elevation={6}
                className={classes.underSearch4}
              >
                <div className={classes.basicInfo}>
                  <Typography className={classes.sobreMunicipio}>Destaques</Typography>
                  <ul className={classes.listStyle} style={{ listStyleType: 'none', padding: 0, textAlign: "left", }}>
                    {destaquesTema.length == 0 ? (
                      <>
                        <Skeleton variant="text" />
                        <Skeleton height="15px" width="80%" />
                        <Skeleton height="15px" width="60%" />
                        <Skeleton height="15px" width="73%" />
                        <br></br>
                        <Skeleton variant="text" />
                        <Skeleton height="15px" width="40%" />
                        <Skeleton height="15px" width="60%" />
                        <Skeleton height="15px" width="73%" />
                      </>
                    )
                      :
                      (
                        destaquesTema.map((item, index) => (
                          <li key={index} style={{ paddingBottom: "15px" }}>
                            <Typography className={classes.title_li} onClick={() => handleTitleClick(item.title)}>{item.title} <ArrowOutwardIcon sx={{ paddingLeft: "20px", marginBottom: "-5px" }} /></Typography>
                            <Typography className={classes.subtituloDestaques}>{item.description}</Typography>
                          </li>
                        ))
                      )}
                  </ul>
                </div>
              </Paper>
            </Slide>

          </div>
        )}

        {!isDesktop() && openedPopup == null && tema && (
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
              <SheetContentTemaDescriptionBar />
            </BottomSheet>
          </div>
        )}
      </>
    );
  }
);
export default TemaDescriptionBar;
