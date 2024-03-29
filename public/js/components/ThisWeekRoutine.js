class ThisWeekRoutine extends Observer {
    constructor(subject) {
      super();
      this.subject = subject;
      this.todayRoutine = [];
      this.routineResult = {};
      this.thisWeekRoutine = [];
    }

    setTodayRoutine(myRoutine) {
      this.todayRoutine = [];
      const today = new Date().getDay();
      myRoutine.forEach(routine => {
        if (routine.weekBit && routine.weekBit[today] === '1') {
            this.todayRoutine.push(routine);
        }
      });
    }
    setThisWeekRoutine(myWeekRoutine) {
      this.thisWeekRoutine = [];
      const today = new Date().getDay();
      for (let i = 0; i < 7; i++) {
        this.thisWeekRoutine.push([]);
      }
      myWeekRoutine.forEach(routine => {
        for (let i = 0; i < 7; i++) {
          if (routine.weekBit[i] === '1' && routine.checkedBit[i] === '1' && i===today) {
              this.thisWeekRoutine[i].push(2);
          }
          else if (routine.weekBit[i] === '1' && routine.checkedBit[i] === '1' && i!==today) {
              this.thisWeekRoutine[i].push(1);
          }
          else if (routine.weekBit[i] === '1' && routine.checkedBit[i] === '0') {
              this.thisWeekRoutine[i].push(0);
          }
        }
      })
    }
    setRoutineResult(thisWeekRoutine) {
      this.routineResult = {};
      let totalRoutine = 0;
      let completedRoutine = 0;
      let uncompletedRoutine = 0;
      let grapesCount = 0;
  
      thisWeekRoutine.forEach(row => {
          totalRoutine += row.length;
          row.forEach(value => {
              if (value === 1 || value === 2) {
                  completedRoutine++;
              } else if (value === 0) {
                  uncompletedRoutine++;
              }
          });
          if (row.length > 0 && !row.includes(0)) {
            grapesCount++;
          }        
      });
  
      this.routineResult = {
          totalRoutine: totalRoutine,
          completedRoutine: completedRoutine,
          uncompletedRoutine: uncompletedRoutine,
          grapesCount: grapesCount
      };
    }  
    async cancelRoutine(routineId) {
      await $.ajax({
          url: config.serverUrl + `api/routine/check?routineId=${routineId}`,
          method: "DELETE",
          headers: {
            authorization: "Bearer "+ getCookie("accessToken"),
          },
          success: (res) => {
            routineSubject.update();
          },
          error: (error) => {
            console.log("Error :", error);
          }
        });
  }
    async checkRoutine(routineId) {
      await $.ajax({
          url: config.serverUrl + `api/routine/check?routineId=${routineId}`,
          method: "POST",
          headers: {
            authorization: "Bearer "+ getCookie("accessToken"),
          },
          success: (res) => {
            routineSubject.update();
          },
          error: (error) => {
            console.log("Error :", error);
          }
        });
    }
    toggleCheckRoutine(checkIcon) {
      const routineId = checkIcon.dataset.routineid;
      const checked = checkIcon.dataset.checked === 'true';
      if (checked) {
          this.cancelRoutine(routineId);
      } else {
          this.checkRoutine(routineId);
      }
    }
    render() {
      //render today-routine-container
      const todayRoutineContainer = document.querySelector(".today-routine-container");
      todayRoutineContainer.innerHTML = "";
      
      const today = new Date().getDay(); 
      this.todayRoutine.forEach(routine => {
          if (routine.weekBit[today] === '1') {
              const checkIconSrc = routine.checked ? "/public/assets/image/check-icon-color.png" : "/public/assets/image/check-icon-black.png";
              const textColor = routine.checked ? "#797979" : "#FFFFFF";
  
              todayRoutineContainer.innerHTML += `
                  <li class="today-routine-wrapper">
                      <img class="checkIcon" src="${checkIconSrc}" data-routineid="${routine.routineId}" data-checked="${routine.checked}">
                      <p style="color: ${textColor};">${routine.title}</p>
                  </li>
              `;

          };
      });
      todayRoutineContainer.querySelectorAll(".checkIcon").forEach(checkIcon => {
        checkIcon.addEventListener("click", () => {
            this.toggleCheckRoutine(checkIcon);
        });
      });

      //render calendar-routine-container
      const calendarRoutineTable = document.getElementById("calendarRoutineTable");
      const tbody = calendarRoutineTable.querySelector("tbody");
      tbody.innerHTML = "";
      let maxElements = 0;
      this.thisWeekRoutine.forEach(row => {
        if (row.length > maxElements) {
            maxElements = row.length;
        }
      });
      for (let i = 0; i < maxElements; i++) {
          const tr = document.createElement("tr");
          this.thisWeekRoutine.forEach(row => {
              const td = document.createElement("td");
              if (i < row.length) {
                row.sort((a, b) => b - a);
                if (row[i] === 0) {
                    td.innerHTML = `<div class="uncompleted-grape"></div>`;
                } else if (row[i] === 1) {
                    td.innerHTML = `<div class="completed-notToday-grape"></div>`;
                }
                else if (row[i] === 2) {
                  td.innerHTML = `<div class="completed-today-grape"></div>`;
              }
              } else {
                  td.innerHTML = ''; 
              }
              tr.appendChild(td);
          });
          tbody.appendChild(tr);
      }

      //render routine-result-container
      const completedNum = document.querySelector('.completed-num');
      const uncompletedNum = document.querySelector('.uncompleted-num');
      const grapesNum = document.querySelector('.grapes-num');
      const allNum = document.querySelectorAll('.all-num');
  
      completedNum.textContent = `+${this.routineResult.completedRoutine}`;
      uncompletedNum.textContent = `-${this.routineResult.uncompletedRoutine}`;
      grapesNum.textContent = this.routineResult.grapesCount;
      allNum.forEach(item => {
        item.textContent = this.routineResult.totalRoutine
      });
  };
  
  notify(){
    this.setTodayRoutine(this.subject.myRoutine)
    this.setThisWeekRoutine(this.subject.myWeekRoutine);
    this.setRoutineResult(this.thisWeekRoutine);
    this.render();
  }
}
