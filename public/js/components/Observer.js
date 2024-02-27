class Observer {
  constructor() {
    if(this.constructor === Observer) {
      throw new Error("Observer is a Abstract Class.");
    }
  }

  notify() {
    throw new Error("notify method has to be overrided");
  }
}