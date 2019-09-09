import React, { Component } from "react";
import store from "../../store";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Chart } from "frappe-charts/dist/frappe-charts.esm.js";
import { HorizontalBar, Bar, Line, Pie } from "react-chartjs-2";

export class Graph extends Component {
  state = {};
  render() {
    let length = this.props.length;
    let attribute = this.props.attribute;
    let players = this.props.players;

    let color = this.props.color;
    players.sort(function(a, b) {
      return b[attribute] - a[attribute];
    });
    players = players.slice(0, length);
    let values = players.map(a => a[attribute]);
    let names = players.map(a => a.name);

    const data = {
      labels: names,
      datasets: [
        {
          label: attribute,
          data: values,
          backgroundColor: color
        }
      ]
    };
    console.log(data);
    return (
      <HorizontalBar
        data={data}
        height={400}
        options={{
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
                ticks: {}
              }
            ]
          },
          title: {
            display: true,
            text: attribute,
            fontSize: 25
          },
          legend: {
            display: false,
            position: "bottom"
          },
          responsive: true,
          maintainAspectRatio: false
        }}
      />
    );
  }
}
export default Graph;
