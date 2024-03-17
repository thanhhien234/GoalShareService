class Routine extends Subject {
  constructor() {
    super();

    this.myRoutine = [];
    this.popularRoutine = [];
  }

  async update() {
    await $.ajax({
      url: config.serverUrl + "api/routine/participate",
      method: "GET",
      headers: {
        authorization: "Bearer "+ getCookie("accessToken"),
      },
      success: (result) => {
        this.myRoutine = result.data;
      },
      error: (error) => {
        console.log("Error :", error);
      }
    });

    await $.ajax({
      url: config.serverUrl + "api/routine/rank",
      method: "GET",
      success: (result) => {
        this.popularRoutine = result.data;
      },
      error: (error) => {
        console.log("Error :", error);
      }
    });

    this.notifyAll();
  }
}

const routine = new Routine();
const routineRank = new RoutineRank(routine);

routine.subscribe(routineRank);
routine.update();