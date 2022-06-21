import React, { Component } from "react";
import ToolStore from "../store/ToolStore";
import "../styles/toolbar.scss";

class SettingBar extends Component {
  state = {};

  render() {
    return (
      <div className="toolbar toolbar--setting">
        <label htmlFor="line-width">Line Thickness</label>
        <input
          onChange={(e) => ToolStore.setLineWidth(e.target.value)}
          id="line-width"
          type="number"
          min={1}
          defaultValue={1}
          max={50}
        />
        <label htmlFor="stroke-color">Stroke Color</label>
        <input
          onChange={(e) => ToolStore.setStrokeColor(e.target.value)}
          id="stroke-color"
          type="color"
        />
      </div>
    );
  }
}

export default SettingBar;
