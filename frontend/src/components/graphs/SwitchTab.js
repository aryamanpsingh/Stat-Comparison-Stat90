import React, { Component, Fragment } from "react";
import Paper from "@material-ui/core/Paper";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";

export class SwitchTab extends Component {
  render() {
    return (
      <Fragment>
        <Paper className="switch">
          <Tabs
            value={this.props.year}
            onChange={this.props.tabChange}
            indicatorColor="primary"
            textColor="primary"
            centered
          >
            <Tab label="2018" value={2018} />
            <Tab label="2019" value={2019} />
          </Tabs>
        </Paper>
      </Fragment>
    );
  }
}

export default SwitchTab;
