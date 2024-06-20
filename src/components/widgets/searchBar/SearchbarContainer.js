import SearchBar from "./SearchBar";
import { setSearchPrompt } from "./../../../redux/active/actions";
import { setMenuSidebar } from "./../../../redux/active/actions";
import { setUnderSearchBar } from "./../../../redux/active/actions";
import { setActiveBar } from "./../../../redux/active/actions";
import { setEhBairro } from "./../../../redux/active/actions";
import { loadData, setContent, setDescriptionData } from "../../../redux/place/actions";
import { connect } from "react-redux";
import { loadAllPlaces } from "./../../../redux/places/actions";
import { setHistoryItems } from "../../../redux/search/actions";
import { setPlacesData } from "./../../../redux/places/actions";
import { setBairroData } from "./../../../redux/bairros/actions";
import { setSubprefeituraData } from "./../../../redux/subprefeituras/actions";
import { useEffect } from "react";
import { setRota } from "../../../redux/rota/actions";
import { setBairro, setPrograma,setProgramaData, setRealizacao, setSubprefeitura, setTema, setTemaData } from "../../../redux/filtros/actions";
import { setZoomDefault } from "../../../redux/actions";
import { useParams } from "react-router-dom"

const SearchbarContainer = (props) => {
  // useEffect(() => {
  //   props.tema&&props.loadAllPlaces();
  // }, [props.tema]);

  const { id } = useParams();

  return (
    <SearchBar
      activeBar={props.activeBar}
      setActiveBar={props.setActiveBar}
      underSearchBar={props.underSearchBar}
      setUnderSearchBar={props.setUnderSearchBar}
      menuSidebar={props.menuSidebar}
      setMenuSidebar={props.setMenuSidebar}
      searchPrompt={props.searchPrompt}
      setSearchPrompt={props.setSearchPrompt}
      setContent={props.setContent}
      anyLoading={props.anyLoading}
      setBairroData={props.setBairroData}
      setSubprefeituraData={props.setSubprefeituraData}
      setEhBairro={props.setEhBairro}
      setHistoryItems={props.setHistoryItems}
      setPlacesData={props.setPlacesData}
      historyItems={props.historyItems}
      rota = {props.rota}
      realizacaoId = {id}
      setRota = {props.setRota}
      temasNameFilter = {props.temasNameFilter}
      programasNameFilter = {props.programasNameFilter}
      setTema = {props.setTema}
      setTemaData = {props.setTemaData}
      setPrograma= {props.setPrograma}
      setProgramaData= {props.setProgramaData}
      setRealizacao={props.setRealizacao}
      setBairro= {props.setBairro}
      setSubprefeitura={props.setSubprefeitura}
      tema={props.tema}
      programa={props.programa}
      realizacao={props.realizacao}
      setDescriptionData={props.setDescriptionData}
      loadData={props.loadData}
      setZoomDefault={props.setZoomDefault}
      bairro={props.bairro}
      subprefeitura={props.subprefeitura}
    />
  );
};

const mapStateToProps = (state) => {
  return {
    activeBar: state.active.activeBar,
    underSearchBar: state.active.underSearchBar,
    searchPrompt: state.active.searchPrompt,
    menuSidebar: state.app.menuSidebar,
    anyLoading: state.places.loading || state.place.loading,
    // anyPlaces: state.places.anyPlaces,
    historyItems: state.search.historyItems,
    rota: state.rota,
    tema:state.filtros.tema,
    programa:state.filtros.programa,
    realizacao:state.filtros.realizacao,
    bairro: state.bairros.descriptionData,
    subprefeitura: state.subprefeituras.descriptionData,
  };
};

const mapDispatchToProps = {
  setUnderSearchBar,
  setMenuSidebar,
  setSearchPrompt,
  setActiveBar,
  setContent,
  loadAllPlaces,
  setHistoryItems,
  setPlacesData,
  setBairroData ,
  setEhBairro ,
  setSubprefeituraData,
  setRota,
  setTema,
  setTemaData,
  setPrograma,
  setProgramaData,
  setRealizacao,
  setBairro,
  setSubprefeitura,
  setDescriptionData,
  loadData,
  setZoomDefault
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchbarContainer);
