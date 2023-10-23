import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

export default function AccordionProgramas() {
    const [expanded, setExpanded] = React.useState(false);
  
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
            <Typography sx={{ width: '50%', flexShrink: 0 }}>
              Bairro Maravilha
            </Typography>
            <Typography sx={{ color: 'text.secondary' }}>47 entregas</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
             Saúde, conteúdo sobre saúde
            </Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel2bh-content"
            id="panel2bh-header"
          >
            <Typography sx={{ width: '50%', flexShrink: 0 }}>Reviver Centro</Typography>
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
            <Typography sx={{ width: '50%', flexShrink: 0 }}>
              Maravalley
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
            <Typography sx={{ width: '50%', flexShrink: 0 }}>Porto Maravilha</Typography>
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