import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Button, Divider, makeStyles } from '@material-ui/core';
import { useState } from 'react';


const useStyles = makeStyles(()=>({
  statusButton: {
    marginLeft: "20px",
    pointerEvents: "none",
    borderRadius:"39px",
    backgroundColor:"#007E7D",
    color: "#FFFFFF",
    padding:"1px 8px 1px 8px"
  },
  thumbnail:{
  width:"120px",
  height:"100px", 
  borderRadius:"15px",
  }
}))

export default function AccordionProgramas({dadosAgregadosProgramas}) {
  const [expanded, setExpanded] = useState(false);
  const [data, setData] = useState([]);

  const classes = useStyles();

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <div>
      {dadosAgregadosProgramas.map((item) => (
        <Accordion key={item.id} expanded={expanded === item.id} onChange={handleChange(item.id)}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls={`${item.id}-content`} id={`${item.id}-header`}>
            <Typography style={{ paddingLeft: 20 }} sx={{ width: '50%', flexShrink: 0 }}>
              {item.tema}
            </Typography>
            <Typography sx={{ color: 'text.secondary' }}>{item.realizacoes.length} entregas</Typography>
          </AccordionSummary>
          {item.realizacoes.map((realizacao, index) => (
            <AccordionDetails key={index}>
              <div style={{ display: 'flex' }}>
                <div style={{ flex: 1 }}>
                  <Typography style={{ paddingLeft: 20 }} gutterBottom>
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
            </AccordionDetails>
          ))}
          <Divider />
        </Accordion>
      ))}
    </div>
  );
}