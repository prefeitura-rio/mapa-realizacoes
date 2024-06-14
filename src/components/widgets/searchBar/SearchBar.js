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
  Fade,
  Tooltip,
} from "@material-ui/core";
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import { useEffect, useRef, useState } from "react";
import clsx from "clsx";
import CloseIcon from "@material-ui/icons/Close";
import { BAIRRO_DESCRIPTION_BAR, DESCRIPTION_BAR, MAIN_UNDERSEARCH_BAR, PROGRAMA_DESCRIPTION_BAR, SUBPREFEITURA_DESCRIPTION_BAR, TEMA_DESCRIPTION_BAR } from "../../../redux/active/actions";
import PromptBlock from "./PromptBlock";
import Orgaos from "../../modals/editInfo/Orgaos";
import { getListBairroName, getListProgramasTema, getListRealizacoesPrograma, getListSubprefeituraName, readPrograma, readTema } from "../../../firebase";
import { useDispatch } from "react-redux";
import { loadDadosAgregadosAbaSumarioInfoBasicasSubprefeitura, loadDadosAgregadosAbaSumarioStatusEntregasSubprefeitura } from "../../../redux/subprefeituras/actions";
import { loadDadosAgregadosAbaSumarioStatusEntregasBairro } from "../../../redux/bairros/actions";
import { useNavigate } from 'react-router-dom';
import Slide from '@mui/material/Slide';
import { Stack } from "@mui/material";
import { set } from "date-fns";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { loadProgramaData, setPrograma, setRealizacao, setTema } from "../../../redux/filtros/actions";
import BackspaceIcon from '@mui/icons-material/Backspace';
import { toSnakeCase } from "../../../utils/formatFile";
import Badge from '@material-ui/core/Badge';
import lupa_mapa from '../../../icons/lupa_mapa.png'
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
      borderRadius: '10px',
      height: "47px",
      zIndex: 1000,
    },
    paperButton: {
      position: "absolute",
      marginTop: "60px",
      width: "400px",
      display: "flex",
      alignItems: "center",
      borderRadius: '10px',
      height: "60px",
      zIndex: 1000,
    },
    paperBackground: {
      width: "400px",
      display: "flex",
      borderRadius: '10px',
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
      // margin: "4px",
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


const CustomPaperSearch = (props) => {
  return (
    <>
      <Paper elevation={0} {...props} />
    </>
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
  setRota,
  setTema,
  setTemaData,
  setPrograma,
  setProgramaData,
  setRealizacao,
  setBairro,
  setSubprefeitura,
  tema,
  programa,
  realizacao,
  setDescriptionData,
  loadData,
  setZoomDefault,
  bairro,
  subprefeitura,
}) => {
  const [inputValueBairroSubprefeitura, setInputValueBairroSubprefeitura] = useState("");
  const [showSearchBar, setShowSearchBar] = useState(false);
  const [showMenuBar, setShowMenuBar] = useState(false);
  const [bairroName, setBairroName] = useState(null);
  const [showTemas, setShowTemas] = useState(true);
  const [showProgramas, setShowProgramas] = useState(false);
  const [showRealizacoes, setShowRealizacoes] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    // console.log("tema", tema)
    // console.log("programa", programa)
    // console.log("realizacao", realizacao)
  }, [tema, programa, realizacao]);

  const handleBairroSubprefeituraChange = (event, name) => {
    showSearchBar && setShowSearchBar(false);
    if (name) {
      // console.log('Bairro/prefeitura selecionado(a):', name);
      setBairroName(name);
    }
    // Check if name is a prefeitura
    if (bairros.includes(name)) {
      setBairroData(name);
      if (!tema) {
        setActiveBar(BAIRRO_DESCRIPTION_BAR);
      }
      setEhBairro(true);
      // console.log('Bairro selecionado: ', name);
      dispatch(loadDadosAgregadosAbaSumarioStatusEntregasBairro(name));
      setInputValueBairroSubprefeitura(name);
      setBairro(name);
      setSubprefeitura(null);
      setZoomDefault(0);
    }
    else if (prefeituras.includes(name)) {
      setSubprefeituraData(name);
      setActiveBar(SUBPREFEITURA_DESCRIPTION_BAR);
      setEhBairro(false);
      // console.log('Subprefeitura selecionada: ', name);
      dispatch(loadDadosAgregadosAbaSumarioStatusEntregasSubprefeitura(name));
      setInputValueBairroSubprefeitura(name);
      setSubprefeitura(name);
      setBairro(null);
      setZoomDefault(0);
    }
    else {
      console.error('Não foi possível identificar o bairro/prefeitura selecionado(a).');
    }
  };

  const [inputValueTema, setInputValueTema] = useState(undefined);
  const handleTemaChange = (event, newValue) => {
    setInputValueTema(newValue);
    setShowProgramas(true);
    setShowTemas(false);
    setShowRealizacoes(false);
    setTema(newValue);
    setActiveBar(TEMA_DESCRIPTION_BAR);
  };

  // programas do tema -> programasTema vai aparecer na listagem de programas
  const [programasTema, setProgramasTema] = useState([]);
  useEffect(() => {
    if (tema) {
      const loadProgramasTema = async (t) => {
        try {
          const programasTemaRef = await getListProgramasTema(toSnakeCase(t));

          setProgramasTema(programasTemaRef);
        } catch (error) {
          console.error("Erro", error);
        }
      };
      const loadTemaInfo = async (p) => {

        try {
          const temaRef = await readTema(toSnakeCase(p));

          setTemaData(temaRef);

          // console.log("temaRef", temaRef)

        } catch (error) {
          console.error("Erro", error);
        }
      }

      loadTemaInfo(tema)
      loadProgramasTema(tema);
    }
  }, [tema]);

  // realizacoes do programa -> realizacoesPrograma vai aparecer na listagem de realizacoes
  const [realizacoesPrograma, setRealizacoesPrograma] = useState([]);
  useEffect(() => {
    if (programa) {
      const loadRealizacoesPrograma = async (p) => {
        try {
          const realizacoesProgramaRef = await getListRealizacoesPrograma(toSnakeCase(p));

          setRealizacoesPrograma(realizacoesProgramaRef);

        } catch (error) {
          console.error("Erro", error);
        }
      };
      loadRealizacoesPrograma(programa);
    }
  }, [programa]);

  const [inputValuePrograma, setInputValuePrograma] = useState(undefined);
  const handleProgramaChange = (event, newValue) => {
    setInputValuePrograma(newValue);
    setShowRealizacoes(true);
    setShowTemas(false);
    setShowProgramas(false);
    setPrograma(newValue);
    setActiveBar(PROGRAMA_DESCRIPTION_BAR);
    dispatch(loadProgramaData(newValue));
  };



  const [inputValueRealizacao, setInputValueRealizacao] = useState(undefined);
  const handleRealizacaoChange = (event, newValue) => {
    setInputValueRealizacao(newValue);
    setRealizacao(newValue);
    setActiveBar(DESCRIPTION_BAR);
    setDescriptionData(toSnakeCase(newValue));
    loadData(toSnakeCase(newValue));
  };
  //mock

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

  const handleCleanBairroInput = () => {
    // console.log("clickei")
    setInputValueBairroSubprefeitura("");
    // setBairroData(null);
    setBairro(null);
    setSubprefeitura(null);
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

          // // Incluir os nomes das prefeituras na lista de bairros
          // const prefeiturasNames = [];
          // prefeituraRef.forEach((doc) => {
          //   const prefeiturasData = doc.data();
          //   const prefeituraName = prefeiturasData.nome;
          //   bairrosSubSubprefeituras.push(prefeituraName);
          //   prefeiturasNames.push(prefeituraName);
          // });
          // setSubprefeituras(prefeiturasNames);


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


  const CustomPaperMenu = (props) => {
    return (
      <>
        <Paper elevation={0} {...props} />
      </>
    )
  };

  return (

    <ClickAwayListener onClickAway={handleClickOutside}>
      <Stack direction="row" spacing={!showMenuBar && !showSearchBar ? 2 : (showMenuBar ? 52 : 8)}>
        {!showMenuBar ?

          (
            <Paper elevation={4} style={{ borderRadius: "10px", width: "46px", height: "46px", position: "relative", backgroundColor: 'white', display: "flex", alignItems: "center", justifyContent: "center" }}>
              <Tooltip title={tema && !programa && !realizacao ? `Tema: ${tema}` : tema && programa && !realizacao ? `Tema: ${tema} | Programa: ${programa}` : tema && programa && realizacao ? `Tema: ${tema} | Programa: ${programa} | Realizacao: ${realizacao}` : ""} placement="right">
                <Badge badgeContent={tema && !programa && !realizacao ? 1 : tema && programa && !realizacao ? 2 : tema && programa && realizacao ? 3 : 0} color="primary">
                  <IconButton
                    style={{ backgroundColor: 'transparent' }}
                    color="grey"
                    onClick={() => { setShowMenuBar(!showMenuBar); setShowSearchBar(showMenuBar) }}
                  >
                    <MenuIcon />
                  </IconButton>
                </Badge>
              </Tooltip>
            </Paper>
          )

          :

          (
            // <Slide direction="down" in={showMenuBar} mountOnEnter unmountOnExit>
            <div className={classes.searchbar}>
              {/* bigger paper background */}
              <Paper
                component="form"
                variant="elevation"
                className={classes.paperBackground}
                // elevation={searchPrompt ? 1 : 3}
                elevation={3}
              >
                {/* header paper */}
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
                  {/* IDEIA PARA O BOTAO VOLTAR:showTemas, showProgramas, showRealizacoes */}
                  {/* {(inputValueTema === undefined && inputValuePrograma === undefined) && */}
                  {showTemas && !showProgramas &&
                    <Typography variant="h6" style={{ position: 'absolute', marginLeft: '20px', color: 'black' }}>Temas</Typography>
                  }

                  {showTemas && !showProgramas && (
                    <Autocomplete
                      freeSolo
                      className={classes.input}
                      value={inputValueTema}
                      onChange={handleTemaChange}
                      disableClearable
                      options={temasNameFilter}
                      PaperComponent={CustomPaperMenu}
                      ListboxProps={{ style: { maxHeight: "80vh" } }}
                      componentsProps={{
                        paper: {
                          sx: {
                            marginTop: "15px",
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
                      open={showMenuBar}
                      renderInput={(params) => (
                        <TextField
                          {...params}

                          onFocus={activeBar == MAIN_UNDERSEARCH_BAR ? handleOnfocus : () => { }}
                          placeholder="Temas"
                          sx={{
                            "& fieldset": { border: 'none' },
                            input: {
                              visibility: 'hidden',
                              color: 'black',
                              caretColor: 'transparent',
                              "&::placeholder": {
                                opacity: 0,
                              },
                            },
                          }}

                        />
                      )}
                    />)}

                  {showProgramas && !showTemas &&
                    <Typography variant="h6" style={{ position: 'absolute', marginLeft: '20px', color: 'black' }}>{inputValueTema}</Typography>
                  }

                  {showProgramas && !showTemas && (
                    <Autocomplete
                      freeSolo
                      className={classes.input}
                      value={inputValuePrograma}
                      onChange={handleProgramaChange}
                      disableClearable
                      options={programasTema ? programasTema : []}
                      PaperComponent={CustomPaperMenu}
                      ListboxProps={{ style: { maxHeight: "80vh" } }}
                      inputprops={{
                        style: {
                          color: 'black'
                        }
                      }}
                      componentsProps={{
                        paper: {
                          sx: {
                            marginLeft: "-5px",
                            marginTop: "15px",
                            width: "392px",
                            height: "70vh",
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
                              visibility: 'hidden',
                              color: 'black',
                              caretColor: 'transparent',
                              "&::placeholder": {
                                opacity: 0,
                              },
                            },
                          }}

                        />
                      )}
                    />)}

                  {showRealizacoes &&
                    <Typography variant="h6" style={{
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      width: "19vw",
                      maxWidth: "270px",
                      minWidth: "270px", position: 'absolute', marginLeft: '20px', color: 'black'
                    }}>{inputValuePrograma}</Typography>
                  }
                  {showRealizacoes && (
                    <Autocomplete
                      freeSolo
                      className={classes.input}
                      value={inputValueRealizacao}
                      onChange={handleRealizacaoChange}
                      disableClearable
                      options={realizacoesPrograma}
                      PaperComponent={CustomPaperMenu}
                      ListboxProps={{ style: { maxHeight: "80vh" } }}
                      componentsProps={{
                        paper: {
                          sx: {
                            marginTop: "15px",
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
                      open={showMenuBar}
                      renderInput={(params) => (
                        <TextField
                          {...params}

                          onFocus={activeBar == MAIN_UNDERSEARCH_BAR ? handleOnfocus : () => { }}
                          placeholder="Temas"
                          sx={{
                            "& fieldset": { border: 'none' },
                            input: {
                              visibility: 'hidden',
                              color: 'black',
                              caretColor: 'transparent',
                              "&::placeholder": {
                                opacity: 0,
                              },
                            },
                          }}

                        />
                      )}
                    />)}


                  {showProgramas ?

                    <IconButton
                      style={{ backgroundColor: 'transparent' }}
                      color="grey"
                      onClick={() => { setInputValueTema(null); setTema(null); setShowProgramas(false); setShowTemas(true); setPrograma(undefined); setInputValuePrograma(undefined); setActiveBar(MAIN_UNDERSEARCH_BAR); setZoomDefault((Math.random() * 999 + 1)); }}
                    >
                      <ArrowBackIosIcon sx={{ fontSize: "20px", marginRight: "-4px" }} />
                    </IconButton>

                    :

                    (showRealizacoes ? <IconButton
                      style={{ backgroundColor: 'transparent' }}
                      color="grey"
                      onClick={() => { setShowProgramas(true); setShowRealizacoes(false); setRealizacao(undefined); setInputValueRealizacao(undefined); setActiveBar(PROGRAMA_DESCRIPTION_BAR) }}
                    >
                      <ArrowBackIosIcon sx={{ fontSize: "20px", marginRight: "-4px" }} />
                    </IconButton> : "")

                  }
                  {inputValueTema &&
                    <Divider className={classes.divider} orientation="vertical" />
                  }
                  <IconButton
                    // type="submit"
                    style={{ backgroundColor: 'transparent' }}
                    color="secondary"
                    classes={{ colorSecondary: classes.colorSecondary }}
                    aria-label="search"

                  >
                    <CloseIcon onClick={() => setShowMenuBar(false)} />

                  </IconButton>
                </Paper>
              </Paper>
            </div>
            // </Slide>
          )}

        {!showSearchBar ?

          (
            <Paper elevation={4} style={{ borderRadius: "10px", width: "46px", height: "46px", position: "relative", backgroundColor: 'white', display: "flex", alignItems: "center", justifyContent: "center" }}>
              <Tooltip title={inputValueBairroSubprefeitura ? `${inputValueBairroSubprefeitura} está atuando como filtro.` : ""} placement="right">
                <Badge badgeContent={inputValueBairroSubprefeitura ? 1 : 0} color="primary">

                  <IconButton
                    style={{ backgroundColor: 'transparent', padding: 7 }}
                    color="grey"
                    onClick={() => { setShowSearchBar(!showSearchBar); setShowMenuBar(showSearchBar) }}
                  >
                    <img width={33} src={lupa_mapa} />
                  </IconButton>
                </Badge>
              </Tooltip>
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
                    PaperComponent={CustomPaperSearch}
                    ListboxProps={{ style: { maxHeight: "80vh" } }}
                    componentsProps={{
                      paper: {
                        sx: {
                          marginTop: "15px",
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
                        placeholder="Filtre por Bairro"
                        sx={{
                          "& fieldset": { border: 'none' }
                        }}
                      />
                    )}
                  />
                  {inputValueBairroSubprefeitura ?
                    <IconButton
                      style={{ backgroundColor: 'transparent' }}
                      // type="submit"
                      color="secondary"
                      classes={{ colorSecondary: classes.colorSecondary }}
                      aria-label="search"
                    // onClick={
                    //   activeBar !== MAIN_UNDERSEARCH_BAR ? onDirectionsClick : () => { }
                    // }
                    >

                      <BackspaceIcon sx={{ marginRight: "5px", fontSize: "20px" }} onClick={handleCleanBairroInput} />


                    </IconButton>
                    : null
                  }
                  <Divider className={classes.divider} orientation="vertical" />
                  <IconButton
                    // type="submit"
                    style={{ backgroundColor: 'transparent' }}
                    color="secondary"
                    classes={{ colorSecondary: classes.colorSecondary }}
                    aria-label="search"
                  // onClick={
                  //   activeBar !== MAIN_UNDERSEARCH_BAR ? onDirectionsClick : () => { }
                  // }
                  >
                    {anyLoading ? (
                      <CircularProgress classes={{ colorPrimary: classes.colorLoading }} size={20} />
                    ) : activeBar == MAIN_UNDERSEARCH_BAR ? <SearchIcon /> : <CloseIcon onClick={() => setShowSearchBar(false)} />

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
