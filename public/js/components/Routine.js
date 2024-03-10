class Routine extends Subject {
  constructor() {
    super();

    this.myRoutine = [];
    this.popularRoutine = [];
  }

  async update() {
    await $.ajax({
      url: "https://king-seungkyu5.shop/api/routine/participate",
      method: "GET",
      success: (result) => {
        this.myRoutine = result;
      },
      error: (error) => {
        console.log("Error :", error);
      }
    });

    await $.ajax({
      url: "https://king-seungkyu5.shop/api/routine/rank",
      method: "GET",
      success: (result) => {
        this.popularRoutine = result;
      },
      error: (error) => {
        console.log("Error :", error);
      }
    });

    this.notifyAll();
  }
}