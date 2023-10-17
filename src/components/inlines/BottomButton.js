import React from "react";
import { Button, makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {},
  bottomButton: {
    display: "flex",
    justifyContent: "center",
    marginBottom: "12px",
  },
  rectangularButton: {
    backgroundColor: "#F5F5F5", 
    color: "#171717", 
    borderRadius: "0", 
    padding: "10px 120px", 
    "&:hover": {
      backgroundColor: "#CC", 
    },
  },
}));

const BottomButton = ({ title = "", onClick = () => {} }) => {
  const classes = useStyles();

  return (
    <div className={classes.bottomButton}>
      <Button
        onClick={onClick}
        className={classes.rectangularButton}
        variant="contained"
      >
        {title}
      </Button>
    </div>
  );
};

export default BottomButton;
