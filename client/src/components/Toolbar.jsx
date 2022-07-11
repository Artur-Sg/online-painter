import React, { Component } from 'react';
import CanvasStore from '../store/CanvasStore';
import ToolStore from '../store/ToolStore';
import Brush from '../tools/Brush';
import Rect from '../tools/Rect';
import Circle from '../tools/Circle';
import Eraser from '../tools/Eraser';
import Line from '../tools/Line';
import '../styles/toolbar.scss';

class Toolbar extends Component {
  state = {};

  useBrush() {
    ToolStore.setTool(
      new Brush(CanvasStore.canvas, CanvasStore.socket, CanvasStore.sessionId)
    );
  }

  useLine() {
    ToolStore.setTool(
      new Line(CanvasStore.canvas, CanvasStore.socket, CanvasStore.sessionId)
    );
  }

  useRect() {
    ToolStore.setTool(
      new Rect(CanvasStore.canvas, CanvasStore.socket, CanvasStore.sessionId)
    );
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

  downloadImage = () => {
    const dataUrl = CanvasStore.canvas.toDataURL();
    const a = document.createElement('a');

    a.href = dataUrl;
    a.download = `${CanvasStore.sessionId}.png`;

    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

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
        <button
          className="toolbar__icon-btn toolbar__icon-btn--line"
          onClick={() => this.useLine()}
        ></button>
        <input
          onChange={(e) => this.changeColor(e)}
          type="color"
          className="toolbar__icon-btn toolbar__icon-btn--gradient"
        />
        <button
          className="toolbar__icon-btn toolbar__icon-btn--undo"
          onClick={() => CanvasStore.undo()}
        ></button>
        <button
          className="toolbar__icon-btn toolbar__icon-btn--redo"
          onClick={() => CanvasStore.redo()}
        ></button>
        <button
          className="toolbar__icon-btn toolbar__icon-btn--save"
          onClick={() => this.downloadImage()}
        ></button>
      </div>
    );
  }
}

export default Toolbar;
