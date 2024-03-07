// 더보기 버튼
const detailBtn = document.querySelector('.detail-btn-container');
const mobileDetailBtnContainer = document.querySelector('.mobile-detail-btn-container');
const routineContainer = document.querySelector('.today-routine-container');
const calendarContainer = document.querySelector('.calendar-routine');


detailBtn.addEventListener('click', function() {
    calendarContainer.classList.add('show-details');
    routineContainer.classList.add('show-details');
});
mobileDetailBtnContainer.addEventListener('click', function() {
    routineContainer.classList.add('show-details');
});


function moveGroupSearchContainer() {
    const groupSearchContainer = document.querySelector('.group-search-container');
    const myWeekRoutine = document.querySelector('.my-week-routine');
    const mainContent = document.querySelector('.main-content');
    if (window.innerWidth < 768) {
        myWeekRoutine.after(groupSearchContainer);
        calendarContainer.classList.add('show-details');
    } else {
        mainContent.before(groupSearchContainer);
    }
}

moveGroupSearchContainer();

window.addEventListener('resize', function() {
    moveGroupSearchContainer();
});


