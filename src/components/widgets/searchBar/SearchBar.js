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
import { BAIRRO_DESCRIPTION_BAR, MAIN_UNDERSEARCH_BAR, SUBPREFEITURA_DESCRIPTION_BAR } from "../../../redux/active/actions";
import PromptBlock from "./PromptBlock";
import Orgaos from "../../modals/editInfo/Orgaos";
import { getListBairroName, getListSubprefeituraName } from "../../../firebase";
import { useDispatch } from "react-redux";
import { loadDadosAgregadosAbaSumarioInfoBasicasSubprefeitura, loadDadosAgregadosAbaSumarioStatusEntregasSubprefeitura } from "../../../redux/subprefeituras/actions";
import { loadDadosAgregadosAbaSumarioStatusEntregasBairro } from "../../../redux/bairros/actions";
import { useNavigate } from 'react-router-dom';

const useStyles = makeStyles((theme) => {
  return {
    searchbar: {
      position: "absolute",
      zIndex: 2,
      left: "40px",
      top: "40px",
    },
    paper: {
      width: "400px",
      padding: "0 4px",
      display: "flex",
      alignItems: "center",
      borderRadius: '40px',
      // paddingRight: "-50px",
    },

    buttonStyle : {
      backgroundColor: 'white',
      color: 'black',
      borderRadius: '20px',
      paddingLeft: '20px',
      paddingRight: '20px',
      textTransform: 'none'
    },

    bottomRound: {
      borderRadius: "8px 8px 0 0",
    },

    colorInfo: {
      color: "#007E7D",
    },
    colorLoading: {
      color: "#007E7D",
    },

    colorSecondary: {
      color: "#007E7D",
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
      searchbar: {
        position: "absolute",
        zIndex: 2,
        top: "7px",
        left: "7px",
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
        left: "7px",
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
  setBairroData,
  setSubprefeituraData,
  setPlacesData,
  setEhBairro,
  historyItems,
  setRota
}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleBairroSubprefeituraChange = (event, name) => {
    if (name) {
      console.log('Bairro/prefeitura selecionado(a):', name);
    }
    
  
    // Check if name is a prefeitura
    if (bairros.includes(name)) {
      setBairroData(name);
      setActiveBar(BAIRRO_DESCRIPTION_BAR);
      setEhBairro(true);
      console.log('Bairro selecionado: ', name);
      dispatch(loadDadosAgregadosAbaSumarioStatusEntregasBairro(name));
    } 
    else if (prefeituras.includes(name)){
      setSubprefeituraData(name);
      setActiveBar(SUBPREFEITURA_DESCRIPTION_BAR);
      setEhBairro(false);
      console.log('Subprefeitura selecionada: ', name);
      dispatch(loadDadosAgregadosAbaSumarioStatusEntregasSubprefeitura(name));
    }
    else {
      console.error('Não foi possível identificar o bairro/prefeitura selecionado(a).');
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
    handleClearInput();
    setBairroData(null);
    setContent(null);
    setPlacesData(null);
    setActiveBar(MAIN_UNDERSEARCH_BAR);
    setRota(null);
    navigate(`/`);
  };

  const handleOnfocus = () =>{
    setUnderSearchBar(true);
    setActiveBar(MAIN_UNDERSEARCH_BAR);
  }

  const inputRef = useRef(null);
  const classes = useStyles();

  const [inputValue, setInputValue] = useState("");
  const [bairrosSubSubprefeituras, setBairrosSubprefeituras] = useState([]);
  const [prefeituras, setSubprefeituras] = useState([]);
  const [bairros, setBairros] = useState([]);
  const handleClearInput = () => {
    setInputValue('');
  };
  
  useEffect(() => {
    const loadBairros = async () => {
      try {
        const bairroRef = await getListBairroName();
        const prefeituraRef = await getListSubprefeituraName(); // Obter os nomes das prefeituras
  
        if (!bairroRef.empty) {
          const bairrosSubSubprefeituras = [];
          const bairrosName = [];
          bairroRef.forEach((doc) => {
            const bairrosData = doc.data();
            const bairroName = bairrosData.nome;
            bairrosSubSubprefeituras.push(bairroName);
            bairrosName.push(bairroName);
          });
          setBairros(bairrosName);
  
          // Incluir os nomes das prefeituras na lista de bairros
          const prefeiturasNames = [];
          prefeituraRef.forEach((doc) => {
            const prefeiturasData = doc.data();
            const prefeituraName = prefeiturasData.nome;
            bairrosSubSubprefeituras.push(prefeituraName);
            prefeiturasNames.push(prefeituraName);
          });
          setSubprefeituras(prefeiturasNames);


          setBairrosSubprefeituras(bairrosSubSubprefeituras);
        } else {
          console.error("Nenhum bairro/prefeitura encontrado.");
        }
      } catch (error) {
        console.error("Erro ao buscar nomes de bairros/prefeituras:", error);
      }
    };
  
    loadBairros();
  }, []);
  
  

  return (
    <ClickAwayListener onClickAway={handleClickOutside}>
      <div className={classes.searchbar}>
        <Paper
          component="form"
          variant="elevation"
          className={
            searchPrompt && historyItems?.length
              ? clsx(classes.paper, classes.bottomRound)
              : classes.paper
          }
          elevation={searchPrompt ? 1 : 3}
          onFocus={handleSearchPrompt}
        >
         
         
          <Autocomplete
            freeSolo
            className={classes.input}
            value={inputValue}
            onChange={handleBairroSubprefeituraChange}
            disableClearable
            options={bairrosSubSubprefeituras}
            renderInput={(params) => (
              <TextField
                {...params}
                onFocus={activeBar == MAIN_UNDERSEARCH_BAR ? handleOnfocus : () => {}}
                placeholder="Busque por Bairro, Subprefeitura ou AP"
                sx={{
                  "& fieldset": { border: 'none' },
                }}
              />
            )}
          />
         
          <Divider className={classes.divider} orientation="vertical" />
          <IconButton
            type="submit"
            color="secondary"
            classes={{ colorSecondary: classes.colorSecondary }}
            aria-label="search"
            onClick={
              activeBar !== MAIN_UNDERSEARCH_BAR ? onDirectionsClick : () => {}
            }
          >
             {anyLoading ? (
              <CircularProgress classes={{ colorPrimary: classes.colorLoading }} size={20} />
            ) : activeBar == MAIN_UNDERSEARCH_BAR ?  <SearchIcon /> : <CloseIcon />
            
            }
            
          </IconButton>
          {/* <IconButton
            color="primary"
            classes={{ colorPrimary: classes.colorInfo }}
            aria-label="right btn"
            onClick={
              activeBar !== MAIN_UNDERSEARCH_BAR ? onDirectionsClick : () => {}
            }
          > */}
           
          {/* </IconButton> */}
        </Paper>
      </div>
    </ClickAwayListener>
  );
};

export default SearchBar;
