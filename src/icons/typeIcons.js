import L from "leaflet";
import ShoppingIcon from '@material-ui/icons/ShoppingCart';
import GasStationIcon from '@material-ui/icons/LocalGasStation';
import SchoolIcon from '@material-ui/icons/School';
import HotelIcon from '@material-ui/icons/Hotel';
import RestaurantIcon from '@material-ui/icons/Restaurant';
import BarIcon from '@material-ui/icons/LocalBar';
import DefaultIcon from '@material-ui/icons/Place'; // Default icon
import ReactDOMServer from 'react-dom/server';


const createMuiIcon = (MuiIcon, iconSize = 15, iconColor = 'default') => {
  const iconHtml = ReactDOMServer.renderToString(
    <MuiIcon style={{ fontSize: iconSize, color: iconColor }} />
  );
  return L.divIcon({
    html: iconHtml,
    iconSize: [iconSize, iconSize],
    className: '' // Important to avoid Leaflet applying default icon styles
  });
};


export const getIcon = (name, isClicked) => {
  const color = isClicked ? "#0b4747" : null; 
  const size = isClicked ? 40 : 25; 

  switch (name.toLowerCase()) {
    case "redicon":
      return createMuiIcon(DefaultIcon, isClicked ? 45 : 35, color || "#0b4747");
    case "brts_transbrasil_icon":
      return createMuiIcon(DefaultIcon, size, "#ED3237");
    case "brts_transoeste_icon":
      return createMuiIcon(DefaultIcon, size, "#208DCD");
    case "brts_transcarioca_icon":
      return createMuiIcon(DefaultIcon, size, "#ED7422");
    case "brts_transolimpicas_icon":
      return createMuiIcon(DefaultIcon, size, "#1DA64D");
    default:
      return createMuiIcon(DefaultIcon, isClicked ? 45 : 35, color || "#007E7D"); 
  }
};