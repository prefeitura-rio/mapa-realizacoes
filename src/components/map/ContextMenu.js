import "leaflet/dist/leaflet.css";
import "./map.css";
import {
  ClickAwayListener,
  List,
  ListItem,
  ListItemText,
  makeStyles,
  Paper,
} from "@material-ui/core";
import { emptyContent } from "../../utils/emptyContent";
import { login } from "../../redux/auth/actions";

import { useDispatch } from "react-redux";

const useStyles = makeStyles({
  listItem: {
    padding: "4px 36px",
  },
  paper: {
    left: (props) => `${props.screenCoords.x}px`,
    top: (props) => `${props.screenCoords.y}px`,
    position: "absolute",
    zIndex: 21000,
    alignItems: "center",
    display: "flex",
  },
});

const ContextMenu = ({
  screenCoords,
  geoCoords,
  setOpened,
  setOpenEditInfo,
  setContent,
  setContentSnapshot,
  profile,
}) => {
  const classes = useStyles({ screenCoords });

  const dispatch = useDispatch();

  const handleClickAway = () => {
    setOpened(false);
  };

  const onAddClick = () => {
    setOpened(false);
    const gotCoords = getCoords(geoCoords);
    const coords = {
      latitude: gotCoords[0],
      longitude: gotCoords[1],
    };
    setContent({ ...emptyContent, coords });
    setContentSnapshot({ ...emptyContent, coords });
    setOpenEditInfo(true);
  };

  const getCoords = (coords) => {
    return [
      Math.round(coords.lat * 10000) / 10000,
      Math.round(coords.lng * 10000) / 10000,
    ];
  };

  return (
    <ClickAwayListener onClickAway={handleClickAway}>
      <Paper className={classes.paper}>
        <List disablePadding>
          {/* <ListItem button className={classes.listItem}>
            <ListItemText
              primary={getCoords(geoCoords).join(" ")}
            ></ListItemText>
          </ListItem> */}

          <ListItem button className={classes.listItem}>
            <ListItemText
              primary={"Filtre por Tema, Programa e Bairro."}
              secondary={"Clique em uma obra para ver detalhes."}
            ></ListItemText>
          </ListItem>

          {/* <ListItem
            button
            className={classes.listItem}
            onClick={profile ? onAddClick : () => {dispatch(login());}}
          >
            <ListItemText
              primary={
                profile
                  ? "Adicionar nova realização"
                  : "Por favor, faça login para adiconar realização."
              }
            ></ListItemText>
          </ListItem> */}
        </List>
      </Paper>
    </ClickAwayListener>
  );
};

export default ContextMenu;
