import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Button, Divider, makeStyles } from '@material-ui/core';
import ListInfoSumario from './ListInfoSumario';
import ListInfoTema from './ListInfoTema';


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

export default function AccordionTemas() {
    const [expanded, setExpanded] = React.useState(false);
  
    const classes = useStyles();
    const handleChange = (panel) => (event, isExpanded) => {
      setExpanded(isExpanded ? panel : false);
    };
  
    return (
      <div>
        <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1bh-content"
            id="panel1bh-header"
          >
            <Typography style={{paddingLeft:20}} sx={{ width: '50%', flexShrink: 0 }}>
              Saúde
            </Typography>
            <Typography sx={{ color: 'text.secondary' }}>47 entregas</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <div style={{ display: 'flex' }}>
              <div style={{ flex: 1 }}>
                {/* Conteúdo do lado esquerdo */}
                <Typography style={{paddingLeft:20}} gutterBottom>
                Título da realização Título da realização Título da realização
                </Typography>
                <Button variant="contained" className={classes.statusButton}>
                Em andamento
                </Button>
              </div>
              <div>
                <img src={"https://maps.gstatic.com/tactile/pane/result-no-thumbnail-2x.png"}className={classes.thumbnail} alt="Imagem" />
              </div>
            </div>
                {/* <ListInfoTema  showBasicInfo={false}/> */}
          </AccordionDetails>
          <Divider></Divider>
          <AccordionDetails>
            <div style={{ display: 'flex' }}>
              <div style={{ flex: 1 }}>
                {/* Conteúdo do lado esquerdo */}
                <Typography style={{paddingLeft:20}} gutterBottom>
                Título da realização Título da realização Título da realização
                </Typography>
                <Button variant="contained" className={classes.statusButton}>
                Em andamento
                </Button>
              </div>
              <div>
                <img src={"https://maps.gstatic.com/tactile/pane/result-no-thumbnail-2x.png"}className={classes.thumbnail} alt="Imagem" />
              </div>
            </div>
                {/* <ListInfoTema  showBasicInfo={false}/> */}
          </AccordionDetails>
        </Accordion>
        <Accordion expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel2bh-content"
            id="panel2bh-header"
          >
            <Typography style={{paddingLeft:20}} sx={{ width: '50%', flexShrink: 0 }}>Educação</Typography>
            <Typography sx={{ color: 'text.secondary' }}>
            43 entregas
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
            Educação, conteúdo sobre Educação
            </Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion expanded={expanded === 'panel3'} onChange={handleChange('panel3')}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel3bh-content"
            id="panel3bh-header"
          >
            <Typography style={{paddingLeft:20}} sx={{ width: '50%', flexShrink: 0 }}>
              Zeladoria
            </Typography>
            <Typography sx={{ color: 'text.secondary' }}>
            41 entregas
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
            Zeladoria, conteúdo sobre zeladoria
            </Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion expanded={expanded === 'panel4'} onChange={handleChange('panel4')}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel4bh-content"
            id="panel4bh-header"
          >
            <Typography style={{paddingLeft:20}} sx={{ width: '50%', flexShrink: 0 }}>Segurança pública</Typography>
            <Typography sx={{ color: 'text.secondary' }}>
            23 entregas
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
            Segurança pública, conteúdo sobre segurança pública
            </Typography>
          </AccordionDetails>
        </Accordion>
      </div>
    );
  }