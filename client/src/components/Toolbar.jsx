import React, { Component } from "react";
import CanvasStore from "../store/CanvasStore";
import ToolStore from "../store/ToolStore";
import Brush from "../tools/Brush";
import Rect from "../tools/Rect";
import Circle from "../tools/Circle";
import Eraser from "../tools/Eraser";
import "../styles/toolbar.scss";

class Toolbar extends Component {
  state = {};

  useBrush() {
    ToolStore.setTool(new Brush(CanvasStore.canvas));
  }

  useRect() {
    ToolStore.setTool(new Rect(CanvasStore.canvas));
  }

  useCircle() {
    ToolStore.setTool(new Circle(CanvasStore.canvas));
  }

  useEraser() {
    ToolStore.setTool(new Eraser(CanvasStore.canvas));
  }

  changeColor(e) {
    ToolStore.setStrokeColor(e.target.value);
    ToolStore.setFillColor(e.target.value);
  }

  render() {
    return (
      <div className="toolbar">
        <button
          className="toolbar__icon-btn toolbar__icon-btn--brush"
          onClick={() => this.useBrush()}
        ></button>
        <button
          className="toolbar__icon-btn toolbar__icon-btn--rect"
          onClick={() => this.useRect()}
        ></button>
        <button
          className="toolbar__icon-btn toolbar__icon-btn--circle"
          onClick={() => this.useCircle()}
        ></button>
        <button
          className="toolbar__icon-btn toolbar__icon-btn--eraser"
          onClick={() => this.useEraser()}
        ></button>
        <button className="toolbar__icon-btn toolbar__icon-btn--line"></button>
        <input
          onChange={(e) => this.changeColor(e)}
          type="color"
          className="toolbar__icon-btn toolbar__icon-btn--gradient"
        />
        <button className="toolbar__icon-btn toolbar__icon-btn--undo"></button>
        <button className="toolbar__icon-btn toolbar__icon-btn--redo"></button>
        <button className="toolbar__icon-btn toolbar__icon-btn--save"></button>
      </div>
    );
  }
}

export default Toolbar;
