import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";

import { Link } from "react-router-dom";
import { Hidden, Drawer } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  menuButton: {
    marginRight: theme.spacing(10)
  },
  title: {
    flexGrow: 2
  },
  rightToolbar: {
    marginLeft: "auto"
  },
  logo: {
    margin: "auto",
    textAlign: "center",
    maxWidth: "50%",
    maxHeight: "100px"
  },
  logoHorizontallyCenter: {
    position: "absolute",
    left: "50%",
    top: "50%",
    transform: "translate(-50%, -50%)"
  },
  toolbar: {
    margin: "0 10%"
  }
}));
let menu = false;
export default function header(props) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static" title="Viasualizer">
        <Toolbar className={classes.toolbar}>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
            onClick={props.toggleDrawer("right", true)}
          >
            <MenuIcon />
          </IconButton>

          <Link to="/" style={{ textDecoration: "none", color: "white" }}>
            <div className={classes.logoHorizontallyCenter}>
              <img
                src={"/static/frontend/images/icon.png"}
                className={classes.logo}
                alt="logo"
              />
            </div>
          </Link>
          <Hidden smDown>
            <section className={classes.rightToolbar}>
              <Button
                color="inherit"
                onClick={() => props.switchView("player")}
              >
                Players
              </Button>
              <Button color="inherit" onClick={() => props.switchView("club")}>
                Teams
              </Button>
              <Button color="inherit">About</Button>
            </section>
          </Hidden>
        </Toolbar>
      </AppBar>
    </div>
  );
}
