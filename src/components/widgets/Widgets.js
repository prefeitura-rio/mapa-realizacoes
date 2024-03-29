import { ButtonBase, makeStyles } from "@material-ui/core";
import UnderSearchContainer from "../sidebars/wrapper/UnderSearchContainer";
import HorizontalContainer from "./horizontalWidget/HorizontalContainer";
// import MinimapWidget from "./minimapWidget/MinimapWidget";
import SearchbarContainer from "./searchBar/SearchbarContainer";
import UserWidget from "./userWidget/UserWidget";
import VerticalContainer from "./verticalWidget/VerticalContainer";
import BottomGalleryContainer from "./bottomGallery/BottomGalleryContainer";
import InfoWidget from "./infoWidget/InfoWidget";
import FiltrosBotoes from "./filtrosBotoes/FiltrosBotoes";
import { getListBairroName, getListOrgaoName, getListProgramaName, getListRealizacaoOrgaoIds, getListRealizacaoProgramaIds, getListRealizacaoTemaIds, getListTemaName, getRealizacaoOrgaoIds, getRealizacaoProgramaIds, getRealizacaoTemaIds } from "../../firebase";
import { useState } from "react";
import { useEffect } from "react";

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
    top: "0px",
    left: "0px",
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
    right: "20px",
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-end",
    bottom: (props) => (props.bottomGallery ? "143px" : "25px"),
    transition: "bottom 200ms cubic-bezier(0, 0, 0.2, 1)",
  },

  bottomWidgets: {
    bottom: 0,
    width: (props) => (props.underSearchBar ? "calc(100vw - 423px)" : "100vw"),
    right: 0,
    position: "absolute",
    transition: "width 200ms cubic-bezier(0, 0, 0.2, 1)",
  },
  widgets: {},

  "@media screen and (max-width: 540px)": {
    topRightWidgets: {
      top: "115px",
    },
    bottomLeftWidgets: {
      display: (props) => (props.underSearchBar ? "none" : "block"),
    },
  },
  "@media screen and (min-width: 1279px)":{
    filters: {
      top: "50px",
      left: "500px",
      position: "absolute",
      display: "flex",
      zIndex: 503,
    },
  }
});

const Widgets = ({ underSearchBar, bottomGallery, profile, setFiltros }) => {
  const classes = useStyles({ underSearchBar, bottomGallery });

  const [orgaosNameFilter, setOrgaosNameFilter] = useState([]);
  const [temasNameFilter, setTemasNameFilter] = useState([]);
  const [programasNameFilter, setProgramasNameFilter] = useState([]);
  const [orgaosNameFilterIds, setOrgaosNameFilterIds] = useState([]);
  const [temasNameFilterIds, setTemasNameFilterIds] = useState([]);
  const [programasNameFilterIds, setProgramasNameFilterIds] = useState([]);

  useEffect(() => {

    const loadFiltrosInfo = async () => {
      try {
        const orgaoRef = await getListOrgaoName();
        const temaRef = await getListTemaName();
        const programaRef = await getListProgramaName();

        if (!orgaoRef.empty && !temaRef.empty && !programaRef.empty) {
          setOrgaosNameFilter(orgaoRef);
          setTemasNameFilter(temaRef);
          setProgramasNameFilter(programaRef);
        } else {
          console.error("Erro aqui <<== ");
        }
      } catch (error) {
        console.error("Erro ao buscar nomes dos filtros", error);
      }
    };

    const loadFiltrosInfoIds = async () => {
      try {
        const realizacaoOrgaoRef = await getListRealizacaoOrgaoIds();
        const realizacaoTemaRef = await getListRealizacaoTemaIds();
        const realizacaoProgramaRef = await getListRealizacaoProgramaIds();

        if (!realizacaoOrgaoRef.empty && !realizacaoTemaRef.empty && !realizacaoProgramaRef.empty) {
          setOrgaosNameFilterIds(realizacaoOrgaoRef);
          setTemasNameFilterIds(realizacaoTemaRef);
          setProgramasNameFilterIds(realizacaoProgramaRef);
        } else {
          console.error("Erro aqui <<== ");
        }
      } catch (error) {
        console.error("Erro ao buscar nomes dos filtros", error);
      }
    };

    loadFiltrosInfo();
    loadFiltrosInfoIds();
  }, []);
  return (
    <div className={classes.widgets}>
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
        <SearchbarContainer />
        <UnderSearchContainer />
      </div>
      <div className={classes.topRightWidgets}>
        {/* <InfoWidget/> */}
        <UserWidget profile={profile} />
      </div>
      <div className={classes.filters}>

        <FiltrosBotoes orgaosNameFilter={orgaosNameFilter}
          temasNameFilter={temasNameFilter}
          programasNameFilter={programasNameFilter}
          orgaosNameFilterIds={orgaosNameFilterIds}
          temasNameFilterIds={temasNameFilterIds} 
          programasNameFilterIds={programasNameFilterIds}
          setFiltros={setFiltros}></FiltrosBotoes>
      </div>
    </div>
  );
};

export default Widgets;
