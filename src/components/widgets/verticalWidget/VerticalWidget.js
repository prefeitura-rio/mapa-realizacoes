import React from "react";
import { Button, makeStyles } from "@material-ui/core";
import MyLocationIcon from "@material-ui/icons/MyLocation";
import RemoveIcon from "@material-ui/icons/Remove";
import AddIcon from "@material-ui/icons/Add";
import clsx from "clsx";
import InfoIcon from '@mui/icons-material/Info';

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
    marginBottom: "5px",
    marginTop: "5px",
  },
  zoomOutButton: {
    width: "100%",
  },
}));



const VerticalWidget = ({ setZoomDelta,setMenuSidebar,menuSidebar }) => {
  const classes = useStyles();

  const zoomIn = () => {
    setZoomDelta(1);
  };
  const zoomOut = () => {
    setZoomDelta(-1);
  };

  const handleMenuSidebar = () => {
    setMenuSidebar(!menuSidebar);
  };

  return (
    <div className={classes.root}>
      <div className={classes.zoom}>
        <div className={classes.buttons}>
          <Button
            variant="contained"
            className={clsx(classes.controlButton, classes.zoomInButton)}
            onClick={zoomIn}
          >
            <AddIcon fontSize="small" className={classes.textSecondary} />
          </Button>
          <Button
            variant="contained"
            className={clsx(classes.controlButton, classes.zoomOutButton)}
            onClick={zoomOut}
          >
            <RemoveIcon fontSize="small" className={classes.textSecondary} />
          </Button>
          <Button
            // variant="contained"
            aria-label="menu"
            className={clsx(classes.controlButtonInfo, classes.zoomInButton)}
            onClick={handleMenuSidebar}
          >
            <InfoIcon sx={{ fontSize: 37, color: 'white'}} className={classes.textSecondary} />
          </Button>

         
        </div>
      </div>
    </div>
  );
};

export default VerticalWidget;
