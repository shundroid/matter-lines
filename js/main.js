import { Engine, Render, World, Bodies } from "matter-js";

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

  function toRadian(deg) {
    return deg * Math.PI / 180;
  }

  function getLinearFunction(x1, y1, x2, y2) {
    // A1x + B1y = E1
    // A2x + B2y = E2
    // x = (E1 * B2 - B1 * E2) / (A1 * B2 - B1 * A2)
    // y = (E2 * A1 - E1 * A2) / (A1 * B2 - A2 * B1)

    // x: a, y: b
    // A1: x1, B1: 1, E1: y1
    // A2: x2, B2: 1, E2: y2
    const a = (y1 - y2) / (x1 - x2);
    const b = (y2 * x1 - y1 * x2) / (x1 - x2);
    return { a, b };
  }

  const lineWidth = 10;
  const canvas = document.getElementById("canvas");
  const ctx = canvas.getContext("2d");

  const points = [
    { x: 250, y: 70 },
    { x: 150, y: 100 },
    { x: 100, y: 40 }
  ];

  const outsideLine = [];
  const insideLine = [];

  ctx.strokeStyle = "black";
  ctx.beginPath();
  points.forEach((vector, index) => {
    if (index === 0) {
      ctx.moveTo(vector.x, vector.y);
      let rad = Math.atan2(points[index + 1].y - vector.y, points[index + 1].x - vector.x);
      rad += toRadian(-90);
      outsideLine.push({ x: vector.x + Math.cos(rad) * lineWidth, y: vector.y + Math.sin(rad) * lineWidth });
      rad += toRadian(180);
      insideLine.push({ x: vector.x + Math.cos(rad) * lineWidth, y: vector.y + Math.sin(rad) * lineWidth });
    } else if (index === points.length - 1) {
      let rad = Math.atan2(vector.y - points[index - 1].y, vector.x - points[index - 1].x);
      rad += toRadian(-90);
      outsideLine.push({ x: vector.x + Math.cos(rad) * lineWidth, y: vector.y + Math.sin(rad) * lineWidth });
      rad += toRadian(180);
      insideLine.push({ x: vector.x + Math.cos(rad) * lineWidth, y: vector.y + Math.sin(rad) * lineWidth });
    } else {
      let rad1 = Math.atan2(points[index - 1].y - vector.y,  points[index - 1].x - vector.x);
      let rad2 = Math.atan2(points[index + 1].y - vector.y,  points[index + 1].x - vector.x);
      if (rad1 < 0) rad1 += toRadian(360);
      if (rad2 < 0) rad2 += toRadian(360);
      let rad = (rad2 - rad1) / 2;
      console.log(rad * 180 / Math.PI, rad1 * 180 / Math.PI, rad2 * 180 / Math.PI);
      const y = lineWidth;
      const x = Math.cos(rad) * lineWidth / Math.sin(rad);
      // 回転移動させる
      const rx = x * Math.cos(rad1) - y * Math.sin(rad1);
      const ry = x * Math.sin(rad1) + y * Math.cos(rad1);
      outsideLine.push({ x: vector.x + rx, y: vector.y + ry });
      insideLine.push({ x: vector.x - rx, y: vector.y - ry });
    }
    ctx.lineTo(vector.x, vector.y);
  });
  ctx.stroke();

  ctx.strokeStyle = "red";
  ctx.beginPath();
  outsideLine.forEach((vector, index) => {
    if (index === 0) {
      ctx.moveTo(vector.x, vector.y);
    } else {
      ctx.lineTo(vector.x, vector.y);
    }
  });
  ctx.stroke();

  ctx.strokeStyle = "blue";
  ctx.beginPath();
  insideLine.forEach((vector, index) => {
    if (index === 0) {
      ctx.moveTo(vector.x, vector.y);
    } else {
      ctx.lineTo(vector.x, vector.y);
    }
  });
  ctx.stroke();
});
