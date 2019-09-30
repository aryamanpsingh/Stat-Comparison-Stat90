import React, { Component, Fragment } from "react";
import store from "../../store";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Chart } from "frappe-charts/dist/frappe-charts.esm.js";
import { HorizontalBar, Bar, Line, Pie } from "react-chartjs-2";

export class Graph extends Component {
  static propTypes = {
    length: PropTypes.number.isRequired,
    players: PropTypes.array.isRequired,
    attribute: PropTypes.string.isRequired,
    color: PropTypes.string.isRequired
  };
  state = {};
  render() {
    let length = this.props.length;
    let attribute = this.props.attribute;
    let players = this.props.players;
    let height, width;
    this.props.height ? (height = this.props.height) : (height = 350);
    this.props.width ? (width = this.props.width) : (width = 400);

    let color = this.props.color;
    console.log(color);
    players.sort(function(a, b) {
      return b[attribute] - a[attribute];
    });
    players = players.slice(0, length);
    let values = players.map(a => a[attribute]);
    let names;
    if (this.props.type == "player") {
      names = players.map(
        a =>
          a.name.split(" ")[1] +
          (a.name.split(" ")[2] ? " " + a.name.split(" ")[2] : "")
      );
    } else names = players.map(a => a.name);
    /*
    let lastNames = [];
    for (name in names) {
      lastNames.push(name.split(" ")[0]);
    }*/
    const data = {
      labels: names,
      datasets: [
        {
          label: attribute[0].toUpperCase() + attribute.slice(1),
          data: values,
          backgroundColor: color
        }
      ]
    };
    console.log(data);
    return (
      <Fragment>
        <div style={{ textAlign: "center" }}>
          <HorizontalBar
            onElementsClick={() => this.props.showDetailedView(attribute)}
            data={data}
            height={height}
            width={width}
            options={{
              layout: {
                padding: {
                  left: 50,
                  right: 0,
                  top: 0,
                  bottom: 0
                }
              },
              scales: {
                xAxes: [
                  {
                    ticks: {
                      beginAtZero: true,
                      stepSize: 1
                    }
                  }
                ],
                yAxes: [
                  {
                    ticks: {
                      display: true,
                      fontColor: "white"
                    }
                  }
                ]
              },
              title: {
                display: true,
                text: attribute[0].toUpperCase() + attribute.slice(1),
                fontSize: 18,
                fontColor: "white"
              },
              legend: {
                display: false,
                position: "bottom",
                fontColor: "white"
              },
              responsive: false,
              maintainAspectRatio: true,
              scaleShowLabels: false
            }}
          />
        </div>
      </Fragment>
    );
  }
}
export default Graph;
