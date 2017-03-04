import assert from "assert";
import sinon from "sinon";
import CanvasManager from "../js/canvasManager";
import EventPublisher from "../js/eventPublisher";

describe("CanvasManager", () => {
  const publisher = new EventPublisher();
  const element = { addEventListener() {} };
  let canvasManager;
  beforeEach(done => {
    canvasManager = new CanvasManager(publisher, element);
    done();
  });
  describe("#constructor()", () => {
    it("should initialize publisher", () => {
      assert.equal(canvasManager.publisher, publisher);
    });
    it("should initialize element", () => {
      assert.equal(canvasManager.element, element);
    });
    it("should initialize isMousedown", () => {
      assert.equal(canvasManager.isMousedown, false);
    });
  });
  describe("#initializeElement()", () => {
    let spy;
    beforeEach(done => {
      spy = sinon.spy(element, "addEventListener");
      done();
    });
    afterEach(done => {
      spy.restore();
      done();
    })
    it("should set listeners", () => {
      canvasManager.initializeElement();
      assert(spy.withArgs("mousedown", canvasManager.setMousedown).calledOnce);
      assert(spy.withArgs("mousemove", canvasManager.checkDrag).calledOnce);
      assert(spy.withArgs("mouseup", canvasManager.setMouseup).calledOnce);
    });
  });
  describe("#setMousedown()", () => {
    beforeEach(done => {
      canvasManager.isMousedown = false;
      done();
    });
    it("should set isMousedown to true", () => {
      assert(!canvasManager.isMousedown);
      canvasManager.setMousedown();
      assert(canvasManager.isMousedown);
    });
  });
  describe("#setMouseup()", () => {
    beforeEach(done => {
      canvasManager.isMousedown = true;
      done();
    });
    it("should set isMousedown to false", () => {
      assert(canvasManager.isMousedown);
      canvasManager.setMouseup();
      assert(!canvasManager.isMousedown);
    });
  });
  describe("#checkDrag()", () => {
    let spy;
    beforeEach(done => {
      spy = sinon.spy();
      publisher.subscribe("drag", spy);
      done();
    });
    afterEach(done => {
      publisher.unsubscribe("drag", spy);
      done();
    });
    it("should publish drag when isMousedown is true", () => {
      canvasManager.isMousedown = true;
      canvasManager.checkDrag();
      assert(spy.calledOnce);
    });
    it("should not publish drag when isMousedown is false", () => {
      canvasManager.isMousedown = false;
      canvasManager.checkDrag();
      assert(!spy.calledOnce);
    });
  });
});
