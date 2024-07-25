import {
  Fab,
  makeStyles,
  ThemeProvider,
  createTheme,
  Slide,
  Paper,
  Box,
  Typography,
  CircularProgress
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
import BairroDescriptionContainer from "./BairroDescriptionContainer";
import { getAggregatedData, getListDestaquesBairro } from "../../../firebase";
import { toSnakeCase } from "../../../utils/formatFile";
import { DESCRIPTION_BAR } from "../../../redux/active/actions";
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import GroupsIcon from '@mui/icons-material/Groups';
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
      height: "100vh",
      width: "100vw",
      overflow: "auto",
      position: "relative",
    },
  },
  "@media screen and (min-width: 540px)": {
    underSearch: {

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
    underSearch3: {
      position: "fixed",
      top: "calc( 80px + 4vh + 1vh + 8.5vh  )", //
      // bottom: "30px",
      right: "3vh",
      width: "25vw",
      minWidth: "385px",
      height: "calc( 97vh - (80px + 4vh + 1vh + 8.5vh))", // 
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
      top: "calc( 80px + 4vh )", // com o card de sobre :"calc( 80px + 4vh + 41.5vh - 40px + 1vh )"
      right: "3vh",
      width: "25vw",
      minWidth: "385px",
      height: "calc(70vh )",
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

}));

const theme = createTheme({
  palette: {
    primary: {
      main: "#007E7D",
    },
  },
});

