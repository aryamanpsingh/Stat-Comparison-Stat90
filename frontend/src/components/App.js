import React, { Component, Fragment } from "react";
import ReactDOM from "react-dom";
import store from "../store";
import { Provider } from "react-redux";
import { getPlayers } from "../actions/players";
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import Index from "./pages/index";

class App extends Component {
  componentDidMount() {
    store.dispatch(getPlayers());
    console.log("disp");
  }
  render() {
    return (
      <Provider store={store}>
        <Router>
          <Switch>
            <Route exact path="/" component={Index} />
          </Switch>
        </Router>
      </Provider>
    );
  }
}
ReactDOM.render(<App />, document.getElementById("app"));
