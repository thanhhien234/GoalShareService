$(document).ready(function() {
    function moveGroupSearchContainer() {
        if ($(window).width() < 768) {
            var groupSearchContainer = $('.group-search-container').detach();
            $('.my-week-routine').after(groupSearchContainer);
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

detailBtn.addEventListener('click', function() {
    routineContainer.classList.toggle('show-details');
});
mobileDetailBtnContainer.addEventListener('click', function() {
    detailBtn.click();
});


