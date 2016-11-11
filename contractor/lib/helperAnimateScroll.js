//Animate Scroll to Target HTML ID
function scrollTo(targetId) {
    var target = $(targetId);
    if (target.length) {
        var adjustTopOffset = target.offset().top - 5;
        $('html, body').animate({
            scrollTop: adjustTopOffset
        }, 600);
    }
}
