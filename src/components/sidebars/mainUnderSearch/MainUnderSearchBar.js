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
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import GroupsIcon from '@mui/icons-material/Groups';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import InfoIcon from '@mui/icons-material/Info';
import { useDispatch } from "react-redux";
import { loadDadosAgregadosAbaSumarioStatusEntregasCidade } from "../../../redux/cidade/actions";
import { toSnakeCase } from "../../../utils/formatFile";
import { DESCRIPTION_BAR, MAIN_UNDERSEARCH_BAR } from "../../../redux/active/actions";
import { getAggregatedData, getListDestaquesMunicipio } from "../../../firebase";
import ArrowOutwardIcon from '@mui/icons-material/ArrowOutward';
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
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      position: "relative",
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
    underSearchMobile: {
      padding: "12px 0",
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
        // backgroundColor: "black",
        borderRadius: "10px",
        // display: "auto",
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
      fontSize: "1.5rem",
      fontWeight: "bold",
      marginBottom: "-5px"
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
      // paddingBottom:"15px"
    },
    subtituloDestaques: {
      opacity: 0.8,
      display: '-webkit-box',
      '-webkit-line-clamp': 4,
      '-webkit-box-orient': 'vertical',
      overflow: 'hidden',
      textAlign: "justify",
      paddingRight: "20px",
      fontSize: "0.9rem",
    },
    title_li: {
      fontWeight: "bold",
      cursor: "pointer",
      fontSize: "1.0rem",
      display: '-webkit-box',
      '-webkit-line-clamp': 2,
      '-webkit-box-orient': 'vertical',
      overflow: 'hidden',
    }
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
    listStyle: {
      overflowY: "scroll",
      "-ms-overflow-style": "auto",

      scrollbarWidth: "auto", /* Ocultar a barra de rolagem no Firefox */
      "&::-webkit-scrollbar": {
        width: "0.2em",
        // display: "auto",
      },
      "&::-webkit-scrollbar-thumb": {
        // backgroundColor: "black",
        borderRadius: "10px",
        // display: "auto",
      },
    }
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
    fontSize: "1.5rem",
    fontWeight: "bold",
    marginBottom: "-5px"
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
    // paddingBottom:"15px"
  },
  subtituloDestaques: {
    opacity: 0.8,
    display: '-webkit-box',
    '-webkit-line-clamp': 4,
    '-webkit-box-orient': 'vertical',
    overflow: 'hidden',
    textAlign: "justify",
    paddingRight: "20px",
    fontSize: "0.9rem",
  },
  title_li: {
    fontWeight: "bold",
    cursor: "pointer",
    fontSize: "1.0rem",
    display: '-webkit-box',
    '-webkit-line-clamp': 2,
    '-webkit-box-orient': 'vertical',
    overflow: 'hidden',
  }

}));

const theme = createTheme({
  palette: {
    primary: {
      main: "#007E7D",
    },
  },
});

