import Tool from "./Tool";

export default class Circle extends Tool {
  constructor(canvas) {
    super(canvas);
    this.listen();
  }

  listen() {
    this.canvas.onmousemove = this.mouseMoveHandler.bind(this);
    this.canvas.onmousedown = this.mouseDownHandler.bind(this);
    this.canvas.onmouseup = this.mouseUpHandler.bind(this);
  }

  mouseUpHandler(e) {
    this.mouseDown = false;
  }

  mouseDownHandler(e) {
    this.mouseDown = true;
    this.ctx.beginPath();
    this.centerX = e.pageX - e.target.offsetLeft;
    this.centerY = e.pageY - e.target.offsetTop;
    this.saved = this.canvas.toDataURL();
  }

  mouseMoveHandler(e) {
    if (this.mouseDown) {
      this.draw(...this.getCircleCoordinates(e));
    }
  }

  getRadius(currentX, currentY) {
    return Math.sqrt(
      Math.pow(currentX - this.centerX, 2) +
        Math.pow(currentY - this.centerY, 2)
    );
  }

  getCircleCoordinates(e) {
    const radius = this.getRadius(
      e.pageX - e.target.offsetLeft,
      e.pageY - e.target.offsetTop
    );

    return [this.centerX, this.centerY, radius];
  }

  draw(centerX, centerY, radius) {
    const img = new Image();

    img.src = this.saved;

    img.onload = () => {
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      this.ctx.drawImage(img, 0, 0, this.canvas.width, this.canvas.height);
      this.ctx.beginPath();
      this.ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI, false);
      this.ctx.fill();
      this.ctx.stroke();
    };
  }
}
