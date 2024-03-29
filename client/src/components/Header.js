import React, { useContext } from "react";
import { withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import MapIcon from "@material-ui/icons/Map"; // MapIcon not Map, because Map is js keyword
import Typography from "@material-ui/core/Typography";
import useMediaQuery from "@material-ui/core/useMediaQuery";

import Signout from "../components/Auth/Signout";

import Context from "../context";

const Header = ({ classes }) => {
  const { state } = useContext(Context);
  const { currentUser } = state;
  const mobileSize = useMediaQuery("(max-width: 650px)"); // если меньше 650px то вернётся true

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          {/* title / logo */}
          <div className={classes.grow}>
            <MapIcon className={classes.icon} />
            <Typography
              className={mobileSize ? classes.mobile : ""}
              component="h1"
              variant="h6"
              color="inherit"
              noWrap
            >
              GeoPins
            </Typography>
          </div>

          {/* Current user info */}
          {currentUser && (
            <div className={classes.grow}>
              <img className={classes.picture} src={currentUser.picture} alt={currentUser.name} />
              <Typography
                className={mobileSize ? classes.mobile : ""}
                variant="h5"
                color="inherit"
                noWrap
              >
                {currentUser.name}
              </Typography>
            </div>
          )}

          {/* Signout button */}
          <Signout />
        </Toolbar>
      </AppBar>
    </div>
  );
};

const styles = (theme) => ({
  root: {
    flexGrow: 1
  },
  grow: {
    flexGrow: 1,
    display: "flex",
    alignItems: "center"
  },
  icon: {
    marginRight: theme.spacing(), // mui v4
    color: "green",
    fontSize: 45
  },
  mobile: {
    display: "none"
  },
  picture: {
    height: "50px",
    borderRadius: "90%",
    marginRight: theme.spacing(2) // mui v4
  }
});

export default withStyles(styles)(Header);
