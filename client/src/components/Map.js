import React, { useState } from "react";
import ReactMapGL, { NavigationControl } from "react-map-gl";
import { withStyles } from "@material-ui/core/styles";
// import Button from "@material-ui/core/Button";
// import Typography from "@material-ui/core/Typography";
// import DeleteIcon from "@material-ui/icons/DeleteTwoTone";

const INITIAL_VIEWPORT = {
  latitude: 37.7577,
  longitude: -122.4376,
  zoom: 13
};

const Map = ({ classes }) => {
  const [viewport, setViewport] = useState(INITIAL_VIEWPORT);

  return (
    <div className={classes.root}>
      <ReactMapGL
        mapboxApiAccessToken="pk.eyJ1Ijoia2lyaWxsMjU1IiwiYSI6ImNqd2RwcmRoajE1ZTE0YW1xZ3l6cnFlamcifQ.8qNdoa1oOewuiFMSt0kr-w"
        width="100vw"
        height="calc(100vh - 64px)"
        mapStyle="mapbox://styles/mapbox/streets-v11"
        onViewportChange={(newViewport) => setViewport(newViewport)}
        {...viewport}
      >
        {/* navigation control */}
        <div className={classes.navigationControl}>
          <NavigationControl onViewportChange={(newViewport) => setViewport(newViewport)} />
        </div>
      </ReactMapGL>
    </div>
  );
};

// const styles = (theme) => ({}); // or just object const styles = {};
const styles = {
  root: {
    display: "flex"
  },
  rootMobile: {
    display: "flex",
    flexDirection: "column-reverse"
  },
  navigationControl: {
    position: "absolute",
    top: 0,
    left: 0,
    margin: "1em"
  },
  deleteIcon: {
    color: "red"
  },
  popupImage: {
    padding: "0.4em",
    height: 200,
    width: 200,
    objectFit: "cover"
  },
  popupTab: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column"
  }
};

export default withStyles(styles)(Map);

/*
https://docs.mapbox.com/mapbox-gl-js/example/setstyle/
*/
