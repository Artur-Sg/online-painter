import { observer } from "mobx-react-lite";
import { useEffect, useRef } from "react";
import CanvasStore from "../store/CanvasStore";
import ToolStore from "../store/ToolStore";
import Brush from "../tools/Brush";
import "../styles/canvas.scss";

const Canvas = observer(() => {
  const canvasRef = useRef();

  useEffect(() => {
    CanvasStore.setCanvas(canvasRef.current);
    ToolStore.setTool(new Brush(canvasRef.current));
  }, []);

  return (
    <div className="canvas">
      <canvas ref={canvasRef} width={800} height={600}></canvas>
    </div>
  );
});

export default Canvas;
