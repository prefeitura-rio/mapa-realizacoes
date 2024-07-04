import { connect } from "react-redux";
import VerticalWidget from "./VerticalWidget";
import { setZoomDefault, setZoomDelta } from "../../../redux/actions";
import { setGestao, setMenuSidebar } from "./../../../redux/active/actions";

const VerticalContainer = (props) => {
  return <VerticalWidget 
  setZoomDelta={props.setZoomDelta}
   menuSidebar={props.menuSidebar}
  setZoomDefault={props.setZoomDefault}
  setGestao={props.setGestao}
  />;
};

const mapStateToProps = (state) => {
  return { 
    menuSidebar: state.app.menuSidebar,
  };
};

const mapDispatchToProps = {
  setZoomDelta,
  setZoomDefault,
  setMenuSidebar,
  setGestao
};

export default connect(mapStateToProps, mapDispatchToProps)(VerticalContainer);
