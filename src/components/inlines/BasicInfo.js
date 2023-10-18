import { Box, Link, makeStyles, Typography,  Button} from "@material-ui/core";
import Rating from "@material-ui/lab/Rating";
import { useEffect } from "react";
import numeral from "numeral";


const useStyles = makeStyles((theme) => ({
  root: {},
  rating: {
    display: "flex",
    alignItems: "center",
  },
  basicInfo: {
    padding: "15px 25px",
  },
  statusButton: {
    pointerEvents: "none",
    borderRadius:"39px",
    backgroundColor:"#007E7D",
    color: "#FFFFFF",
    padding:"1px 8px 1px 8px"
  },
  titulo:{
    fontSize:"25px",
    fontWeight:"bold",
    marginBottom:"-15px"
  },
  descricao:{
    lineHeight:"130%"
  }
  
}));

const BasicInfo = ({ content }) => {
  const classes = useStyles();

  return (
    <div className={classes.basicInfo}>
      <Typography  className={classes.titulo}>{content.titulo}</Typography>
      <br></br>
      <Typography className={classes.descricao} variant="h2">{content.descricao}</Typography>
      <br></br>
      <Button variant="contained" className={classes.statusButton}>
      {content.status}
    </Button>

    </div>
  );
};

export default BasicInfo;
