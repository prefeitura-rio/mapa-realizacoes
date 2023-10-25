import {
  Divider,
  Fab,
  makeStyles,
  Tab,
  Tabs,
  Typography,
} from "@material-ui/core";

import ExpandLessIcon from "@material-ui/icons/ExpandLess";
import { green, grey } from "@material-ui/core/colors";
import { forwardRef } from "react";
import { useState } from "react";
import BasicInfo from "../../inlines/BasicInfo";
import BasicInfoCidade from "../../inlines/dadosAgregados/BasicInfoCidade";
import ListInfoSumario from "../../inlines/dadosAgregados/ListInfoSumario";
import HeaderBar from "../../inlines/HeaderBar";
import PhotoCards from "../../inlines/PhotoCards";
import ControlledAccordions from "../../inlines/dadosAgregados/AccordionTemas";
import AccordionTemas from "../../inlines/dadosAgregados/AccordionTemas";
import AccordionProgramas from "../../inlines/dadosAgregados/AccordionProgramas";

const useStyles = makeStyles((theme) => ({

  topImage: {
    overflow: "hidden",
    width: "100%",
    objectFit: "cover",
    height: "235px",
    borderRadius: "15px"
  },
  photos: {
    // padding: "12px",
  },
  extendedIcon: {
    marginRight: theme.spacing(1),
    fill: "#2196f3",
  },
  title: { 
    // margin: theme.spacing(2, 0), 
    // fontSize: '1.5em' 
    padding: "4px 24px 9px 24px",
    // paddingLeft: "24px",
    fontSize:"15px",
    fontWeight:"bold"
  },

  tab: {
    marginLeft: "10px",
    minWidth: "120px",
    width: "auto", // Definir a largura para "auto"
  },
  indicator: {
    backgroundColor: theme.palette.primary.main,
  },
  tabContainer: {
    display: "flex",
    justifyContent: "center",
  },

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

const MainUnderSearchBar = forwardRef(
  ({ underSearchBar,
    setUnderSearchBar,
    cidades,
    content,
    images,
    profile,
    login,
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

    function TabPanel(props) {
      const { children, value, index, ...other } = props;

      return (
        <div
          role="tabpanel"
          hidden={value !== index}
          id={`tabpanel-${index}`}
          aria-labelledby={`tab-${index}`}
          {...other}
        >
          {value === index && (
            <div>{children}</div>
          )}
        </div>
      );
    }


    return (
      <div ref={ref}>

        <img
          src={topImgSrc}
          onError={onTopImageError}
          alt="top image"
          className={classes.topImage}
        />
        {cidades && cidades.length > 0 && <BasicInfoCidade content={cidades[0]} />}
        <Tabs
          value={tabValue}
          onChange={(e, i) => {
            setTabValue(i);
          }}
          indicatorColor="primary"
          textColor="primary"
          className={classes.tabs}
        >
          <Tab label="Sumário" className={classes.tab} />
          <Tab label="Temas" className={classes.tab} />
          <Tab label="Programas" className={classes.tab} />
        </Tabs>

        <TabPanel value={tabValue} index={0}>
          <br></br>
          <br></br>
          {cidades && cidades.length > 0 && <ListInfoSumario content={cidades[0]} />}

          <Divider />
      <div className={classes.photos}>
        <br></br>
      <Typography className={classes.title}>
      Fotos
     </Typography>
        <PhotoCards images={images} />

      </div>
        </TabPanel>

        <TabPanel value={tabValue} index={1}>
        <AccordionTemas></AccordionTemas>
        </TabPanel>
        <TabPanel value={tabValue} index={2}>
        <AccordionProgramas></AccordionProgramas>
        </TabPanel>
        
        <div className={classes.fabContainer}>
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
        </div>
      </div>
    );
  }
);
export default MainUnderSearchBar;
