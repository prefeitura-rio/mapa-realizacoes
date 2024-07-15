import { connect, useDispatch } from "react-redux";
import MenuSidebar from "./MenuSidebar";
import { BAIRRO_DESCRIPTION_BAR, SUBPREFEITURA_DESCRIPTION_BAR, setMenuSidebar,setEhBairro } from "../../../redux/active/actions";
import { loadData } from "../../../redux/place/actions";
import { loadImages } from "../../../redux/images/actions";
import { useEffect } from "react";
import { loadBairroData } from "../../../redux/bairros/actions";
import { loadSubprefeituraData } from "../../../redux/subprefeituras/actions";

const MenuSidebarContainer = (props) => {
  const dispatch = useDispatch();

  // useEffect(() => {
    
  //   if (props.ehBairro) {
  //     dispatch(loadBairroData(props.descriptionData));
  //   }
  //   else dispatch(loadSubprefeituraData(props.descriptionDataSubprefeitura));
  // }, [props.setEhBairro, props.descriptionData, props.descriptionDataSubprefeitura]);

  useEffect(() => {
    if (
      props.content &&
      props.content.image_folder
    ) {
      dispatch(loadImages(props.content.image_folder));
    }
  }, [props.ehBairro,props.content, props.descriptionData]);

  return (
    <MenuSidebar
      menuSidebar={props.menuSidebar}
      setMenuSidebar={props.setMenuSidebar}
    />
  );
};

const mapStateToProps = (state) => {
  return {
    menuSidebar: state.active.menuSidebar,
    descriptionData: state.bairros.descriptionData,
    descriptionDataSubprefeitura: state.subprefeituras.descriptionData,
    content: state.place.content,
    ehBairro: state.active.ehBairro,
  };
};

const mapDispatchToProps = {
  setMenuSidebar,
  setEhBairro
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MenuSidebarContainer);
