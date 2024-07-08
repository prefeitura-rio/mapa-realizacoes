import { connect } from "react-redux";
import VerticalWidget from "./VerticalWidget";
import { setZoomDefault, setZoomDelta } from "../../../redux/actions";
import { setGestao, setMenuSidebar, setUserLocation } from "./../../../redux/active/actions";

const VerticalContainer = (props) => {
  return <VerticalWidget 
  setZoomDelta={props.setZoomDelta}
   menuSidebar={props.menuSidebar}
  setZoomDefault={props.setZoomDefault}
  setGestao={props.setGestao}
  setUserLocation={props.setUserLocation}
  userLocation={props.userLocation}
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
};

export default connect(mapStateToProps, mapDispatchToProps)(VerticalContainer);
