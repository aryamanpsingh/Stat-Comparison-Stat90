import React, { Component, Fragment } from "react";
import Graph from "../graphs/Graph";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import ListSubheader from "@material-ui/core/ListSubheader";
import Switch from "@material-ui/core/Switch";
import { withStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import Button from "@material-ui/core/Button";

import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import Compare from "../graphs/compare";
import Typography from "@material-ui/core/Typography";
import { Paper } from "@material-ui/core";
import Header from "../layout/header";
import SwitchTab from "../tools/SwitchTab";
import SettingsIcon from "@material-ui/icons/Settings";
import withRoot from "../../withRoot";

const styles = theme => ({
  container: {
    backgroundColor: "rgb(33, 27, 56)",
    padding: "0 0 0 0"
  },
  list: {
    width: 200
  },
  graph: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
    margin: "auto"
  },
  compare: {
    margin: "auto",
    backgroundColor: "#0000000"
  },
  paper: {
    backgroundColor: "rgba(0,0,0, 0.2)"
  }
});

const heading = {
  padding: "10%",
  align: "center"
};

export class index extends Component {
  static propTypes = {
    players: PropTypes.array.isRequired,
    players2018: PropTypes.array.isRequired,
    players2019: PropTypes.array.isRequired,
    classes: PropTypes.object.isRequired
  };
  state = {
    year: 2019,
    league: [1, 2],
    right: false
  };
  tabChange = (event, newValue) => {
    if (newValue != "settings")
      this.setState({
        year: newValue
      });
  };
  toggleChange = value => () => {
    let list = this.state.league;
    if (this.state.league.includes(value)) {
      list.splice(value - 1, 1);
      this.setState({
        league: list
      });
    } else {
      this.setState({
        league: [...this.state.league, value].sort()
      });
    }
  };

  render() {
    const { classes } = this.props;
    const toggleDrawer = (side, open) => event => {
      if (
        event.type === "keydown" &&
        (event.key === "Tab" || event.key === "Shift")
      ) {
        return;
      }

      this.setState({ [side]: open });
    };
    const sideList = side => (
      <div
        className={classes.list}
        role="presentation"
        onKeyDown={toggleDrawer(side, false)}
      >
        <List
          subheader={<ListSubheader>League</ListSubheader>}
          className="leagues"
        >
          <ListItem>
            <ListItemText id="switch-list-label-PL" primary="Premier League" />
            <ListItemSecondaryAction>
              <Switch
                edge="end"
                onChange={this.toggleChange(1)}
                checked={leagues.includes(1)}
                inputProps={{ "aria-labelledby": "switch-list-label-PL" }}
              />
            </ListItemSecondaryAction>
          </ListItem>
          <ListItem>
            <ListItemText id="switch-list-label-LaLiga" primary="La Liga" />
            <ListItemSecondaryAction>
              <Switch
                edge="end"
                onChange={this.toggleChange(2)}
                checked={leagues.includes(2)}
                inputProps={{ "aria-labelledby": "switch-list-label-LaLiga" }}
              />
            </ListItemSecondaryAction>
          </ListItem>
        </List>
      </div>
    );
    let currentPlayers;
    if (this.state.year == 2019) {
      currentPlayers = this.props.players2019;
    } else {
      currentPlayers = this.props.players2018;
    }
    console.log(currentPlayers);
    let playerArray = [];
    let leagues = this.state.league;
    var removeDiacritics = require("diacritics").remove;
    leagues.map(function(league) {
      currentPlayers.filter(function(player, index) {
        if (player.league == league) {
          player.name = removeDiacritics(player.name);
          playerArray.push(player);
        }
      });
      console.log(playerArray);
    });
    currentPlayers = playerArray;
    let color1 = "rgba(105,17,62,0.9)";
    let color2 = "rgba(179, 103, 102, 0.6)";
    console.log(currentPlayers);
    console.log(removeDiacritics("üafwe"));
    /*
    if (this.state.league == 1) {
      let prem = currentPlayers.filter(function(player) {
        return player.league == 1;
      });
      currentPlayers = prem;
    } else if (this.state.league == 2) {
      let laliga = currentPlayers.filter(function(player) {
        return player.league == 2;
      });
      currentPlayers = laliga;
    }*/
    return (
      <Fragment>
        <Header />
        <Container className={classes.container}>
          <Paper elevation={3} className={classes.container}>
            <Drawer
              anchor="right"
              open={this.state.right}
              onClose={toggleDrawer("right", false)}
            >
              {sideList("right")}
            </Drawer>
            <SwitchTab
              year={this.state.year}
              tabChange={this.tabChange}
              toggleDrawer={toggleDrawer}
            />
            <Grid container>
              <Grid item xs={4} style={{ textAlign: "center" }}>
                <Paper className={classes.paper}>
                  <Graph
                    className={classes.graph}
                    length={10}
                    attribute="goals"
                    color={color2}
                    year={this.state.year}
                    players={currentPlayers}
                  />
                  <Graph
                    className={classes.graph}
                    length={10}
                    attribute="assists"
                    color={color2}
                    year={this.state.year}
                    players={currentPlayers}
                  />
                </Paper>
              </Grid>

              <Grid
                item
                xs={4}
                style={{
                  marginTop: "50px",
                  textAlign: "center",
                  padding: "30px"
                }}
              >
                <Compare players={currentPlayers} className={classes.compare} />
              </Grid>

              <Grid item xs={4} style={{ textAlign: "center" }}>
                <Paper className={classes.paper}>
                  <Graph
                    className={classes.graph}
                    length={10}
                    attribute="xG"
                    color={color2}
                    year={this.state.year}
                    players={currentPlayers}
                  />
                  <Graph
                    className={classes.graph}
                    length={10}
                    attribute="xA"
                    color={color2}
                    year={this.state.year}
                    players={currentPlayers}
                  />
                </Paper>
              </Grid>
            </Grid>
          </Paper>
        </Container>
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  players: state.players.players,
  players2018: state.players.players.filter(function(player) {
    return player.year == "2018";
  }),
  players2019: state.players.players.filter(function(player) {
    return player.year == "2019";
  })
});
export default connect(mapStateToProps)(withRoot(withStyles(styles)(index)));
