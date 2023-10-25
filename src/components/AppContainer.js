import App from "./App";
import { connect } from "react-redux";
import "firebase/firestore";

const AppContainer = (props) => {
  return <App />;
};

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(AppContainer);
