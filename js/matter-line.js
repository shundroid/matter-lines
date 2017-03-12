import Line from "./line";
import { Bodies, World, Body, Vertices } from "matter-js";
import { EventEmitter } from "events";
export default class MatterLine extends Line {
  constructor(world, defaultPoints = [], lineWidth = 10, miterLimit = 10) {
    super(defaultPoints, lineWidth, miterLimit);
    this.world = world;
    this.body = null;
    this.generateBody();
  }
  addPoint(point) {
    super.addPoint(point);
    this.generateBody();
  }
  generateBody() {
    const vertices = this.getVertices();
    if (vertices.length <= 2) {
      if (this.body !== null) {
        World.remove(this.world, this.body);
      }
      this.body = null;
    } else {
      if (this.body !== null) {
        World.remove(this.world, this.body);
      }
      this.body = Bodies.fromVertices(0, 0, vertices);
      World.add(this.world, this.body);
      Body.setPosition(this.body, {
        x: this.body.position.x - this.body.bounds.min.x + 10,
        y: this.body.position.y - this.body.bounds.min.y
      });
      Body.setStatic(this.body, true);
    }
  }
}