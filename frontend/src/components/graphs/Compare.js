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
import { Input } from "@material-ui/core";

const style = {
  background: "white",
  border: 1,
  color: "black"
};
const chart = {
  justifyContent: "center",
  margin: "auto"
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

  render() {
    let suggestions = this.state.suggestions;
    console.log(this.state.suggestions[1].length);
    this.items = this.props.players;
    let name = this.state.player.map(name => name.name);
    return (
      <Fragment>
        <Typography variant="h5" gutterBottom>
          compare any 2 {this.props.type}s.
        </Typography>
        <form autoComplete="off">
          <div className="AutoComplete" style={AutoComplete}>
            <input
              type="text"
              style={AutoComplete.input}
              id="name"
              label="Name"
              className="name"
              value={this.state.player[0].name}
              onChange={this.handleChange(0)}
              onKeyDown={this.handleKeyDown(0, suggestions)}
            />
            {this.state.suggestions[0].length > 0 && (
              <ul style={AutoComplete.ul}>
                {this.state.suggestions[0].map((item, key) => (
                  <li
                    style={
                      this.state.cursor[0] === key
                        ? AutoComplete.liCurrent
                        : AutoComplete.li
                    }
                    key={key}
                    value={item.name}
                    onClick={this.setValue(0, item.name)}
                  >
                    {item.name}
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="AutoComplete" style={AutoComplete}>
            <input
              type="text"
              style={AutoComplete.input}
              id="name"
              label="Name"
              className="name"
              value={this.state.player[1].name}
              onChange={this.handleChange(1)}
              onKeyDown={this.handleKeyDown(1, suggestions)}
            />
            {this.state.suggestions[1].length > 0 && (
              <ul style={AutoComplete.ul}>
                {this.state.suggestions[1].map((item, key) => (
                  <li
                    style={
                      this.state.cursor[1] === key
                        ? AutoComplete.liCurrent
                        : AutoComplete.li
                    }
                    key={key}
                    value={item.name}
                    onClick={this.setValue(1, item.name)}
                  >
                    {item.name}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </form>
        <Button
          variant="contained"
          color="primary"
          className="submit"
          onClick={this.handleSubmit}
          fullWidth={true}
          style={{ marginTop: "20px" }}
        ></Button>

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
          <div ref={node => (this.node = node)}>
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
                onClose={this.closeChart}
              />
            </Paper>
          </div>
        )}
      </Fragment>
    );
  }
}

export default Compare;
