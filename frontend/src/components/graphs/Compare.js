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
import ShowChartIcon from "@material-ui/icons/ShowChart";
import Paper from "@material-ui/core/Paper";

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
    position: "top",
    fontColor: "white"
  },
  title: {
    text: "Comparison",
    fontColor: "white"
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
    name1 = player1.name;
    name2 = player2.name;
    console.log(player1);
    let array1 = [];
    let array2 = [];
    for (let [key, value] of Object.entries(player1)) {
      if (["goals", "assists", "xA", "xG"].includes(key)) array1.push(value);
    }
    for (let [key, value] of Object.entries(player2)) {
      if (["goals", "assists", "xA", "xG"].includes(key)) array2.push(value);
    }
    this.createChart(array1, array2, name1, name2);
  };

  createChart = (array1, array2, name1, name2) => {
    let data1 = {
      label: name1,
      data: array1,
      backgroundColor: "rgba(214,57,141,0.5)"
    };
    let data2 = {
      label: name2,
      data: array2,
      backgroundColor: "rgba(71,107,28,0.5)"
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
        <Typography variant="h5" gutterBottom>
          compare any 2 players.
        </Typography>

        <TextField
          id="name"
          label="Name"
          className="name"
          value={name[0]}
          onChange={this.handleChange(0)}
          margin="normal"
          fullWidth={true}
        />
        <TextField
          id="name"
          label="Name"
          className="name"
          value={name[1]}
          onChange={this.handleChange(1)}
          margin="normal"
          fullWidth={true}
        />
        <br />
        <Button
          variant="contained"
          color="primary"
          className="submit"
          onClick={this.handleSubmit}
          fullWidth={true}
          style={{ marginTop: "20px" }}
        >
          <ShowChartIcon />
        </Button>

        {this.state.showChart == true && (
          <Paper
            style={{
              marginTop: "-50px",
              backgroundColor: "rgba(0,0,0,0.4)",
              position: "absolute",
              alignItems: "center",
              left: "33%",
              marginLeft: "50px",
              top: "50%"
            }}
            elevation={5}
          >
            <Radar
              height={450}
              width={500}
              data={this.state.data}
              options={options}
              style={chart}
            />
          </Paper>
        )}
      </Fragment>
    );
  }
}

export default Compare;
