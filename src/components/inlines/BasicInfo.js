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
  datavizLink: {
    fontSize: "13.5px", 
    paddingTop: "9px", 
    paddingBottom: "9px", 
    paddingLeft: "11px", 
    textDecoration: "none", 
    color: "#FFFFFF", 
    display: "flex", 
    alignItems: "center",
    [theme.breakpoints.down('xs')]: {
      fontSize: "12px",
    },
 },
  
}));

const capitalizeFirstLetter = (str) => {
  return str.toLowerCase().replace(/(^|\s)\S/g, (char) => char.toUpperCase());
};

const BasicInfo = ({ content }) => {
  const classes = useStyles();
  const capitalizedNome = capitalizeFirstLetter(content.nome);
  const capitalizedDescription = capitalizeFirstLetter(content.descricao);

  return (
    <div className={classes.basicInfo}>
      <Typography  className={classes.titulo}>{capitalizedNome}</Typography>
      <br></br>
      <Typography className={classes.descricao} variant="h2">{capitalizedDescription}</Typography>
      <Button variant="contained" className={classes.statusButton}>
      {content.status}
    </Button>
    <br></br> <br></br>
    <Box className={classes.datavizButton} bgcolor="#0B60B0" color="#FFFFFF" borderRadius="39px" fontSize="12px" display="flex" alignItems="center" style={{ flexWrap: "wrap" }}>
  <a href="https://viz-staging.dados.rio/#/plano-verao" target="_blank" className={classes.datavizLink} >
    Panorama especial das obras de resiliência climática
    <OpenInNewIcon style={{ fontSize: '20px', paddingLeft: "7px" }} />
  </a>
</Box>


      
     

    </div>
  );
};

export default BasicInfo;
