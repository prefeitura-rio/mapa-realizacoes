import {
  Divider,
  Fab,
  makeStyles,
} from "@material-ui/core";

import ExpandLessIcon from "@material-ui/icons/ExpandLess";
import { green, grey } from "@material-ui/core/colors";
import { forwardRef } from "react";
import { useState } from "react";
import BasicInfo from "../../inlines/BasicInfo";

const useStyles = makeStyles((theme) => ({
  card: {
    width: "100%",
    marginBottom: "10px",
  },
  topImage: {
    overflow: "hidden",
    width: "100%",
    objectFit: "cover",
    height: "235px",
    borderRadius:"15px"
  },

  extendedIcon: {
    marginRight: theme.spacing(1),
    fill: "#2196f3",
  },

  outlined: {
    borderLeft: "none",
    borderRight: "none",
  },

  iconAvatar: {
    width: "35px",
    height: "35px",
    backgroundColor: grey[200],
    color: "black",
  },

  iconAvatarSmall: {
    width: "25px",
    height: "25px",
    marginLeft: "5px",
    backgroundColor: green[500],
    color: "black",
  },
  fabContainer: {
    display: "flex",
    justifyContent: "center",
  },

  fab: {
    position: "fixed",
    bottom: "20px",
    backgroundColor: "white",

    textTransform: "none",
    border: "1px solid #dadce0",
    boxShadow: "0 1px 6px rgb(60 64 67 / 28%)",

    "&:hover": {
      borderColor: " #DADCE0",
      backgroundColor: "#F1F3F4",
      transition: "none",
    },
  },

  divider: {
    margin: "0 24px",
    borderBottom: "1px solid #e8eaed",
  },

  textSmall: {
    fontSize: "0.75rem",
  },
  marginZero: {
    margin: 0,
  },
}));

const MainUnderSearchBar = forwardRef(
  ({ underSearchBar, 
    setUnderSearchBar, 
    content,
    images,
    profile,
    login,
  }, ref) => {
    const classes = useStyles();
    const handleUnderSearchBar = () => {
      setUnderSearchBar(!underSearchBar);
    };

    const [topImgSrc, setTopImgSrc] = useState(
      // content.imageUrl ||
        "https://maps.gstatic.com/tactile/pane/default_geocode-2x.png"
    );
  
    const onTopImageError = () => {
      setTopImgSrc(
        "https://maps.gstatic.com/tactile/pane/default_geocode-2x.png"
      );
    };

    return (
      <div ref={ref}>
        <div className={classes.fabContainer}>

        {/* <div className={classes.searchShadow}></div> */}
        <img
          src={topImgSrc}
          onError={onTopImageError}
          alt="top image"
          className={classes.topImage}
        />
      {/* <BasicInfo content={content} /> */}
      <Divider />

          <Fab
            size="small"
            variant="extended"
            className={classes.fab}
            onClick={() => {
              handleUnderSearchBar();
            }}
          >
            <ExpandLessIcon className={classes.extendedIcon} />
            <div style={{ marginRight: "8px", color: "#3C4043" }}>Ocultar</div>
          </Fab>
        </div>
      </div>
    );
  }
);
export default MainUnderSearchBar;
