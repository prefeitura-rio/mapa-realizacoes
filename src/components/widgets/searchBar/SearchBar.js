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
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  DialogContentText,
  Button,
  Snackbar,
  Backdrop,
  Collapse,
  List,
  ListItem,
  ListItemText,
} from "@material-ui/core";
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import { useEffect, useRef, useState } from "react";
import clsx from "clsx";
import CloseIcon from "@material-ui/icons/Close";
import { BAIRRO_DESCRIPTION_BAR, DESCRIPTION_BAR, MAIN_UNDERSEARCH_BAR, PROGRAMA_DESCRIPTION_BAR, SUBPREFEITURA_DESCRIPTION_BAR, TEMA_DESCRIPTION_BAR } from "../../../redux/active/actions";
import PromptBlock from "./PromptBlock";
import Orgaos from "../../modals/editInfo/Orgaos";
import { getListBairroName, getListProgramaData, getListProgramasTema, getListRealizacoesPrograma, getListSubprefeituraName, readPrograma, readTema } from "../../../firebase";
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
import { snakeToCapitalized, toSnakeCase } from "../../../utils/formatFile";
import Badge from '@material-ui/core/Badge';
import lupa_mapa from '../../../icons/lupa_mapa.png'
import { BottomNavigation, BottomNavigationAction, ButtonBase } from "@material-ui/core";
import { BottomSheet } from 'react-spring-bottom-sheet';
import 'react-spring-bottom-sheet/dist/style.css';
import { isDesktop } from "../../../redux/active/reducers";
import logo_prefeitura from '../../assets/logo_prefeitura.png';
import RestoreIcon from '@mui/icons-material/Restore';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import FileCopyIcon from '@mui/icons-material/FileCopyOutlined';
import SaveIcon from '@mui/icons-material/Save';
import PrintIcon from '@mui/icons-material/Print';
import ShareIcon from '@mui/icons-material/Share';

