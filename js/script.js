// jQuery
$(function () {
    let windowVar = $(window);
    let screenHeight = windowVar.height();

    $('.preloader').fadeOut(100);
    // anchor links slow scroll
    $('.anchor').click(function (event) {
        event.preventDefault();
        let id = $(this).attr('href');
        let top = $(id).offset().top;
        $('body,html').animate({scrollTop: top}, 600);
    });
    // scroll events:
    // 1. Home background smooth scrolling
    windowVar.scroll(function (event) {
        let jsWindow = windowVar[0];
        let windowHeight = jsWindow.innerHeight;
        let scrollPos = jsWindow.scrollY;
        if (scrollPos < windowHeight) {
            $('#home').css('background-position-y', scrollPos / -5);
        }
    });
    // Menu toggler
    $('.menu-toggler > i').click(function () {
        $('.vertical-menu').slideToggle();
    });
});