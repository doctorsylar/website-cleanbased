// jQuery
$(function () {
    fillSkills();

    let windowVar = $(window);
    let jsWindow = windowVar[0];
    let windowHeight = windowVar[0].innerHeight;
    let servicesPos = $('#services').offset().top;
    let portfolioPos = $('#portfolio').offset().top;
    let skillsPos = $('#skills').offset().top;
    let aboutPos = $('#about').offset().top;
    let contactPos = $('#contact').offset().top;
    let prevScrollPos = 0;

    windowVar.one('scroll', function () {
        windowHeight = jsWindow.innerHeight;
        servicesPos = $('#services').offset().top;
        portfolioPos = $('#portfolio').offset().top;
        skillsPos = $('#skills').offset().top;
        aboutPos = $('#about').offset().top;
        contactPos = $('#contact').offset().top;
    });

    windowVar.resize(function () {
        windowHeight = windowVar[0].innerHeight;
        servicesPos = $('#services').offset().top;
        portfolioPos = $('#portfolio').offset().top;
        skillsPos = $('#skills').offset().top;
        aboutPos = $('#about').offset().top;
        contactPos = $('#contact').offset().top;
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
        if (scrollPos < windowHeight && jsWindow.innerWidth > 360) {
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
        let animatedArray = $('.animatedIn');
        if (animatedArray.length > 0) {
            for (let i = 0; i < animatedArray.length; i++) {
                let animatedItem = $(animatedArray[i]);
                if (animatedItem.offset().top < scrollPos + windowHeight - 100) {
                    if (animatedItem.hasClass('toFadeInLeft')) {
                        animatedItem.addClass('fadeInLeft');
                        animatedItem.removeClass('toFadeInLeft');
                        setTimeout(function () {
                            animatedItem.removeClass('fadeInLeft');
                            animatedItem.css('opacity', '1');
                        }, 1000);
                    }
                    else if (animatedItem.hasClass('toFadeInRight')) {
                        animatedItem.addClass('fadeInRight');
                        animatedItem.removeClass('toFadeInRight');
                        setTimeout(function () {
                            animatedItem.removeClass('fadeInRight');
                            animatedItem.css('opacity', '1');
                        }, 1000);
                    }
                    else {
                        animatedItem.addClass('fadeInBottom');
                        animatedItem.removeClass('toFadeInBottom');
                        setTimeout(function () {
                            animatedItem.removeClass('fadeInBottom');
                            animatedItem.css('opacity', '1');
                        }, 1000);
                    }
                    animatedItem.removeClass('animatedIn');
                }
                else {
                    break;
                }
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
        // console.log($('.menu-toggler > i'));
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

    $('.overlay').click(function () {
        $('.overlay').fadeOut(0);
    });

//    Portfolio fullimages
    $('.portfolio-item-inner').click(function () {
        $('.overlay, .close-modal').show(0);
        let clicked = $(this.children[1]);
        clicked.fadeIn(300, () => {
            if ($('body').width() >= 992) {
                setTimeout(() => {
                    $(this.children[1].children[1]).css('opacity', 0);
                }, 500);
            }
        });
        $('body').css('overflow', 'hidden');
    });
    $('.overlay, .close-modal').click(function () {
        $('.fullscreen-picture').removeClass('shown');
        $('.fullscreen-picture').fadeOut(50);
        $('.overlay, .close-modal').fadeOut(100);
        $('.fullscreen-picture .picture-text').css('opacity', '');
        $('body').css('overflow', 'auto');
    });

    $('.contact-form').submit(function (event) {
        event.preventDefault();
        let name = event.target[0].value.trim();
        let email = event.target[1].value.trim();
        let message = event.target[2].value.trim();
        // console.log(event.target.action);
        if (name !== '' && email !== '' && message !== '') {
            $.ajax(event.target.action, {
                data: {
                    name: event.target[0].value,
                    email: event.target[1].value,
                    message: event.target[2].value
                },
                success: function () {
                    $('.contact-form').fadeOut(1000, function () {
                        $('.success-form-sending').slideDown(300);
                    });

                }
            });
        }
        else {
            $('.contact-form').submit();
        }
    });


//    JS fullscreen pictures code
    function makeBackground() {
        let divsArray = document.querySelectorAll('.fullscreen-picture');
        for (let div of divsArray) {
            let string = "url('" + div.children[0].getAttribute('src') + "') no-repeat top center";
            div.style.background = string;
            div.style.color = 'red';
        }
    }
    makeBackground();

    // script for filling skills section
    function fillSkills(callback) {
        let skillsList = [
            { name: 'HTML 5',
                pictureUrl: 'https://www.w3.org/html/logo/downloads/HTML5_Badge.svg',
                level: ['95'],
                description: 'HTML 5 desc'
            },
            { name: 'CSS 3',
                pictureUrl: './img/css-logo.svg',
                level: ['90'],
                description: 'CSS 3 desc'
            },
            { name: 'JavaScript ES6',
                pictureUrl: 'https://upload.wikimedia.org/wikipedia/commons/9/99/Unofficial_JavaScript_logo_2.svg',
                level: ['95'],
                description: 'JavaScript ES6 desc'
            },
            { name: 'jQuery',
                pictureUrl: './img/jquery.svg',
                level: ['85'],
                description: 'jQuery desc'
            },
            { name: 'Bootstrap 4',
                pictureUrl: './img/bootstrap.svg',
                level: ['80'],
                description: 'Bootstrap 4 desc'
            },
            { name: 'React',
                pictureUrl: 'https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg',
                level: ['75'],
                description: 'React desc'
            },
            { name: 'VueJS',
                pictureUrl: 'https://upload.wikimedia.org/wikipedia/commons/5/53/Vue.js_Logo.svg',
                level: ['60'],
                description: 'VueJS desc'
            },
            { name: 'PHP7',
                pictureUrl: './img/php.svg',
                level: ['70'],
                description: 'PHP7 desc'
            },
            { name: 'NodeJS',
                pictureUrl: 'https://upload.wikimedia.org/wikipedia/commons/d/d9/Node.js_logo.svg',
                level: ['80'],
                description: 'NodeJS desc'
            },
            { name: 'Webpack',
                pictureUrl: './img/webpack.svg',
                level: ['75'],
                description: 'Webpack desc'
            },
            { name: 'Babel',
                pictureUrl: 'https://upload.wikimedia.org/wikipedia/commons/0/02/Babel_Logo.svg',
                level: ['90'],
                description: 'Babel desc'
            },
            { name: 'Wordpress',
                pictureUrl: 'https://upload.wikimedia.org/wikipedia/commons/0/09/Wordpress-Logo.svg',
                level: ['60'],
                description: 'Wordpress desc'
            },
        ];
        let skillsContainer = $('.skills-container');
        for (let skill of skillsList) {
            let code = `
            <div class="skill-item animatedIn">
                <img src="${skill.pictureUrl}" alt="${skill.name}">
                <div class="skill-description">
                    <h3>${skill.name}</h3>
                    <p>${skill.description}</p>
                    <span class="underlined">Уровень владения:</span>
                    <div class="skill-level">
                        <span data-percent="${skill.level}" class="chart easyPieChart" style="width: 140px; height: 140px; line-height: 140px;">
                            <span class="percent">${skill.level}</span>
                        </span>
                    </div>
                </div>
            </div>
            `;
            skillsContainer.append(code);
        }
    }
});