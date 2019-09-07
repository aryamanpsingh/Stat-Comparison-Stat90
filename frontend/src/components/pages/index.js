import React, { Component } from "react";
import Graph from "../graphs/Graph";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import Compare from "../graphs/compare";
import Typography from "@material-ui/core/Typography";
import { Paper } from "@material-ui/core";

const heading = {
  padding: "10%",
  align: "center"
};

export class index extends Component {
  render() {
    return (
      <Container fixed>
        <Grid container item xs={12}>
          <Grid item xs={3}>
            <Graph
              length={10}
              attribute="goals"
              color="rgba(255, 99, 132, 0.6)"
            />
          </Grid>
          <Grid item xs={3}>
            <Graph
              length={10}
              attribute="assists"
              color="rgba(0, 255, 255, 0.6)"
            />
          </Grid>
          <Grid item xs={3}>
            <Graph length={10} attribute="xG" color="rgba(255, 0, 0, 0.6)" />
          </Grid>
          <Grid item xs={3}>
            <Graph length={10} attribute="xA" color="rgba(0, 255, 0, 0.6)" />
          </Grid>
        </Grid>

        <Grid container alignItems="center" justify="center">
          <Grid item xs>
            <Paper background="black">
              <Typography variant="h5" gutterBottom style={heading}>
                Enter 2 players to compare!
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs>
            <Compare />
          </Grid>
        </Grid>
      </Container>
    );
  }
}

export default index;
