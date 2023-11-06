import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Popover from '@mui/material/Popover';
import Box from '@mui/material/Box';
import Checkbox from '@mui/material/Checkbox';
import { FormControlLabel } from '@material-ui/core';
import { SvgIcon } from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

// const RoundedCheckbox = (props) => (
//   <SvgIcon {...props}>
//     <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z" />
//   </SvgIcon>
//  );

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
               control={<Checkbox icon={<AddCircleOutlineIcon />} checkedIcon={<CheckCircleIcon />} style={{ color: '#007E7D' }} />}
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