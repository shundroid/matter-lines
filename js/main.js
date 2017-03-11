import { Engine, Render, World, Bodies } from "matter-js";
import Line from "./line";

document.addEventListener("DOMContentLoaded", () => {
/*  // create an engine
  var engine = Engine.create();

  // create a renderer
  var render = Render.create({
      element: document.body,
      engine: engine
  });

  // create two boxes and a ground
  var boxA = Bodies.rectangle(400, 200, 80, 80);
  var boxB = Bodies.fromVertices(450, 50, [
    { x: 0, y: 0 },
    { x: 100, y: 0 },
    { x: 100, y: 100 }
  ]);
  var ground = Bodies.rectangle(400, 610, 810, 60, { isStatic: true });

  // add all of the bodies to the world
  World.add(engine.world, [boxA, boxB, ground]);

  // run the engine
  Engine.run(engine);

  // run the renderer
  Render.run(render);

  setInterval(() => {
    boxB.vertices[0].y = 0;
  }, 100);*/

  const canvas = document.getElementById("canvas");
  const ctx = canvas.getContext("2d");

  const line = new Line([
    { x: 50, y: 80 },
    { x: 200, y: 100 },
    { x: 50, y: 110 }
  ]);

  let count = 0;
  function tick() {
    if (++count === 10) {
      count = 0;
      line.clear();
    }
    //line.addPoint({ x: Math.random() * canvas.width, y: Math.random() * canvas.height });
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.strokeStyle = "red";
    ctx.beginPath();
    line.points.forEach((point, index) => {
      if (index === 0) {
        ctx.moveTo(point.x, point.y);
      } else {
        ctx.lineTo(point.x, point.y);
      }
    });
    ctx.stroke();

    ctx.strokeStyle = "black";
    ctx.beginPath();
    const vertices = line.outsidePoints;
    vertices.forEach((point, index) => {
      if (index === 0) {
        ctx.lineTo(point.x, point.y);
      } else {
        ctx.lineTo(point.x, point.y);
      }
    });
    ctx.stroke();
  }
  setTimeout(tick, 100);
});
