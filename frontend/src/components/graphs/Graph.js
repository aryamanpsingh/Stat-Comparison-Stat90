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
          label: attribute[0].toUpperCase() + attribute.slice(1),
          data: values,
          backgroundColor: color
        }
      ]
    };
    console.log(data);
    return (
      <HorizontalBar
        data={data}
        height={350}
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
                ticks: {}
              }
            ]
          },
          title: {
            display: true,
            text: attribute[0].toUpperCase() + attribute.slice(1),
            fontSize: 25
          },
          legend: {
            display: false,
            position: "bottom"
          },
          responsive: false,
          maintainAspectRatio: false
        }}
      />
    );
  }
}
export default Graph;
