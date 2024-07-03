import React, { useState } from "react";
import { Button, IconButton, Paper, Snackbar, makeStyles } from "@material-ui/core";
import MyLocationIcon from "@material-ui/icons/MyLocation";
import RemoveIcon from "@material-ui/icons/Remove";
import AddIcon from "@material-ui/icons/Add";
import clsx from "clsx";
import InfoIcon from '@mui/icons-material/Info';
import { Stack } from "@mui/material";
import NavigationOutlinedIcon from '@mui/icons-material/NavigationOutlined';
import { MAIN_UNDERSEARCH_BAR } from "../../../redux/active/actions";
import RestoreIcon from '@mui/icons-material/Restore';
import { useStaticState } from "@material-ui/pickers";
import CloseIcon from "@material-ui/icons/Close";
import { isDesktop } from "../../../redux/active/reducers";

const useStyles = makeStyles((theme) => ({
  root: {
    pointerEvents: "auto",
  },
  textSecondary: {
    fill: "rgb(50, 50, 50)",
  },
  controlButton: {
    backgroundColor: "white",
    maxHeight: "30px",
    maxWidth: "30px",
    minHeight: "30px",
    minWidth: "30px",
    borderRadius: "50%",
  },
  controlButtonInfo: {
    backgroundColor: "#007E7D",
    maxHeight: "30px",
    maxWidth: "30px",
    minHeight: "30px",
    minWidth: "30px",
    borderRadius: "50%",
  },
  // zoom: {
  //   marginTop: "4px",
  //   marginRight: "20px",
  // },
  buttons: {
    display: "flex",
    flexDirection: "column", // Make buttons stack vertically
    // alignItems: "flex-start", // Center buttons horizontally
  },
  zoomInButton: {
    width: "100%",
    marginBottom: "15px",
    marginTop: "5px",
  },
  zoomOutButton: {
    width: "100%",
  },

  fixedButtonClockImage:{
    width: "50px",
  },
  selectedPaper: {
    backgroundColor: '#722F37', // Nova cor de fundo quando selecionado
  },
  selectedIcon: {
    color: '#722F37', // Nova cor do ícone quando selecionado
  },   
  
  "@media screen and (min-width: 540px)": {
    snackbar:{
     
    },
  }

}));



const VerticalWidget = ({ setZoomDelta,setMenuSidebar,menuSidebar,setZoomDefault }) => {
  const classes = useStyles();

  const zoomIn = () => {
    setZoomDelta(1);
  };
  const zoomOut = () => {
    setZoomDelta(-1);
  };
  const zoomDefault= () => {
    setZoomDefault((Math.random() * 999 + 1));
  };

  const handleMenuSidebar = () => {
    setMenuSidebar(!menuSidebar);
  };

  const [isSelected, setIsSelected] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  const handleClick = () => {
    setIsSelected(!isSelected);
    setSnackbarMessage(isSelected ? 'Gestões antigas desativada.' : 'Gestões antigas ativada.');
    setSnackbarOpen(true);
  };

  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbarOpen(false);
  };

  const action = (
    <IconButton
      size="small"
      aria-label="close"
      color="inherit"
      onClick={handleCloseSnackbar}
    >
      <CloseIcon fontSize="small" />
    </IconButton>
  );

  return (
    <>
    <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        message={snackbarMessage}
        action={action}
        anchorOrigin={{
          vertical: !isDesktop() ? 'top' : 'bottom',
          horizontal: isDesktop() ? 'center' : 'left',
        }}
        className={classes.snackbar}
      />
    <div className={classes.root}>
      <div className={classes.zoom}>
        <div className={classes.buttons}>

          <Stack spacing={1}>
        
              <Paper elevation={4} style={{ borderRadius: "10px",position: "relative", backgroundColor: 'white' }}>
                <IconButton
                  style={{ backgroundColor: 'transparent' }}
                  
                  onClick={()=> {zoomDefault()}}
                >
                  <NavigationOutlinedIcon sx={{color:"#373737"}} fontSize="small" className={classes.textSecondary} />
                </IconButton>
              </Paper>
              
              <Paper elevation={4} style={{ borderRadius: "10px",position: "relative", backgroundColor: 'white' }}>
                <IconButton
                  style={{ backgroundColor: 'transparent' }}
                  color="grey"
                  onClick={zoomIn}
                >
                  <AddIcon sx={{color:"#373737"}} fontSize="small" className={classes.textSecondary} />
                </IconButton>
              </Paper>
        
              <Paper elevation={4} style={{ borderRadius: "10px",position: "relative", backgroundColor: 'white' }}>
                <IconButton
                  style={{ backgroundColor: 'transparent' }}
                  color="grey"
                  onClick={zoomOut}
                >
                  <RemoveIcon fontSize="small" className={classes.textSecondary} />
                </IconButton>
              </Paper>

              <Paper
                className={`${classes.fixedButtonClock} ${isSelected ? classes.selectedPaper : ''}`}
                elevation={4}
                style={{ borderRadius: "10px" }}
              >
                <IconButton
                  style={{ backgroundColor: 'transparent' }}
                  onClick={handleClick}
                >
                  <RestoreIcon
                    fontSize="small"
                    sx={{ color: isSelected ? 'white' : 'grey' }}
                  />
                </IconButton>
              </Paper>
          </Stack>
          {/* <Button
            variant="contained"
            className={clsx(classes.controlButton, classes.zoomInButton)}
            onClick={zoomIn}
          >
            <AddIcon fontSize="small" className={classes.textSecondary} />
          </Button> */}
          {/* <Button
            variant="contained"
            className={clsx(classes.controlButton, classes.zoomOutButton)}
            onClick={zoomOut}
          >
            <RemoveIcon fontSize="small" className={classes.textSecondary} />
          </Button> */}
          {/* <Button
            // variant="contained"
            aria-label="menu"
            className={clsx(classes.controlButtonInfo, classes.zoomInButton)}
            onClick={handleMenuSidebar}
          >
            <InfoIcon sx={{ fontSize: 37, color: 'white'}} className={classes.textSecondary} />
          </Button> */}

         
        </div>
      </div>
    </div>
    </>
  );
};

export default VerticalWidget;
