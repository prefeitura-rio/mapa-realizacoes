// import {
//   Fab,
//   makeStyles,
//   ThemeProvider,
//   createTheme
// } from "@material-ui/core";

// import ExpandLessIcon from "@material-ui/icons/ExpandLess";
// import { forwardRef } from "react";
// import { useState,useEffect } from "react";
// import DadosAgregados from "../../inlines/dadosAgregados/DadosAgregados";
// import PlaceHolder from "../../assets/placeholder_blue.jpg"

// const useStyles = makeStyles((theme) => ({

//   listInfo: {
//     padding: "6px 0",
//   },

//   photos: {
//     // padding: "12px",
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
//   fabContainer: {
//     display: "flex",
//     justifyContent: "center",
//   },


//   directoryInputWrapper: {
//     width: "97%",
//     margin: "0 1.5%",
//   },

//   fab: {
//     position: "fixed",
//     bottom: "20px",
//     backgroundColor: "white",

//     textTransform: "none",
//     border: "1px solid #dadce0",
//     boxShadow: "0 1px 6px rgb(60 64 67 / 28%)",

//     "&:hover": {
//       borderColor: " #DADCE0",
//       backgroundColor: "#F1F3F4",
//       transition: "none",
//     },
//   },

//   searchShadow: {
//     position: "fixed",
//     width: "423px",
//     height: "80px",
//     background: "-webkit-linear-gradient(rgba(0,0,0,0.25),rgba(0,0,0,0))",
//   },

//   textSmall: {
//     fontSize: "0.75rem",
//   },
//   marginZero: {
//     margin: 0,
//   },
//   bottomInfo: {
//     marginBottom: "30px"
//   }

// }));

// const theme = createTheme({
//   palette: {
//     primary: {
//       main: "#007E7D",
//     },
//   },
// });

// const SubprefeituraDescriptionBar = forwardRef(
//   ({ underSearchBar,
//     subprefeituras,
//     images_subprefeitura,
//     dadosAgregadosAbaTemaSubprefeitura,
//     dadosAgregadosAbaProgramasSubprefeitura,
//     dadosAgregadosAbaSumarioInfoBasicasSubprefeitura,
//     dadosAgregadosAbaSumarioStatusEntregasSubprefeitura,
//     setDescriptionData,
//     setUnderSearchBar,
//     loadData,
//     setPhotoGallery,
//     setImagesType,
//     setActiveBar
//   }, ref) => {
//     const classes = useStyles();
//     const [imagesList, setImagesList] = useState(images_subprefeitura);
    
//     useEffect(() => {
//       setImagesList(images_subprefeitura);
//       setTopImgSrc(images_subprefeitura.length > 0 ? images_subprefeitura[0] : PlaceHolder);
//     }, [images_subprefeitura]);


//     const [topImgSrc, setTopImgSrc] = useState(
//       imagesList? imagesList[0] :
//       PlaceHolder
//       );
      
//       const onTopImageError = () => {
//         setTopImgSrc(
//           PlaceHolder
//           );
//         };

//         // const handleUnderSearchBar = () => {
//         //   setUnderSearchBar(!underSearchBar);
//         // };

//         console.log("=======> " + (subprefeituras? subprefeituras.nome : " Nenhum nome disponível"));
    
//     const [tabValue, setTabValue] = useState(0);

//     subprefeituras = subprefeituras || [];
//     images_subprefeitura = images_subprefeitura || [];
//     dadosAgregadosAbaTemaSubprefeitura = dadosAgregadosAbaTemaSubprefeitura || [];
//     dadosAgregadosAbaProgramasSubprefeitura = dadosAgregadosAbaProgramasSubprefeitura || [];
//     dadosAgregadosAbaSumarioInfoBasicasSubprefeitura = dadosAgregadosAbaSumarioInfoBasicasSubprefeitura || [];
//     dadosAgregadosAbaSumarioStatusEntregasSubprefeitura = dadosAgregadosAbaSumarioStatusEntregasSubprefeitura || [];


//     return (
//       <div ref={ref}>
//           <DadosAgregados
//             topImgSrc={topImgSrc}
//             onTopImageError={onTopImageError}
//             tabValue={tabValue}
//             setTabValue={setTabValue}
//             images={images_subprefeitura}
//             dadosAgregadosAbaTemaSubprefeitura={dadosAgregadosAbaTemaSubprefeitura}
//             dadosAgregadosAbaProgramasSubprefeitura={dadosAgregadosAbaProgramasSubprefeitura}
//             dadosAgregadosAbaSumarioInfoBasicasSubprefeitura={dadosAgregadosAbaSumarioInfoBasicasSubprefeitura}
//             dadosAgregadosAbaSumarioStatusEntregasSubprefeitura={dadosAgregadosAbaSumarioStatusEntregasSubprefeitura}
//             subprefeituras = {subprefeituras}
//             setActiveBar={setActiveBar} 
//             loadData={loadData} 
//             setDescriptionData={setDescriptionData}
//             setUnderSearchBar={setUnderSearchBar}
//             setPhotoGallery={setPhotoGallery}
//             setImagesType={setImagesType}
//           />

