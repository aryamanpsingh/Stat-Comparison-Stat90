import React, { Component } from "react";
import { render } from "react-dom";
import { Chart } from "frappe-charts/dist/frappe-charts.esm.js";

class graph extends Component {
  constructor() {
    super();
    this.state = {
      name: "React"
    };
  }

  componentDidMount() {
    const chart = new Chart("#chart", {
      // or a DOM element,
      // new Chart() in case of ES6 module with above usage
      title: "My Awesome Chart",
      data: data,
      type: "axis-mixed", // or 'bar', 'line', 'scatter', 'pie', 'percentage'
      height: 250,
      colors: ["#7cd6fd", "#743ee2"]
    });
  }

  render() {
    let ty;
    return (
      <div>
        <p>Start editing to see some magic happen :)</p>
        <div className="chart" id="chart" />
      </div>
    );
  }
}
const data = {
  labels: [
    "12am-3am",
    "3am-6pm",
    "6am-9am",
    "9am-12am",
    "12pm-3pm",
    "3pm-6pm",
    "6pm-9pm",
    "9am-12am"
  ],
  datasets: [
    {
      name: "Some Data",
      chartType: "bar",
      values: [25, 40, 30, 35, 8, 52, 17, -4]
    },
    {
      name: "Another Set",
      chartType: "bar",
      values: [25, 50, -10, 15, 18, 32, 27, 14]
    }
  ]
};
export default graph;
