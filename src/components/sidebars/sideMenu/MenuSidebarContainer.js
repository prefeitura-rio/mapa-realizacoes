import { connect, useDispatch } from "react-redux";
import MenuSidebar from "./MenuSidebar";
import { setMenuSidebar } from "../../../redux/active/actions";
import { loadData } from "../../../redux/place/actions";
import { loadImages } from "../../../redux/images/actions";
import { useEffect } from "react";
import { loadBairroData } from "../../../redux/bairros/actions";

const MenuSidebarContainer = (props) => {
  const dispatch = useDispatch();

  useEffect(() => {
    if (props.descriptionData) {
      dispatch(loadBairroData(props.descriptionData));
      // dispatch(loadComments(props.descriptionData));
    }
  }, [props.descriptionData]);

  useEffect(() => {
    if (
      props.content &&
      props.content.image_folder
    ) {
      dispatch(loadImages(props.content.image_folder));
    }
  }, [props.content, props.descriptionData]);

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
    content: state.place.content,
  };
};

const mapDispatchToProps = {
  setMenuSidebar,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MenuSidebarContainer);
