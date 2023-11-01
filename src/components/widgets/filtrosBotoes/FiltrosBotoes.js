import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Popover from '@mui/material/Popover';
import Box from '@mui/material/Box';
import Checkbox from '@mui/material/Checkbox';
import { FormControlLabel } from '@material-ui/core';

const DropdownButtons = ({ button1Array, button2Array, button3Array }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [options, setOptions] = useState([]);

  const handleButtonClick = (event, buttonOptions) => {
    setAnchorEl(event.currentTarget);
    setOptions(buttonOptions);
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
          onClick={(e) => handleButtonClick(e, button1Array)}
          style={buttonStyle} // Apply the button style
        >
          Button 1
        </Button>
        <Button
          variant="contained"
          onClick={(e) => handleButtonClick(e, button2Array)}
          style={buttonStyle} // Apply the button style
        >
          Button 2
        </Button>
        <Button
          variant="contained"
          onClick={(e) => handleButtonClick(e, button3Array)}
          style={buttonStyle} // Apply the button style
        >
          Button 3
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
        <Box p={2}>
          {options.map((option, index) => (
            <div key={index}>
              <FormControlLabel
                control={<Checkbox style={{ color: '#007E7D' }} />}
                label={option}
              />
            </div>
          ))}
        </Box>
      </Popover>
    </div>
  );
};

export default DropdownButtons;