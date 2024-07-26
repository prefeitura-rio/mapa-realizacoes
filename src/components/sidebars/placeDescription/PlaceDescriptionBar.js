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
import PlaceDescriptionContainer from "./PlaceDescriptionContainer";
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ListInfo from "../../inlines/ListInfo";
import no_imagem from "../../assets/no_image.jpg"
import { isDesktop } from "../../../redux/active/reducers";
import { BottomSheet } from "react-spring-bottom-sheet";
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import Cookies from 'js-cookie';
import whatsapp from '../../assets/whatsapp.png';
import { DESCRIPTION_BAR, PROGRAMA_DESCRIPTION_BAR } from "../../../redux/active/actions";
import { setPrograma } from "../../../redux/filtros/actions";

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
      padding: "18px 0"
    },
    statusButton: {
      pointerEvents: "none",
      borderRadius: "39px",
      backgroundColor: "#007E7D",
      color: "#FFFFFF",
      marginTop: "5px",
    },
    statusButtonHardCoded: {
      pointerEvents: "none",
      borderRadius: "39px",
      backgroundColor: "#004D4D",
      color: "#FFFFFF",
      marginTop: "5px",
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
    underSearchError: {
      // backgroundColor:"pink",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      position: "fixed",
      top: "3vh",
      right: "3vh",
      width: "25vw",
      minWidth: "385px",
      height: "120px",
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
      height: "calc(45.5vh - 180px)",
      borderRadius: "10px",
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
    underSearch2NoImage: {
      position: "fixed",
      top: "calc(4vh + 90px)", //4vh +1vh+ + 80px + 45.5vh -160px 
      // bottom: "30px",
      right: "3vh",
      width: "25vw",
      minWidth: "385px",
      height: "calc(46vh - 45px)",
      borderRadius: "10px",
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
    underSearch3: {
      position: "fixed",
      top: "calc(50.5vh - 90px )", //4vh +1vh+ + 80px + 45.5vh -160px 
      // bottom: "30px",
      right: "3vh",
      width: "25vw",
      minWidth: "385px",
      height: "calc(45.5vh - 140px )",
      borderRadius: "10px",
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
    underSearch3NoImage: {
      position: "fixed",
      top: "calc(46vh - 45px + 4vh + 90px + 1vh)", //4vh +1vh+ + 80px + 45.5vh -160px 
      // bottom: "30px",
      right: "3vh",
      width: "25vw",
      minWidth: "385px",
      height: "calc(46vh - 45px)",
      borderRadius: "10px",
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
      top: "calc(96vh - 320px + 90px + 1vh)", // 96vh - 320px + 80px + 1vh
      right: "3vh",
      width: "25vw",
      minWidth: "385px",
      height: "240px",
      borderRadius: "10px",
      overflowY: "hide",
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
    paddingLeft: "25px",
    paddingRight: "25px",
    paddingTop: "13px",
    paddingBottom: "13px",
  },
  sumarioInfo: {
    // padding: "3px 20px",
    maxWidth: "100%"
  },
  dadosAgregadosCidade: {
    // padding: "3px 20px",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
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
    marginTop: "-1px",
    marginBottom: "-1px"
  },
  noInfoTitulo: {
    // position:"relative",
    lineHeight: "26px",
    fontSize: "1.2rem",
    fontWeight: "bold",
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
    // marginBottom:"-5px",
  },
  subtituloRealizacao: {
    opacity: 0.8,
    height: "10.5vh",
    // overflow: 'hidden',
    textOverflow: 'ellipsis',
    // whiteSpace: 'nowrap',
    textAlign: "justify",
  },
  buttonStatus: {
    position: 'absolute',
    top: '18px',
    right: '20px',
  },
  statusButton: {
    pointerEvents: "none",
    borderRadius: "39px",
    backgroundColor: "#007E7D",
    color: "#FFFFFF",
    padding: "1px 8px 1px 8px",
    fontSize: "12px",
  },

  statusButtonHardCoded: {
    pointerEvents: "none",
    borderRadius: "39px",
    backgroundColor: "#004D4D",
    color: "#FFFFFF",
    padding: "1px 8px 1px 8px",
    fontSize: "12px",
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
    realizacao,
    error,
    openedPopup,
    rota,
    activeBar,
    setPrograma,
    setTema



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


    const [windowHeight, setWindowHeight] = useState(window.innerHeight);

    useEffect(() => {
      const handleResize = () => setWindowHeight(window.innerHeight);
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }, []);

    useEffect(() => {
      if (windowHeight <= 600) {
        setTextScreen600(true);
        setTextScreen900(false);
      }
      else if (windowHeight > 600 && windowHeight <= 900) {
        setTextScreen900(true);
        setTextScreen600(false);
      }
      else if (windowHeight >= 900) {
        setTextScreen600(false);
        setTextScreen900(false);
      }
    }, [windowHeight]);

    const [isTextExpanded, setTextExpanded] = useState(false);
    const [isScreen900, setTextScreen900] = useState(false);
    const [isScreen600, setTextScreen600] = useState(false);


    const fullText = content?.descricao;

    // Calcule o número de caracteres com base na altura da janela
    const numChars = Math.floor(windowHeight / (isScreen900 ? 3 : (isScreen600 ? 3.2 : 1.6)));

    const shortText = `${fullText?.substring(0, numChars)} ...`;
    const [loading, setLoading] = useState(false);

    const handleShareWhatsApp = async () => {
      setLoading(true);
      const prompt = `Desenvolva uma mensagem de WhatsApp amigável com informações vindas do Mapa de Realizações da Prefeitura do Rio de Janeiro. Use emoticons no início das frases contextualizados com as informações.
                      As mensagens devem ser sucintas e carismáticas, comunicando ao cidadão as realizações da Prefeitura de forma positiva.
                      Não faça perguntas ao cidadão na mensagem. 
                      As realizações geralmente trazem Título, Descrição (Sobre), Secretaria, Bairro, Endereço, Investimento, População beneficiada. Colocar título, investimento e população beneficiada logo no início. 
                      Informações=> Título:${content?.nome} , Descrição: ${content?.descricao}, Programa: ${content?.programa}, Bairro: ${content?.bairro}, Endereço:${content?.endereco}, Investimento: ${content?.investimento}, População beneficiada: ${content?.cariocas_atendidos}
                      Caso não haja algumas das informações listadas acima, ignore e não comunique nada sobre o item.
                      Use emojis para tornar a mensagem mais leve e atrativa.
                      Seja breve e objetivo.
                      Destaque o impacto positivo da realização para o cidadão.
                      Utilize linguagem clara e fácil de entender.`;
      const imageUrl = content?.image_url ?? "";

      const requestBody = {
        prompt
      };

      try {
        const response = await fetch('https://genapi.dados.rio/text', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(requestBody),
          credentials: 'include'
        });

        if (!response.ok) {
          throw new Error('Erro ao tentar melhorar o texto do gemini');
        }

        const data = await response.json();
        const message = imageUrl ? `${data.text}\n\n${imageUrl}` : data.text;

        if (navigator.share) {
          await navigator.share({
            title: 'Veja que incrível essa realização!',
            text: message,
            // url: imageUrl
          });
        } else {
          // fallbakc to browsers that dont support share API
          const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(message)}`;
          window.open(whatsappUrl, '_blank');
        }
      } catch (error) {
        console.error('Erro no response...', error);
      } finally {
        setLoading(false);
      }
    };



    function SheetContentPlaceDescriptionBar() {
      return (
        <Stack m={2} mt={2} spacing={2}>
          {error ? (
            <Paper elevation={6} ref={ref} className={classes.underSearchErrorMobile}>
              <div style={{ padding: "25px" }}>
                <Typography className={classes.noInfoTituloMobile}>
                  Desculpe, não foi possível carregar os dados desta realização. Por favor, entre em contato com o InfoPref.
                </Typography>

              </div>
            </Paper>
          ) : (
            <>
              <Paper elevation={6} ref={ref} className={classes.underSearchMobile}>
                <div style={{ paddingLeft: "25px", paddingRight: "25px" }}>
                  <Typography className={classes.titulo}>
                    {content?.nome ?? <CircularProgress size={25} />}
                  </Typography>
                  <Typography className={classes.subtitulo}>
                    {programa ? programa : content?.programa}
                  </Typography>
                </div>
              </Paper>

              <Paper elevation={6} className={classes.underSearch2Mobile}>
                <div className={classes.basicInfo}>
                  {realizacao || content?.nome ? (
                    <>
                      <Stack direction="row">
                        <div style={{ marginBottom: "10px", width: "100%", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                          <Typography className={classes.sobreMunicipio}>Sobre</Typography>
                          {content?.status && (
                            <span >
                              <Button variant="contained" className={classes.statusButton}>
                                {content?.status}
                              </Button>
                            </span>
                          )}
                          {content?.gestao != "3" && (
                            <span >
                              <Button variant="contained" className={classes.statusButtonHardCoded}>
                                Concluído
                              </Button>
                            </span>
                          )}
                        </div>
                      </Stack>
                      <Typography className={classes.subtituloMunicipio}>
                        {content?.gestao != "3" && "Essa é uma realização de gestões anteriores."}
                        {
                          isTextExpanded ? (
                            <span>{fullText}</span>
                          ) : shortText === "undefined ..." ? (
                            "Desculpe, ainda não possuímos descrição para esta realização. Por favor, tente novamente mais tarde."
                          ) : (fullText + " ..." === shortText) ? (
                            <span>{fullText}</span>
                          ) : (
                            <span>{shortText}</span>
                          )
                        }
                        {fullText + " ..." !== shortText && (
                          <Button onClick={() => setTextExpanded(!isTextExpanded)}>
                            {content?.descricao && (isTextExpanded ? 'Leia menos' : 'Leia mais')}
                          </Button>
                        )}
                        <br></br>
                        <Typography
                          component="span"
                          style={{ cursor: 'pointer', textDecoration: 'underline', color: '#007bff', marginLeft: '8px' }}
                          onClick={() => {
                            setTema(content?.tema);
                            setPrograma(content?.programa);
                            setActiveBar(PROGRAMA_DESCRIPTION_BAR);
                          }}
                        >
                          Saiba mais
                        </Typography>
                      </Typography>
                    </>
                  ) : (
                    <CircularProgress style={{ marginTop: "1rem" }} size={25} />
                  )}
                </div>

              </Paper>

              <Paper
                elevation={6}
                className={content?.image_url ? classes.underSearch3Mobile : classes.underSearch3NoImageMobile}
              >
                <div className={classes.sumarioInfo}>
                  {content ? <ListInfo content={content ? content : []} /> : <CircularProgress style={{ marginTop: "1rem", marginLeft: "1.2rem" }} size={25} />}
                </div>
              </Paper>

              {content?.image_url && (
                <Paper elevation={6} className={classes.underSearch4}>
                  <ImageCarousel images={[content?.image_url]} />
                </Paper>
              )}

              <Paper style={{ padding: "20px" }} elevation={6}>
                <Button
                  startIcon={<WhatsAppIcon sx={{ color: "#25d366", fontSize: "30px !important" }} />}
                  onClick={handleShareWhatsApp}
                  disabled={loading}
                >
                  Compartilhe no WhatsApp
                </Button>
              </Paper>
            </>
          )}
        </Stack>
      )
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
      if (openedPopup == null && rota) {
        setIsBottomSheetOpen(true);
      }
    }, [openedPopup, rota]);

    return (
      <>
        {isDesktop() && (
          <div>
            {error ? (
              <Slide direction="down" timeout={1000} in={underSearchBar} mountOnEnter unmountOnExit>
                <Paper elevation={6} ref={ref} className={classes.underSearchError}>
                  <div style={{ paddingLeft: "25px", paddingRight: "25px" }}>
                    <Typography className={classes.noInfoTitulo}>
                      Desculpe, não foi possível carregar os dados desta realização. Por favor, entre em contato com o InfoPref.
                    </Typography>

                  </div>
                </Paper>
              </Slide>
            ) : (
              <>
                <Slide direction="down" timeout={1000} in={underSearchBar} mountOnEnter unmountOnExit>
                  <Paper elevation={6} ref={ref} className={classes.underSearch}>
                    <div style={{ paddingLeft: "25px", paddingRight: "25px" }}>
                      <Typography className={classes.titulo}>
                        {content?.nome ?? <CircularProgress size={25} />}
                      </Typography>
                      <Typography className={classes.subtitulo}>
                        {programa ? programa : content?.programa}
                      </Typography>
                    </div>
                  </Paper>
                </Slide>
                <Slide direction="left" timeout={1000} in={underSearchBar} mountOnEnter unmountOnExit>
                  <Paper elevation={6} className={content?.image_url ? classes.underSearch2 : classes.underSearch2NoImage}>
                    <div className={classes.basicInfo}>
                      {realizacao || content?.nome ? (
                        <>
                          <Stack direction="row">
                            <Typography className={classes.sobreMunicipio}>Sobre</Typography>
                          </Stack>
                          <Typography className={classes.subtituloMunicipio}>
                            {content?.gestao != "3" && "Essa é uma realização de gestões anteriores."}
                            {
                              isTextExpanded ? (
                                <span>{fullText}</span>
                              ) : shortText === "undefined ..." ? (
                                "Desculpe, ainda não possuímos descrição para esta realização. Por favor, tente novamente mais tarde."
                              ) : (fullText + " ..." === shortText) ? (
                                <span>{fullText}</span>
                              ) : (
                                <span>{shortText}</span>
                              )
                            }
                            {fullText + " ..." !== shortText && (
                              <Button onClick={() => setTextExpanded(!isTextExpanded)}>
                                {content?.descricao && (isTextExpanded ? 'Leia menos' : 'Leia mais')}
                              </Button>
                            )}<br></br>
                            <Typography
                              component="span"
                              style={{ cursor: 'pointer', textDecoration: 'underline', color: '#007bff', marginLeft: '8px' }}
                              onClick={() => {
                                setTema(content?.tema);
                                setPrograma(content?.programa);
                                setActiveBar(PROGRAMA_DESCRIPTION_BAR);
                              }}
                            >
                              Saiba mais
                            </Typography>
                          </Typography>
                        </>
                      ) : (
                        <CircularProgress style={{ marginTop: "1rem" }} size={25} />
                      )}
                    </div>
                    {content?.status && (
                      <span className={classes.buttonStatus}>
                        <Button variant="contained" className={classes.statusButton}>
                          {content?.status}
                        </Button>
                      </span>
                    )}
                    {content?.gestao != "3" && (
                      <span className={classes.buttonStatus}>
                        <Button variant="contained" className={classes.statusButtonHardCoded}>
                          Concluído
                        </Button>
                      </span>
                    )}
                  </Paper>
                </Slide>
                <Slide direction="left" timeout={1000} in={underSearchBar} mountOnEnter unmountOnExit>
                  <Paper
                    elevation={6}
                    className={content?.image_url ? classes.underSearch3 : classes.underSearch3NoImage}
                  >
                    <div className={classes.sumarioInfo}>
                      {content ? <ListInfo content={content ? content : []} /> : <CircularProgress style={{ marginTop: "1rem", marginLeft: "1.2rem" }} size={25} />}
                    </div>
                  </Paper>
                </Slide>
                {content?.image_url && (
                  <Slide direction="up" timeout={1000} in={underSearchBar} mountOnEnter unmountOnExit>
                    <Paper elevation={6} className={classes.underSearch4}>
                      <ImageCarousel images={[content?.image_url]} />
                    </Paper>
                  </Slide>
                )}
              </>
            )}
          </div>)}

        {!isDesktop() && openedPopup == null && (
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
              <SheetContentPlaceDescriptionBar />
            </BottomSheet>
          </div>
        )}
        {isDesktop() && (
          <Slide direction="up" timeout={1000} in={activeBar == DESCRIPTION_BAR} mountOnEnter unmountOnExit>
            <Button
              style={{
                position: 'fixed',
                right: 'calc(max((25vw + 30px), (385px + 30px))',
                bottom: '15px',
                zIndex: 0,
              }}
              onClick={handleShareWhatsApp}
            >
              <img src={whatsapp} alt="Fixed Button" style={{ width: "50px" }} />
            </Button>
          </Slide>
        )}
      </>
    );
  });

export default PlaceDescriptionBar;