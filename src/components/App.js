import { ThemeProvider } from "@material-ui/core";
import "./App.css";
import WidgetsContainer from "./widgets/WidgetsContainer";
import theme from "../theme";
import MenuSidebarContainer from "./sidebars/sideMenu/MenuSidebarContainer";
import MapContainer from "./map/MapContainer";
import OutterModals from "./modals/OutterModals";
import PhotoGalleryContainer from "./photoGallery/PhotoGalleryContainer";
import UploadPhotoContainer from "./modals/uploadPhoto/UploadPhotoContainer";
import InfoModalContainer from "./modals/info/InfoModalContainer";
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <div className="App">
      <MapContainer />
      <Routes>
          <Route path=':id' element={<MapContainer />} />
        </Routes>
        <WidgetsContainer />
        <MenuSidebarContainer />
        <OutterModals />
        <InfoModalContainer />
        <UploadPhotoContainer />
        <PhotoGalleryContainer />
      </div>
    </ThemeProvider>
  );
}

export default App;

// TODO
// loader +
// comments +
// places by category +
// search +
// auth +
// update location +
// photo gallery +
// bugs
// animations
