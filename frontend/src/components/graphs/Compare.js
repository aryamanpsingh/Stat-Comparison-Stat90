import React, { Component, Fragment } from "react";
import TextField from "@material-ui/core/TextField";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import update from "immutability-helper";
import Button from "@material-ui/core/Button";
import { Radar, Doughnut } from "react-chartjs-2";
import { FormControl, Typography } from "@material-ui/core";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import ShowChartIcon from "@material-ui/icons/ShowChart";
import Paper from "@material-ui/core/Paper";
import { Input } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import { palette } from "@material-ui/system";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";

var originalDoughnutDraw = Chart.controllers.doughnut.prototype.draw;
Chart.helpers.extend(Chart.controllers.doughnut.prototype, {
  draw: function() {
    originalDoughnutDraw.apply(this, arguments);

    var chart = this.chart.chart;
    var ctx = chart.ctx;
    var width = chart.width;
    var height = chart.height;

    var fontSize = (height / 114).toFixed(2);
    ctx.font = fontSize + "em Verdana";
    ctx.textBaseline = "middle";
    ctx.fillStyle = "white";

    var text = chart.config.data.text,
      textX = Math.round((width - ctx.measureText(text).width) / 2),
      textY = height / 2;

    ctx.fillText(text, textX, textY);
  }
});

const style = {
  background: "white",
  border: 1,
  color: "black"
};
const chart = {
  justifyContent: "center",
  margin: "auto"
};
const doughnut = {
  marginTop: "15px"
};
const chartDiv = {
  position: "absolute",
  top: "50%",
  left: "50%",
  marginTop: "-400px",
  marginLeft: "-300px",
  width: "600px",
  height: "600px"
};
const AutoComplete = {
  marginTop: "30px",
  width: "100%",
  border: "1px solid white",
  padding: "0",
  marginBottom: "0",
  input: {
    border: "none",
    background: "rgba(0,0,0,0)",
    height: "36px",
    width: "100%",
    color: "white",
    fontSize: "18px",
    boxSizing: "border-box",
    margin: 0,
    padding: 0
  },
  ul: {
    listStyleType: "none",
    textAlign: "left"
  },
  li: {
    padding: "5px"
  },
  liCurrent: {
    background: "rgba(0,0,0,0.3)"
  }
};

const doughnutOptions = {
  animation: true,
  animationEasing: "easeInOutQuart",
  animationSteps: 80,
  title: {
    text: "Comparison",
    fontColor: "black"
  },
  legend: {
    display: false
  },
  responsive: true
};

const options = {
  chartArea: { backgroundColor: "red" },
  legend: {
    position: "top",
    fontColor: "black"
  },
  title: {
    text: "Comparison",
    fontColor: "black"
  },
  scale: {
    angleLines: {
      display: true,
      lineWidth: 0.5,
      color: "rgba(128, 128, 128, 0.2)"
    },
    pointLabels: {
      fontSize: 14,
      fontStyle: "300",
      fontColor: "rgba(204, 204, 204, 1)",
      fontFamily: "'Lato', sans-serif"
    },
    ticks: {
      beginAtZero: true,
      display: false
    }
  },
  gridLines: {
    display: false
  },
  tooltips: {
    enabled: true,
    callbacks: {
      label: function(tooltipItem, data) {
        return (
          data.datasets[tooltipItem.datasetIndex].label +
          " : " +
          data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index]
        );
      }
    }
  },

  responsive: true,
  pointDot: false,
  showTooltips: true,
  maintainAspectRatio: false,
  scaleSteps: 2,
  scaleStepWidth: 0.5,
  scaleStartValue: 0
};

