export default class Line {
  constructor(defaultPoints = [], lineWidth = 10) {
    this.points = defaultPoints;
    this.outsidePoints = [];
    this.insidePoints = [];
    this.lineWidth = lineWidth;

    if (this.points.length > 0) {
      this.calculatePoints();
    }
  }
  addPoint(point) {
    this.points.push(point);
  }
  calculatePoints() {
    this.outsidePoints = [];
    this.insidePoints = [];
    this.points.forEach((point, index) => {
      if (index === 0) {
        const rad =
          Math.atan2(this.points[index + 1].y - point.y, this.points[index + 1].x - point.x) - Math.PI / 2;
        const sin = Math.sin(rad) * this.lineWidth;
        const cos = Math.cos(rad) * this.lineWidth;
        this.outsidePoints.push({ x: point.x + cos, y: point.y + sin });
        this.insidePoints.push({ x: point.x - cos, y: point.y - sin });
      } else if (index === this.points.length - 1) {
        const rad =
          Math.atan2(point.y - this.points[index - 1].y, point.x - this.points[index - 1].x) - Math.PI / 2;
        const sin = Math.sin(rad) * this.lineWidth;
        const cos = Math.cos(rad) * this.lineWidth;
        this.outsidePoints.push({ x: point.x + cos, y: point.y + sin });
        this.insidePoints.push({ x: point.x - cos, y: point.y - sin });
      } else {
        let rad1 = Math.atan2(this.points[index - 1].y - point.y, this.points[index - 1].x - point.x);
        let rad2 = Math.atan2(this.points[index + 1].y - point.y, this.points[index + 1].x - point.x);
        if (rad1 < 0) rad1 += Math.PI * 2;
        if (rad2 < 0) rad2 += Math.PI * 2;
        const rad = (rad2 - rad1) / 2;
        const x = Math.cos(rad) * this.lineWidth / Math.sin(rad);
        const y = this.lineWidth;
        // 回転移動させる
        const rx = x * Math.cos(rad1) - y * Math.sin(rad1);
        const ry = x * Math.sin(rad1) + y * Math.cos(rad1);
        this.outsidePoints.push({ x: point.x + rx, y: point.y + ry });
        this.insidePoints.push({ x: point.x - rx, y: point.y - ry });
      }
    });
  }
  getVertices() {
    return this.outsidePoints.concat(this.insidePoints.reverse());
  }
}