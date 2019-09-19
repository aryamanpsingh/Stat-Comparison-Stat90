import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";

import { Link } from "react-router-dom";

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
  }
}));

export default function header(props) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
          >
            <MenuIcon />
          </IconButton>

          <Typography variant="h6">
            <Link to="/" style={{ textDecoration: "none", color: "white" }}>
              Stat90 Visualizer
            </Link>
          </Typography>
          <section className={classes.rightToolbar}>
            <Button color="inherit" onClick={() => props.switchView("player")}>
              Players
            </Button>
            <Button color="inherit" onClick={() => props.switchView("club")}>
              Teams
            </Button>
            <Button color="inherit">About</Button>
          </section>
        </Toolbar>
      </AppBar>
    </div>
  );
}
