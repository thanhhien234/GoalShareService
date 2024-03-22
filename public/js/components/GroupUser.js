class GroupUser extends Observer {
  constructor() {
    super();

    this.groupUser = [];
    this.colorSet = ["#5A189A", "#7B2CBF", "#9D4EDD", "#C77DFF", "#C8B6FF", "#D9ED92", "#DDE7C7", "#B5E48C", "#9747FF", "#E0AAFF"];

    this.groupMemberContainer = document.querySelector(".group-member-container");
  }

  get GroupUser() {
    return this.groupUser;
  }

  set GroupUser(newGroupUser) {
    this.groupUser = newGroupUser;
    this.render();
  }

  render() {
    this.groupMemberContainer.innerHTML = "";

    this.groupUser.forEach((_groupUser) => {
      // make groupUser component
      const groupMemberDiv = document.createElement("div");

      groupMemberDiv.classList.add("group-member-wrapper");

      groupMemberDiv.innerHTML = `
        <div class="group-member">
          <img class="group-member-image" src="${_groupUser.profilePic}" alt="">
          <div class="group-member-hover">
            <div class="group-member-layer"></div>
              <div class="group-member-info">
                <p class="group-member-nickname">${_groupUser.nickname}</p>
                <p class="group-member-persent">${_groupUser.persent}%</p>
              </div>
            </div>
          </div>
        </div>
      `;

      // set groupUser color
      const groupUserColor = this.colorSet[Math.floor(Math.random() * this.colorSet.length)];

      const gradientStyle = `background: conic-gradient(var(--color-grey3) 0 ${100 - _groupUser.persent}%, ${groupUserColor} 0 100%)`;
      groupMemberDiv.style.background = gradientStyle;

      const groupUserNickname = groupMemberDiv.querySelector(".group-member-nickname");
      const groupUserPersent = groupMemberDiv.querySelector(".group-member-persent");
      groupUserNickname.style.color = `${groupUserColor}`;
      groupUserPersent.style.color = `${groupUserColor}`;

      this.groupMemberContainer.appendChild(groupMemberDiv);
    });
  }
}