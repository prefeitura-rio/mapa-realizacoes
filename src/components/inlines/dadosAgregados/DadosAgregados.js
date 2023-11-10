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
import ListInfoSumario from "./ListInfoSumario";
import PhotoCards from "../PhotoCards";
import AccordionTemas from "./AccordionTemas";
import AccordionProgramas from "./AccordionProgramas";
import BasicInfo from "./BasicInfo";

const useStyles = makeStyles((theme) => ({
  root: {},
  topImage: {
    overflow: "hidden",
    width: "100%",
    borderBottomLeftRadius: "15px",
    borderBottomRightRadius:"15px"
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
  tabs: {
    "& .MuiTabs-indicator": {
      backgroundColor: "#007E7D",
    },
  },

  tab: {
    fontSize: "18px",
    marginLeft: "10px",
    minWidth: "120px",
    width: "auto",
    color: theme.palette.text.primary,
    "&$selected": {
      color: "#007E7D",
      opacity: 1, // Opacidade completa para a aba selecionada
    },
  },
  unselectedTab: {
    opacity: 0.6, // Opacidade de 0.6 para as abas não selecionadas
  },
  selected: {},

  indicator: {
    backgroundColor: theme.palette.primary.main,
  },
  tabContainer: {
    display: "flex",
    justifyContent: "center",
  },

  "@media screen and (max-width: 540px)": {
    
  tab: {
    fontSize: "5vw",
    marginLeft: "23px",
    minWidth: "70px",
    color: theme.palette.text.primary,
    "&$selected": {
      color: "#007E7D",
      opacity: 1, // Opacidade completa para a aba selecionada
    },
  },
  },
}));

function TabPanel(props) {
  const { children, value, index, ...other } = props;
  const classes = useStyles();

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
  bairro,
  subprefeituras,
  tabValue,
  setTabValue,
  images,
  setPhotoGallery,
  setImagesType,
  dadosAgregadosAbaTemaBairro,
  dadosAgregadosAbaProgramaBairro,
  dadosAgregadosAbaSumarioStatusEntregasBairro,
  dadosAgregadosAbaTemaCidade,
  dadosAgregadosAbaProgramasCidade,
  dadosAgregadosAbaSumarioInfoBasicasCidade,
  dadosAgregadosAbaSumarioStatusEntregasCidade,
  dadosAgregadosAbaTemaSubprefeitura,
  dadosAgregadosAbaProgramasSubprefeitura,
  dadosAgregadosAbaSumarioInfoBasicasSubprefeitura,
  dadosAgregadosAbaSumarioStatusEntregasSubprefeitura,
  setActiveBar,
  setDescriptionData,
  setUnderSearchBar,
  loadData

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
      {cidades && cidades.length > 0 && <BasicInfo content={cidades[0]} subtitulo={"Município"} />}
      {bairro && <BasicInfo content={bairro} subtitulo={"Bairro"} />}
      {subprefeituras && <BasicInfo content={subprefeituras} subtitulo={"Subprefeitura"} />}
      <Tabs
        value={tabValue}
        onChange={(e, i) => {
          setTabValue(i);
        }}
        indicatorColor="primary"
        textColor="primary"
        className={classes.tabs}
      >
        <Tab
          label="Sumário"
          className={`${classes.tab} ${tabValue === 0 ? classes.selected : classes.unselectedTab}`}
        />
        <Tab
          label="Temas"
          className={`${classes.tab} ${tabValue === 1 ? classes.selected : classes.unselectedTab}`}
        />
        <Tab
          label="Programas"
          className={`${classes.tab} ${tabValue === 2 ? classes.selected : classes.unselectedTab}`}
        />
      </Tabs>

      <TabPanel value={tabValue} index={0}>
        <br></br>
        <br></br>
        {cidades && cidades.length > 0 && <ListInfoSumario dadosAgregadosAbaSumarioStatusEntregasCidade={dadosAgregadosAbaSumarioStatusEntregasCidade} dadosAgregadosAbaSumarioInfoBasicasCidade={dadosAgregadosAbaSumarioInfoBasicasCidade} cidadeInfo={cidades[0]} />}
        {bairro && <ListInfoSumario dadosAgregadosAbaSumarioStatusEntregasBairro={dadosAgregadosAbaSumarioStatusEntregasBairro} bairroInfo={bairro} />}
        {subprefeituras && <ListInfoSumario dadosAgregadosAbaSumarioInfoBasicasSubprefeitura={dadosAgregadosAbaSumarioInfoBasicasSubprefeitura} dadosAgregadosAbaSumarioStatusEntregasSubprefeitura={dadosAgregadosAbaSumarioStatusEntregasSubprefeitura} />}

        <Divider />
        <div className={classes.photos}>
          <br></br>
          <Typography className={classes.title}>
            Fotos
          </Typography>
          <PhotoCards images={images} setPhotoGallery={setPhotoGallery} setImagesType={setImagesType} />

        </div>
      </TabPanel>

      <TabPanel value={tabValue} index={1}>
        <AccordionTemas loadData={loadData} setUnderSearchBar={setUnderSearchBar} setActiveBar={setActiveBar} setDescriptionData={setDescriptionData} dadosAgregadosAbaTemaCidade={dadosAgregadosAbaTemaCidade} dadosAgregadosAbaTemaSubprefeitura={dadosAgregadosAbaTemaSubprefeitura} dadosAgregadosAbaTemaBairro={dadosAgregadosAbaTemaBairro}></AccordionTemas>
      </TabPanel>
      <TabPanel value={tabValue} index={2}>
        <AccordionProgramas loadData={loadData} setUnderSearchBar={setUnderSearchBar} setActiveBar={setActiveBar} setDescriptionData={setDescriptionData} dadosAgregadosAbaProgramasCidade={dadosAgregadosAbaProgramasCidade} dadosAgregadosAbaProgramasSubprefeitura={dadosAgregadosAbaProgramasSubprefeitura} dadosAgregadosAbaProgramaBairro={dadosAgregadosAbaProgramaBairro}></AccordionProgramas>
      </TabPanel>

    </>
  );
};
export default DadosAgregados;
