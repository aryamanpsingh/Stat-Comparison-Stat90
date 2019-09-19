import React, { Component, Fragment } from "react";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import SettingsIcon from "@material-ui/icons/Settings";

export default function SwitchTab(props) {
  return (
    <Fragment>
      <Tabs
        value={props.year}
        onChange={props.tabChange}
        indicatorColor="primary"
        textColor="primary"
        centered
        style={{ backgroundColor: props.color }}
      >
        <Tab label="2018" value={2018} />
        <Tab label="2019" value={2019} />
        <Tab
          icon={<SettingsIcon />}
          value="settings"
          onClick={props.toggleDrawer("right", true)}
        />
      </Tabs>
    </Fragment>
  );
}