const MainUnderSearchBar = forwardRef(
  ({ underSearchBar,
    setActiveBar,
    setDescriptionData,
    setUnderSearchBar,
    loadData,
    dadosAgregadosCidade,
    dadosDestaquesCidade,
    loading
  }, ref) => {

    const classes = useStyles();


    const handleTitleClick = (value) => {
      setDescriptionData(toSnakeCase(value));
      // setUnderSearchBar(true);
      setActiveBar(DESCRIPTION_BAR);
      loadData(toSnakeCase(value));
      // console.log("clickei")
    };


    // o destaque conterá as 3 realizacões mais caras do município, com o título e a descrição e lat long da realização
    // const [dadosDestaquesCidade, setDestaquesMunicipio] = useState([]);
    // useEffect(() => {
    //   const loadDestaquesMunicipio = async () => {
    //     try {
    //       const destaquesMunicipioRef = await getListDestaquesMunicipio();

    //       setDestaquesMunicipio(destaquesMunicipioRef);

    //     } catch (error) {
    //       console.error("Erro", error);
    //     }
    //   };

    //   loadDestaquesMunicipio();
    // }, []);

    useEffect(() => {
      if (window.innerHeight >= 1000) {
        setTextExpanded(true);
      }
    }, []);

    const fullText = `No Mapa de Realizações veremos, de forma interativa e inovadora, em tempo real, as principais obras e projetos nos quatro cantos do Rio. Neste mapa, estão contempladas mais de 5 mil realizações nas mais diversas áreas como Saúde, Educação, Mobilidade, Obras e Infraestrutura entre outras que poderão ser encontradas de acordo com os temas, projetos e por área da cidade. Tudo com transparência, agilidade e responsabilidade.`;

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


    // Obtém a altura da janela em pixels

    // Calcule o número de caracteres com base na altura da janela
    const numChars = Math.floor(windowHeight / (isScreen900 ? 3 : (isScreen500 ? 4 : 1.8)));

    const shortText = `${fullText?.substring(0, numChars)} ...`;
  
    function SheetContentMainUnderSearchBar() {
      return (
        <Stack m={2} mt={2} spacing={2}>
          <Paper
            elevation={6}
            className={classes.underSearchMobile}
          >
            <div style={{ paddingLeft: "25px" }}>
              <Typography className={classes.titulo}>Rio de Janeiro</Typography>
              <Typography className={classes.subtitulo}> Mapa de Realizações </Typography>
            </div>
          </Paper>

          <Paper
                elevation={6}
                className={classes.underSearch2Mobile}
              >
                <div className={classes.basicInfo}>
                  <Typography className={classes.sobreMunicipio}>Sobre</Typography>
                  <Typography className={classes.subtituloMunicipio}>
                    {isTextExpanded ? fullText : shortText}
                    {window.innerHeight < 850 && (
                      <Button onClick={() => setTextExpanded(!isTextExpanded)}>
                        {isTextExpanded ? 'Leia menos' : 'Leia mais'}
                      </Button>
                    )}
                  </Typography>

                </div>
              </Paper>

              <Paper
                elevation={6}
                className={classes.underSearch3Mobile}
              >

                <Box height="8.5vh" display="flex" justifyContent="center" alignItems="center">
                  {(!dadosAgregadosCidade) ? < CircularProgress /> :
                    <>
                      {/* <Tooltip title="Realizações"> */}

                        <Box display="flex" >

                          <AccountBalanceIcon />
                          <Box pl={0.5}>
                          <Typography  >{dadosAgregadosCidade?.count} Realizações</Typography>
                          </Box>
                        </Box>
                      {/* </Tooltip> */}

                    </>}
                </Box>

              </Paper>

              <Paper
                elevation={6}
                className={classes.underSearch4Mobile}
              >
                 <img src={rio_cover} style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: "10px" }} />
                {/* <div className={classes.basicInfo}>
                  <Typography className={classes.sobreMunicipio}>Destaques</Typography>
                  <ul className={classes.listStyle} style={{ listStyleType: 'none', padding: 0, textAlign: "left", }}>
                    {!dadosDestaquesCidade ? (
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
                    ) : (
                      dadosDestaquesCidade?.map((item, index) => (
                        <li key={index} style={{ paddingBottom: "15px" }}>
                          <Typography className={classes.title_li} onClick={() => handleTitleClick(item.title)}>{item.title} <ArrowOutwardIcon sx={{ paddingLeft: "20px", marginBottom: "-5px" }} /></Typography>
                          <Typography className={classes.subtituloDestaques}>{item.description}</Typography>
                        </li>
                      ))
                    )}
                  </ul>
                </div> */}
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
  
    const handleCloseSheet = () => {
      setOpenSheet(null);
    };
    return (
      <>
        {isDesktop() && (
          <div ref={ref}>

            <Slide direction="down" timeout={1000} in={underSearchBar} mountOnEnter unmountOnExit>
              <Paper
                elevation={6}
                ref={ref}
                className={classes.underSearch}
              >
                <div style={{ paddingLeft: "25px" }}>
                  <Typography className={classes.titulo}>Rio de Janeiro</Typography>
                  <Typography className={classes.subtitulo}> Mapa de Realizações </Typography>
                </div>
              </Paper>
            </Slide>
            <Slide direction="left" timeout={1000} in={underSearchBar} mountOnEnter unmountOnExit>
              <Paper
                elevation={6}
                className={classes.underSearch2}
              >
                <div className={classes.basicInfo}>
                  <Typography className={classes.sobreMunicipio}>Sobre</Typography>
                  {/* <Typography className={classes.subtituloMunicipio}>
                    {isTextExpanded ? fullText : shortText}
                    {window.innerHeight < 850 && (
                      <Button onClick={() => setTextExpanded(!isTextExpanded)}>
                        {isTextExpanded ? 'Leia menos' : 'Leia mais'}
                      </Button>
                    )}
                  </Typography> */}
                  <Typography className={classes.subtituloMunicipio}>
                  {isTextExpanded ? fullText : shortText === "undefined ..." ? "Desculpe, algo deu errado. Por favor, tente novamente mais tarde." : (fullText + " ..." === shortText) ? fullText : shortText}
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
                  {(!dadosAgregadosCidade) ? < CircularProgress /> :
                    <>
                      {/* <Tooltip title="Realizações"> */}

                        <Box display="flex" >

                          <AccountBalanceIcon />
                          <Box pl={0.5}>
                            <Typography  >{dadosAgregadosCidade?.count} Realizações</Typography>
                          </Box>
                        </Box>
                      {/* </Tooltip> */}

                    </>}
                </Box>

              </Paper>
            </Slide>
            <Slide direction="up" timeout={1000} in={underSearchBar} mountOnEnter unmountOnExit>
              <Paper
                elevation={6}
                className={classes.underSearch4}
              >
                <Paper
              elevation={6}
              className={classes.underSearch4}
            >
              <img src={rio_cover} style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: "10px" }} />
            </Paper>
                
                {/* <div className={classes.basicInfo}>
                  <Typography className={classes.sobreMunicipio}>Destaques</Typography>
                  <ul className={classes.listStyle} style={{ listStyleType: 'none', padding: 0, textAlign: "left", }}>
                    {!dadosDestaquesCidade ? (
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
                    ) : (
                      dadosDestaquesCidade?.map((item, index) => (
                        <li key={index} style={{ paddingBottom: "15px" }}>
                          <Typography className={classes.title_li} onClick={() => handleTitleClick(item.title)}>{item.title} <ArrowOutwardIcon sx={{ paddingLeft: "20px", marginBottom: "-5px" }} /></Typography>
                          <Typography className={classes.subtituloDestaques}>{item.description}</Typography>
                        </li>
                      ))
                    )}
                  </ul>
                </div> */}
              </Paper>
            </Slide>
          </div>
        )}

        {!isDesktop() && (
          <div>

            {openSheet !== null && (
              <BottomSheet
                style={{ zIndex: 507, position: "absolute" }}
                open={openSheet !== null}
                onDismiss={handleCloseSheet}
                ref={sheetRef}
                defaultSnap={({ maxHeight }) => maxHeight / 2}
                snapPoints={({ maxHeight }) => [
                  maxHeight - maxHeight / 10,
                  maxHeight / 4,
                  maxHeight * 0.6,
                ]}
              >
                {openSheet === 0 && <SheetContentMainUnderSearchBar />}
              </BottomSheet>
            )}
          </div>
        )}
      </>
    );
  }
);
export default MainUnderSearchBar;
