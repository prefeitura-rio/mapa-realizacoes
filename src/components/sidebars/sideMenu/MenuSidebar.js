import {
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  makeStyles,
  Paper,
} from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import LayersOutlinedIcon from "@material-ui/icons/LayersOutlined";
import LocationOnOutlinedIcon from "@material-ui/icons/LocationOnOutlined";
import RateReviewOutlinedIcon from "@material-ui/icons/RateReviewOutlined";
import TimelineOutlinedIcon from "@material-ui/icons/TimelineOutlined";
import PermIdentityOutlinedIcon from "@material-ui/icons/PermIdentityOutlined";
import clsx from "clsx";
import LinkIcon from "@material-ui/icons/Link";
import InfoIcon from "@material-ui/icons/InfoOutlined";
import BookmarkIcon from "@material-ui/icons/TurnedInNot";
import logo from './logo.svg';  // Certifique-se de que o caminho para logo.png esteja correto


const useStyles = makeStyles((theme) => {
  return {
    menuSidebar: {
      height: "100vh",
      width: "320px",
      zIndex: 502,
      position: "fixed",
      paddingLeft: "8px",
      inset: 0,
    },
    open: {
      transition: "transform 0.2s ease-in",
      transform: "translateX(0)",
    },
    close: {
      transition: "transform 0.2s ease-in",
      transform: "translateX(-115%)",
    },
    header: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      padding: "0 11px",
    },
    headerImage: {
      display: "block",
      height: "40px",
      paddingLeft: "11px",
    },
    listItemText: {
      fontSize: "0.8rem",
      paddingBottom:"5px"
    },
    
  };
});

const MenuSidebar = ({ menuSidebar, setMenuSidebar }) => {
  // const layersText = "Another layers";
  const classes = useStyles();
  const componentsToText = [
    { iconComponent: LocationOnOutlinedIcon, text: "My places" },
    { iconComponent: RateReviewOutlinedIcon, text: "Sharing Geodata" },
    { iconComponent: TimelineOutlinedIcon, text: "History" },
    { iconComponent: PermIdentityOutlinedIcon, text: "My data on Maps" },
  ];

  return (
    <Paper
      elevation={10}
      className={
        menuSidebar
          ? clsx(classes.menuSidebar, classes.open)
          : clsx(classes.menuSidebar, classes.close)
      }
      square
    >
      <div className={classes.header}>
      <img
        className={classes.headerImage}
        src={logo}  
        alt="logo"
      />
        <IconButton onClick={() => setMenuSidebar(!menuSidebar)}>
          <CloseIcon />
        </IconButton>
      </div>
      {/* <Divider />
      <List>
        <ListItem button>
          <ListItemIcon>
            <LayersOutlinedIcon />
          </ListItemIcon>
          <ListItemText
            classes={{ primary: classes.listItemText }}
            primary={layersText}
          />
        </ListItem>
      </List>
      <Divider /> */}
      {/* <List>
        {componentsToText.map((data) => (
          <ListItem button key={data.text}>
            <ListItemIcon>
              <data.iconComponent />
            </ListItemIcon>
            <ListItemText
              classes={{ primary: classes.listItemText }}
              primary={data.text}
            />
          </ListItem>
        ))}
      </List> */}
      {/* <Divider />
      <ListItem
        button
        onClick={() =>
          window.open("prefeitura.rio", "_blank").focus()
          // window.open("https://github.com/AlexanderBaikal", "_blank").focus()
        }
      >
        <ListItemIcon>
          <LinkIcon />
        </ListItemIcon>
        <ListItemText
          classes={{ primary: classes.listItemText }}
          primary={"prefeitura.rio"}
          // primary={"github.com/AlexanderBaikal"}
        />
      </ListItem> */}
      <Divider />
      <ListItem>
        <ListItemIcon>
          <InfoIcon />
        </ListItemIcon>
        <ListItemText
          classes={{ primary: classes.listItemText }}
          primary={"Sobre o projeto"}
          
          secondary={`O Mapa de Realizações da Cidade do Rio de Janeiro é
           uma iniciativa inovadora que visa aumentar a transparência,
            eficiência e responsabilidade no uso de recursos públicos destinados 
            a obras e projetos de desenvolvimento urbano. Desenvolvido com a cooperação 
            dos desenvolvedores do Escritório de Dados, este mapa digital
             interativo serve como um ponto focal para o acompanhamento em tempo real do status, 
             progresso e impacto de diversas obras em toda a cidade.`}
        />
      </ListItem>
      {/* <ListItem>
        <ListItemIcon>
          <BookmarkIcon />
        </ListItemIcon>
        <ListItemText
          classes={{ primary: classes.listItemText }}
          primary={"Ver mais"}
          secondary={"Ver outros projetos da prefeitura aqui..."}
          // secondary={"You can see other projects here: alexbaikalov.com"}
        />
      </ListItem> */}
    </Paper>
  );
};

export default MenuSidebar;