const useStyles = makeStyles((theme) => {
  return {
    root: {
      width: '100%',
      overflow: 'hidden',
      position: 'fixed',
      right: 0,
      bottom: 0,
      height: '70px'
    },
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
    shortPaperBackground: {
      width: "400px",
      display: "flex",
      borderRadius: '10px',
      height: "0vh",
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

    fixedButton: {
      position: 'fixed',
      left: '1.8vh',
      bottom: '10px',
      zIndex: 0,
    },
    fixedButtonImage: {
      width: "50px",
    },
    fixedButtonClockImage: {
      width: "50px",
    },
    selectedPaper: {
      backgroundColor: 'black', // Nova cor de fundo quando selecionado
    },
    selectedPaperOldPoints: {
      backgroundColor: '#FCEEEF', // Nova cor de fundo quando selecionado
      boxShadow: 'inset 0 0 0 2px #722F37'
    },
    selectedPaperG3: {
      backgroundColor: '#EAF9F9', // Nova cor de fundo quando selecionado
      boxShadow: 'inset 0 0 0 2px #007E7D'

    },
    selectedIcon: {
      color: '#722F37', // Nova cor do ícone quando selecionado
    },

    "@media screen and (max-width: 540px)": {
      fixedButton: {
        position: 'fixed',
        left: '7px',
        bottom: '85px',
        zIndex: 0,
      },
      fixedButtonImage: {
        width: "40px",
      },
      paper: {
        width: "calc(100vw - 23px)",
        display: "flex",
        alignItems: "center",
      },
      searchbar: {
        position: "absolute",
        zIndex: 2,

      },
      paperBackground: {
        width: "100%",
        display: "flex",
        borderRadius: '10px',
        height: "68vh",
        zIndex: 1000,
        paddingBottom: "20px",
      },
    },
    dialogContent: {
      width: '100%',
      padding: 0, // Adjust padding as needed
      marginTop: "-19px !important",
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
  realizacaoId,
  setOpenedPopup,
  realizacoes,
  setCurrentClickedPoint,
  setRealizacoesProgramaRedux,
  setGestao,
  gestao,
  place,
  currentClickedPoint
}) => {
  const [inputValueBairroSubprefeitura, setInputValueBairroSubprefeitura] = useState("");
  const [showSearchBar, setShowSearchBar] = useState(false);
  const [showRealizacaoSearchBar, setShowRealizacaoSearchBar] = useState(false);
  const [showMenuBar, setShowMenuBar] = useState(false);
  const [bairroName, setBairroName] = useState(null);
  const [subprefeituraName, setSubprefeituraName] = useState(null);
  const [showTemas, setShowTemas] = useState(true);
  const [showProgramas, setShowProgramas] = useState(false);
  const [showRealizacoes, setShowRealizacoes] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleBairroSubprefeituraChange = (event, name) => {
    showSearchBar && setShowSearchBar(false);
    setInputValueRealizacaoFromSearch(null);
    setRealizacao(null);
    // Check if name is a prefeitura
    if (bairros.includes(name)) {
      if (name) {
        // console.log('Bairro/prefeitura selecionado(a):', name);
        setBairroName(name);
      }
      setBairroData(name);
      if (!tema) {
        setActiveBar(BAIRRO_DESCRIPTION_BAR);
      }
      setSubprefeituraName(null);
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
      if (name) {
        // console.log('Bairro/prefeitura selecionado(a):', name);
        setSubprefeituraName(name);
      }
      if (!tema) {
        setActiveBar(SUBPREFEITURA_DESCRIPTION_BAR);
      }
      setEhBairro(false);
      setBairroName(null);
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
    navigate(`/`);
    if (!isDesktop()) {
      handleClosePopup();
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
    setInputValueRealizacaoFromSearch(null);
    setRealizacao(null);
    if (!bairro) {
      setZoomDefault((Math.random() * 999 + 1));
    }
    navigate(`/`);
  };

  // programas do tema -> programasTema vai aparecer na listagem de programas
  const [programasTema, setProgramasTema] = useState([]);
  useEffect(() => {
    if (tema) {
      const loadProgramasTema = async (t, bairro, subprefeitura, gestao) => {
        try {
          const programasTemaRef = await getListProgramasTema(toSnakeCase(t), bairro ? toSnakeCase(bairro) : null, subprefeitura ? toSnakeCase(subprefeitura) : null, gestao ? toSnakeCase(gestao) : null);
          setProgramasTema(programasTemaRef);
        } catch (error) {
          console.error("Erro", error);
        }
      };
      loadProgramasTema(tema, bairro, subprefeitura, gestao);
    }
  }, [tema, bairro, subprefeitura, gestao]);

  useEffect(() => {
    const loadTemaInfo = async (p) => {

      try {
        const temaRef = await readTema(toSnakeCase(p));

        setTemaData(temaRef);

      } catch (error) {
        console.error("Erro", error);
      }
    }
    if (tema) {
      loadTemaInfo(tema);
    }
  }, [tema]);


  // realizacoes do programa -> realizacoesPrograma vai aparecer na listagem de realizacoes
  const [realizacoesPrograma, setRealizacoesPrograma] = useState([]);
  useEffect(() => {
    if (programa) {
      const loadRealizacoesPrograma = async (p, bairro, subprefeitura, gestao) => {
        try {
          const realizacoesProgramaRef = await getListRealizacoesPrograma(toSnakeCase(p), bairro ? toSnakeCase(bairro) : null, subprefeitura ? toSnakeCase(subprefeitura) : null, gestao ? toSnakeCase(gestao) : null);
          setRealizacoesPrograma(realizacoesProgramaRef);
          setRealizacoesProgramaRedux(realizacoesProgramaRef);
        } catch (error) {
          console.error("Erro", error);
        }
      };

      loadRealizacoesPrograma(programa, bairro, subprefeitura, gestao);
    }
  }, [programa, bairro, subprefeitura, gestao]);

  useEffect(() => {
    if (programa) {
      const loadProgramaInfo = async (p) => {

        try {
          const programaRef = await readPrograma(toSnakeCase(p));

          setProgramaData(programaRef);

        } catch (error) {
          console.error("Erro", error);
        }
      }

      loadProgramaInfo(programa)
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
    if (!bairro) {
      setZoomDefault((Math.random() * 999 + 1));
    }
    dispatch(loadProgramaData(newValue));
  };

  const handleProgramaChangeFromSearch = (event, newValue) => {
    setInputValuePrograma(newValue.nome);
    setShowRealizacoes(true);
    setShowTemas(false);
    setShowProgramas(false);
    setPrograma(newValue.nome);
    setActiveBar(PROGRAMA_DESCRIPTION_BAR);
    setInputValueTema(snakeToCapitalized(newValue.id_tema));
    setTema(snakeToCapitalized(newValue.id_tema))

    if (!bairro) {
      setZoomDefault((Math.random() * 999 + 1));
    }
    dispatch(loadProgramaData(newValue.nome));
  };



  const [inputValueRealizacaoFromSearch, setInputValueRealizacaoFromSearch] = useState(undefined);
  const handleRealizacaoChangeFromSearch = (event, newValue) => {
    showRealizacaoSearchBar && setShowRealizacaoSearchBar(false);
    setInputValueRealizacaoFromSearch(newValue);
    setRealizacao(newValue);
    setActiveBar(DESCRIPTION_BAR);
    setDescriptionData(toSnakeCase(newValue));
    loadData(toSnakeCase(newValue));
    setRota(toSnakeCase(newValue));
    navigate(`/${toSnakeCase(newValue)}`);
    setInputValueBairroSubprefeitura(null);
    setBairro(null);
    setSubprefeitura(null);
    setContent(null);
    setPlacesData(null);
    setShowTemas(true);
    setShowProgramas(false);
    setShowRealizacoes(false);
    setInputValueTema(null);
    setInputValuePrograma(null);
    setInputValueRealizacao(null);
    setTema(null);
    setPrograma(null);
    // setProgramasTema([]); setInputValueTema(null); setTema(null); setPrograma(undefined); setShowProgramas(false); setInputValuePrograma(undefined);
    // setRealizacoesPrograma([]); setShowRealizacoes(false); setInputValueRealizacao(undefined);
    if (!isDesktop()) {
      handleClosePopup();
    }
  };

  const handleEraseMap = () => {
    setInputValueBairroSubprefeitura(null);
    setBairro(null);
    setSubprefeitura(null);
    setContent(null);
    setPlacesData(null);
    setShowTemas(true);
    setShowProgramas(false);
    setShowRealizacoes(false);
    setInputValueTema(null);
    setInputValuePrograma(null);
    setInputValueRealizacao(null);
    setTema(null);
    setPrograma(undefined);
    setRealizacao(null);
    setProgramasTema([]);
    setRealizacoesPrograma([]);
    setInputValueRealizacaoFromSearch(null);
    setRota(null);
    navigate(`/`);
    if (!isDesktop()) {
      handleClosePopup();
    }
    setActiveBar(MAIN_UNDERSEARCH_BAR);
    setZoomDefault((Math.random() * 9999 + 1));
    setCurrentClickedPoint(null)
  }

  const [inputValueRealizacao, setInputValueRealizacao] = useState(undefined);
  const handleRealizacaoChange = (event, newValue) => {
    setInputValueRealizacao(newValue);
    setRealizacao(newValue);
    setActiveBar(DESCRIPTION_BAR);
    setDescriptionData(toSnakeCase(newValue));
    loadData(toSnakeCase(newValue));
    setRota(toSnakeCase(newValue));
    navigate(`/${toSnakeCase(newValue)}`);
  };
  //mock

  const handleSearchPrompt = () => {
    setSearchPrompt();
  };

  const handleClickOutside = () => {
    setShowSearchBar(false);
    setShowMenuBar(false);
    setShowRealizacaoSearchBar(false)
    if (searchPrompt) setSearchPrompt();
  };

  const handleMenuSidebar = () => {
    setMenuSidebar(!menuSidebar);
  };

  const handleCleanBairroInput = () => {
    setShowSearchBar(false);
    setInputValueBairroSubprefeitura(null);
    setBairro(null);
    setBairroName(null);
    setSubprefeituraName(null);
    setSubprefeitura(null);
    setContent(null);
    setPlacesData(null);
    if (tema && !programa && !realizacao) {
      setActiveBar(TEMA_DESCRIPTION_BAR);
    } else if (tema && programa && !realizacao) {
      setActiveBar(PROGRAMA_DESCRIPTION_BAR);
    } else if (!tema && !programa && !realizacao) {
      setActiveBar(MAIN_UNDERSEARCH_BAR);
    }
    setZoomDefault((Math.random() * 9999 + 1));
    setRota(null);
    navigate(`/`);
    if (!isDesktop()) {
      handleClosePopup();
    }
  };

  const handleCleanRealizacaoInput = () => {
    showRealizacaoSearchBar && setShowRealizacaoSearchBar(false);
    setInputValueRealizacaoFromSearch(null);
    setBairro(null);
    setContent(null);
    setPlacesData(null);
    if (underSearchBar) {
      setActiveBar(MAIN_UNDERSEARCH_BAR);
    }
    setRota(null);
    navigate(`/`);
    setRealizacao(null);
  };

  const handleOnfocus = () => {
    // setUnderSearchBar(true);
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
  const [programasOptions, setProgramasOptions] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getListProgramaData();
        setProgramasOptions(data.map(item => item));
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }
    fetchData();
  }, []);

  const CustomPaperSearchBairroSubprefeitura = (props) => {
    return (
      <>
        <Paper elevation={0} {...props} />
      </>
    )
  };



  const CustomPaperSearchMapVersion = (props) => {
    return (
      <div style={{ width: "110%", maxHeight: "80vh", overflowY: 'auto', overflowX: 'hidden' }}>
        <Typography style={{ fontSize: "1.1rem", fontWeight: "bold", paddingBottom: "15px", paddingLeft: "10px", paddingTop: "10px" }}>Realizações</Typography>
        <Paper elevation={0} {...props} />
      </div>
    )
  };

  const CustomPaperSearch = (props) => {
    const filteredOptions = programasOptions.filter(option =>
      option.nome.toLowerCase().includes(currentProgramaInputValue.toLowerCase())
    );
    return (
      <div style={{ width: "110%", maxHeight: "80vh", overflowY: 'auto', overflowX: 'hidden' }}>
        {!noOptions && filteredOptions.length > 0 ? (
          <Box style={{ width: "100%", position: "relative", marginLeft: "10px", color: 'black' }}>
            <Typography style={{ fontSize: "1.1rem", fontWeight: "bold", paddingBottom: "15px", paddingTop: "15px" }}>Programas</Typography>
            <List style={{ padding: 0, marginLeft: "-15px", overflowY: 'auto' }}>
              {filteredOptions.map((option) => (
                <ListItem
                  button
                  key={option.id}
                  onMouseDown={() => handleProgramaChangeFromSearch(null, option)}
                  style={{ paddingTop: '4px', paddingBottom: '4px' }} // Ajuste a altura aqui
                >
                  <ListItemText primary={option.nome} />
                </ListItem>
              ))}
            </List>
          </Box>
        ) : (<><Typography style={{ fontSize: "1.1rem", fontWeight: "bold", paddingBottom: "15px", paddingLeft: "10px", paddingTop: "15px" }}>Programas</Typography> <Typography style={{ paddingBottom: "15px", paddingLeft: "10px", color: "grey" }}>Nenhum programa encontrado.</Typography></>)}
        <hr style={{ margin: '10px 0' }} />
        <Typography style={{ fontSize: "1.1rem", fontWeight: "bold", paddingBottom: "15px", paddingLeft: "10px", paddingTop: "10px" }}>Realizações</Typography>
        <Paper elevation={0} {...props} />
      </div>
    );
  };


  const CustomPaperMenu = (props) => {
    return (
      <>
        <Paper elevation={0} {...props} />
      </>
    )
  };

  const brtLineColors = {
    "BRTs Transbrasil": '#ED3237',
    "BRTs Transcarioca": '#ED7422',
    "BRTs Transoeste": '#208DCD',
    "BRTs Transolímpica": '#1DA64D'
  };


  const [value, setValue] = useState(0);

  const [openPopup, setOpenPopup] = useState(null);

  const handleOpenPopup = (sheet) => {
    setOpenPopup(sheet);
  };

  const handleClosePopup = () => {
    setOpenPopup(null);
    setOpenedPopup(null);
  };
  const [noOptions, setNoOptions] = useState(false);
  const [currentProgramaInputValue, setCurrentProgramaInputValue] = useState('');
  const filterOptions = (options, { inputValue }) => {
    const inputWords = inputValue.toLowerCase().split(' ').filter(Boolean);
    const filteredOptions = options.filter(option => {
      const optionWords = option.toLowerCase().split(' ');

      return inputWords.every(inputWord => {
        // check if the inputWord matches the start of any word in the optionWords
        return optionWords.some(optionWord => optionWord.startsWith(inputWord));
      });
    });

    setNoOptions(filteredOptions.length === 0);
    return filteredOptions;
  };



  function SheetContentTemas() {
    return (
      // <div className={classes.searchbar}>
      <div >
        {/* bigger paper background */}
        <Paper
          component="form"
          variant="elevation"
          className={classes.paperBackground}
          // elevation={searchPrompt ? 1 : 3}
          elevation={0}
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
                ListboxProps={{ style: { maxHeight: "60vh" } }}
                componentsProps={{
                  paper: {
                    sx: {
                      marginTop: "15px",
                      marginLeft: "-7px",
                      width: "100%",
                      height: "60vh",
                      overflowY: "hidden",
                      // borderRadius: '0px',
                      // borderBottomLeftRadius: '5px',
                      // borderBottomRightRadius: '25px',

                    }
                  }
                }}
                open={true}
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
                inputprops={{
                  style: {
                    color: 'black'
                  }
                }}
                ListboxProps={{ style: { maxHeight: "60vh" } }}
                componentsProps={{
                  paper: {
                    sx: {
                      marginTop: "15px",
                      marginLeft: "-7px",
                      width: "100%",
                      height: "60vh",
                      overflowY: "hidden",
                      // borderRadius: '0px',
                      // borderBottomLeftRadius: '5px',
                      // borderBottomRightRadius: '25px',

                    }
                  }
                }}
                open={true}
                renderOption={(props, option, { selected }) => (
                  <Box
                    component="li"
                    style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingRight: tema == "Mobilidade" ? "40px" : 0, paddingTop: tema == "Mobilidade" ? "8px" : "6px", paddingBottom: tema == "Mobilidade" ? "8px" : "6px" }}
                    {...props}
                  >
                    <Typography>{option}</Typography>
                    {(option in brtLineColors) && <Box sx={{ width: 10, height: 10, borderRadius: '50%', bgcolor: brtLineColors[option] }} />}
                  </Box>
                )}
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
                ListboxProps={{ style: { maxHeight: "60vh" } }}
                componentsProps={{
                  paper: {
                    sx: {
                      marginTop: "15px",
                      marginLeft: "-7px",
                      width: "100%",
                      height: "60vh",
                      overflowY: "hidden",
                      // borderRadius: '0px',
                      // borderBottomLeftRadius: '5px',
                      // borderBottomRightRadius: '25px',

                    }
                  }
                }}
                open={true}
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

          </Paper>
        </Paper>
      </div>
    );
  }

  function SheetContentBairrosSubprefeituras() {

    const filterOptions = (options, { inputValue }) => {
      const inputWords = inputValue.toLowerCase().split(' ').filter(Boolean);
      const filteredOptions = options.filter(option => {
        const optionWords = option.toLowerCase().split(' ');

        return inputWords.every(inputWord => {
          // check if the inputWord matches the start of any word in the optionWords
          return optionWords.some(optionWord => optionWord.startsWith(inputWord));
        });
      });
      return filteredOptions;
    };

    return (
      <div>
        <Paper
          component="form"
          variant="elevation"
          className={classes.paperBackground}
          elevation={0}
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
          >
            <Autocomplete
              forcePopupIcon={false}
              noOptionsText={'Nenhum bairro/subprefeitura encontrado.'}
              className={classes.input}
              value={inputValueBairroSubprefeitura}
              onChange={handleBairroSubprefeituraChange}
              disableClearable
              options={bairrosSubSubprefeituras.sort((a, b) => a.localeCompare(b, 'pt-BR'))}
              filterOptions={filterOptions}
              PaperComponent={CustomPaperSearchBairroSubprefeitura}
              ListboxProps={{ style: { maxHeight: "60vh" } }}
              componentsProps={{
                paper: {
                  sx: {
                    marginTop: "15px",
                    marginLeft: "-7px",
                    width: "100%",
                    height: "60vh",
                    overflowY: "hidden",
                  }
                }
              }}
              open={true}
              renderInput={(params) => (
                <TextField
                  {...params}
                  placeholder="Filtre por Bairro ou Subprefeitura"
                  sx={{
                    "& fieldset": { border: 'none' }
                  }}
                />
              )}
            />
          </Paper>
        </Paper>
      </div>
    );
  }

  function SheetContentRealizacoes() {

    const [localRealizacaoMenuMobileOpen, setLocalRealizacaoMenuMobileOpen] = useState(false);

    const CustomPaperSearchMobile = (props) => {
      const filteredOptions = programasOptions.filter(option =>
        option.nome.toLowerCase().includes(currentProgramaInputValue.toLowerCase())
      );
      return (
        <div style={{ width: "100%", maxHeight: "63vh", overflowY: 'auto', overflowX: 'hidden' }}>
          {!noOptions && filteredOptions.length > 0 ? (
            <Box style={{ width: "100%", position: "relative", marginLeft: "10px", color: 'black' }}>
              <Typography style={{ fontSize: "1.1rem", fontWeight: "bold", paddingBottom: "15px", paddingTop: "15px" }}>Programas</Typography>
              <List style={{ padding: 0, marginLeft: "-15px", overflowY: 'hidden' }}>
                {filteredOptions.map((option) => (
                  <ListItem
                    button
                    key={option.id}
                    onMouseDown={() => handleProgramaChangeFromSearch(null, option)}
                    style={{ paddingTop: '4px', paddingBottom: '4px' }} // Ajuste a altura aqui
                  >
                    <ListItemText primary={option.nome} />
                  </ListItem>
                ))}
              </List>
            </Box>
          ) : (<><Typography style={{ fontSize: "1.1rem", fontWeight: "bold", paddingBottom: "15px", paddingLeft: "10px", paddingTop: "15px" }}>Programas</Typography> <Typography style={{ paddingBottom: "15px", paddingLeft: "10px", color: "grey" }}>Nenhum programa encontrado.</Typography></>)}
          <hr style={{ margin: '10px 0' }} />
          <Typography style={{ fontSize: "1.1rem", fontWeight: "bold", paddingBottom: "15px", paddingLeft: "10px", paddingTop: "10px" }}>Realizações</Typography>
          <Paper elevation={0} {...props} />
        </div>
      );
    };
    const CustomPaperSearchMobileMapVersion = (props) => {

      return (
        <div style={{ width: "100%", maxHeight: "63vh", overflowY: 'auto', overflowX: 'hidden' }}>
          <Typography style={{ fontSize: "1.1rem", fontWeight: "bold", paddingBottom: "15px", paddingLeft: "10px", paddingTop: "10px" }}>Realizações</Typography>
          <Paper elevation={0} {...props} />
        </div>
      );
    };

    const [noOptions, setNoOptions] = useState(false);
    const [currentProgramaInputValue, setCurrentProgramaInputValue] = useState('');
    const filterOptions = (options, { inputValue }) => {
      const inputWords = inputValue.toLowerCase().split(' ').filter(Boolean);
      const filteredOptions = options.filter(option => {
        const optionWords = option.toLowerCase().split(' ');

        return inputWords.every(inputWord => {
          // check if the inputWord matches the start of any word in the optionWords
          return optionWords.some(optionWord => optionWord.startsWith(inputWord));
        });
      });

      setNoOptions(filteredOptions.length === 0);
      return filteredOptions;
    };
    return (
      <div >

        <Paper
          component="form"
          variant="elevation"
          className={classes.paperBackground}
          // elevation={searchPrompt ? 1 : 3}
          elevation={0}
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
          // onFocus={handleSearchPrompt}
          >


            <Autocomplete
              noOptionsText={'Nenhuma realização foi encontrada.'}
              className={classes.input}
              value={inputValueRealizacaoFromSearch}
              onChange={handleRealizacaoChangeFromSearch}
              disableClearable
              options={(realizacoes ?? []).filter(realizacao => ((gestao == "3" || gestao == null) ? (realizacao.gestao == "3") : (gestao == "1_2") ? (realizacao.gestao == "1-2") : (realizacao.gestao == "1-2" || realizacao.gestao == "3"))).map(realizacao => realizacao.nome).sort((a, b) => a.localeCompare(b, 'pt-BR'))}
              filterOptions={filterOptions}
              PaperComponent={!mapVersion ? CustomPaperSearchMobile : CustomPaperSearchMobileMapVersion}
              ListboxProps={{ style: { maxHeight: "100vh", overflowY: 'hidden' } }}
              componentsProps={{
                paper: {
                  sx: {
                    marginTop: "-15px",
                    marginLeft: "-7px",
                    width: "100%",
                    height: "100vh",
                    overflowY: "auto",
                  }
                }
              }}
              open={localRealizacaoMenuMobileOpen}
              onInputChange={(_, value) => {
                setCurrentProgramaInputValue(value);
                if (value.length === 0) {
                  if (localRealizacaoMenuMobileOpen) setLocalRealizacaoMenuMobileOpen(false);
                } else {
                  if (!localRealizacaoMenuMobileOpen) setLocalRealizacaoMenuMobileOpen(true);
                }
              }}
              onClose={() => setLocalRealizacaoMenuMobileOpen(false)}
              renderInput={(params) => (
                <TextField
                  {...params}
                  autoFocus={!inputValueRealizacaoFromSearch}
                  // onFocus={activeBar == MAIN_UNDERSEARCH_BAR ? handleOnfocus : () => { }}
                  placeholder={!mapVersion ? "Encontre um programa/realização" : "Encontre uma realização"}
                  sx={{
                    "& fieldset": { border: 'none' }
                  }}
                />
              )}
            />
          </Paper>
        </Paper>
      </div>
    );
  }

  const [localRealizacaoMenuDesktopOpen, setLocalRealizacaoMenuDesktopOpen] = useState(false);

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [oldGestaoIsSelected, setOldGestaoIsSelected] = useState(false);
  const [currentGestaoIsSelected, setCurrentGestaoIsSelected] = useState(true);

  const handleClickGestoesAntigas = (selectedGestao) => {
    let novaGestao;
    let novaMensagem;

    if (selectedGestao === "1_2") {
      setOldGestaoIsSelected((prev) => !prev);
      if (oldGestaoIsSelected) {
        novaGestao = currentGestaoIsSelected ? "3" : null;
        novaMensagem = currentGestaoIsSelected ? "Gestão 2021 - 2024 selecionada" : "Gestão 2021 - 2024 selecionada";
      } else {
        novaGestao = currentGestaoIsSelected ? "1_2_3" : "1_2";
        novaMensagem = currentGestaoIsSelected ? "Todas as gestões foram ativadas" : "Gestão 2009 - 2016 selecionada";
      }
    } else if (selectedGestao === "3") {
      setCurrentGestaoIsSelected((prev) => !prev);
      if (currentGestaoIsSelected) {
        novaGestao = oldGestaoIsSelected ? "1_2" : null;
        novaMensagem = oldGestaoIsSelected ? "Gestão 2009 - 2016 selecionada" : "Gestão 2021 - 2024 selecionada";
      } else {
        novaGestao = oldGestaoIsSelected ? "1_2_3" : "3";
        novaMensagem = oldGestaoIsSelected ? "Todas as gestões foram ativadas" : "Gestão 2021 - 2024 selecionada";
      }
    }

    setGestao(novaGestao);
    setSnackbarMessage(novaMensagem);
    setSnackbarOpen(true);
    setRealizacao(null);
    handleCloseSpeedDial(false);
  };


  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbarOpen(false);
  };

  const action = (
    <IconButton
      size="small"
      aria-label="close"
      color="inherit"
      onClick={handleCloseSnackbar}
    >
      <CloseIcon fontSize="small" />
    </IconButton>
  );

  const [openSpeedDial, setOpenSpeedDial] = useState(false);

  const handleOpenSpeedDial = () => {
    setOpenSpeedDial(true);
  };

  const handleCloseSpeedDial = () => {
    setOpenSpeedDial(false);
  };

  useEffect(() => {
    if (realizacao && !inputValueTema && !inputValuePrograma && activeBar == PROGRAMA_DESCRIPTION_BAR) {

      setInputValueTema(place?.tema);
      setInputValuePrograma(place?.programa);

      setTema(place?.tema);
      setPrograma(place?.programa);

      setRealizacao(null);

      setShowProgramas(true);
      setShowTemas(false);

    }
  }, [inputValueTema, inputValuePrograma, realizacao, place, activeBar]);

  const mapVersion = process.env.REACT_APP_MAPA_VERSION === 'PLANO_VERAO';


  return (

    <>
      {isDesktop() &&
        <ClickAwayListener onClickAway={handleClickOutside}>
          <Stack direction="row" spacing={!showMenuBar && !showSearchBar && !showRealizacaoSearchBar ? 2 : 0}>
            {/* FILTER BY TEMAS AND PROGRAMAS */}
            {!mapVersion && (!showMenuBar ?

              (
                <Paper elevation={4} style={{ borderRadius: "10px", width: "46px", height: "46px", position: "relative", backgroundColor: 'white', display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <Tooltip title={tema && !programa && !realizacao || tema && !programa && currentClickedPoint ? `Tema: ${tema}` : tema && programa && !realizacao ? `Tema: ${tema} | Programa: ${programa}` : tema && programa && realizacao ? `Tema: ${tema} | Programa: ${programa} | Realizacao: ${realizacao}` : ""} placement="right">
                    <Badge badgeContent={tema && !programa && !realizacao || tema && !programa && currentClickedPoint ? 1 : tema && programa && !realizacao ? 2 : tema && programa && realizacao ? 3 : 0} color="primary">
                      <IconButton
                        style={{ backgroundColor: 'transparent' }}
                        color="grey"
                        onClick={() => { setShowRealizacaoSearchBar(showMenuBar); setShowMenuBar(!showMenuBar); setShowSearchBar(showMenuBar) }}
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
                                marginLeft: "-7px",
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
                                marginLeft: "-7px",
                                marginTop: "15px",
                                width: "392px",
                                height: "80vh",
                                overflowY: "hidden",
                                borderRadius: '0px',
                                // borderBottomLeftRadius: '5px',
                                // borderBottomRightRadius: '25px',


                              }
                            }
                          }}
                          open={showMenuBar}
                          renderOption={(props, option, { selected }) => (
                            <Box
                              component="li"
                              style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingRight: tema == "Mobilidade" ? "40px" : 0, paddingTop: tema == "Mobilidade" ? "8px" : "6px", paddingBottom: tema == "Mobilidade" ? "8px" : "6px" }}
                              {...props}
                            >
                              <Typography>{option}</Typography>
                              {(option in brtLineColors) && <Box sx={{ width: 10, height: 10, borderRadius: '50%', bgcolor: brtLineColors[option] }} />}
                            </Box>
                          )}
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
                                marginLeft: "-7px",
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
                          onClick={() => { setCurrentClickedPoint(null); setProgramasTema([]); setInputValueTema(null); setTema(null); setShowProgramas(false); setShowTemas(true); setPrograma(undefined); setInputValuePrograma(undefined); setActiveBar(MAIN_UNDERSEARCH_BAR); if (!bairro) setZoomDefault((Math.random() * 999 + 1)); }}
                        >
                          <ArrowBackIosIcon sx={{ fontSize: "20px", marginRight: "-4px" }} />
                        </IconButton>

                        :

                        (showRealizacoes ? <IconButton
                          style={{ backgroundColor: 'transparent' }}
                          color="grey"
                          onClick={() => { setCurrentClickedPoint(null); setPrograma(null); setInputValuePrograma(null); setRealizacoesPrograma([]); setShowProgramas(true); setShowRealizacoes(false); setRealizacao(undefined); setInputValueRealizacao(undefined); setActiveBar(TEMA_DESCRIPTION_BAR); if (!bairro) setZoomDefault((Math.random() * 999 + 1)) }}
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
              ))}

            {/* SEARCH FOR BAIRROS */}
            {!showSearchBar ?

              (
                <Paper elevation={4} style={{ borderRadius: "10px", width: "46px", height: "46px", position: "relative", backgroundColor: 'white', display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <Tooltip title={inputValueBairroSubprefeitura ? `${inputValueBairroSubprefeitura} está atuando como filtro.` : ""} placement="right">
                    <Badge badgeContent={inputValueBairroSubprefeitura ? 1 : 0} color="primary">

                      <IconButton
                        style={{ backgroundColor: 'transparent', padding: 7 }}
                        color="grey"
                        onClick={() => { setShowSearchBar(!showSearchBar); setShowMenuBar(showSearchBar); setShowRealizacaoSearchBar(showSearchBar) }}
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
                        // freeSolo
                        forcePopupIcon={false}
                        noOptionsText={'Nenhum bairro/subprefeitura encontrado.'}
                        className={classes.input}
                        value={inputValueBairroSubprefeitura}
                        onChange={handleBairroSubprefeituraChange}
                        disableClearable
                        options={bairrosSubSubprefeituras.sort((a, b) => a.localeCompare(b, 'pt-BR'))}
                        filterOptions={filterOptions}
                        PaperComponent={CustomPaperSearchBairroSubprefeitura}
                        ListboxProps={{ style: { maxHeight: "80vh" } }}
                        componentsProps={{
                          paper: {
                            sx: {
                              marginTop: "15px",
                              marginLeft: "-7px",
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
                            placeholder="Filtre por Bairro ou Subprefeitura"
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

            {/* SEARCH FOR REALIZACÕES */}
            {!showRealizacaoSearchBar ?

              (
                <Paper elevation={4} style={{ borderRadius: "10px", width: "46px", height: "46px", position: "relative", backgroundColor: 'white', display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <Tooltip title={inputValueRealizacaoFromSearch ? `Descrição da realização: ${inputValueRealizacaoFromSearch}` : ""} placement="right">
                    <Badge badgeContent={inputValueRealizacaoFromSearch ? 1 : 0} color="primary">

                      <IconButton
                        style={{ backgroundColor: 'transparent', padding: 7 }}
                        color="grey"
                        onClick={() => { setShowRealizacaoSearchBar(!showRealizacaoSearchBar); setShowMenuBar(showRealizacaoSearchBar); setShowSearchBar(showRealizacaoSearchBar) }}
                      >
                        <SearchIcon />
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
                    className={!localRealizacaoMenuDesktopOpen ? classes.shortPaperBackground : classes.paperBackground}
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
                        // freeSolo
                        // disablePortal
                        forcePopupIcon={false}
                        noOptionsText={'Nenhuma realização foi encontrada.'}
                        className={classes.input}
                        value={inputValueRealizacaoFromSearch}
                        onChange={handleRealizacaoChangeFromSearch}
                        disableClearable
                        options={(realizacoes ?? []).filter(realizacao => ((gestao == "3" || gestao == null) ? (realizacao.gestao == "3") : (gestao == "1_2") ? (realizacao.gestao == "1-2") : (realizacao.gestao == "1-2" || realizacao.gestao == "3"))).map(realizacao => realizacao.nome).sort((a, b) => a.localeCompare(b, 'pt-BR'))}
                        filterOptions={filterOptions}
                        PaperComponent={!mapVersion ? CustomPaperSearch : CustomPaperSearchMapVersion}
                        ListboxProps={{ style: { maxHeight: "100vh", overflowY: 'auto' } }}
                        componentsProps={{
                          paper: {
                            sx: {
                              // marginTop: "15px",
                              marginLeft: "-7px",
                              width: "392px",
                              height: "100vh",
                              overflowY: "auto",
                              borderRadius: '0px',
                              borderBottomLeftRadius: '5px',
                              borderBottomRightRadius: '25px',

                            }
                          }
                        }}
                        open={localRealizacaoMenuDesktopOpen}
                        onInputChange={(_, value) => {
                          setCurrentProgramaInputValue(value);
                          if (value.length === 0) {
                            if (localRealizacaoMenuDesktopOpen) setLocalRealizacaoMenuDesktopOpen(false);
                          } else {
                            if (!localRealizacaoMenuDesktopOpen) setLocalRealizacaoMenuDesktopOpen(true);
                          }
                        }}
                        onClose={() => setLocalRealizacaoMenuDesktopOpen(false)}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            autoFocus={true}
                            // onFocus={activeBar == MAIN_UNDERSEARCH_BAR ? handleOnfocus : () => { }}
                            placeholder={!mapVersion ? "Encontre um programa/realização" : "Encontre uma realização"}
                            sx={{
                              "& fieldset": { border: 'none' }
                            }}
                          />
                        )}
                      />
                      {inputValueRealizacaoFromSearch ?
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

                          <BackspaceIcon sx={{ marginRight: "5px", fontSize: "20px" }} onClick={handleCleanRealizacaoInput} />


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
                        ) : activeBar == MAIN_UNDERSEARCH_BAR ? <SearchIcon /> : <CloseIcon onClick={() => setShowRealizacaoSearchBar(false)} />

                        }

                      </IconButton>
                    </Paper>

                  </Paper>
                </div>



              )}



            {!mapVersion && <Paper elevation={4}
              style={{ borderRadius: "10px", position: "relative", display: "flex", alignItems: "center", justifyContent: "center" }}
              className={`${classes.fixedButtonClock} ${gestao === "1_2" || gestao === "1_2_3" ? classes.selectedPaperOldPoints : ''}`}
            >
              <IconButton
                style={{ backgroundColor: 'transparent' }}
                onClick={() => handleClickGestoesAntigas("1_2")}
              >
                <Typography
                  style={{ color: "black", fontSize: "13px", fontWeight: "bold" }}
                >
                  2009 - 2016
                </Typography>
              </IconButton>
            </Paper>}

            {!mapVersion && <Paper elevation={4}
              style={{ borderRadius: "10px", position: "relative", display: "flex", alignItems: "center", justifyContent: "center" }}
              className={`${classes.fixedButtonClock} ${gestao === "3" || gestao === "1_2_3" || gestao == null ? classes.selectedPaperG3 : ''}`}
            >
              <IconButton
                disabled={gestao !== "1_2" && gestao !== "1_2_3" || gestao == null}
                style={{ backgroundColor: 'transparent' }}
                onClick={() => handleClickGestoesAntigas("3")}
              >
                <Typography
                  fontSize="small"
                  style={{ color: "black", fontSize: "13px", fontWeight: "bold" }}
                >
                  2021 - 2024
                </Typography>
              </IconButton>
            </Paper>}



            {/* <Paper elevation={4}
              style={{ borderRadius: "10px", width: "46px", height: "46px", position: "relative", display: "flex", alignItems: "center", justifyContent: "center" }}
              className={`${classes.fixedButtonClock} ${gestao == "1_2_3" ? classes.selectedPaper : ''}`}
            >


              <IconButton
                style={{ backgroundColor: 'transparent' }}
                onClick={() => handleClickGestoesAntigas("1_2_3")}
              >
                <Typography
                  style={{ fontSize: "13px", color: gestao == "1_2_3" ? 'white' : 'black' }}
                >
                  GERAL
                </Typography>
              </IconButton>
            </Paper> */}

            <Snackbar
              open={snackbarOpen}
              autoHideDuration={6000}
              onClose={handleCloseSnackbar}
              message={snackbarMessage}
              action={action}
              anchorOrigin={{
                vertical: !isDesktop() ? 'top' : 'bottom',
                horizontal: isDesktop() ? 'center' : 'left',
              }}
              className={classes.snackbar}
              style={{ zIndex: "9999 !important" }}
            />
          </Stack>
        </ClickAwayListener>


      }

      {!isDesktop() && (
        <>
          <Snackbar
            open={snackbarOpen}
            autoHideDuration={6000}
            onClose={handleCloseSnackbar}
            message={snackbarMessage}
            action={action}
            anchorOrigin={{
              vertical: !isDesktop() ? 'top' : 'bottom',
              horizontal: isDesktop() ? 'center' : 'left',
            }}
            className={classes.snackbar}
            style={{ zIndex: "9999 !important" }}
          />
          <BottomNavigation
            className={classes.root}
            style={{ zIndex: 501, position: 'fixed' }}
            value={value}
            onChange={(event, newValue) => {
              setValue(newValue);
              handleOpenPopup(newValue);
              setOpenedPopup(newValue);
            }}
            showLabels
          >
            {!mapVersion &&
              <BottomNavigationAction
                label={"Menu"}
                icon={
                  <Tooltip title={tema && !programa && !realizacao || tema && !programa && currentClickedPoint ? `Tema: ${tema}` : tema && programa && !realizacao ? `Tema: ${tema} | Programa: ${programa}` : tema && programa && realizacao ? `Tema: ${tema} | Programa: ${programa} | Realizacao: ${realizacao}` : ""} placement="right">
                    <Badge badgeContent={tema && !programa && !realizacao || tema && !programa && currentClickedPoint ? 1 : tema && programa && !realizacao ? 2 : tema && programa && realizacao ? 3 : 0} color="primary">
                      <MenuIcon />
                    </Badge>
                  </Tooltip>

                } />}
            <BottomNavigationAction
              label={"Busca"}
              icon={
                <Tooltip title={inputValueBairroSubprefeitura ? `${inputValueBairroSubprefeitura} está atuando como filtro.` : ""} placement="right">
                  <Badge badgeContent={inputValueBairroSubprefeitura ? 1 : 0} color="primary">
                    <img width={27} src={lupa_mapa} />
                  </Badge>
                </Tooltip>
              } />
            <BottomNavigationAction
              label={"Realizações"}
              icon={
                <Tooltip title={inputValueRealizacaoFromSearch ? `Descrição da realização: ${inputValueRealizacaoFromSearch}` : ""} placement="right">
                  <Badge badgeContent={inputValueRealizacaoFromSearch ? 1 : 0} color="primary">
                    <SearchIcon />
                  </Badge>
                </Tooltip>
              } />
            {!mapVersion &&
              <BottomNavigationAction
                // add bottom navigation action label
                label={"Gestões"}
                icon={
                  <RestoreIcon
                    // fontSize="small"
                    // sx={{ color: gestao ? 'white' : 'grey' }}
                    onClick={handleOpenSpeedDial}
                  />
                }
              />
            }
          </BottomNavigation>

          <Backdrop open={openSpeedDial} sx={{ zIndex: (theme) => theme.zIndex.speedDial - 1, bgcolor: 'rgba(0, 0, 0, 0.5)' }} />
          <SpeedDial
            ariaLabel="SpeedDial for desktop and mobile"
            sx={{ position: 'fixed', bottom: 9, right: 16 }}
            FabProps={{
              sx: {
                bgcolor: 'transparent',
                boxShadow: 'none',
                '&:hover': {
                  bgcolor: 'transparent',
                  boxShadow: 'none',
                },
                '&.Mui-focused': {
                  bgcolor: 'transparent',
                  boxShadow: 'none',
                },
                '&.Mui-active': {
                  bgcolor: 'transparent',
                  boxShadow: 'none',
                },
                '&:active': {
                  bgcolor: 'transparent',
                  boxShadow: 'none',
                },
              },
            }}
            onClose={handleCloseSpeedDial}
            onOpen={handleOpenSpeedDial}
            open={openSpeedDial}
          >
            <SpeedDialAction
              icon={<RestoreIcon />}
              tooltipTitle={
                <Paper elevation={4}
                  style={{ borderRadius: "10px", padding: "10px", display: "flex", alignItems: "center", justifyContent: "center", width: '92px' }}
                  className={`${classes.fixedButtonClock} ${gestao === "1_2" || gestao === "1_2_3" ? classes.selectedPaperOldPoints : ''}`}                >
                  <Typography
                    style={{ color: "black", fontSize: "13px", fontWeight: "bold" }}
                  >
                    2009 - 2016
                  </Typography>
                </Paper>
              }
              tooltipOpen
              onClick={() => handleClickGestoesAntigas("1_2")}
            />
            <SpeedDialAction
              icon={<RestoreIcon />}
              tooltipTitle={
                <Paper elevation={4}
                  style={{ maxWidth: "none", width: "10px", borderRadius: "10px", padding: "10px", display: "flex", alignItems: "center", justifyContent: "center", width: '92px' }}
                  className={`${classes.fixedButtonClock} ${gestao === "3" || gestao === "1_2_3" || gestao == null ? classes.selectedPaperG3 : ''}`}
                >
                  <Typography
                    style={{ color: "black", fontSize: "13px", fontWeight: "bold" }}
                  >
                    2021 - 2024
                  </Typography>
                </Paper>
              }
              tooltipOpen
              onClick={() => !(gestao !== "1_2" && gestao !== "1_2_3" || gestao == null) && handleClickGestoesAntigas("3")}

            />
          </SpeedDial>

        </>
      )}

      {openPopup !== null && (
        <Dialog
          open={openPopup !== null && openPopup !== 3}
          onClose={handleClosePopup}
          aria-labelledby="popup-dialog-title"
          aria-describedby="popup-dialog-description"
          maxWidth="sm"
          fullWidth={true}
          PaperProps={{
            style: {
              zIndex: 508,
              minHeight: '80vh',
              maxHeight: '90vh',
            },
          }}
        >
          <DialogContent className={classes.dialogContent}>
            {openPopup === 0 && <SheetContentTemas classes={classes} />}
            {openPopup === 1 && <SheetContentBairrosSubprefeituras classes={classes} />}
            {openPopup === 2 && <SheetContentRealizacoes classes={classes} />}
          </DialogContent>
          <DialogActions>
            {openPopup == 0 && showProgramas ?

              <IconButton
                style={{ backgroundColor: 'transparent' }}
                color="grey"
                onClick={() => { setCurrentClickedPoint(null); setProgramasTema([]); setInputValueTema(null); setTema(null); setShowProgramas(false); setShowTemas(true); setPrograma(undefined); setInputValuePrograma(undefined); if (!bairro) setZoomDefault((Math.random() * 999 + 1)); }}
              >
                <ArrowBackIosIcon sx={{ fontSize: "20px", marginRight: "-4px" }} />
              </IconButton>

              :

              (showRealizacoes && openPopup != 1 && openPopup != 2 ? <IconButton
                style={{ backgroundColor: 'transparent' }}
                color="grey"
                onClick={() => { setCurrentClickedPoint(null); setPrograma(null); setInputValuePrograma(null); setRealizacoesPrograma([]); setShowProgramas(true); setShowRealizacoes(false); setRealizacao(undefined); setInputValueRealizacao(undefined); setActiveBar(TEMA_DESCRIPTION_BAR); if (!bairro) setZoomDefault((Math.random() * 999 + 1)) }}
              >
                <ArrowBackIosIcon sx={{ fontSize: "20px", marginRight: "-4px" }} />
              </IconButton> : "")

            }
            {openPopup == 0 && inputValueTema &&
              <Divider className={classes.divider} style={{ marginRight: "20px" }} orientation="vertical" />
            }
            {openPopup == 0 &&
              <Button onClick={handleClosePopup} color="primary" variant="contained">
                {!tema && !programa && !realizacao && "Fechar"}
                {!tema && !programa && realizacao && "Fechar"}
                {tema && !programa && !realizacao && "Ver o tema no mapa"}
                {tema && programa && !realizacao && "Ver o programa no mapa"}
                {tema && programa && realizacao && "Ver a realização mapa"}
              </Button>
            }
            {openPopup == 1 &&
              <Button onClick={() => { handleCleanBairroInput(); setZoomDefault((Math.random() * 999 + 1)) }} color="primary">
                {bairroName && "Remover filtro de bairro"}
                {subprefeituraName && "Remover filtro de subprefeitura"}
              </Button>
            }
            {openPopup == 1 &&
              <Button onClick={handleClosePopup} variant="contained" color="primary">
                {(!bairroName && !subprefeituraName && !tema && !programa || !bairroName && !subprefeituraName && tema && !programa || !bairroName && !subprefeituraName && tema && programa) && "Fechar"}
                {bairroName && !subprefeituraName && !tema && !programa && "Ver bairro"}
                {!bairroName && subprefeituraName && !tema && !programa && "Ver subprefeitura"}
                {bairroName && !subprefeituraName && tema && !programa && "Ver tema aplicado ao bairro"}
                {!bairroName && subprefeituraName && tema && !programa && "Ver tema aplicado a subprefeitura"}
                {bairroName && !subprefeituraName && tema && programa && "Ver programa aplicado ao bairro"}
                {!bairroName && subprefeituraName && tema && programa && "Ver programa aplicado a subprefeitura"}
              </Button>
            }
            {openPopup == 2 && realizacao &&
              <Button onClick={() => { handleCleanRealizacaoInput(); setZoomDefault((Math.random() * 999 + 1)) }} color="primary">
                Limpar
              </Button>
            }
            {openPopup == 2 &&
              <Button onClick={handleClosePopup} variant="contained" color="primary">
                {realizacao ? "Ver a realização mapa" : "Fechar"}
              </Button>
            }

          </DialogActions>
        </Dialog>
      )}
      <Button
        className={classes.fixedButton}
        onClick={handleEraseMap}
      >
        <img src={logo_prefeitura} alt="Fixed Button" className={classes.fixedButtonImage} style={{ filter: "brightness(0) contrast(100%)" }} />
      </Button>

    </>

  );
};

export default SearchBar;