//       </div>
//     );
//   }
// );
// export default SubprefeituraDescriptionBar;


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
import SubprefeituraDescriptionContainer from "./SubprefeituraDescriptionContainer";
import { toSnakeCase } from "../../../utils/formatFile";
import { DESCRIPTION_BAR } from "../../../redux/active/actions";
import { getListDestaquesSubprefeitura } from "../../../firebase";
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
    lineHeight: "20px",
    fontSize: "1.4rem",
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

const BairroDescriptionBar = forwardRef(
  ({ underSearchBar,
    subprefeituras,
    subprefeitura,
    images_subprefeitura,
    dadosAgregadosAbaTemaSubprefeitura,
    dadosAgregadosAbaProgramasSubprefeitura,
    dadosAgregadosAbaSumarioInfoBasicasSubprefeitura,
    dadosAgregadosAbaSumarioStatusEntregasSubprefeitura,
    setDescriptionData,
    setUnderSearchBar,
    loadData,
    setPhotoGallery,
    setImagesType,
    setActiveBar
  }, ref) => {

    const classes = useStyles();
    
    const [dadosAgregadosAbaSumarioStatusEntregasSubprefeituraTotal,setDadosAgregadosAbaSumarioStatusEntregasSubprefeituraTotal] = useState(0)

    const dispatch = useDispatch();

    useEffect(() => {
      if (dadosAgregadosAbaSumarioStatusEntregasSubprefeitura){
        const total = dadosAgregadosAbaSumarioStatusEntregasSubprefeitura?.em_andamento + dadosAgregadosAbaSumarioStatusEntregasSubprefeitura?.concluida + dadosAgregadosAbaSumarioStatusEntregasSubprefeitura?.interrompida + dadosAgregadosAbaSumarioStatusEntregasSubprefeitura?.em_licitacao;
        setDadosAgregadosAbaSumarioStatusEntregasSubprefeituraTotal(total);
      }
    }, [dadosAgregadosAbaSumarioStatusEntregasSubprefeitura]);
    
    // o destaque conterá as 3 realizacões mais caras da subprefeitura, com o título e a descrição e lat long da realização
  const [destaquesSubprefeitura, setDestaquesSubprefeitura] = useState([]);
  useEffect(() => {
  if (!subprefeituras) return;
    const loadDestaquesSubprefeitura = async (id_subprefeitura) => {
      try {
        const destaquesSubprefeituraRef = await getListDestaquesSubprefeitura(id_subprefeitura);

          setDestaquesSubprefeitura(destaquesSubprefeituraRef);
       
      } catch (error) {
        console.error("Erro", error);
      }
    };

    loadDestaquesSubprefeitura(subprefeituras.nome);
  }, [subprefeituras]);

  const handleTitleClick = (value) => {
    setDescriptionData(toSnakeCase(value));
    setUnderSearchBar(true);
    setActiveBar(DESCRIPTION_BAR);
    loadData(toSnakeCase(value));
    console.log("clickei")
  };

    return (
<>

        <Slide direction="down" timeout={1000} in={underSearchBar} mountOnEnter unmountOnExit>
          <Paper
            elevation={6}
            ref={ref}
            className={classes.underSearch}
          >
            <div className={classes.basicInfo}>
              <Typography className={classes.titulo}>{subprefeituras?subprefeituras.nome:<CircularProgress size={25}/>}</Typography>
              <Typography className={classes.subtitulo}> Subprefeitura</Typography>
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
                <Tooltip placement="right" title={`Detalhe sobre a subprefeitura ${subprefeituras?.nome}`}>
                  <IconButton>
                    <InfoIcon sx={{color:"black"}}/>
                  </IconButton>
                </Tooltip>
              </Stack>
              <Typography className={classes.subtituloMunicipio}>Tema Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. </Typography>
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
                {destaquesSubprefeitura.map((item, index) => (
                  <li key={index}>
                    <Typography className={classes.title_li} onClick={()=>handleTitleClick(item.title)}>{item.title}</Typography>
                    <Typography className={classes.subtituloMunicipio}>{item.description}</Typography>
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
export default BairroDescriptionBar;
