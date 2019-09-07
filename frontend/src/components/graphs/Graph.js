import React, { Component } from "react";
import store from "../../store";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Chart } from "frappe-charts/dist/frappe-charts.esm.js";
import { HorizontalBar, Bar, Line, Pie } from "react-chartjs-2";

export class Graph extends Component {
  state = {};
  static propTypes = {
    players: PropTypes.array.isRequired
  };
  /*
  componentDidUpdate() {
    let length = this.props.length;
    let attribute = this.props.attribute;
    let players = this.props.players;
    players.sort(function(a, b) {
      return b[attribute] - a[attribute];
    });
    players = players.slice(0, length);
    players.sort(function(a, b) {
      return a[attribute] - b[attribute];
    });
    let values = players.map(a => a[attribute]);
    let names = players.map(a => a.name);

    console.log(values);
    const data = {
      labels: names,
      datasets: [
        {
          name: { attribute },
          chartType: "line",
          values: values
        }
      ]
    };
    let cname = `#chart-${attribute}`;
    console.log(cname);
    const chart = new Chart(cname, {
      // or a DOM element,
      // new Chart() in case of ES6 module with above usage
      title: attribute,
      data: data,
      type: "axis-mixed", // or 'bar', 'line', 'scatter', 'pie', 'percentage'
      height: 250,
      colors: ["#7cd6fd", "#743ee2"]
    });
  }*/
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
      /*
      <div className={cname} id={cname} />
      <div>
        {players.map((player, idx) => (
          <tr key={idx}>
            <td
              key={player.name}
              name={player.name}
              className="name"
              value={player.name}
            >
              <h4>{player.name}</h4>
            </td>
            <td
              key={player[attribute]}
              name={player[attribute]}
              className="goals"
              value={player[attribute]}
            >
              <h4>{player[attribute]}</h4>
            </td>
          </tr>
        ))}
      </div>*/
    );
  }
}
const mapStateToProps = state => ({
  players: state.players.players
});
export default connect(mapStateToProps)(Graph);
