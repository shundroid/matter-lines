export default class EventPublisher {
  constructor() {
    this.observeFunctions = {};
  }
  subscribe(subjectName, observeFunction) {
    if (!this.observeFunctions[subjectName]) {
      this.observeFunctions[subjectName] = [];
    }
    this.observeFunctions[subjectName].push(observeFunction);
  }
  publish(subjectName, ...data) {
    if (this.observeFunctions[subjectName]) {
      this.observeFunctions[subjectName].forEach(observeFunction => {
        observeFunction(...data);
      });
    }
  }
  unsubscribe(subjectName, observeFunction) {
    if (!this.observeFunctions[subjectName]) {
      throw new Error("The observeFunction's array was not found.");
    }
    const index = this.observeFunctions[subjectName].indexOf(observeFunction);
    if (index === -1) {
      throw new Error("The observeFunction was not found.");
    }
    this.observeFunctions[subjectName].splice(index, 1);
    if (this.observeFunctions[subjectName].length === 0) {
      delete this.observeFunctions[subjectName];
    }
  }
}