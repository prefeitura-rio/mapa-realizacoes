import { connect } from "react-redux";
import VerticalWidget from "./VerticalWidget";
import { setZoomDelta } from "../../../redux/actions";
import { setMenuSidebar } from "./../../../redux/active/actions";

const VerticalContainer = (props) => {
  return <VerticalWidget setZoomDelta={props.setZoomDelta}
   menuSidebar={props.menuSidebar}
  setMenuSidebar={props.setMenuSidebar}/>;
};

const mapStateToProps = (state) => {
  return { menuSidebar: state.app.menuSidebar,};
};

const mapDispatchToProps = {
  setZoomDelta,
  setMenuSidebar,
};

export default connect(mapStateToProps, mapDispatchToProps)(VerticalContainer);
