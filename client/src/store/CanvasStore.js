import { makeAutoObservable } from "mobx";

class CanvasStore {
  canvas = null;

  constructor() {
    makeAutoObservable(this);
  }

  setCanvas(canvas) {
    this.canvas = canvas;
  }
}

export default new CanvasStore();
