import { makeStyles } from "@material-ui/core";
import { Paper } from "@material-ui/core";
import clsx from "clsx";
import { forwardRef } from "react";
import {
  TEMA_DESCRIPTION_BAR,
  BAIRRO_DESCRIPTION_BAR,
  DESCRIPTION_BAR,
  MAIN_UNDERSEARCH_BAR,
  PLACES_BAR,
  SUBPREFEITURA_DESCRIPTION_BAR,
  PROGRAMA_DESCRIPTION_BAR,
} from "../../../redux/active/actions";
import MainUnderSearchContainer from "../mainUnderSearch/MainUnderSearchContainer";
import PlaceDescriptionContainer from "../placeDescription/PlaceDescriptionContainer";
import BairroDescriptionContainer from "../bairroDescription/BairroDescriptionContainer";
import SubrefeituraDescriptionContainer from "../subprefeituraDescription/SubprefeituraDescriptionContainer";
// import PlacesContainer from "../places/PlacesContainer";
import { Slide } from "@material-ui/core";
import TemaDescriptionContainer from "../temaDescription/TemaDescriptionContainer";
import ProgramaDescriptionContainer from "../programaDescription/ProgramaDescriptionContainer";
const useStyles = makeStyles((theme) => ({

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
      minWidth:"300px", 
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
      top: "14.5vh", //3vh + 8.5vh + 3vh
      // bottom: "30px",
      right: "3vh",
      width: "25vw",
      minWidth:"300px", 
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
      top: "51.5vh", //14.5vh + 34vh +3vh
      // bottom: "30px",
      right: "3vh",
      width: "25vw",
      minWidth:"300px", 
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
      top: "63vh", // 51.5vh + 8.5vh + 3vh
      right: "3vh",
      width: "25vw",
      minWidth:"300px", 
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
  },
}));



const UnderSearchBar = forwardRef(({ underSearchBar, activeBar }, ref) => {
  const classes = useStyles();
 
  const renderSwitch = (param) => {
     switch (param) {
       case TEMA_DESCRIPTION_BAR:
         return <TemaDescriptionContainer />;
       case PROGRAMA_DESCRIPTION_BAR:
         return <ProgramaDescriptionContainer />;
       case BAIRRO_DESCRIPTION_BAR:
         return <BairroDescriptionContainer />;
       case SUBPREFEITURA_DESCRIPTION_BAR:
         return <SubrefeituraDescriptionContainer />;
       case DESCRIPTION_BAR:
         return <PlaceDescriptionContainer />;
       default:
         return <MainUnderSearchContainer />;
     }
  };
 
  return (
     <>
      {renderSwitch(activeBar)}
     </>
  );
 });
 
 export default UnderSearchBar;