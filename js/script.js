// jQuery
$(function () {
    let windowVar = $(window);
    let jsWindow = windowVar[0];
    let windowHeight = windowVar[0].innerHeight;
    let servicesPos = $('#services').offset().top;
    let portfolioPos = $('#portfolio').offset().top;
    let skillsPos = $('#skills').offset().top;
    let aboutPos = $('#about').offset().top;
    let contactPos = $('#contact').offset().top;
    let prevScrollPos = 0;

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
        if (scrollPos > prevScrollPos + 50 || scrollPos < prevScrollPos - 50) {
            prevScrollPos = scrollPos;
            //  Menu items highlighting
            let underHeaderScroll = scrollPos + 77;
            // $('.header-menu ul li a').removeClass('active');
            if (underHeaderScroll < servicesPos) {
                $('.link-home').addClass('active');
                $('.link-home').siblings().removeClass('active');
            }
            else if (underHeaderScroll < portfolioPos) {
                $('.link-services').addClass('active');
                $('.link-services').siblings().removeClass('active');
            }
            else if (underHeaderScroll < skillsPos) {
                $('.link-portfolio').addClass('active');
                $('.link-portfolio').siblings().removeClass('active');
            }
            else if (underHeaderScroll < aboutPos) {
                $('.link-skills').addClass('active');
                $('.link-skills').siblings().removeClass('active');
            }
            else if (underHeaderScroll < contactPos)  {
                $('.link-about').addClass('active');
                $('.link-about').siblings().removeClass('active');
            }
            else {
                $('.link-contact').addClass('active');
                $('.link-contact').siblings().removeClass('active');
            }
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
    // easy pie chart
    $('.chart').easyPieChart({
        size:140,
        lineCap:'butt',
        scaleColor: false,
        barColor: '#FF5252',
        trackColor: 'transparent',
        lineWidth: 10
    });

    $('#trigger-overlay').click(function () {
        $('.overlay').fadeIn(100);
    });
    $('.overlay').click(function () {
        $('.overlay').fadeOut(0);
    });

//    Portfolio fullimages
    $('.portfolio-item-inner').click(function () {
        $('.overlay, .close-modal').show(0);
        let clicked = $(this.children[1]);
        clicked.fadeIn(300, () => {
            setTimeout(() => {
                $(this.children[1].children[1]).css('opacity', 0);
            }, 500);
        });
    });
    $('.overlay, .close-modal').click(function () {
        $('.fullscreen-picture').removeClass('shown');
        $('.fullscreen-picture').fadeOut(100);
        $('.overlay, .close-modal').fadeOut(100);
        $('.fullscreen-picture .picture-text').css('opacity', '');
    });
//    JS fullscreen pictures code
    function makeBackground() {
        let divsArray = document.querySelectorAll('.fullscreen-picture');
        for (let div of divsArray) {
            let string = "url('" + div.children[0].getAttribute('src') + "') no-repeat top center";
            div.style.background = string;
            div.style.color = 'red';
            console.log(div.children[0].getAttribute('src'));
            console.log(string);
            console.log(div.style.background);
        }
    }
    makeBackground();
});