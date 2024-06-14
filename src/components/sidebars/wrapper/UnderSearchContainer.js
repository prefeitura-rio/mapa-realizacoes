import UnderSearchBar from "./UnderSearchBar";
import { connect, useDispatch } from "react-redux";
import { loadAllPlaces } from "../../../redux/places/actions";
import { useEffect } from "react";
import { Slide } from "@material-ui/core";
import { loadAllCidades, loadDadosAgregadosCidade, loadDestaquesCidade } from "../../../redux/cidade/actions";

const UnderSearchContainer = (props) => {
  const dispatch = useDispatch();

  
  // useEffect(() => {
  //   if (props.placesData) dispatch(loadAllPlaces(props.placesData));
  // }, [props.placesData]);

  useEffect(() => {
    dispatch(loadAllCidades());
    dispatch(loadDadosAgregadosCidade());
    dispatch(loadDestaquesCidade());
  }, []);

  return (
    // <Slide direction="left" timeout={1000} in={props.underSearchBar} mountOnEnter unmountOnExit >
      <UnderSearchBar
        underSearchBar={props.underSearchBar}
        activeBar={props.activeBar}
      />
    // </Slide>
  );
};

const mapStateToProps = (state) => {
  return {
    underSearchBar: state.active.underSearchBar,
    activeBar: state.active.activeBar,
    // placesData: state.places.placesData,
  };
};

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UnderSearchContainer);
