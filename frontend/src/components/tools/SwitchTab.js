import React, { Component, Fragment } from "react";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import SettingsIcon from "@material-ui/icons/Settings";

export class SwitchTab extends Component {
  render() {
    return (
      <Fragment>
        <Tabs
          value={this.props.year}
          onChange={this.props.tabChange}
          indicatorColor="primary"
          textColor="primary"
          centered
          style={{ backgroundColor: "rgba(179, 103, 102, 0.6)" }}
        >
          <Tab label="2018" value={2018} />
          <Tab label="2019" value={2019} />
          <Tab
            icon={<SettingsIcon />}
            value="settings"
            onClick={this.props.toggleDrawer("right", true)}
          />
        </Tabs>
      </Fragment>
    );
  }
}

export default SwitchTab;
