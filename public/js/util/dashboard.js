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

