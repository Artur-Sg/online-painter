import { observer } from 'mobx-react-lite';
import { useEffect, useRef, useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import Line from '../tools/Line';
import CanvasStore from '../store/CanvasStore';
import ToolStore from '../store/ToolStore';
import Brush from '../tools/Brush';
import Rect from '../tools/Rect';
import axios from 'axios';
import '../styles/canvas.scss';

const Canvas = observer(() => {
  const canvasRef = useRef();
  const usernameRef = useRef();
  const [modal, setModal] = useState(true);
  const params = useParams();

  useEffect(() => {
    const url = `${process.env.REACT_APP_URL}/image?id=${params.id}`;

    CanvasStore.setCanvas(canvasRef.current);
    let ctx = canvasRef.current.getContext('2d');

    axios.get(url).then((resp) => {
      const img = new Image();
      img.src = resp.data;

      img.onload = () => {
        const width = canvasRef.current.width;
        const height = canvasRef.current.height;

        ctx.clearRect(0, 0, width, height);
        ctx.drawImage(img, 0, 0, width, height);
        ctx.stroke();
      };
    });
  }, []);

  useEffect(() => {
    if (CanvasStore.userName) {
      const socket = new WebSocket(process.env.REACT_APP_WS);

      CanvasStore.setSocket(socket);
      CanvasStore.setSessionId(params.id);
      ToolStore.setTool(new Brush(canvasRef.current, socket, params.id));

      socket.onopen = () => {
        socket.send(
          JSON.stringify({
            id: params.id,
            username: CanvasStore.userName,
            method: 'connection',
          })
        );
      };

      socket.onmessage = (event) => {
        const msg = JSON.parse(event.data);

        switch (msg.method) {
          case 'connection':
            console.log(`User ${msg.username} connected`);
            break;

          case 'draw':
            drawHandler(msg);
            break;

          default:
            break;
        }
      };
    }
  }, [CanvasStore.userName]);

  const drawHandler = (msg) => {
    const figure = msg.figure;
    const ctx = canvasRef.current.getContext('2d');

    switch (figure.type) {
      case 'brush':
        Brush.draw(ctx, figure.x, figure.y);
        break;

      case 'line':
        Line.draw(ctx, figure.x, figure.y);
        break;

      case 'rect':
        Rect.staticDraw(ctx, figure);
        break;

      case 'finish':
        ctx.beginPath();
        break;

      default:
        break;
    }
  };

  const mouseDownHandler = () => {
    CanvasStore.pushToUndo(canvasRef.current.toDataURL());

    const url = `${process.env.REACT_APP_URL}/image?id=${params.id}`;

    axios.post(url, { img: canvasRef.current.toDataURL() }).then((resp) => {
      console.log(resp.data);
    });
  };

  const connectionHandler = () => {
    CanvasStore.setUserName(usernameRef.current.value);
    setModal(false);
  };

  return (
    <div className="canvas">
      <Modal show={modal} onHide={() => {}}>
        <Modal.Header>
          <Modal.Title>Enter your name</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <input type="text" ref={usernameRef} />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => connectionHandler()}>
            Enter
          </Button>
        </Modal.Footer>
      </Modal>
      <canvas
        onMouseDown={() => mouseDownHandler()}
        ref={canvasRef}
        width={800}
        height={600}
      ></canvas>
    </div>
  );
});

export default Canvas;
