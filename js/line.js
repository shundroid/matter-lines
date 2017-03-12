export default class Line {
  constructor(defaultPoints = [], lineWidth = 10, miterLimit = 10) {
    this.points = defaultPoints;
    this.outsidePoints = [];
    this.insidePoints = [];
    this.lineWidth = lineWidth;
    this.miterLimit = miterLimit;

    if (this.points.length > 0) {
      this.calculatePoints();
    }
  }
  clear() {
    this.points = [];
    this.outsidePoints = [];
    this.insidePoints = [];
  }
  addPoint(point) {
    this.points.push(point);
    this.calculatePoints();
  }
  calculatePoints() {
    this.outsidePoints = [];
    this.insidePoints = [];
    if (this.points.length <= 1) return;
    for (let index = 0; index < this.points.length; index++) {
      if (index === 0) {
        this.calculateFirstPoint(index);
      } else if (index === this.points.length - 1) {
        this.calculateLastPoint(index);
      } else {
        this.calculateMiddlePoint(index);
      }
    }
  }
  calculateFirstPoint(index) {
    const point = this.points[index];
    const afterPoint = this.points[index + 1];
    const rad =
      Math.atan2(afterPoint.y - point.y, afterPoint.x - point.x) - Math.PI / 2;
    const sin = Math.sin(rad) * this.lineWidth;
    const cos = Math.cos(rad) * this.lineWidth;
    this.outsidePoints.push({ x: point.x + cos, y: point.y + sin });
    this.insidePoints.push({ x: point.x - cos, y: point.y - sin });
  }
  calculateLastPoint(index) {
    const point = this.points[index];
    const beforePoint = this.points[index];
    const rad =
      Math.atan2(this.points[index - 1].y - point.y, this.points[index - 1].x - point.x) + Math.PI / 2;
    const sin = Math.sin(rad) * this.lineWidth;
    const cos = Math.cos(rad) * this.lineWidth;
    this.outsidePoints.push({ x: point.x + cos, y: point.y + sin });
    this.insidePoints.push({ x: point.x - cos, y: point.y - sin });
  }
  calculateMiddlePoint(index) {
    const point = this.points[index];
    let rad1 = Math.atan2(this.points[index - 1].y - point.y, this.points[index - 1].x - point.x);
    let rad2 = Math.atan2(this.points[index + 1].y - point.y, this.points[index + 1].x - point.x);
    // rad1 = 0° にした、二等分線になっている
    const rad = (rad2 - rad1) / 2;
    const x = Math.cos(rad) * this.lineWidth / Math.sin(rad);
    const y = this.lineWidth;
    const distance = getDistance({ x: 0, y: 0 }, { x, y });
    // 回転移動させる
    const rx = x * Math.cos(rad1) - y * Math.sin(rad1);
    const ry = x * Math.sin(rad1) + y * Math.cos(rad1);
    rad1 -= Math.PI / 2;
    rad2 += Math.PI / 2;
    if (distance > this.miterLimit && x < 0) {
      this.outsidePoints.push({ x: point.x - Math.cos(rad1) * this.lineWidth, y: point.y - Math.sin(rad1) * this.lineWidth });
      this.outsidePoints.push({ x: point.x - Math.cos(rad2) * this.lineWidth, y: point.y - Math.sin(rad2) * this.lineWidth });
    } else {
      this.outsidePoints.push({ x: point.x + rx, y: point.y + ry });
    }
    if (distance > this.miterLimit && x >= 0) {
      this.insidePoints.push({ x: point.x + Math.cos(rad1) * this.lineWidth, y: point.y + Math.sin(rad1) * this.lineWidth });
      this.insidePoints.push({ x: point.x + Math.cos(rad2) * this.lineWidth, y: point.y + Math.sin(rad2) * this.lineWidth });
    } else {
      this.insidePoints.push({ x: point.x - rx, y: point.y - ry });
    }
  }
  getVertices() {
    const vertices = this.outsidePoints.concat(this.insidePoints.reverse());
    this.insidePoints.reverse();
    return vertices;
  }
}

function getDistance(point1, point2) {
  // 三平方の定理
  const a = Math.abs(point1.x - point2.x);
  const b = Math.abs(point1.y - point2.y);
  return Math.sqrt(a * a + b * b);
}