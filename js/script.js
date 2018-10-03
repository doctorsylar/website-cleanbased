// jQuery
$(function () {
    let windowVar = $(window);
    let jsWindow = windowVar[0];
    let windowHeight = windowVar[0].innerHeight;
    let servicesPos = $('#services').offset().top;
    let portfolioPos = $('#portfolio').offset().top;

    windowVar.resize(function () {
        windowHeight = windowVar[0].innerHeight;
    });

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
        let scrollPos = jsWindow.scrollY;
        if (scrollPos < windowHeight) {
            $('#home').css('background-position-y', scrollPos / -5);
        }
    //  Menu items highlighting
        let underHeaderScroll = scrollPos + 77;
        // $('.header-menu ul li a').removeClass('active');
        if (underHeaderScroll < servicesPos) {
            $('.link-home').addClass('active');
            $('.link-home').parent().siblings().children().removeClass('active');
        }
        else if (underHeaderScroll < portfolioPos) {
            $('.link-services').addClass('active');
            $('.link-services').parent().siblings().children().removeClass('active');
        }
        else {
            $('.link-portfolio').addClass('active');
            $('.link-portfolio').parent().siblings().children().removeClass('active');
        }
    });
    // Menu toggler
    $('.menu-toggler > i').click(function () {
        let button = $('.menu-toggler > i');
        $('.vertical-menu').slideToggle();
        button.addClass('spinning');
        button.toggleClass('fa-times');
        button.toggleClass('fa-bars');
        console.log($('.menu-toggler > i'));
        setTimeout(function () {
            button.removeClass('spinning');
        }, 500);
    });
});