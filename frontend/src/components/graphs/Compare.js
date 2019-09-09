import React, { Component, Fragment } from "react";
import TextField from "@material-ui/core/TextField";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import update from "immutability-helper";
import Button from "@material-ui/core/Button";
import { Radar } from "react-chartjs-2";
import { FormControl, Typography } from "@material-ui/core";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";

const style = {
  background: "white",
  border: 1,
  color: "black"
};
const chart = {
  justifyContent: "center",
  margin: "auto"
};

const options = {
  legend: {
    position: "top"
  },
  title: {
    text: "Comparison"
  },
  scale: {
    reverse: false,
    ticks: {
      step: 0.3,
      beginAtZero: true
    }
  },

  responsive: true,
  pointDot: false,
  showTooltips: true,
  maintainAspectRatio: false,
  scaleOverride: true,
  scaleSteps: 2,
  scaleStepWidth: 0.5,
  scaleStartValue: 0
};

export class Compare extends Component {
  constructor(props) {
    super(props);
    this.state = {
      player: [
        {
          name: "",
          goals: "",
          assists: "",
          xapg: "",
          xgpg: ""
        },
        {
          name: "",
          goals: "",
          assists: "",
          xapg: "",
          xgpg: ""
        }
      ],
      data: {
        labels: ["Goals", "Assists", "xA", "xG"],
        datasets: [{}]
      }
    };
  }
  state = {
    player: [],
    data: {},
    showChart: false
  };

  handleChange = index => e => {
    console.log(index);
    this.setState({
      player: update(this.state.player, {
        [index]: {
          name: { $set: e.target.value }
        }
      })
    });
  };

  handleSubmit = e => {
    let name1 = this.state.player[0].name;
    let name2 = this.state.player[1].name;
    var player1 = this.props.players.filter(function(player) {
      return player.name.toLowerCase().includes(name1.toLowerCase());
    });
    var player2 = this.props.players.filter(function(player) {
      return player.name.toLowerCase().includes(name2.toLowerCase());
    });
    player1 = player1[0];
    player2 = player2[0];
    console.log(player1);
    let array1 = [];
    let array2 = [];
    for (let [key, value] of Object.entries(player1)) {
      if (["goals", "assists", "xA", "xG"].includes(key)) array1.push(value);
    }
    for (let [key, value] of Object.entries(player2)) {
      if (["goals", "assists", "xA", "xG"].includes(key)) array2.push(value);
    }
    this.createChart(array1, array2);
  };

  createChart = (array1, array2) => {
    let data1 = {
      label: this.state.player[0].name,
      data: array1,
      backgroundColor: "rgba(0, 0, 255, 0.5)"
    };
    let data2 = {
      label: this.state.player[1].name,
      data: array2,
      backgroundColor: "rgba(255, 0, 0, 0.5)"
    };
    let dataset = [data1, data2];
    console.log(dataset);
    this.setState({
      data: {
        datasets: dataset,
        labels: ["Goals", "Assists", "xG", "xA"]
      },
      showChart: true
    });
  };

  render() {
    return (
      <Fragment>
        <Card>
          <CardContent>
            <Typography variant="h5" gutterBottom>
              Compare any two players stats to see who comes out on top!
            </Typography>
            <CardActions
              style={{ textAlign: "center", justifyContent: "center" }}
            >
              <FormControl>
                <TextField
                  id="name"
                  label="Name"
                  className="name"
                  value={name[0]}
                  onChange={this.handleChange(0)}
                  margin="normal"
                />
                <TextField
                  id="name"
                  label="Name"
                  className="name"
                  value={name[1]}
                  onChange={this.handleChange(1)}
                  margin="normal"
                />
                <br />
                <Button
                  variant="contained"
                  color="primary"
                  className="submit"
                  onClick={this.handleSubmit}
                >
                  Go
                </Button>
              </FormControl>
            </CardActions>
          </CardContent>
        </Card>

        {this.state.showChart == true && (
          <Card style={chart}>
            Test
            <Radar
              height={400}
              data={this.state.data}
              options={options}
              style={chart}
            />
          </Card>
        )}
      </Fragment>
    );
  }
}

export default Compare;
