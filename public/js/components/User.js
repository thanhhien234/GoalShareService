class User extends Subject {
    constructor() {
      super();
      this.myInfo = [];
    }
  
    async update() {
      await $.ajax({
        url: config.serverUrl + `api/user`,
        method: "GET",
        headers: {
          Authorization: "Bearer "+ getCookie("accessToken"),
        },
        success: (res) => {
          this.myInfo = res.data;
        },
        error: (err) => {
          console.log(err);
        }
      });
      this.notifyAll();
    }
}

