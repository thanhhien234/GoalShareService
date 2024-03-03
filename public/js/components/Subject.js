class Subject {
    constructor() {
      this.observers = [];
    }
  
    subscribe(observer) {
      this.observers.push(observer);
    }
  
    unsubscribe(observer) {
      this.observers = this.observers.filter(
        (observers) => observers !== observer
      );
    }
  
    notifyAll() {
      this.observers.forEach((observer) => {
        observer.notify();
      });
    }
  }