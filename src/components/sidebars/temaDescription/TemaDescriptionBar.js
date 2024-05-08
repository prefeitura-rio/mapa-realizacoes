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
import TemaDescriptionContainer from "./TemaDescriptionContainer";
import { getListDestaquesTema } from "../../../firebase";
import { toSnakeCase } from "../../../utils/formatFile";
import { DESCRIPTION_BAR } from "../../../redux/active/actions";
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
      height: "8.5vh",
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
      top: "12.5vh", //8.5vh + 3.0vh 1vh
      // bottom: "30px",
      right: "3vh",
      width: "25vw",
      minWidth: "385px",
      height: "34vh",
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
      top: "47.5vh", //12.5vh + 34vh + 1vh
      // bottom: "30px",
      right: "3vh",
      width: "25vw",
      minWidth: "385px",
      height: "8.5vh",
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
      top: "57vh", // 47.5vh + 8.5vh + 1vh = 55.5vh
      right: "3vh",
      width: "25vw",
      minWidth: "385px",
      height: "41.5vh",
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
    fontSize: "1.5rem",
    fontWeight: "bold",
    // marginBottom:"-5px"
  },
  subtituloMunicipio: {
    opacity: 0.8,
   
  },
  subtituloDestaques: {
    opacity: 0.8,
    display: '-webkit-box',
    '-webkit-line-clamp': 4,
    '-webkit-box-orient': 'vertical',
    overflow: 'hidden',
  },
  title_li: {
    fontWeight: "bold",
    cursor: "pointer",
    fontSize: "1.2rem",
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
    temaData



  }, ref) => {

    const classes = useStyles();
    
    const [dadosAgregadosAbaSumarioStatusEntregasCidadeTotal,setDadosAgregadosAbaSumarioStatusEntregasCidadeTotal] = useState(0)

    const dispatch = useDispatch();

    useEffect(() => {
      if (dadosAgregadosAbaSumarioStatusEntregasCidade){
        const total = dadosAgregadosAbaSumarioStatusEntregasCidade?.em_andamento + dadosAgregadosAbaSumarioStatusEntregasCidade?.concluida + dadosAgregadosAbaSumarioStatusEntregasCidade?.interrompida + dadosAgregadosAbaSumarioStatusEntregasCidade?.em_licitacao;
        setDadosAgregadosAbaSumarioStatusEntregasCidadeTotal(total);
      }
    }, [dadosAgregadosAbaSumarioStatusEntregasCidade]);
    
    
    const handleTitleClick = (value) => {
      setDescriptionData(toSnakeCase(value));
      setUnderSearchBar(true);
      setActiveBar(DESCRIPTION_BAR);
      loadData(toSnakeCase(value));
      console.log("clickei")
    };

  // o destaque conterá as 3 realizacões mais caras do tema, com o título e a descrição e lat long da realização
  const [destaquesTema, setDestaquesTema] = useState([]);
  useEffect(() => {
    const loadDestaquesTema = async (id_tema) => {
      try {
        const destaquesTemaRef = await getListDestaquesTema(id_tema);

          setDestaquesTema(destaquesTemaRef);
       
      } catch (error) {
        console.error("Erro", error);
      }
    };

    loadDestaquesTema(tema);
  }, []);

    return (
<>

        <Slide direction="down" timeout={1000} in={underSearchBar} mountOnEnter unmountOnExit>
          <Paper
            elevation={6}
            ref={ref}
            className={classes.underSearch}
          >
            <div className={classes.basicInfo}>
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
                <Tooltip placement="right" title={`Detalhe sobre o ${tema}`}>
                  <IconButton>
                    <InfoIcon sx={{color:"black"}}/>
                  </IconButton>
                </Tooltip>
              </Stack>
              <Typography className={classes.subtituloMunicipio}>{temaData?.descricao?temaData.descricao:"Desculpe, ainda não possuímos descrição para este tema. Por favor, tente novamente mais tarde."} </Typography>
            </div>
          </Paper>
        </Slide>
        <Slide direction="left" timeout={1000} in={underSearchBar} mountOnEnter unmountOnExit>
          <Paper
            elevation={6}
            className={classes.underSearch3}
          >

            <Box height="8.5vh" display="flex" justifyContent="space-between" alignItems="center">
            <Tooltip title="Realizações">
              <Box pl={2} display="flex" >
                <AccountBalanceIcon />
                <Box pl={0.5}>
                  {/* TODO: valor agregado da qntdd de obras. */}
                  <Typography> 970 </Typography>
                </Box>
              </Box>
              </Tooltip>
              <Tooltip title="Investimento">
              <Box display="flex" >
              <AttachMoneyIcon /> 
                <Box pl={0.5}>
                  {/* TODO: valor agregado das obras. */}
                  <Typography >R$ 4.000.000.000 </Typography>
                </Box>
              </Box>
              </Tooltip>
              <Tooltip title="Cidadãos Beneficiados">
              <Box pr={2} display="flex">
              <GroupsIcon sx={{fontSize:"1.8rem"}}/>
                <Box pl={1} pt={0.5}>
                   {/* TODO: Puxar valor real */}
                   <Typography sx={{marginTop:"2rem !important"}} >1.000.000 </Typography>
                </Box>
              </Box>
              </Tooltip>


            </Box>

          </Paper>
        </Slide>
        <Slide direction="up" timeout={1000} in={underSearchBar} mountOnEnter unmountOnExit>
          <Paper
            elevation={6}
            className={classes.underSearch4}
          >
            <div className={classes.basicInfo}>
              <Typography className={classes.sobreMunicipio}>Destaques</Typography>
              <ul>
                {destaquesTema.map((item, index) => (
                  <li key={index}>
                    <Typography className={classes.title_li} onClick={()=>handleTitleClick(item.title)}>{item.title}</Typography>
                    <Typography className={classes.subtituloDestaques}>{item.description}</Typography>
                  </li>
                ))}
              </ul>
            </div>
          </Paper>
        </Slide>
        </>
    );
  }
);
export default TemaDescriptionBar;
