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
import Compare from "../graphs/Compare";
import Typography from "@material-ui/core/Typography";
import { Paper, Hidden } from "@material-ui/core";
import Header from "../layout/header";
import SwitchTab from "../tools/SwitchTab";
import SettingsIcon from "@material-ui/icons/Settings";
import withRoot from "../../withRoot";
import InputColor from "react-input-color";

const styles = theme => ({
  container: {
    backgroundColor: "#4C243B",
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
  },
  gridItem: {
    alignItems: "center"
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
    league: [1, 2, 3, 4, 5],
    right: false,
    view: "player",
    color: "#905D3A"
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
      let index = this.state.league.indexOf(value);
      console.log(list.splice(index, 1));
      console.log(list);
      this.setState({
        league: list
      });
    } else {
      this.setState({
        league: [...this.state.league, value].sort()
      });
    }
  };
  sumTeam(team) {
    let attributes = ["goals", "assists", "xA", "xG"];
    let sum = { name: team[1].team, goals: 0, assists: 0, xA: 0, xG: 0 };
    team.forEach(function(player, i) {
      attributes.forEach(function(attribute, j) {
        sum[attribute] += player[attribute];
      });
    });
    return sum;
  }
  switchView = value => {
    this.setState({
      view: value
    });
  };
  setColor = event => {
    this.setState({
      color: event.hex
    });
  };
  render() {
    const smallScreen = window.innerWidth < 960;
    console.log(smallScreen);
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
    let color = this.state.color;
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
          <ListItem>
            <ListItemText id="switch-list-label-SerieA" primary="Serie A" />
            <ListItemSecondaryAction>
              <Switch
                edge="end"
                onChange={this.toggleChange(3)}
                checked={leagues.includes(3)}
                inputProps={{ "aria-labelledby": "switch-list-label-SerieA" }}
              />
            </ListItemSecondaryAction>
          </ListItem>
          <ListItem>
            <ListItemText
              id="switch-list-label-Bundesliga"
              primary="Bundesliga"
            />
            <ListItemSecondaryAction>
              <Switch
                edge="end"
                onChange={this.toggleChange(4)}
                checked={leagues.includes(4)}
                inputProps={{
                  "aria-labelledby": "switch-list-label-Bundesliga"
                }}
              />
            </ListItemSecondaryAction>
          </ListItem>
          <ListItem>
            <ListItemText id="switch-list-label-Ligue-1" primary="Ligue 1" />
            <ListItemSecondaryAction>
              <Switch
                edge="end"
                onChange={this.toggleChange(5)}
                checked={leagues.includes(5)}
                inputProps={{ "aria-labelledby": "switch-list-label-Ligue-1" }}
              />
            </ListItemSecondaryAction>
          </ListItem>
          <ListItem>
            <InputColor initialHexColor={color} onChange={this.setColor} />
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
    });
    currentPlayers = playerArray;
    let color1 = "rgba(105,17,62,0.9)";

    const clubNames = [...new Set(currentPlayers.map(player => player.team))];
    console.log(clubNames);

    let teams = [new Array(47)];

    clubNames.forEach(function(team, i) {
      teams.push(
        currentPlayers.filter(function(player) {
          return player.team.toLowerCase() == team.toLowerCase();
        })
      );
    });
    console.log(currentPlayers);
    let comparisonElements = Array.from(currentPlayers);
    if (clubNames.length > 5) {
      if (teams[1].length > 1)
        for (var i = 1; i < teams.length; i++)
          teams[i] = this.sumTeam(teams[i]);
    }
    console.log(currentPlayers);

    teams.shift();
    console.log(teams);
    teams.forEach(function(team, i) {
      comparisonElements.push(team);
    });
    console.log(currentPlayers);

    console.log(comparisonElements);
    let elements;
    if (this.state.view == "club") {
      elements = teams;
    } else elements = currentPlayers;
    console.log(currentPlayers);
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
        <Header switchView={this.switchView} toggleDrawer={toggleDrawer} />
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
              color={this.state.color}
            />
            <Grid container>
              <Hidden item sm smDown className={classes.gridItem}>
                <Paper className={classes.paper}>
                  <Graph
                    className={classes.graph}
                    length={10}
                    attribute="goals"
                    color={this.state.color}
                    players={elements}
                    type={this.state.view}
                  />
                  <Graph
                    className={classes.graph}
                    length={10}
                    attribute="assists"
                    color={this.state.color}
                    year={this.state.year}
                    players={elements}
                    type={this.state.view}
                  />
                </Paper>
              </Hidden>

              <Grid
                item
                md
                xs={12}
                style={{
                  marginTop: "50px",
                  textAlign: "center",
                  padding: "30px"
                }}
                className={classes.gridItem}
              >
                <Compare
                  players={comparisonElements}
                  className={classes.compare}
                  type={this.state.view}
                />
              </Grid>

              <Hidden item sm smDown className={classes.gridItem}>
                <Paper className={classes.paper}>
                  <Graph
                    className={classes.graph}
                    length={10}
                    attribute="xG"
                    color={this.state.color}
                    year={this.state.year}
                    players={elements}
                    type={this.state.view}
                  />
                  <Graph
                    className={classes.graph}
                    length={10}
                    attribute="xA"
                    color={this.state.color}
                    year={this.state.year}
                    players={elements}
                    type={this.state.view}
                  />
                </Paper>
              </Hidden>
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
