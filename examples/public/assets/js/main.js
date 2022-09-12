(function ($) {
    "use strict";    
    //Tweenmax js
    $('.hero-wrap').mousemove(function (e) {
        var wx = $(window).width();
        var wy = $(window).height();
        var x = e.pageX - this.offsetLeft;
        var y = e.pageY - this.offsetTop;
        var newx = x - wx / 2;
        var newy = y - wy / 2;
        $('.hero-content').each(function () {
            var speed = $(this).attr('data-speed');
            if ($(this).attr('data-revert')) speed *= -.4;
            TweenMax.to($(this), 1, { x: (1 - newx * speed), y: (1 - newy * speed) });
        });
    });
    
    //Hero  Slider 
    $(".hero-slider-one").owlCarousel({
        nav: false,
        dots: true,
        loop: true,
        margin: 20,
        items: 1,
        animateOut: 'fadeOut',
        navText: ['<i class="ri-arrow-left-s-line"></i>', '<i class="icon-arrow-right"></i>'],
        thumbs: false,
        smartSpeed: 1300,
        autoplay: false,
        autoplayTimeout: 4000,
        autoplayHoverPause: false,
        responsiveClass: true,
        autoHeight: true,
    });
    //sticky Header
    var wind = $(window);
    var sticky = $('.header-wrap');
    wind.on('scroll', function () {
        var scroll = wind.scrollTop();
        if (scroll < 100) {
            sticky.removeClass('sticky');
        } else {
            sticky.addClass('sticky');
        }
    });

    // Responsive mmenu
    $(window).on('resize', function() {
        if($(window).width() <= 1199) {
            $('.collapse.navbar-collapse').removeClass('collapse');
        }else{
            $('.navbar-collapse').addClass('collapse');
        }
    });
    $('.mobile-menu a').on('click', function() {
        $('.main-menu-wrap').addClass('open');
        $('.collapse.navbar-collapse').removeClass('collapse');
    });

    $('.mobile_menu a').on('click', function () {
        $(this).parent().toggleClass('open');
        $('.main-menu-wrap').toggleClass('open');
    });

    $('.menu-close').on('click', function () {
        $('.main-menu-wrap').removeClass('open')
    });
    $('.mobile-top-bar').on('click', function () {
        $('.header-top').addClass('open')
    });
    $('.close-header-top button').on('click', function () {
        $('.header-top').removeClass('open')
    });
    var $offcanvasNav = $('.navbar-nav'),
    $offcanvasNavSubMenu = $offcanvasNav.find('.dropdown-menu');
    $offcanvasNavSubMenu.parent().prepend('<span class="menu-expand"><i class="icon-arrow-down"></i></span>');
    $offcanvasNavSubMenu.slideUp();
    $offcanvasNav.on('click', 'li a, li .menu-expand', function (e) {
        var $this = $(this);
        if (($this.attr('href') === '#' || $this.hasClass('menu-expand'))) {
            e.preventDefault();
            if ($this.siblings('ul:visible').length) {
                $this.siblings('ul').slideUp('slow');
            } else {
                $this.closest('li').siblings('li').find('ul:visible').slideUp('slow');
                $this.siblings('ul').slideDown('slow');
            }
        }
        if ($this.is('a') || $this.is('span') || $this.attr('class').match(/\b(menu-expand)\b/)) {
            $this.parent().toggleClass('menu-open');
        } else if ($this.is('li') && $this.attr('class').match(/\b('dropdown-menu')\b/)) {
            $this.toggleClass('menu-open');
        }
    });

    // Scroll animation
    AOS.init();

    //Back To top
    function BackToTop() {
        $('.back-to-top').on('click', function () {
            $('html, body').animate({
                scrollTop: 0
            }, 100);
            return false;
        });

        $(document).scroll(function () {
            var y = $(this).scrollTop();
            if (y > 600) {
                $('.back-to-top').fadeIn();
                $('.back-to-top').addClass('open');
            } else {
                $('.back-to-top').fadeOut();
                $('.back-to-top').removeClass('open');
            }
        });
    }
    BackToTop();

})(jQuery);