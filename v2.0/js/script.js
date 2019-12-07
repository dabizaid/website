$(function() {
    // Populate Cards
    var cardHTML = "";
    $.each(tech, function(index, el) {
        cardHTML +=  '<div class="mdl-cell mdl-cell--3-col mdl-cell--4-col-tablet mdl-cell--4-col-phone tech-card">';
        cardHTML +=     '<div class="demo-card-wide mdl-card mdl-shadow--2dp">';
        cardHTML +=         '<div class="mdl-card__title" style="background: url(' + el.imageUrl + ') center / cover">';
        cardHTML +=             '<h2 class="mdl-card__title-text">' + el.name + '</h2>';
        cardHTML +=         '</div>';
        cardHTML +=         '<div class="mdl-card__supporting-text">';
        cardHTML +=             '' + el.description + '';
        cardHTML +=         '</div>';
        cardHTML +=     '</div>';
        cardHTML +=  '</div>';

    });
    $("#technologies .mdl-grid").append(cardHTML);

    // Populate Projects
    var projectHTML = "";
    $.each(_projects, function(index, el) {
        projectHTML += '<a href="' + el.webURL + '" target="_blank" class="mdl-cell mdl-cell--4-col">';
        projectHTML +=      '<figure class="project-logo mdl-shadow--4dp" style="background-image:url(' + el.imageURL + ')">';
        projectHTML +=          '<figcaption style="background-color:' + el.backgroundColor + '">';
        projectHTML +=              '' + el.description + '' ;
        projectHTML +=          '</figcaption>';
        projectHTML +=      '</figure>';
        projectHTML += '</a>';
        projectHTML += '<figcaption class="side-caption mdl-cell mdl-cell--4-col">' + el.description + '</figcaption>';
    });

    $("#projects .mdl-grid").html(projectHTML);

    // Initialize Masonry
    var _masonry = false;
    if ($(window).width() > 767) {
        var $grid = $('#technologies .mdl-grid').imagesLoaded(function() {
            $grid.masonry({
                itemSelector: '.tech-card'
            });
        });
        _masonry = true;
    } else {
        $(".tech-card").height($(".tech-card").width());
    }

    $(".project-logo").height($(".project-logo").width());

    // Responsive
    $(window).resize(function() {
        $(".project-logo").height($(".project-logo").width());

        if ($(this).width() < 768) {
            $(".tech-card").height($(".tech-card").width());
            if(_masonry) {
                $('#technologies .mdl-grid').masonry('destroy');
                _masonry = false;
            }
        } else if (!_masonry) {
            $(".tech-card").height("");
            $('#technologies .mdl-grid').masonry({
                itemSelector: '.tech-card'
            });
            _masonry = true;
        }
    });

    // Create Object with Sections and link to those Sections
    var secs = [];
    $.each($("#navbar a[href^='#']"), function() {
        var select = $($(this).attr('href'));
        secs.push({
            link: $(this),
            section: select
        })
    });

    // Scrolling events
    var lastScroll = 0;
    var currentScroll = 0;
    var posScroll = false;
    $(".mdl-layout__content").scroll(function() {
        currentScroll = $(this).scrollTop();
        posScroll = lastScroll < currentScroll;
        lastScroll = $(this).scrollTop();

        if ($("#about").offset().top < 70) {
            $("header.mdl-layout__header").removeClass('mdl-layout__header--transparent');
        } else {
            $("header.mdl-layout__header").addClass('mdl-layout__header--transparent');
        }
        if ($("#cover").offset().top < -100) {
            $("#back-to-top").addClass('visible');
        } else {
            $("#back-to-top").removeClass('visible');
        }

        if ($("#technologies").offset().top < ($(window).height() / 2)) {
            $(".tech-card").addClass('loaded');
        }

        $('.code').css('background-position-y', parseInt(-currentScroll) + 'px');
        $('.minute').css({'-webkit-transform': 'rotate(' + parseInt(currentScroll) + 'deg)', 'transform': 'rotate(' + parseInt(currentScroll) + 'deg)'});
        $('.hour').css({'-webkit-transform': 'rotate(' + parseInt(currentScroll/12) + 'deg)', 'transform': 'rotate(' + parseInt(currentScroll/12) + 'deg)'});

        if($(window).width() > 767) {
            $.each(secs, function() {
                var offT = this.section.offset().top - 64;
                var offB = this.section.offset().top + this.section.height();
                if (posScroll) {
                    if ((offT < ($(window).height() / 2)) && offT > -2 && !this.link.hasClass('mdl-navigation__link--current')) {
                        $(".mdl-navigation__link.mdl-navigation__link--current").removeClass("mdl-navigation__link--current");
                        this.link.addClass("mdl-navigation__link--current");
                        return false;
                    }
                } else {
                    if (offB > ($(window).height() / 2) && offB < $(window).height() && !this.link.hasClass('mdl-navigation__link--current')) {
                        $(".mdl-navigation__link.mdl-navigation__link--current").removeClass("mdl-navigation__link--current");
                        this.link.addClass("mdl-navigation__link--current");
                        return false;
                    }
                }
            });
        }
    });

    // Smooth Scrolling Code from CSS-Tricks
    $('a[href*="#"]:not([href="#"])').click(function() {
        if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
            var target = $(this.hash);
            target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
            if (target.length) {
                $('.mdl-layout__content').animate({
                    scrollTop: target.get(0).offsetTop
                }, 1000);
                return false;
            }
        }
    });

    $(".desk").click(function() {
        $("#about").toggleClass('off');
    });
});
