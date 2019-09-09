import React, { Component, Fragment } from "react";
import Graph from "../graphs/Graph";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import Compare from "../graphs/compare";
import Typography from "@material-ui/core/Typography";
import { Paper } from "@material-ui/core";
import Header from "../layout/header";
import SwitchTab from "../graphs/SwitchTab";

const heading = {
  padding: "10%",
  align: "center"
};

export class index extends Component {
  static propTypes = {
    players: PropTypes.array.isRequired,
    players2018: PropTypes.array.isRequired,
    players2019: PropTypes.array.isRequired
  };
  state = {
    year: 2019
  };
  tabChange = (event, newValue) => {
    this.setState({
      year: newValue
    });
  };
  render() {
    let currentPlayers;
    if (this.state.year == 2019) {
      currentPlayers = this.props.players2019;
    } else {
      currentPlayers = this.props.players2018;
    }
    return (
      <Fragment>
        <Header />
        <Container fixed>
          <Grid container item xs={12}>
            <Grid item xs={3}>
              <Graph
                length={10}
                attribute="goals"
                color="rgba(255, 0, 0, 0.6)"
                year={this.state.year}
                players={currentPlayers}
              />
            </Grid>
            <Grid item xs={3}>
              <Graph
                length={10}
                attribute="assists"
                color="rgba(0, 0, 255, 0.6)"
                year={this.state.year}
                players={currentPlayers}
              />
            </Grid>
            <Grid item xs={3}>
              <Graph
                length={10}
                attribute="xG"
                color="rgba(255, 0, 0, 0.6)"
                year={this.state.year}
                players={currentPlayers}
              />
            </Grid>
            <Grid item xs={3}>
              <Graph
                length={10}
                attribute="xA"
                color="rgba(0, 0, 255, 0.6)"
                year={this.state.year}
                players={currentPlayers}
              />
            </Grid>
          </Grid>

          <SwitchTab year={this.state.year} tabChange={this.tabChange} />
          <Grid container alignItems="center">
            <Grid item xs>
              <Compare players={currentPlayers} />
            </Grid>
          </Grid>
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
export default connect(mapStateToProps)(index);
