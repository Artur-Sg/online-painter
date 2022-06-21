import React, { Component } from 'react';
import '../styles/canvas.scss';

class Canvas extends Component {
  state = {  }

  render() { 
    return (
      <div className="canvas">
        <canvas width={800} height={600}></canvas>
      </div>
    );
  }
}

export default Canvas;