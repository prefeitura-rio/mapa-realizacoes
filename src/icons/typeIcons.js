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




export const getIcon = (name) => {
  switch (name.toLowerCase()) {
    case "shopping mall":
    case "shopping supermarket":
      return createMuiIcon(ShoppingIcon);
    case "gas station":
      return createMuiIcon(GasStationIcon);
    case "university":
    case "school":
      return createMuiIcon(SchoolIcon);
    case "hotel":
    case "hostel":
      return createMuiIcon(HotelIcon);
    case "restaurant":
    case "cafe":
      return createMuiIcon(RestaurantIcon);
    case "redicon":
      return createMuiIcon(DefaultIcon, 35, "red");
    default:
      return createMuiIcon(DefaultIcon, 25, "#007E7D");
  }
};
