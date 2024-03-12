class RoutineRank extends Observer {
    constructor(subject) {
      super();
      this.subject = subject;
      this.popularRoutine = [];
      this.colors = ['#C77DFF','#D9ED92','#C8B6FF','#5A189A','#DDE7C7','#7B2CBF', '#9747FF','#B5E48C','#E0AAFF','#5A189A']
    }
    
    getPopularRoutine() {
        return this.popularRoutine;
    }
    
    setPopularRoutine(popularRoutine) {
        this.popularRoutine = popularRoutine;
    }
    render(){
        const popularRoutineContainer = document.querySelector(".routine-ranking-container");
        popularRoutineContainer.innerHTML = "";
        
        let maxCount = this.popularRoutine.length > 0 ? this.popularRoutine[0].memberCount : 0;

        this.popularRoutine.forEach((routine, index) => {
            const routineElement = document.createElement("div");
            routineElement.classList.add("routine-ranking-wrapper");

            
            const progressBarWidth = (routine.memberCount / maxCount) * 100;

            routineElement.innerHTML = `
                <div class="ranking-title">
                    <span class="ranking">${index + 1}</span>
                    <p class="routine-title">${routine.title}</p>
                    <button class="detail-routine-btn"></button>
                </div>
                <div class="routine-progress-bar">
                <div class="progress-bar-inner" style="background-color: ${this.colors[index]}; width: ${progressBarWidth}%;"></div>
                    <span class="data">${routine.memberCount}</span>
                </div>
                <div class="routine-participants">
                    <img src="/public/assets/image/face-icon.png">
                    <span class="participants-num" style="color: ${this.colors[index]};">${routine.memberCount}명</span><span class="participants-text">이 참여 중이에요!</span>
                </div>
            `;
    
            popularRoutineContainer.appendChild(routineElement);
    });
  }
  notify(){
    this.setPopularRoutine(this.subject.popularRoutine);
    this.render();
  }
}