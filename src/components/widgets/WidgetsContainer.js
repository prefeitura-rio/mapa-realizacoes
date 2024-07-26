import Widgets from "./Widgets";
import { setZoomDelta } from "../../redux/actions";
import { setFiltros } from "../../redux/filtros/actions";
import { connect } from "react-redux";

const WidgetsContainer = (props) => {
  return (
    <Widgets
      setZoomDelta={props.setZoomDelta}
      underSearchBar={props.underSearchBar}
      bottomGallery={props.bottomGallery}
      profile={props.profile}
      setFiltros={props.setFiltros}
      gestao={props.gestao}
      bairro={props.bairro}
      subprefeitura={props.subprefeitura}
    />
  );
};

const mapStateToProps = (state) => {
  return {
    underSearchBar: state.active.underSearchBar,
    bottomGallery: state.active.bottomGallery,
    profile: state.auth.profile,
    gestao: state.active.gestao,
    bairro: state.filtros.bairro,
    subprefeitura: state.filtros.subprefeitura,
  };
};

const mapDispatchToProps = {
  setZoomDelta,
  setFiltros

};

export default connect(mapStateToProps, mapDispatchToProps)(WidgetsContainer);
