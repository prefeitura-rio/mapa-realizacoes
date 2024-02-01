import App from "./App";
import { connect } from "react-redux";
import "firebase/firestore";
import { BrowserRouter as Router } from "react-router-dom";

const AppContainer = (props) => {
  return (
    <Router>
      <App />
    </Router>
  );
};
const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(AppContainer);
