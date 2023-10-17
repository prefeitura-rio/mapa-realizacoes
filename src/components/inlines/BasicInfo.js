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
    color: "#FFFFFF"
  },
  titulo:{
    fontSize:"25px",
    fontWeight:"bold"
  }
  
}));

const BasicInfo = ({ content }) => {
  const classes = useStyles();

  return (
    <div className={classes.basicInfo}>
      <Typography  className={classes.titulo}>{content.nome}</Typography>
      <br></br>
      <Typography variant="h2">{content.descricao}</Typography>
      <br></br>
      <Button variant="contained" className={classes.statusButton}>
      {content.status}
    </Button>

    </div>
  );
};

export default BasicInfo;
