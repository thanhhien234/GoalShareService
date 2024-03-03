class SearchResult extends Observer{
  constructor() {
    super();
    this.groupInfo = [];
    this.searchRoutineContainer = document.querySelector('.search-routine-container');
    this.colors = ['--background-color-grape-deepPurple', '--background-color-grape-purple', '--background-color-grape-magenta'];
  }

  getGroupInfo() {
    return this.groupInfo;
  }

  setGroupInfo(groups) {
    this.groupInfo = groups.map((group) => ({ ...group }));
  }

  render() {
    this.searchRoutineContainer.innerHTML = '';

    this.groupInfo.forEach((group) => {
      const searchRoutineWrapper = document.createElement('div');
      searchRoutineWrapper.classList.add('search-routine-wrapper');

      const randomIndex = Math.floor(Math.random() * this.colors.length);
      const randomColor = getComputedStyle(document.documentElement).getPropertyValue(this.colors[randomIndex]);

      searchRoutineWrapper.style.backgroundColor = randomColor;

      searchRoutineWrapper.innerHTML = `
        <div class="routine">
          <span class="routine-participants">${group.participants}명</span>
          <span class="routine-name">${group.name}</span>
        </div>
      `;
      this.searchRoutineContainer.appendChild(searchRoutineWrapper);
    });
  }
}