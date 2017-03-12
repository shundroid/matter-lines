# matter-lines

Lines for matter.js

## Getting Started

```bash
$ npm install --save matter-lines
```

(matter.js, poly-decomp.js required)

```js
import { Engine, Render, World, Bodies } from "matter-js";
import Line from "matter-lines";

document.addEventListener("DOMContentLoaded", () => {
  // create an engine
  const engine = Engine.create();

  // create a renderer
  const render = Render.create({
    element: document.body,
    engine
  });

  // create a line
  const line = new Line(engine.world, [
    // points
    { x: 50, y: 50 },
    { x: 100, y: 50 },
    { x: 100, y: 100 }
  ]);

  // run the engine
  Engine.run(engine);

  // run the renderer
  Render.run(render);
});
```

## Examples

Coming soon.

## Documentation

### new Line(world, [defaultPoints = []], [lineWidth = 10], [miterLimit = 10])

- world `Matter.World` : A world of matter.js
- defaultPoints `Matter.Vector[]` : First added points
- lineWidth `number` : Width of the line. [See MDN](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/lineWidth)
- miterLimit `number` : [See MDN](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/miterLimit)

### Line.prototype.addPoint(point)

Add a point to the line.

- point `Matter.Vector` : Added point
