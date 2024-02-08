import {
  Fab,
  makeStyles,
  ThemeProvider,
  createTheme
} from "@material-ui/core";

import ExpandLessIcon from "@material-ui/icons/ExpandLess";
import { forwardRef } from "react";
import { useState,useEffect } from "react";
import DadosAgregados from "../../inlines/dadosAgregados/DadosAgregados";
import PlaceHolder from "../../assets/placeholder_blue.jpg"

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
    boxShadow: "0 1px 6px rgb(60 64 67 / 28%)",

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
  }

}));

const theme = createTheme({
  palette: {
    primary: {
      main: "#007E7D",
    },
  },
});

const SubprefeituraDescriptionBar = forwardRef(
  ({ underSearchBar,
    subprefeituras,
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
    const [imagesList, setImagesList] = useState(images_subprefeitura);
    
    useEffect(() => {
      setImagesList(images_subprefeitura);
      setTopImgSrc(images_subprefeitura.length > 0 ? images_subprefeitura[0] : PlaceHolder);
    }, [images_subprefeitura]);


    const [topImgSrc, setTopImgSrc] = useState(
      imagesList? imagesList[0] :
      PlaceHolder
      );
      
      const onTopImageError = () => {
        setTopImgSrc(
          PlaceHolder
          );
        };

        // const handleUnderSearchBar = () => {
        //   setUnderSearchBar(!underSearchBar);
        // };

        console.log("=======> " + (subprefeituras? subprefeituras.nome : " Nenhum nome disponível"));
    
    const [tabValue, setTabValue] = useState(0);

    subprefeituras = subprefeituras || [];
    images_subprefeitura = images_subprefeitura || [];
    dadosAgregadosAbaTemaSubprefeitura = dadosAgregadosAbaTemaSubprefeitura || [];
    dadosAgregadosAbaProgramasSubprefeitura = dadosAgregadosAbaProgramasSubprefeitura || [];
    dadosAgregadosAbaSumarioInfoBasicasSubprefeitura = dadosAgregadosAbaSumarioInfoBasicasSubprefeitura || [];
    dadosAgregadosAbaSumarioStatusEntregasSubprefeitura = dadosAgregadosAbaSumarioStatusEntregasSubprefeitura || [];


    return (
      <div ref={ref}>
          <DadosAgregados
            topImgSrc={topImgSrc}
            onTopImageError={onTopImageError}
            tabValue={tabValue}
            setTabValue={setTabValue}
            images={images_subprefeitura}
            dadosAgregadosAbaTemaSubprefeitura={dadosAgregadosAbaTemaSubprefeitura}
            dadosAgregadosAbaProgramasSubprefeitura={dadosAgregadosAbaProgramasSubprefeitura}
            dadosAgregadosAbaSumarioInfoBasicasSubprefeitura={dadosAgregadosAbaSumarioInfoBasicasSubprefeitura}
            dadosAgregadosAbaSumarioStatusEntregasSubprefeitura={dadosAgregadosAbaSumarioStatusEntregasSubprefeitura}
            subprefeituras = {subprefeituras}
            setActiveBar={setActiveBar} 
            loadData={loadData} 
            setDescriptionData={setDescriptionData}
            setUnderSearchBar={setUnderSearchBar}
            setPhotoGallery={setPhotoGallery}
            setImagesType={setImagesType}
          />

      </div>
    );
  }
);
export default SubprefeituraDescriptionBar;
