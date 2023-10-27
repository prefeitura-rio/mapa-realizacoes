import {
  Fab,
  makeStyles,
  ThemeProvider,
  createTheme
} from "@material-ui/core";

import ExpandLessIcon from "@material-ui/icons/ExpandLess";
import { forwardRef } from "react";
import { useState } from "react";
import DadosAgregados from "../../inlines/dadosAgregados/DadosAgregados";


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

const BairroDescriptionBar = forwardRef(
  ({ underSearchBar,
    setUnderSearchBar,
    cidades,
    images,
  }, ref) => {
    const classes = useStyles();
    const handleUnderSearchBar = () => {
      setUnderSearchBar(!underSearchBar);
    };
    console.log("=======> " + (cidades && cidades.length > 0 ? cidades[0].nome : "Nenhum nome disponível"));

    const [tabValue, setTabValue] = useState(0);
    const [topImgSrc, setTopImgSrc] = useState(
      // content.imageUrl ||
      "https://maps.gstatic.com/tactile/pane/default_geocode-2x.png"
    );

    const onTopImageError = () => {
      setTopImgSrc(
        "https://maps.gstatic.com/tactile/pane/default_geocode-2x.png"
      );
    };

    cidades = cidades || [];


    return (
      <div ref={ref}>
        <br></br>
        <br></br>
    
          <DadosAgregados
            topImgSrc={topImgSrc}
            onTopImageError={onTopImageError}
            cidades={cidades}
            tabValue={tabValue}
            setTabValue={setTabValue}
            images={images}
          />

        {/* <div className={classes.fabContainer}>
          <Fab
            size="small"
            variant="extended"
            className={classes.fab}
            onClick={() => {
              handleUnderSearchBar();
            }}
          >
            <ExpandLessIcon className={classes.extendedIcon} />
            <div style={{ marginRight: "8px", color: "#3C4043" }}>Ocultar</div>
          </Fab>
        </div> */}
      </div>
    );
  }
);
export default BairroDescriptionBar;
