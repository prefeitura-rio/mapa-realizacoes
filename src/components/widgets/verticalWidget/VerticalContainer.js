import { connect } from "react-redux";
import VerticalWidget from "./VerticalWidget";
import { setZoomDefault, setZoomDelta } from "../../../redux/actions";
import { setGestao, setMenuSidebar, setUserLocation } from "./../../../redux/active/actions";
import { setRealizacao } from "../../../redux/filtros/actions";

const VerticalContainer = (props) => {
  return <VerticalWidget 
  setZoomDelta={props.setZoomDelta}
   menuSidebar={props.menuSidebar}
  setZoomDefault={props.setZoomDefault}
  setGestao={props.setGestao}
  setUserLocation={props.setUserLocation}
  userLocation={props.userLocation}
  setRealizacao={props.setRealizacao}
  />;
};

const mapStateToProps = (state) => {
  return { 
    menuSidebar: state.app.menuSidebar,
    userLocation: state.active.userLocation
  };
};

const mapDispatchToProps = {
  setZoomDelta,
  setZoomDefault,
  setMenuSidebar,
  setGestao,
  setUserLocation,
  setRealizacao
};

export default connect(mapStateToProps, mapDispatchToProps)(VerticalContainer);
