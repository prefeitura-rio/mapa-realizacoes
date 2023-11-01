import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Popover from '@mui/material/Popover';
import Box from '@mui/material/Box';
import Checkbox from '@mui/material/Checkbox';
import { FormControlLabel } from '@material-ui/core';

const DropdownButtons = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [options, setOptions] = useState([]);

  const handleButtonClick = (event, buttonOptions) => {
    setAnchorEl(event.currentTarget);
    setOptions(buttonOptions);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <Button
        variant="contained"
        onClick={(e) => handleButtonClick(e, ['Option 1', 'Option 2', 'Option 3'])}
      >
        Button 1
      </Button>
      <Button
        variant="contained"
        onClick={(e) => handleButtonClick(e, ['Option A', 'Option B', 'Option C'])}
      >
        Button 2
      </Button>
      <Button
        variant="contained"
        onClick={(e) => handleButtonClick(e, ['Choice X', 'Choice Y', 'Choice Z'])}
      >
        Button 3
      </Button>
      <Popover
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
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
