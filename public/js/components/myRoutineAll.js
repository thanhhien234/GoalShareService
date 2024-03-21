class myRoutineAll extends Observer{   
    constructor() {
        super();

        this.routine = [];
        
        this.colorSet = ["#5A189A", "#7B2CBF", "#9D4EDD", "#C77DFF", "#C8B6FF", "#D9ED92", "#DDE7C7", "#B5E48C", "#9747FF", "#E0AAFF"];
        this.colorPair = {"#5A189A":"#3D2E4C", "#7B2CBF":"#3A3241", "#9D4EDD":"#3D2F49", "#C77DFF":"#483457", "#C8B6FF":"#3D384B", "#D9ED92":"#383B2F", "#DDE7C7":"#363930", "#B5E48C":"#35402C", "#9747FF":"#32273F", "#E0AAFF":"#4B3856"};
        this.myRoutineContainer = document.querySelector(".my-routine-container");
    }

    get myRoutineAll() {
        return this.routine;
    }

    set myRoutineAll(newRoutine) {
        this.routine = newRoutine;
    }

    render() {
        this.myRoutineContainer.innerHTML = "";

        this.routine.forEach((item) => {
            const myRoutineDiv = document.createElement("div");

            myRoutineDiv.classList.add("my-routine-wrapper");

            myRoutineDiv.innerHTML = `
                <div class="my-routine">
                    <div class="my-routine-info-container">
                        <div class="my-routine-rate-container">
                            <p class="my-routine-rate-number">${item.number}</p>
                            <p class="my-routine-rate-persent">%</p>
                        </div>
                        <p class="my-routine-name">${item.name}</p>
                    </div>
                </div>
            `;

            const routineColor = this.colorSet[Math.floor(Math.random() * this.colorSet.length)];
            this.colorSet.forEach(color => {
                if (color === routineColor) {
                    const routineColorPair = this.colorPair[color];
                        
                    const gradientStyle = `conic-gradient(from 270deg, ${routineColor} 0 ${180*(item.number/100)}deg, ${routineColorPair} 0 180deg, var(--color-grey3) 0 360deg)`;
                    myRoutineDiv.style.background = gradientStyle;
                    
                    const myRoutineRateNumberP = myRoutineDiv.querySelector(".my-routine-rate-number");
                    const myRoutineRatePersentP = myRoutineDiv.querySelector(".my-routine-rate-persent");

                    myRoutineRateNumberP.style.color = `${routineColor}`;
                    myRoutineRatePersentP.style.color = `${routineColor}`;
                }
            });

            this.myRoutineContainer.appendChild(myRoutineDiv);
        });
    }
}