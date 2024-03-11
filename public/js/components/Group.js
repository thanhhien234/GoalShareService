class Group extends Subject {
    constructor() {
      super();
      this.groupInfo = [];
    }
  
    async update(routineId) {
      await $.ajax({
        url: config.serverUrl + `api/routine?routineId=${routineId}`,
        method: "GET",
        headers: {
          Authorization: "Bearer "+ getCookie("accessToken"),
        },
        success: (res) => {
          this.groupInfo = res.data;
        },
        error: (err) => {
          console.log(err);
        }
      });
      this.notifyAll();
    }
}


