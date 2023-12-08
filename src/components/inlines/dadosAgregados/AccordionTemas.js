import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Button, Divider, makeStyles } from '@material-ui/core';
import { useState } from 'react';
import { useEffect } from 'react';
import { DESCRIPTION_BAR, SET_UNDERSEARCH_BAR, setActiveBar, setUnderSearchBar } from '../../../redux/active/actions';
import { toSnakeCase } from '../../../utils/formatFile';


const useStyles = makeStyles(() => ({
  statusButton: {
    marginLeft: "20px",
    pointerEvents: "none",
    borderRadius: "39px",
    backgroundColor: "#007E7D",
    color: "#FFFFFF",
    padding: "1px 8px 1px 8px",
    fontSize:"12px"
  },
  tabBoxTemas: {
    paddingBottom: "40px",
  },
  thumbnail: {
    width: "120px",
    height: "100px",
    borderRadius: "15px",
  },
  accordionDetails: {
    "&:hover": {
      cursor: "pointer",
      filter: "brightness(80%)"
    },
  },
  "@media screen and (max-width: 540px)": {
    temaStyle: {
      paddingLeft: "10px !important",
    }
  }
}))

export default function AccordionTemas({ expanded, setExpanded, dadosAgregadosAbaTemaCidade, dadosAgregadosAbaTemaSubprefeitura, dadosAgregadosAbaTemaBairro, setDescriptionData, setUnderSearchBar, setActiveBar, loadData }) {

  const [data, setData] = useState([]);

  const classes = useStyles();

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  // useEffect(() => {
  //   setActiveBar(DESCRIPTION_BAR);
  //   setUnderSearchBar(SET_UNDERSEARCH_BAR);
  //   // if (!loading && data) {
  //   // }
  // }, []);

  let dataToRender = [];

  if (dadosAgregadosAbaTemaCidade) {
    dataToRender = dadosAgregadosAbaTemaCidade;
  } else if (dadosAgregadosAbaTemaBairro) {
    dataToRender = dadosAgregadosAbaTemaBairro;
  } else dataToRender = dadosAgregadosAbaTemaSubprefeitura;

  const showDescription = (value) => {
    setDescriptionData(toSnakeCase(value));
    setUnderSearchBar(true);
    setActiveBar(DESCRIPTION_BAR);
    loadData(toSnakeCase(value));
  };

  return (
    <div className={classes.tabBoxTemas}>
      {dataToRender.map((item) => (
        <Accordion key={item.id} expanded={expanded === item.id} onChange={handleChange(item.id)}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls={`${item.id}-content`} id={`${item.id}-header`}>
            <Typography className={classes.temaStyle} style={{ paddingLeft: 20, color: "#007E7D ", fontWeight: "bold", fontSize: '14px' }} sx={{ width: '50%', flexShrink: 0 }}>
              {item.tema}
            </Typography>
            <Typography sx={{ color: 'text.secondary', marginLeft: "30px", fontSize: '14px' }}>{item.realizacoes.length} entregas</Typography>
          </AccordionSummary>
          {item.realizacoes.map((realizacao, index) => (
            <AccordionDetails key={index} onClick={() => { console.log("Nome da realização: " + realizacao.titulo); showDescription(realizacao.titulo) }} className={classes.accordionDetails}>
              <div style={{ display: 'flex' }}>
                <div style={{ flex: 1 }}>
                  <Typography style={{ paddingLeft: 20, paddingRight: 30, fontWeight: "bold" }} gutterBottom>
                    {realizacao.titulo}
                  </Typography>
                  <Button variant="contained" className={classes.statusButton}>
                    {realizacao.status}
                  </Button>
                </div>
                <div>
                  <img src={realizacao.imageUrl} className={classes.thumbnail} alt="Imagem" />
                </div>
              </div>
              <Divider style={{ marginTop: "20px" }} />
            </AccordionDetails>
          ))}
          <Divider />
          
        </Accordion>
      ))}
    </div>
  );
}