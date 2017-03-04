import assert from "assert";
import sinon from "sinon";
import EventPublisher from "../js/eventPublisher";

describe("EventPublisher", () => {
  let eventPublisher;
  beforeEach(done => {
    eventPublisher = new EventPublisher();
    done();
  });
  describe("#constructor()", () => {
    it("should initialize observeFunctions", () => {
      assert.deepEqual(eventPublisher.observeFunctions, {});
    });
  });
  describe("#subscribe()", () => {
    const subjectName = "test subject";
    const observeFunction = () => {};
    it("should push to observeFunctions", () => {
      eventPublisher.subscribe(subjectName, observeFunction);
      assert(eventPublisher.observeFunctions[subjectName]);
      assert.equal(eventPublisher.observeFunctions[subjectName][0], observeFunction);
    });
  });
  describe("#publish()", () => {
    const subjectName = "test subject";
    const data1 = "test-data-1";
    const data2 = "test-data-2";
    const observeFunction = sinon.spy();
    beforeEach(done => {
      eventPublisher.subscribe(subjectName, observeFunction);
      done();
    });
    it("should call observeFunctions", () => {
      eventPublisher.publish(subjectName, data1, data2);
      assert(observeFunction.withArgs(data1, data2).calledOnce);
    });
  });
  describe("#unsubscribe()", () => {
    const subjectName = "test subject";
    const observeFunction = () => {};
    const observeFunction2 = () => {};
    beforeEach(done => {
      eventPublisher.subscribe(subjectName, observeFunction);
      done();
    });
    it("should remove observeFunction and the array", () => {
      eventPublisher.unsubscribe(subjectName, observeFunction);
      assert(!eventPublisher.observeFunctions[subjectName]);
    });
    it("should remove only observeFunction", () => {
      eventPublisher.subscribe(subjectName, observeFunction2);
      eventPublisher.unsubscribe(subjectName, observeFunction);
      assert(eventPublisher.observeFunctions[subjectName]);
      assert.equal(eventPublisher.observeFunctions[subjectName].length, 1);
    });
    it("should throw error", () => {
      assert.throws(() => {
        eventPublisher.unsubscribe(subjectName, observeFunction2);
      }, Error);
    });
  });
});