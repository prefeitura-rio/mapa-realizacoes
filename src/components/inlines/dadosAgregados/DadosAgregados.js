import {
    List,
    Divider,
    ListItem,
    Tabs,
    Tab,
    ListItemIcon,
    ListItemText,
    makeStyles,
    Typography 
  } from "@material-ui/core";
  import React from 'react';
import BasicInfoCidade from "./BasicInfoCidade";
import ListInfoSumario from "./ListInfoSumario";
import PhotoCards from "../PhotoCards";
import AccordionTemas from "./AccordionTemas";
import AccordionProgramas from "./AccordionProgramas";
  
  const useStyles = makeStyles((theme) => ({
    root: {},
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
        fontSize: "15px",
        fontWeight: "bold"
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
  }));

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

  
  const DadosAgregados = ({
    topImgSrc,
    onTopImageError,
    cidades,
    tabValue,
    setTabValue,
    images,
  }) => {
    const classes = useStyles();
  
    return (
      <>
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
    
    </>
    );
  };
  export default DadosAgregados;
  