const BairroDescriptionBar = forwardRef(
  ({ underSearchBar,
    bairro,
    tema,
    programa,
    // dadosAgregadosAbaSumarioStatusEntregasBairro,
    setDescriptionData,
    setUnderSearchBar,
    loadData,
    setActiveBar,
    openedPopup,
    gestao
  }, ref) => {

    const classes = useStyles();

    // const [dadosAgregadosAbaSumarioStatusEntregasBairroTotal, setDadosAgregadosAbaSumarioStatusEntregasBairroTotal] = useState(0)

    // const dispatch = useDispatch();

    // useEffect(() => {
    //   if (dadosAgregadosAbaSumarioStatusEntregasBairro) {
    //     const total = dadosAgregadosAbaSumarioStatusEntregasBairro?.em_andamento + dadosAgregadosAbaSumarioStatusEntregasBairro?.concluida + dadosAgregadosAbaSumarioStatusEntregasBairro?.interrompida + dadosAgregadosAbaSumarioStatusEntregasBairro?.em_licitacao;
    //     setDadosAgregadosAbaSumarioStatusEntregasBairroTotal(total);
    //   }
    // }, [dadosAgregadosAbaSumarioStatusEntregasBairro]);

    // o destaque conterá as 3 realizacões mais caras do bairro, com o título e a descrição e lat long da realização
    const [destaquesBairro, setDestaquesBairro] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
      if (!bairro) return;
      const loadDestaquesBairro = async (id_bairro) => {
        setIsLoading(true);
        try {
          const destaquesBairroRef = await getListDestaquesBairro(id_bairro);
          setDestaquesBairro(destaquesBairroRef);
        } catch (error) {
          console.error("Erro", error);
        } finally {
          setIsLoading(false);
        }
      };

      loadDestaquesBairro(bairro);
    }, [bairro]);

    const handleTitleClick = (value) => {
      setDescriptionData(toSnakeCase(value));
      // setUnderSearchBar(true);
      setActiveBar(DESCRIPTION_BAR);
      loadData(toSnakeCase(value));
      // console.log("clickei")
    };

    function SheetContentBairroDescriptionBar() {
      return (
        <Stack m={2} mt={2} spacing={2}>
          <Paper
            elevation={6}
            ref={ref}
            className={classes.underSearchMobile}
          >
            <div className={classes.basicInfo}>
              <Typography className={classes.titulo}>{bairro ? bairro : <CircularProgress size={25} />}</Typography>
              <Typography className={classes.subtitulo}> Bairro</Typography>
            </div>
          </Paper>
          <Paper
            elevation={6}
            className={classes.underSearch2Mobile}
          >

            <Box pl={1} pr={1} height="8.5vh" display="flex" justifyContent="center" alignItems="center">
              {!dadosAgregadosAbaSumarioStatusEntregasBairro ? (
                <CircularProgress />
              ) : dadosAgregadosAbaSumarioStatusEntregasBairro.count === 0 ? (
                <Box pl={3} pr={3} style={{ opacity: 0.8 }} >
                  <Typography>Não há realização deste tema ou programa no bairro selecionado.</Typography>
                </Box>
              ) : (
                <>
                  {/* <Tooltip title="Realizações"> */}
                  <Box display="flex" style={{ display: "flex", height: "8.5vh", alignItems: "center" }}>
                    <AccountBalanceIcon />
                    <Box >
                      {/* TODO: valor agregado da qntdd de obras. */}
                      <Typography style={{ fontSize: "14px", paddingLeft: "5px" }}>{dadosAgregadosAbaSumarioStatusEntregasBairro.count + " "}Realizaç{dadosAgregadosAbaSumarioStatusEntregasBairro.count > 1 ? "ões" : "ão"}</Typography>
                    </Box>
                  </Box>
                  {/* </Tooltip> */}
                  <span style={{ paddingLeft: "5px", paddingRight: "5px" }}></span>
                  {dadosAgregadosAbaSumarioStatusEntregasBairro.investment !== 0 && (
                    // <Tooltip title="Investimento" >
                    <Box display="flex" style={{ display: "flex", height: "8.5vh", alignItems: "center" }}>
                      <AttachMoneyIcon />
                      <Box>
                        <Typography style={{ fontSize: "14px" }}>
                          {dadosAgregadosAbaSumarioStatusEntregasBairro.investment.toLocaleString('pt-BR', {
                            style: 'currency',
                            currency: 'BRL',
                            minimumFractionDigits: 0,
                            maximumFractionDigits: 0,
                          }) + " "}
                          Investidos
                        </Typography>
                      </Box>
                    </Box>
                  )}
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
                  {isLoading ? (
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
                      <br></br>
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
                  ) : destaquesBairro.length === 0 ? (
                    <Typography className={classes.subtitulo}>Nenhum destaque encontrado para este bairro.</Typography>
                  ) : (
                    destaquesBairro.map((item, index) => (
                      <li key={index} style={{ paddingBottom: "15px" }}>
                        <Typography className={classes.title_li} onClick={() => handleTitleClick(item.title)}>
                          {item.title} <ArrowOutwardIcon sx={{ paddingLeft: "20px", marginBottom: "-5px" }} />
                        </Typography>
                        <Typography className={classes.subtituloDestaques}>{item.description}</Typography>
                      </li>
                    ))
                  )}
                </ul>
              </div>
            </Paper>
          }
        </Stack>)
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
      if (openedPopup == null && bairro) {
        setIsBottomSheetOpen(true);
      }
    }, [openedPopup]);

    const [dadosAgregadosAbaSumarioStatusEntregasBairro, setDadosAgregadosAbaSumarioStatusEntregasBairro] = useState(0)

    useEffect(() => {
      const loadDadosAgregadosBairro = async () => {
        // for place loading everytime the bairro/bairro changes
        setDadosAgregadosAbaSumarioStatusEntregasBairro(null);
        try {
          let dadosAgregadosBairro;
          if (!tema && !programa) {
            dadosAgregadosBairro = await getAggregatedData(null, null, toSnakeCase(bairro), null);;
          } else if (tema && !programa) {
            dadosAgregadosBairro = await getAggregatedData(toSnakeCase(tema), null, toSnakeCase(bairro), null);
          }
          else if (tema && programa) {
            dadosAgregadosBairro = await getAggregatedData(null, toSnakeCase(programa), toSnakeCase(bairro), null);
          }
          // console.log("dadosAgregadosBairro", dadosAgregadosBairro)
          setDadosAgregadosAbaSumarioStatusEntregasBairro(dadosAgregadosBairro)

        } catch (error) {
          console.error("Erro", error);
        }
      };
      loadDadosAgregadosBairro();
    }, [bairro, tema, programa]);

    return (
      <>
        {isDesktop() && (
          <>
            <Slide direction="down" timeout={1000} in={underSearchBar} mountOnEnter unmountOnExit>
              <Paper
                elevation={6}
                ref={ref}
                className={classes.underSearch}
              >
                <div className={classes.basicInfo}>
                  <Typography className={classes.titulo}>{bairro ? bairro : <CircularProgress size={25} />}</Typography>
                  <Typography className={classes.subtitulo}> Bairro</Typography>
                </div>
              </Paper>
            </Slide>
            <Slide direction="left" timeout={1000} in={underSearchBar} mountOnEnter unmountOnExit>
              <Paper
                elevation={6}
                className={classes.underSearch2}
              >

                <Box pl={1} pr={1} height="8.5vh" display="flex" justifyContent="center" alignItems="center">
                  {!dadosAgregadosAbaSumarioStatusEntregasBairro ? (
                    <CircularProgress />
                  ) : dadosAgregadosAbaSumarioStatusEntregasBairro.count === 0 ? (
                    <Box pl={3} pr={3} style={{ opacity: 0.8 }} >
                      <Typography>Não há realização deste tema ou programa no bairro selecionado.</Typography>
                    </Box>
                  ) : (
                    <>
                      {/* <Tooltip title="Realizações"> */}
                      <Box display="flex" style={{ display: "flex", height: "8.5vh", alignItems: "center" }}>
                        <AccountBalanceIcon />
                        <Box >
                          {/* TODO: valor agregado da qntdd de obras. */}
                          <Typography style={{ fontSize: "14px", paddingLeft: "5px" }}>{dadosAgregadosAbaSumarioStatusEntregasBairro.count + " "}Realizaç{dadosAgregadosAbaSumarioStatusEntregasBairro.count > 1 ? "ões" : "ão"}</Typography>
                        </Box>
                      </Box>
                      {/* </Tooltip> */}
                      <span style={{ paddingLeft: "5px", paddingRight: "5px" }}></span>
                      {dadosAgregadosAbaSumarioStatusEntregasBairro.investment !== 0 && (
                        // <Tooltip title="Investimento" >
                        <Box display="flex" style={{ display: "flex", height: "8.5vh", alignItems: "center" }}>
                          <AttachMoneyIcon />
                          <Box>
                            <Typography style={{ fontSize: "14px" }}>
                              {dadosAgregadosAbaSumarioStatusEntregasBairro.investment.toLocaleString('pt-BR', {
                                style: 'currency',
                                currency: 'BRL',
                                minimumFractionDigits: 0,
                                maximumFractionDigits: 0,
                              }) + " "}
                              Investidos
                            </Typography>
                          </Box>
                        </Box>
                      )}
                    </>
                  )}
                </Box>

              </Paper>
            </Slide>
            {gestao != "1_2" &&
              <Slide direction="up" timeout={1000} in={underSearchBar} mountOnEnter unmountOnExit>
                <Paper
                  elevation={6}
                  className={classes.underSearch3}
                >
                  <div className={classes.basicInfo}>
                    <Typography className={classes.sobreMunicipio}>Destaques</Typography>
                    <ul className={classes.listStyle} style={{ listStyleType: 'none', padding: 0, textAlign: "left", }}>
                      {isLoading ? (
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
                          <br></br>
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
                      ) : destaquesBairro.length === 0 ? (
                        <Typography className={classes.subtitulo}>Nenhum destaque encontrado para este bairro.</Typography>
                      ) : (
                        destaquesBairro.map((item, index) => (
                          <li key={index} style={{ paddingBottom: "15px" }}>
                            <Typography className={classes.title_li} onClick={() => handleTitleClick(item.title)}>
                              {item.title} <ArrowOutwardIcon sx={{ paddingLeft: "20px", marginBottom: "-5px" }} />
                            </Typography>
                            <Typography className={classes.subtituloDestaques}>{item.description}</Typography>
                          </li>
                        ))
                      )}
                    </ul>
                  </div>
                </Paper>
              </Slide>
            }
          </>
        )}


        {!isDesktop() && openedPopup == null && bairro && (
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
              <SheetContentBairroDescriptionBar />
            </BottomSheet>
          </div>
        )}
      </>
    );
  }
);
export default BairroDescriptionBar;