export class Compare extends Component {
  constructor(props) {
    super(props);
    this.items = ["test", "best"];

    this.state = {
      cursor: [-1, -1],
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
      },
      suggestions: {
        0: [],
        1: []
      }
    };
  }
  state = {
    player: [],
    data: {},
    showChart: false
  };
  componentWillMount() {
    document.addEventListener("mousedown", this.handleClick, false);
  }

  handleChange = index => e => {
    console.log(this.items);
    let value = e.target.value;
    if (value.length > 0) {
      const regex = new RegExp(`${value}`, "i");
      this.state.suggestions[index] = this.items
        .sort()
        .filter(v => regex.test(v.name));
    } else {
      this.state.suggestions[index] = [];
    }
    console.log(this.state.suggestions[index]);
    this.setState({
      player: update(this.state.player, {
        [index]: {
          name: { $set: e.target.value }
        }
      })
    });
  };
  setValue = (index, value) => e => {
    console.log(value);
    this.state.suggestions[index] = [];
    this.setState({
      player: update(this.state.player, {
        [index]: {
          name: { $set: value }
        }
      })
    });
  };

  handleSubmit = e => {
    let name = new Array(this.state.player.length).fill("");
    let player = new Array(this.state.player.length).fill(0);
    let players = this.props.players;
    let statePlayer = this.state.player;
    name.forEach(function(value, key) {
      name[key] = statePlayer[key].name;
      console.log(statePlayer[key].name);
    });
    console.log(name[1]);

    player.forEach(function(value, key) {
      console.log(player[key]);
      player[key] = players.filter(function(player) {
        return player.name.toLowerCase().includes(name[key].toLowerCase());
      });
      player[key] = player[key][0];
      name[key] = player[key].name;
    });
    /*
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
    */
    console.log(player[0]);
    let array1 = [];
    let array2 = [];

    let array = new Array(player.length).fill("");
    array.forEach(function(value, key) {
      array[key] = [];
    });

    player.forEach(function(value, key) {
      console.log(value);
      for (let [name, content] of Object.entries(player[key])) {
        if (["goals", "assists", "xA", "xG"].includes(name))
          array[key].push(content);
      }
    });
    console.log(array[0]);
    /*

    for (let [key, value] of Object.entries(player1)) {
      if (["goals", "assists", "xA", "xG"].includes(key)) array1.push(value);
    }
    for (let [key, value] of Object.entries(player2)) {
      if (["goals", "assists", "xA", "xG"].includes(key)) array2.push(value);
    }
    this.createChart(array1, array2, name1, name2);*/
    this.createChart(array, name);
  };

  createChart = (array, name) => {
    let colors = [
      "rgba(191, 63, 63, 0.2)",
      "rgba(47, 12, 170, 0.2)",
      "rgba(12, 153, 9, 0.2)",
      "rgba(247, 155, 7, 0.2)",
      "rgba(246, 113, 249, 0.2)",
      "rgba(102, 220, 249, 0.2)"
    ];
    let data = new Array(array.length).fill(0);
    data.forEach(function(value, key) {
      data[key] = {
        label: name[key],
        data: array[key],
        backgroundColor: colors[key],
        borderColor: colors[key],
        borderWidth: 5
      };
      console.log(data[key]);
    });
    let bgcolors = new Array(array.length).fill(0);
    let goalData = new Array(array.length).fill(0);
    let assistData = new Array(array.length).fill(0);
    let xgData = new Array(array.length).fill(0);
    let xaData = new Array(array.length).fill(0);

    goalData.forEach(function(value, key) {
      goalData[key] = array[key][0];
      assistData[key] = array[key][1];
      xgData[key] = array[key][1];
      xaData[key] = array[key][1];

      bgcolors[key] = colors[key];

      console.log(goalData[key]);
    });
    /*
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
    */
    goalData = {
      data: goalData,
      backgroundColor: bgcolors
    };
    assistData = {
      data: assistData,
      backgroundColor: bgcolors
    };
    xgData = {
      data: xgData,
      backgroundColor: bgcolors
    };
    xaData = {
      data: xaData,
      backgroundColor: bgcolors
    };
    let dataset = data;
    console.log(goalData);
    this.setState({
      goalData: {
        datasets: [goalData],
        labels: name,
        text: "Goals"
      },
      assistData: {
        datasets: [assistData],
        labels: name,
        text: "Assists"
      },
      xgData: {
        datasets: [xgData],
        labels: name,
        text: "xG"
      },
      xaData: {
        datasets: [xaData],
        labels: name,
        text: "xA"
      },
      data: {
        datasets: dataset,
        labels: ["Goals", "Assists", "xG", "xA"]
      },
      showChart: true
    });
  };
  handleClick = e => {
    if (this.node) {
      if (this.node.contains(e.target)) {
        return;
      } else {
        this.setState({
          showChart: false
        });
      }
    }
  };
  handleKeyDown = (index, suggestions) => e => {
    if (e.keyCode === 40) {
      this.state.cursor[index] += 1;

      this.setState({
        player: update(this.state.player, {
          [index]: {
            name: {
              $set: this.state.suggestions[index][this.state.cursor[index]].name
            }
          }
        })
      });
    } else if (e.keyCode === 38) {
      if (this.state.cursor[index] > 0) this.state.cursor[index] -= 1;
      this.setState({
        player: update(this.state.player, {
          [index]: {
            name: {
              $set: this.state.suggestions[index][this.state.cursor[index]].name
            }
          }
        })
      });
    } else if (e.keyCode === 13) {
      this.state.suggestions[index] = [];
      this.setState({
        suggestions: this.state.suggestions
      });
    }
  };
  addField = e => {
    e.preventDefault();
    var newIndex = Object.keys(this.state.suggestions).length;
    let suggestions = this.state.suggestions;
    suggestions[newIndex] = [];
    console.log(suggestions);
    this.setState(prevState => ({
      player: [
        ...prevState.player,
        {
          name: "",
          goals: "",
          assists: "",
          xapg: "",
          xgpg: ""
        }
      ],
      suggestions: suggestions
    }));
  };

  render() {
    let suggestions = this.state.suggestions;
    console.log(this.state.suggestions[1].length);
    this.items = this.props.players;
    let name = this.state.player.map(name => name.name);
    return (
      <Fragment>
        <Typography variant="h5" gutterBottom>
          Compare teams/players.
        </Typography>
        <form autoComplete="off">
          {this.state.player.map((item, playerKey) => (
            <div className="AutoComplete" style={AutoComplete}>
              <input
                type="text"
                style={AutoComplete.input}
                id="name"
                label="Name"
                className="name"
                value={this.state.player[playerKey].name}
                onChange={this.handleChange(playerKey)}
                onKeyDown={this.handleKeyDown(playerKey, suggestions)}
              />
              {this.state.suggestions[playerKey].length > 0 && (
                <ul style={AutoComplete.ul}>
                  {this.state.suggestions[playerKey].map((item, key) => (
                    <li
                      style={
                        this.state.cursor[playerKey] === key
                          ? AutoComplete.liCurrent
                          : AutoComplete.li
                      }
                      key={key}
                      value={item.name}
                      onClick={this.setValue(playerKey, item.name)}
                    >
                      {item.name}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </form>
        <Button
          variant="contained"
          color="primary"
          className="submit"
          onClick={this.addField}
          fullWidth={true}
          style={{ marginTop: "20px" }}
        >
          <AddIcon />
        </Button>

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
          <div ref={node => (this.node = node)} style={chartDiv}>
            <Paper
              style={{
                backgroundColor: "#2e2c26"
              }}
              elevation={9}
            >
              <Grid container>
                <Grid item sm style={doughnut}>
                  <Doughnut
                    height={150}
                    data={this.state.goalData}
                    options={doughnutOptions}
                  />
                </Grid>
                <Grid item sm style={doughnut}>
                  <Doughnut
                    height={150}
                    data={this.state.assistData}
                    options={doughnutOptions}
                  />
                </Grid>
              </Grid>
              <Grid container>
                <Radar
                  height={500}
                  width={550}
                  data={this.state.data}
                  options={options}
                  style={chart}
                  onClose={this.closeChart}
                />
              </Grid>
              <Grid container>
                <Grid item sm style={doughnut}>
                  <Doughnut
                    height={150}
                    data={this.state.xgData}
                    options={doughnutOptions}
                  />
                </Grid>
                <Grid item sm style={doughnut}>
                  <Doughnut
                    height={150}
                    data={this.state.xaData}
                    options={doughnutOptions}
                  />
                </Grid>
              </Grid>
            </Paper>
          </div>
        )}
      </Fragment>
    );
  }
}

export default Compare;
