import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Popover from '@mui/material/Popover';
import Box from '@mui/material/Box';
import Checkbox from '@mui/material/Checkbox';
import { FormControlLabel } from '@material-ui/core';
import { SvgIcon, Typography } from '@mui/material';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';

const NonSelectedIconComponent = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle opacity="0.6" cx="8" cy="8" r="7.5" stroke="#001717" />
  </svg>
);

const SelectedIconComponent = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle opacity="0.6" cx="8" cy="8" r="7.5" fill="#007E7D" stroke="#007E7D" />
  </svg>
);

const DropdownButtons = ({ orgaosNameFilter, temasNameFilter, programasNameFilter }) => {

  const [anchorEl, setAnchorEl] = useState(null);
  const [options, setOptions] = useState([]);
  const [selectedOptions, setSelectedOptions] = useState({});
  const [currentButtonName, setCurrentButtonName] = useState(null);
  console.log('Selected Options1:', selectedOptions);
  useEffect(() => {
    // Log the selected options to the console
    console.log('Selected Options:', selectedOptions);
  }, [selectedOptions]);

  const handleButtonClick = (event, buttonName, buttonOptions) => {
    setAnchorEl(event.currentTarget);
    setCurrentButtonName(buttonName);
    setOptions(buttonOptions);
    if (!selectedOptions[buttonName]) {
      setSelectedOptions(prevState => ({ ...prevState, [buttonName]: buttonOptions }));
    }
   };   

  const handleOptionChange = (buttonName, option) => {
    setSelectedOptions(prevState => {
      if (prevState[buttonName]?.includes(option)) {
        return { ...prevState, [buttonName]: prevState[buttonName].filter(o => o !== option) };
      } else {
        return { ...prevState, [buttonName]: [...prevState[buttonName] || [], option] };
      }
    });
  };



  const handleClose = () => {
    setAnchorEl(null);
  };

  const buttonContainerStyle = {
    display: 'flex',
    gap: '20px',
  };

  const buttonStyle = {
    backgroundColor: 'white',
    color: 'black',
    borderRadius: '20px',
    paddingLeft: '20px',
    paddingRight: '20px',
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
        </Button>
        <Button
          variant="contained"
          onClick={(e) => handleButtonClick(e, 'button2', temasNameFilter)}
          style={buttonStyle}
        >
          Tema
        </Button>
        <Button
          variant="contained"
          onClick={(e) => handleButtonClick(e, 'button3', programasNameFilter)}
          style={buttonStyle}
        >
          Programa
        </Button>

      </div>
      <Popover
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
        <Box p={2} style={{ marginTop: '5px' }}>
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
                  />
                }
                label={<Typography fontSize="14.5px">{option}</Typography>}
                style={{ marginRight: '3px', marginTop: '-10px' }}
              />



            </div>
          ))}
        </Box>
      </Popover>
    </div>
  );
};

export default DropdownButtons;