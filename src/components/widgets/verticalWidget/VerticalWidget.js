import React from "react";
import { Button, IconButton, Paper, makeStyles } from "@material-ui/core";
import MyLocationIcon from "@material-ui/icons/MyLocation";
import RemoveIcon from "@material-ui/icons/Remove";
import AddIcon from "@material-ui/icons/Add";
import clsx from "clsx";
import InfoIcon from '@mui/icons-material/Info';
import { Stack } from "@mui/material";
import NavigationOutlinedIcon from '@mui/icons-material/NavigationOutlined';
import { MAIN_UNDERSEARCH_BAR } from "../../../redux/active/actions";
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
    setZoomDefault(-1);
  };

  const handleMenuSidebar = () => {
    setMenuSidebar(!menuSidebar);
  };

  return (
    <div className={classes.root}>
      <div className={classes.zoom}>
        <div className={classes.buttons}>

          <Stack spacing={1}>
        
              <Paper elevation={4} style={{ position: "relative", backgroundColor: 'white' }}>
                <IconButton
                  style={{ backgroundColor: 'transparent' }}
                  color="black"
                  onClick={()=> {zoomDefault()}}
                >
                  <NavigationOutlinedIcon fontSize="small" className={classes.textSecondary} />
                </IconButton>
              </Paper>
              
              <Paper elevation={4} style={{ position: "relative", backgroundColor: 'white' }}>
                <IconButton
                  style={{ backgroundColor: 'transparent' }}
                  color="grey"
                  onClick={zoomIn}
                >
                  <AddIcon fontSize="small" className={classes.textSecondary} />
                </IconButton>
              </Paper>
        
              <Paper elevation={4} style={{ position: "relative", backgroundColor: 'white' }}>
                <IconButton
                  style={{ backgroundColor: 'transparent' }}
                  color="grey"
                  onClick={zoomOut}
                >
                  <RemoveIcon fontSize="small" className={classes.textSecondary} />
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
  );
};

export default VerticalWidget;
