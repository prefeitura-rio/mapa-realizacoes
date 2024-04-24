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
  Popper,
  Typography,
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
import Slide from '@mui/material/Slide';
import { Stack } from "@mui/material";
import { set } from "date-fns";

const useStyles = makeStyles((theme) => {
  return {
    searchbar: {
      position: "absolute !important",
      zIndex: 2,
    },
    paper: {
      width: "400px",
      display: "flex",
      alignItems: "center",
      borderRadius: '20px',
      height: "60px",
      zIndex: 1000,
    },
    paperBackground: {
      width: "400px",
      display: "flex",
      borderRadius: '20px',
      height: "91.5vh",
      zIndex: 1000,
      paddingBottom: "20px",
    },

    buttonStyle: {
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
      color: "grey"
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

const CustomPaper = (props) => {
  return (
    <Paper elevation={0} {...props} />
  )
};

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
  temasNameFilter,
  programasNameFilter,
  setRota
}) => {
  const [inputValueBairroSubprefeitura, setInputValueBairroSubprefeitura] = useState("");
  const [showSearchBar, setShowSearchBar] = useState(false);
  const [showMenuBar, setShowMenuBar] = useState(false);
  const [bairroName, setBairroName] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleBairroSubprefeituraChange = (event, name) => {
    if (name) {
      console.log('Bairro/prefeitura selecionado(a):', name);
      setBairroName(name);
    }
    // Check if name is a prefeitura
    if (bairros.includes(name)) {
      setBairroData(name);
      setActiveBar(BAIRRO_DESCRIPTION_BAR);
      setEhBairro(true);
      console.log('Bairro selecionado: ', name);
      dispatch(loadDadosAgregadosAbaSumarioStatusEntregasBairro(name));
      setInputValueBairroSubprefeitura(name);
    }
    else if (prefeituras.includes(name)) {
      setSubprefeituraData(name);
      setActiveBar(SUBPREFEITURA_DESCRIPTION_BAR);
      setEhBairro(false);
      console.log('Subprefeitura selecionada: ', name);
      dispatch(loadDadosAgregadosAbaSumarioStatusEntregasSubprefeitura(name));
      setInputValueBairroSubprefeitura(name);
    }
    else {
      console.error('Não foi possível identificar o bairro/prefeitura selecionado(a).');
    }
  };

const [inputValueTema, setInputValueTema] = useState("");
const handleTemaChange = (event, newValue) => {
  setInputValueTema(newValue);
};

  const handleSearchPrompt = () => {
    setSearchPrompt();
  };

  const handleClickOutside = () => {
    setShowSearchBar(false);
    setShowMenuBar(false);
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

  const handleOnfocus = () => {
    setUnderSearchBar(true);
    setActiveBar(MAIN_UNDERSEARCH_BAR);
  }

  const classes = useStyles();

  const [bairrosSubSubprefeituras, setBairrosSubprefeituras] = useState([]);
  const [prefeituras, setSubprefeituras] = useState([]);
  const [bairros, setBairros] = useState([]);
  const [temaName, setTemaName] = useState(null);

  const handleClearInput = () => {
    // setInputValue('');
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


  useEffect(() => {
    console.log("showMenuBar",showMenuBar)
   console.log("showSearchBar",showSearchBar)
  }, [showSearchBar,showMenuBar]);


  return (

    <ClickAwayListener onClickAway={handleClickOutside}>
        <Stack direction="row" spacing={!showMenuBar&&!showSearchBar?2:(showMenuBar?52:8)}>
          {!showMenuBar ?

            (
              <Paper elevation={4} style={{ position: "relative", backgroundColor: 'white' }}>
                <IconButton
                  style={{ backgroundColor: 'transparent' }}
                  color="grey"
                  onClick={() => {setShowMenuBar(!showMenuBar) ; setShowSearchBar(showMenuBar)}}
                >
                  <MenuIcon />
                </IconButton>
              </Paper>
            )

            :

            (
              // <Slide direction="down" in={showMenuBar} mountOnEnter unmountOnExit>
                <div className={classes.searchbar}>

                  <Paper
                    component="form"
                    variant="elevation"
                    className={classes.paperBackground}
                    // elevation={searchPrompt ? 1 : 3}
                    elevation={3}
                  >
                    <Paper
                      component="form"
                      variant="elevation"
                      className={
                        searchPrompt && historyItems?.length
                          ? clsx(classes.paper, classes.bottomRound)
                          : classes.paper
                      }
                      elevation={3}
                      onFocus={handleSearchPrompt}
                    >
                      {!inputValueTema?
                     <Typography variant="h6" style={{position:'absolute', marginLeft: '20px', color: 'black'}}>Temas</Typography>
                    :""
                    }


                      <Autocomplete
                        freeSolo
                        className={classes.input}
                        value={inputValueTema}
                        onChange={handleTemaChange}
                        disableClearable
                        options={temasNameFilter}
                        PaperComponent={CustomPaper}
                        ListboxProps={{ style: { maxHeight: "80vh" } }}
                        inputprops={{
                          style: {
                            color: 'black'
                          }
                        }}
                        componentsProps={{
                          paper: {
                            sx: {
                              marginTop: "10px",
                              marginLeft: "-5px",
                              width: "392px",
                              height:"80vh",
                              overflowY: "hidden",
                              borderRadius: '0px',
                              // borderBottomLeftRadius: '5px',
                              // borderBottomRightRadius: '25px',
                              

                            }
                          }
                        }}
                        open={showMenuBar}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            
                            onFocus={activeBar == MAIN_UNDERSEARCH_BAR ? handleOnfocus : () => { }}
                            placeholder="Temas"
                            sx={{
                              "& fieldset": { border: 'none' },
                              input: {
                                // visibility: 'hidden',
                                color: 'black',
                                caretColor: 'transparent', 
                                "&::placeholder": {    
                                  opacity: 0,
                               },
                            },
                            }}
                           
                          />
                        )}
                      />

                      <IconButton
                        // type="submit"
                        color="secondary"
                        classes={{ colorSecondary: classes.colorSecondary }}
                        aria-label="search"
                       
                      >
                        <CloseIcon onClick = {() => setInputValueTema("")} />

                      </IconButton>
                    </Paper>
                  </Paper>
                </div>
              // </Slide>
              )}

          {!showSearchBar ?

            (
              <Paper elevation={4} style={{ position: "relative", backgroundColor: 'white' }}>
                <IconButton
                  style={{ backgroundColor: 'transparent' }}
                  color="grey"
                  onClick={() => {setShowSearchBar(!showSearchBar); setShowMenuBar(showSearchBar)}}
                >
                  <SearchIcon />
                </IconButton>
              </Paper>
            )

            :

            (
              // <Slide direction="down" in={showSearchBar} mountOnEnter unmountOnExit>
                <div className={classes.searchbar}>

                  <Paper
                    component="form"
                    variant="elevation"
                    className={classes.paperBackground}
                    // elevation={searchPrompt ? 1 : 3}
                    elevation={3}
                  >
                    <Paper
                      component="form"
                      variant="elevation"
                      className={
                        searchPrompt && historyItems?.length
                          ? clsx(classes.paper, classes.bottomRound)
                          : classes.paper
                      }
                      // elevation={searchPrompt ? 1 : 3}
                      elevation={3}
                      onFocus={handleSearchPrompt}
                    >


                      <Autocomplete
                        freeSolo
                        // disablePortal
                        className={classes.input}
                        value={inputValueBairroSubprefeitura}
                        onChange={handleBairroSubprefeituraChange}
                        disableClearable
                        options={bairrosSubSubprefeituras}
                        PaperComponent={CustomPaper}
                        ListboxProps={{ style: { maxHeight: "80vh" } }}
                        componentsProps={{
                          paper: {
                            sx: {
                              marginTop: "10px",
                              marginLeft: "-5px",
                              width: "392px",
                              height: "80vh",
                              overflowY: "hidden",
                              borderRadius: '0px',
                              borderBottomLeftRadius: '5px',
                              borderBottomRightRadius: '25px',

                            }
                          }
                        }}
                        open={showSearchBar}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            autoFocus={true} 
                            // onFocus={activeBar == MAIN_UNDERSEARCH_BAR ? handleOnfocus : () => { }}
                            placeholder="Busque por Bairro, Subprefeitura ou AP"
                            sx={{
                              "& fieldset": { border: 'none' }
                            }}
                          />
                        )}
                      />

                      <Divider className={classes.divider} orientation="vertical" />
                      <IconButton
                        // type="submit"
                        color="secondary"
                        classes={{ colorSecondary: classes.colorSecondary }}
                        aria-label="search"
                        // onClick={
                        //   activeBar !== MAIN_UNDERSEARCH_BAR ? onDirectionsClick : () => { }
                        // }
                      >
                        {anyLoading ? (
                          <CircularProgress classes={{ colorPrimary: classes.colorLoading }} size={20} />
                        ) : activeBar == MAIN_UNDERSEARCH_BAR ? <SearchIcon /> : <CloseIcon  onClick = {() => setInputValueBairroSubprefeitura("")}/>

                        }

                      </IconButton>
                    </Paper>
                  </Paper>
                </div>
              // </Slide>
            )}


        </Stack>

        {/* MenuBar */}

        {/* SearchBar */}

    </ClickAwayListener>
  );
};

export default SearchBar;
