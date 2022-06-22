import { makeAutoObservable } from "mobx";

class CanvasStore {
  canvas = null;
  socket = null;
  sessionId = null;
  undoList = [];
  redoList = [];
  userName = "";

  constructor() {
    makeAutoObservable(this);
  }

  setCanvas(canvas) {
    this.canvas = canvas;
  }

  setSessionId(id) {
    this.sessionId = id;
  }

  setSocket(socket) {
    this.socket = socket;
  }

  setUserName(userName) {
    this.userName = userName;
  }

  pushToUndo(data) {
    this.undoList.push(data);
  }

  pushToRedo(data) {
    this.redoList.push(data);
  }

  drawImage(context, image) {
    image.onload = () => {
      context.clearRect(0, 0, this.canvas.width, this.canvas.height);
      context.drawImage(image, 0, 0, this.canvas.width, this.canvas.height);
    };
  }

  undo() {
    let ctx = this.canvas.getContext("2d");
    if (this.undoList.length) {
      let dataUrl = this.undoList.pop();
      let img = new Image();

      img.src = dataUrl;

      this.redoList.push(this.canvas.toDataURL());
      this.drawImage(ctx, img);
    } else {
      ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
  }

  redo() {
    let ctx = this.canvas.getContext("2d");
    if (this.redoList.length) {
      let dataUrl = this.redoList.pop();
      let img = new Image();

      img.src = dataUrl;

      this.undoList.push(this.canvas.toDataURL());
      this.drawImage(ctx, img);
    }
  }
}

export default new CanvasStore();
