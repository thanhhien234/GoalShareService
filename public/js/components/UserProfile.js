class UserProfile extends Observer {
  constructor() {
    super();
    this.userImg = document.querySelector("#user-img");
    this.userId = document.querySelector("#user-id");
    this.userInfo = null;
  }

  getUserInfo() {
    return this.userInfo;
  }

  setUserInfo(user) {
    this.userInfo = user;
  }

  render() {
    if (this.userInfo) {
      this.userImg.src = this.userInfo.image;
      this.userId.textContent = this.userInfo.id;
    }
  }
}
