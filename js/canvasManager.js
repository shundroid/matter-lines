export default class CanvasManager {
  constructor(publisher, element) {
    this.publisher = publisher;
    this.element = element;
    this.isMousedown = false;
    this.initializeElement();
  }
  initializeElement() {
    this.element.addEventListener("mousedown", this.setMousedown);
    this.element.addEventListener("mouseup", this.setMouseup);
    this.element.addEventListener("mousemove", this.checkDrag);
  }
  setMousedown() {
    this.isMousedown = true;
  }
  setMouseup() {
    this.isMousedown = false;
  }
  checkDrag(event) {
    if (this.isMousedown) {
      this.publisher.publish("drag");
    }
  }
}