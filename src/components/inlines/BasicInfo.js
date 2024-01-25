import { Box, Link, makeStyles, Typography,  Button} from "@material-ui/core";
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
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
    padding:"1px 8px 1px 8px",
    fontSize:"12px"
  },
  datavizButton: {
    // pointerEvents: "none",
    borderRadius:"39px",
    backgroundColor:"#0B60B0",
    color: "#FFFFFF",
    // paddingRight:"25px",
    fontSize:"12px"
  },
  titulo:{
    fontSize:"15px",
    fontWeight:"bold",
    marginBottom:"-15px"
  },
  descricao:{
    lineHeight:"130%",
    paddingBottom:"1rem",
  },
  datavizLink:{
    lineHeight:"130%",
    textDecoration: "none",
    color:"white"
  }
  
}));

const BasicInfo = ({ content }) => {
  const classes = useStyles();

  return (
    <div className={classes.basicInfo}>
      <Typography  className={classes.titulo}>{content.nome}</Typography>
      <br></br>
      <Typography className={classes.descricao} variant="h2">{content.descricao}</Typography>
      <Box className={classes.datavizButton} bgcolor="#0B60B0" color="#FFFFFF" borderRadius="39px" fontSize="12px" display="flex" alignItems="center" >
  <a  href="https://www.google.com" target="_blank" style={{ fontSize:"15px", paddingTop:"9px",paddingBottom:"9px",paddingLeft:"20px", textDecoration: "none", color: "#FFFFFF", display: "flex", alignItems: "center" }}>
    Resumo das obras de resiliência climática
    <OpenInNewIcon style={{ fontSize: '20px', paddingLeft:"20px"}} />
  </a>
</Box>


      <br></br>
      <Button variant="contained" className={classes.statusButton}>
      {content.status}
    </Button>

    </div>
  );
};

export default BasicInfo;
