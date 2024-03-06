$(document).ready(function() {
    function moveGroupSearchContainer() {
        if ($(window).width() < 768) {
            var groupSearchContainer = $('.group-search-container').detach();
            $('.my-week-routine').after(groupSearchContainer);
            calendarContainer.classList.add('show-details');
        } else {
            var groupSearchContainer = $('.group-search-container').detach();
            $('.main-content').before(groupSearchContainer);
        }
    }

    moveGroupSearchContainer();
    
    $(window).resize(function() {
        moveGroupSearchContainer();
    });
});


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


