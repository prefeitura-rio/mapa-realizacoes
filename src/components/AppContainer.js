import App from "./App";
import { connect } from "react-redux";
import "firebase/firestore";
import { BrowserRouter } from "react-router-dom";
import { HashRouter } from "react-router-dom";

const AppContainer = (props) => {
  return (
    <HashRouter>
      <App />
    </ HashRouter>
  );
};
const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(AppContainer);
