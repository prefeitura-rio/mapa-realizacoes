import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Popover from '@mui/material/Popover';
import Box from '@mui/material/Box';
import Checkbox from '@mui/material/Checkbox';
import { FormControlLabel, Tooltip, Fade } from '@material-ui/core';
import { Typography } from '@mui/material';
import { useEffect } from 'react';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { toSnakeCase } from '../../../utils/formatFile';
// import { useSearchParams } from "react-router-dom"


const NonSelectedIconComponent = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle opacity="0.6" cx="8" cy="8" r="7.5" stroke="#001717" />
  </svg>
);

const SelectedIconComponent = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="8" cy="8" r="7.5" fill="#007E7D" stroke="#007E7D" />
  </svg>

);

const DropdownButtons = ({ orgaosNameFilter, temasNameFilter, programasNameFilter, orgaosNameFilterIds, temasNameFilterIds, programasNameFilterIds, setFiltros }) => {

  const [anchorEl, setAnchorEl] = useState(null);
  const [options, setOptions] = useState([]);
  const [selectedOptions, setSelectedOptions] = useState({});
  const [currentButtonName, setCurrentButtonName] = useState(null);
  // const [searchParams] = useSearchParams();

  // const idOrgao = searchParams.get('id_orgao');
  // const idTema = searchParams.get('id_tema');
  // const idPrograma = searchParams.get('id_programa');

  // const getOrgaoNameById = (id) => orgaosNameFilter.find(orgao => orgao.id === id)?.name;
  // const getTemaNameById = (id) => temasNameFilter.find(tema => tema.id === id)?.name;
  // const getProgramaNameById = (id) => programasNameFilter.find(programa => programa.id === id)?.name;

  // useEffect(() => {
  //   const selectedOrgao = idOrgao ? getOrgaoNameById(idOrgao) : null;
  //   const selectedTema = idTema ? getTemaNameById(idTema) : null;
  //   const selectedPrograma = idPrograma ? getProgramaNameById(idPrograma) : null;
  
  //   const newSelectedOptions = {
  //     button1: selectedOrgao ? [selectedOrgao] : [],
  //     button2: selectedTema ? [selectedTema] : [],
  //     button3: selectedPrograma ? [selectedPrograma] : []
  //   };
  
  //   setSelectedOptions(newSelectedOptions);
  // }, []);
  

  const isOptionDisabled = (option, buttonName) => {
    switch (buttonName) {
      case 'button1':
        return !orgaosNameFilterIds.includes(option);
      case 'button2':
        return !temasNameFilterIds.includes(option);
      case 'button3':
        return !programasNameFilterIds.includes(option);
      default:
        return false;
    }
  };
  
  useEffect(() => {
    // Log the selected options to the console
    // console.log('Selected Options:', selectedOptions);
    // console.log('orgaosNameFilterIds, temasNameFilterIds, programasNameFilterIds,:',orgaosNameFilterIds, temasNameFilterIds, programasNameFilterIds,);
  }, [selectedOptions]);

  const handleButtonClick = (event, buttonName, buttonOptions) => {
    setAnchorEl(event.currentTarget);
    setCurrentButtonName(buttonName);

    // antes
   // setOptions(buttonOptions);
   
    // Filtrar opções válidas antes de definir o estado
    const filteredOptions = buttonOptions.filter(option => !isOptionDisabled(option, buttonName));
    setOptions(filteredOptions);

    if (!selectedOptions[buttonName]) {
      setSelectedOptions(prevState => ({ ...prevState, [buttonName]: [] }));
    }
  };

  useEffect(() => {
    setFiltros(selectedOptions);
  }, [selectedOptions]);

  // New state variable for displaying the message
  const [showTooltip, setShowTooltip] = useState(false);

  const handleOptionChange = (buttonName, option) => {
    setSelectedOptions(prevState => {
      if (prevState[buttonName]?.includes(option)) {
        return { ...prevState, [buttonName]: prevState[buttonName].filter(o => o !== option) };
      } else {
        return { ...prevState, [buttonName]: [...prevState[buttonName] || [], option] };
      }
    });
  };

  const handleCleanButtonClick = () => {
    setSelectedOptions({});
    setShowTooltip(true); // Show the tooltip
    handleClose(); // Close the popover if it's open

    // Hide the tooltip after a few seconds
    setTimeout(() => {
      setShowTooltip(false);
    }, 3000); // Adjust time as needed
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const buttonContainerStyle = {
    display: 'flex',
    gap: '10px',
  };

  const buttonStyle = {
    backgroundColor: 'white',
    color: 'black',
    borderRadius: '20px',
    paddingLeft: '20px',
    paddingRight: '20px',
    textTransform: 'none'
  };
  const cleanButtonStyle = {
    backgroundColor: (selectedOptions['button1']?.length > 0 || selectedOptions['button2']?.length > 0 || selectedOptions['button3']?.length > 0) ? '#FF7F7F' : "white",
    color: 'black',
    textTransform: 'none',
    borderRadius: '50%', // Make the button completely rounded
    padding: '10px',    // Adjust padding as needed
    minWidth: '35px',   // Ensures the button is circular, adjust as needed

  };
  return (
    <div>
      <div style={buttonContainerStyle}>
        <Button
          variant="contained"
          onClick={(e) => handleButtonClick(e, 'button1', orgaosNameFilter)}
          style={buttonStyle}
        >
          Órgão
          {selectedOptions['button1']?.length ?
            <Typography variant="body2" style={{ color: 'grey', marginLeft: '5px' }}>
              {selectedOptions['button1']?.length}
            </Typography> : null}
        </Button>

        <Button
          variant="contained"
          onClick={(e) => handleButtonClick(e, 'button2', temasNameFilter)}
          style={buttonStyle}
        >
          Tema
          {selectedOptions['button2']?.length ?
            <Typography variant="body2" style={{ color: 'grey', marginLeft: '5px' }}>
              {selectedOptions['button2']?.length}
            </Typography> : null}
        </Button>
        <Button
          variant="contained"
          onClick={(e) => handleButtonClick(e, 'button3', programasNameFilter)}
          style={buttonStyle}
        >
          Programa
          {selectedOptions['button3']?.length ?
            <Typography variant="body2" style={{ color: 'grey', marginLeft: '5px' }}>
              {selectedOptions['button3']?.length}
            </Typography> : null}
        </Button>
        <Tooltip
          title="Filtros removidos!"
          open={showTooltip}
          TransitionComponent={Fade} // You can choose other transitions like Grow, Zoom, etc.
          TransitionProps={{ timeout: 700 }} // Adjust timeout for the transition effect

        >
          <Button variant="contained" onClick={handleCleanButtonClick} style={cleanButtonStyle}>
            <DeleteOutlineIcon sx={{ fontSize: 17 }} />
          </Button>
        </Tooltip>

      </div>
      <Popover style={{ marginTop: '15px' }}
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
      >
        <Box p={2} style={{ marginTop: '-5px', height: "300px" }}>
          {options.map((option, index) => (
            <div key={index} >
              <FormControlLabel
                control={
                  <Checkbox
                    icon={<NonSelectedIconComponent sx={{ fontSize: '16px' }} />}
                    checkedIcon={<SelectedIconComponent sx={{ fontSize: '15px' }} />}
                    style={{ color: '#007E7D', }}
                    checked={selectedOptions[currentButtonName]?.includes(option)}
                    onChange={() => handleOptionChange(currentButtonName, option)}
                    // Removido o atributo 'disabled'
                    // disabled={isOptionDisabled(option, currentButtonName)} // Adicionando a lógica de desabilitar

                  />
                }
                label={<Typography fontSize="14.5px">{option}</Typography>}
                style={{ marginRight: '3px', marginTop: '-5px' }}
              />
            </div>
          ))}
        </Box>
      </Popover>
    </div>
  );
};

export default DropdownButtons;