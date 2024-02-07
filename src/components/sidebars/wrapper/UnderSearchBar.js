import { makeStyles } from "@material-ui/core";
import { Paper } from "@material-ui/core";
import clsx from "clsx";
import { forwardRef } from "react";
import {
  BAIRRO_DESCRIPTION_BAR,
  DESCRIPTION_BAR,
  MAIN_UNDERSEARCH_BAR,
  PLACES_BAR,
  SUBPREFEITURA_DESCRIPTION_BAR,
} from "../../../redux/active/actions";
import MainUnderSearchContainer from "../mainUnderSearch/MainUnderSearchContainer";
import PlaceDescriptionContainer from "../placeDescription/PlaceDescriptionContainer";
import BairroDescriptionContainer from "../bairroDescription/BairroDescriptionContainer";
import SubrefeituraDescriptionContainer from "../subprefeituraDescription/SubprefeituraDescriptionContainer";
// import PlacesContainer from "../places/PlacesContainer";

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
      top: "30px",
      bottom: "30px",
      left: "30px",
      width: "423px",
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
      // case PLACES_BAR:
      //   return <PlacesContainer />;
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
    <Paper
      ref={ref}
      className={
        underSearchBar
          ? clsx(classes.underSearch, classes.open)
          : clsx(classes.underSearch, classes.close)
      }
      elevation={underSearchBar ? 12 : 4}
      square={underSearchBar ? true : false}
      style={{backgroundColor:"#f4fdf4"}}
    >
      {renderSwitch(activeBar)}
    </Paper>
  );
});

export default UnderSearchBar;
