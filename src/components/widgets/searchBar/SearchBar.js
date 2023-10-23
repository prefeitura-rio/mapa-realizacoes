import MenuIcon from "@material-ui/icons/Menu";
import SearchIcon from "@material-ui/icons/Search";
import DirectionsIcon from "@material-ui/icons/Directions";
import {
  IconButton,
  Divider,
  InputBase,
  Paper,
  makeStyles,
  ClickAwayListener,
  CircularProgress,
} from "@material-ui/core";
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import { useEffect, useRef, useState } from "react";
import clsx from "clsx";
import CloseIcon from "@material-ui/icons/Close";
import { MAIN_UNDERSEARCH_BAR } from "../../../redux/active/actions";
import PromptBlock from "./PromptBlock";
import Orgaos from "../../modals/editInfo/Orgaos";
import { db } from "../../../firebase";


const useStyles = makeStyles((theme) => {
  return {
    searchbar: {
      position: "absolute",
      zIndex: 2,
      left: "7px",
      top: "7px",
    },
    paper: {
      width: "395px",
      padding: "0 4px",
      display: "flex",
      alignItems: "center",
    },

    bottomRound: {
      borderRadius: "8px 8px 0 0",
    },

    colorInfo: {
      color: "#64b5f6",
    },

    colorSecondary: {
      color: "#bdbdbd",
    },

    input: {
      marginLeft: "13px",
      flex: 1,
    },
    divider: {
      height: "28px",
      margin: "4px",
    },

    listItemText: {
      fontSize: "0.75rem",
    },
    listItem: {
      paddingTop: "5px",
    },
    listItemIcon: {
      minWidth: "47px",
      marginLeft: "3px",
      color: theme.palette.grey[500],
    },
    "@media screen and (max-width: 540px)": {
      paper: {
        width: "385px",
        display: "flex",
        alignItems: "center",
      },
    },

    "@media screen and (max-width: 410px)": {
      paper: {
        width: "calc(100vw - 23px)",
        display: "flex",
        alignItems: "center",
      },
      searchbar: {
        position: "absolute",
        zIndex: 2,
        top: "7px",
      },
    },
  };
});

const SearchBar = ({
  menuSidebar,
  setMenuSidebar,
  underSearchBar,
  setUnderSearchBar,
  activeBar,
  setActiveBar,
  searchPrompt,
  setSearchPrompt,
  setContent,
  anyLoading,
  anyPlaces,
  setHistoryItems,
  setPlacesData,
  historyItems,
}) => {
  const handleUnderSearchBar = () => {
    setUnderSearchBar(!underSearchBar);
    if (!underSearchBar) {
      inputRef.current.focus();
    }
  };
  const handleSearchPrompt = () => {
    setSearchPrompt();
  };

  const handleClickOutside = () => {
    if (searchPrompt) setSearchPrompt();
  };

  const handleMenuSidebar = () => {
    setMenuSidebar(!menuSidebar);
  };

  const onDirectionsClick = () => {
    setContent(null);
    setPlacesData(null);
    setActiveBar(MAIN_UNDERSEARCH_BAR);
  };

  const inputRef = useRef(null);
  const classes = useStyles();

  const [inputValue, setInputValue] = useState("");
  const [neighborhoods, setNeighborhoods] = useState([]);

  useEffect(() => {
    const fetchNeighborhoods = async () => {
      try {
        const querySnapshot = await db.collection("bairro").get();
        const neighborhoodNames = querySnapshot.docs.map((doc) => doc.data().nome);
        setNeighborhoods(neighborhoodNames);
      } catch (error) {
        console.error("Erro ao buscar nomes de bairros:", error);
      }
    };

    fetchNeighborhoods();
  }, []);

  return (
    <ClickAwayListener onClickAway={handleClickOutside}>
      <div className={classes.searchbar}>
        <Paper
          component="form"
          variant={underSearchBar ? "outlined" : "elevation"}
          className={
            searchPrompt && historyItems?.length
              ? clsx(classes.paper, classes.bottomRound)
              : classes.paper
          }
          elevation={searchPrompt ? 1 : 2}
          onFocus={handleSearchPrompt}
        >
          <IconButton
            className={classes.iconButton}
            aria-label="menu"
            onClick={handleMenuSidebar}
          >
            <MenuIcon />
          </IconButton>
         
          <Autocomplete
            freeSolo
            className={classes.input}
            onClick={handleUnderSearchBar}
            value={inputValue}
            onChange={(event, newValue) => setInputValue(newValue)}
            disableClearable
            options={neighborhoods} // Usando os nomes dos bairros obtidos do Firebase
            renderInput={(params) => (
              <TextField
                {...params}
                label="Buscar por bairro"
                sx={{
                  "& fieldset": { border: 'none' },
                }}
              />
            )}
          />
          <IconButton
            type="submit"
            color="secondary"
            classes={{ colorSecondary: classes.colorSecondary }}
            aria-label="search"
          >
            <SearchIcon />
          </IconButton>
          <Divider className={classes.divider} orientation="vertical" />
          <IconButton
            color="primary"
            classes={{ colorPrimary: classes.colorInfo }}
            aria-label="right btn"
            onClick={
              activeBar !== MAIN_UNDERSEARCH_BAR ? onDirectionsClick : () => {}
            }
          >
            {anyLoading ? (
              <CircularProgress size={20} />
            ) : activeBar !== MAIN_UNDERSEARCH_BAR ? (
              <CloseIcon />
            ) : (
              <DirectionsIcon />
            )}
          </IconButton>
        </Paper>
      </div>
    </ClickAwayListener>
  );
};

export default SearchBar;
