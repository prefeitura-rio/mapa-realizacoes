import { BottomNavigation, BottomNavigationAction, ButtonBase, makeStyles } from "@material-ui/core";
import UnderSearchContainer from "../sidebars/wrapper/UnderSearchContainer";
import HorizontalContainer from "./horizontalWidget/HorizontalContainer";
// import MinimapWidget from "./minimapWidget/MinimapWidget";
import SearchbarContainer from "./searchBar/SearchbarContainer";
import UserWidget from "./userWidget/UserWidget";
import VerticalContainer from "./verticalWidget/VerticalContainer";
import BottomGalleryContainer from "./bottomGallery/BottomGalleryContainer";
import InfoWidget from "./infoWidget/InfoWidget";
import FiltrosBotoes from "./filtrosBotoes/FiltrosBotoes";
import { getListBairroName, getListOrgaoName, getListTemasNameByGestao, getListProgramaName, getListRealizacaoOrgaoIds, getListRealizacaoProgramaIds, getListRealizacaoTemaIds, getListTemaName, getRealizacaoOrgaoIds, getRealizacaoProgramaIds, getRealizacaoTemaIds, getListTemasNameByGestaoBairro } from "../../firebase";
import { useMemo, useRef, useState } from "react";
import { useEffect } from "react";
import { isDesktop } from "../../redux/active/reducers";
import SearchIcon from "@material-ui/icons/Search";
import MenuIcon from "@material-ui/icons/Menu";
import lupa_mapa from '../../icons/lupa_mapa.png';
import { BottomSheet } from 'react-spring-bottom-sheet';
import 'react-spring-bottom-sheet/dist/style.css';
import { toSnakeCase } from "../../utils/formatFile";

const useStyles = makeStyles({
  bottomRightWidgets: {
    position: "absolute",
    bottom: 0,
    right: 0,
    display: "flex",
    flexDirection: "column",
    zIndex: 501,
    width: "100%",
    pointerEvents: "none",
  },

  bottomLeftWidgets: {
    bottom: 0,
    position: "absolute",
    zIndex: 501,
    transition: "left 200ms cubic-bezier(0, 0, 0.2, 1)",
    left: "20px",
  },

  topLeftWidgets: {
    top: "3vh",
    left: "3vh ",
    position: "absolute",
    zIndex: 502,
    maxWidth: "425px",
  },

  topRightWidgets: {
    top: "15px",
    right: "30px",
    position: "absolute",
    display: "flex",
    zIndex: 500,
  },

  tools: {
    position: "absolute",
    left: "3vh ",
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-end",
    bottom: (props) => (props.bottomGallery ? "143px" : "115px"),
    transition: "bottom 200ms cubic-bezier(0, 0, 0.2, 1)",
  },

  root: {
    width: '100%',
    overflow: 'hidden',
    position: 'fixed',
    left: 0,
    bottom: 0
  },

  "@media screen and (max-width: 540px)": {
    topRightWidgets: {
      top: "115px",
    },
    bottomLeftWidgets: {
      display: (props) => (props.underSearchBar ? "none" : "block"),
    },
    tools: {
      position: "absolute",
      right: "3vh ",
      display: "flex",
      flexDirection: "column",
      alignItems: "flex-end",
      bottom: (props) => (props.bottomGallery ? "143px" : "95px"),
      transition: "bottom 200ms cubic-bezier(0, 0, 0.2, 1)",
    },
  },
  "@media screen and (min-width: 1279px)": {
    filters: {
      top: "50px",
      left: "500px",
      position: "absolute",
      display: "flex",
      zIndex: 503,
    },
  }
});

const Widgets = ({ underSearchBar, bottomGallery, profile, setFiltros, gestao, bairro }) => {
  const classes = useStyles({ underSearchBar, bottomGallery });

  const [orgaosNameFilter, setOrgaosNameFilter] = useState([]);
  const [temasNameFilter, setTemasNameFilter] = useState([]);
  const temaCache = useMemo(() => ({}), []);

  useEffect(() => {
    const loadFiltrosInfo = async () => {
      try {
        const cacheKey = `${gestao}-${bairro || 'all'}`; // Chave única para cache
        if (temaCache[cacheKey]) {
          // Se o resultado já está no cache, usa ele
          setTemasNameFilter(temaCache[cacheKey]);
        } else {
          // Se não está no cache, faz a chamada API e armazena o resultado no cache
          const temaRef = await getListTemasNameByGestaoBairro(gestao, bairro && toSnakeCase(bairro));
          if (temaRef.length > 0) {
            temaCache[cacheKey] = temaRef;
            setTemasNameFilter(temaRef);
          } else {
            console.error("Erro aqui <<== ");
          }
        }
      } catch (error) {
        console.error("Erro ao buscar nomes dos filtros", error);
      }
    };

    loadFiltrosInfo();
  }, [gestao, bairro, temaCache]);


  const [value, setValue] = useState(0);
  const [openSheet, setOpenSheet] = useState(null);
  const sheetRef = useRef();

  const handleOpenSheet = (sheet) => {
    setOpenSheet(sheet);
  };

  const handleCloseSheet = () => {
    setOpenSheet(null);
  };

  function SheetContentTemas() {
    return (
      <div>
        <h2>Temas</h2>
        <p>Content for Temas</p>
      </div>
    );
  }

  function SheetContentBairros() {
    return (
      <div>
        <h2>Bairros</h2>
        <p>Content for Bairros</p>
      </div>
    );
  }

  function SheetContentRealizacoes() {
    return (
      <div>
        <h2>Realizações</h2>
        <p>Content for Realizações</p>
      </div>
    );
  }


  return (
    <div>
      <div className={classes.bottomWidgets}>
        <div className={classes.bottomRightWidgets}>
          <div className={classes.tools}>
            <VerticalContainer />
            {/* <HorizontalContainer /> */}
          </div>
          <BottomGalleryContainer />
        </div>
        <div className={classes.bottomLeftWidgets}>
          {/* <MinimapWidget bottomGallery={bottomGallery} /> */}
        </div>
      </div>

      <div className={classes.topLeftWidgets}>
        <SearchbarContainer temasNameFilter={temasNameFilter} />
        <UnderSearchContainer />
      </div>
      {/* {!isDesktop() && (
        <BottomNavigation
        className={classes.root}
          style={{ zIndex: 501, position: 'fixed' }}
          value={value}
          onChange={(event, newValue) => {
            setValue(newValue);
            handleOpenSheet(newValue);
          }}
          showLabels
        >
          <BottomNavigationAction label="Temas" icon={<MenuIcon />} />
          <BottomNavigationAction label="Bairros" icon={<img width={33} src={lupa_mapa} />} />
          <BottomNavigationAction label="Realizações" icon={<SearchIcon />} />
        </BottomNavigation>
      )}

      {openSheet !== null && (
        <BottomSheet
        style={{zIndex: 507, position: "absolute"}}
          open={openSheet !== null}
          onDismiss={handleCloseSheet}
          ref={sheetRef}
          defaultSnap={({ maxHeight }) => maxHeight / 2}
          snapPoints={({ maxHeight }) => [
            maxHeight - maxHeight / 10,
            maxHeight / 4,
            maxHeight * 0.6,
          ]}
        >
          {openSheet === 0 && <SheetContentTemas />}
          {openSheet === 1 && <SheetContentBairros />}
          {openSheet === 2 && <SheetContentRealizacoes  style={{zIndex: 507, position: "absolute"}}/>}
        </BottomSheet>
      )} */}
    </div>
  );
};

export default Widgets;
