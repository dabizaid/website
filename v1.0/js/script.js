$(function() {
  $('a[href*="#"]:not([href="#"])').click(function() {
    if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
      if (target.length) {
        $('html, body').animate({
          scrollTop: target.offset().top
        }, 1000);
        return false;
      }
    }
  });
});

$(function(){
    var widthTech = $('.tech').width();
    var widthWork = $('.brand-logo').width();
    var widthAbout = $('.about-graphic').width();
    $('.tech').css('height', widthTech);
    $('.brand-logo').css('height', widthWork);
    $('.about-graphic').css('height', widthAbout);
 });

// Circles animation 1
$(document).ready(function() {
    setTimeout(function(){
        $('.loader-curtain').addClass('loaded'); 
        $('.spinner').removeClass('spinner-rotate');
        $('.loader-logo, .spinner').addClass('animated zoomOut'); 
        $('body').css('overflow', 'visible');      
    }, 2700);
    setTimeout(function(){
        $('.loader-curtain, .loader-logo, .spinner').css('display','none');
    }, 5000);
    var lastScrollTop;
    // var originalX1 = $('#firstTech').offset().left;
    // var originalX2 = $('#secondTech').offset().left;
    // var originalX3 = $('#thirdTech').offset().left;
    // var originalY1 = $('#firstTech').offset().top;
    // var originalY2 = $('#fourthTech').offset().top;

    // //work coordinates 
    // var originaly1 = $('#firstWork').offset().top;
    // var originaly2 = $('#fourthWork').offset().top; 
    // var originalx1 = $('#fourthWork').offset().left;
    // var originalx2 = $('#fifthWork').offset().left;
    
    // var diffx1 = ($('.factory-image-top').offset().left + ($('.factory-image-top').width()/2) - ($('#firstTech').width()/2))- originalX1; 
    // var diffx2 = ($('.factory-image-top').offset().left + ($('.factory-image-top').width()/2) - ($('#firstTech').width()/2))- originalX2;; 
    // var diffx3 = ($('.factory-image-top').offset().left + ($('.factory-image-top').width()/2) - ($('#firstTech').width()/2))- originalX3;; 
    // var diffx4 = ($('.factory-image-top').offset().left + ($('.factory-image-top').width()/2) - ($('#firstTech').width()/2))- originalx1;
    // var diffx5 = ($('.factory-image-top').offset().left + ($('.factory-image-top').width()/2) - ($('#firstTech').width()/2))- originalx2;       
    // var diffy1 = $('.factory-image-top').offset().top - originalY1;
    // var diffy2 = $('.factory-image-top').offset().top - originalY2;   

    // var differencey1 = $('.factory-image-top').offset().top - originaly1;
    // var differencey2 = $('.factory-image-top').offset().top - originaly2;
    // $('#firstWork').css({left: diffx1, top: differencey1});
    // $('#secondWork').css({left: diffx2, top: differencey1});
    // $('#thirdWork').css({left: diffx3, top: differencey1});
    // $('#fourthWork').css({left: diffx4, top: differencey2});
    // $('#fifthWork').css({left: diffx5, top: differencey2});
    var topPartDone = false;
    var sc;
    $(window).scroll(function() {
        // Section postions
        var homePos = $('#cover').offset().top;
        var aboutPos = $('#about').offset().top;
        var technologiesPos = $('#technologies').offset().top;
        var workPos = $('#work').offset().top;
        var resumePos = $('#resume').offset().top;
        var footerPos = $('footer').offset().top;
        var sc = $(this).scrollTop(); // position of top of screen
        var btsc = sc + $(this).height(); // position of bottom of screen

        //Navbar scroll highlight
        if ((sc + $(this).height() + 40) > $('#about').offset().top) {
            $('#about-left-column').addClass('animated fadeInLeftBig');
            $('#about-right-column').addClass('animated fadeInRightBig');            
        }
        if (sc > $('#resume').offset().top) {
            $('#resume h2').addClass('animated bounceIn');
        }
        if (sc < aboutPos) {
            $('a.active').removeClass('active');
            $('#coverNav a').addClass('active');
        }
        else if (sc > aboutPos && sc < technologiesPos){
            $('a.active').removeClass('active');
            $('#aboutNav a').addClass('active');
        }
        else if(sc > technologiesPos && sc < workPos) {
            $('a.active').removeClass('active');
            $('#techNav a').addClass('active');   
        }
        else if(sc > workPos && sc < resumePos) {
            $('a.active').removeClass('active');
            $('#workNav a').addClass('active');   
        }
        if(btsc > footerPos) {
            $('a.active').removeClass('active');
            $('#resumeNav a').addClass('active');   
        }

        //Clock and screen behavior                
        $('.code').css('background-position-y', parseInt(-sc) + 'px');
        $('.clock').css({'transform': 'rotate(' + parseInt(sc) + 'deg)'});
        $('.clock2').css({'transform': 'rotate(' + parseInt(sc/12) + 'deg)'});
        // Circles animation
        var currentScroll = $(this).scrollTop();
            if (currentScroll > lastScrollTop){
                // if ((($('#technologies').offset().top < ($(this).scrollTop())) && ($(this).scrollTop() < $('#work').offset().top))) {
                //     if (topPartDone == false) {
                //         console.log("diffx " + diffx1);
                //         move($('#firstTech'), diffx1, diffy1, 100000);
                //         move($('#secondTech'), diffx2, diffy1, 100000);
                //         move($('#thirdTech'), diffx3, diffy1, 100000);                          
                //         move($('#fourthTech'), diffx1, diffy2, 100000);
                //         move($('#fifthTech'), diffx2, diffy2, 100000);
                //         move($('#sixthTech'), diffx3, diffy2, 100000);
                //         topPartDone = true;
                //     };
                // }
                // //Work bubbles
                // if (topPartDone) {
                //     move($('#firstWork'), -1 * diffx1, -1 * differencey1, 100000);
                //     move($('#secondWork'), -1 * diffx2, -1 * differencey1, 100000);
                //     move($('#thirdWork'), -1 * diffx3, -1 * differencey1, 100000);                          
                //     move($('#fourthWork'), -1 * diffx4, -1 * differencey2, 100000);
                //     move($('#fifthWork'), -1 * diffx5, -1 * differencey2, 100000);
                // }
            } 
            else{
                // if (($(this).scrollTop() < ($('#work').offset().top - 400))){
                //     move($('#firstTech'), originalX1 - $('#firstTech').offset().left, originalY1 - $('#firstTech').offset().top, 100000);
                //     move($('#secondTech'), originalX2 - $('#secondTech').offset().left, originalY1 - $('#secondTech').offset().top, 100000);
                //     move($('#thirdTech'), originalX3 - $('#thirdTech').offset().left, originalY1 - $('#thirdTech').offset().top, 100000);                          
                //     move($('#fourthTech'), originalX1 - $('#fourthTech').offset().left, originalY2 - $('#fourthTech').offset().top, 100000);
                //     move($('#fifthTech'), originalX2 - $('#fifthTech').offset().left, originalY2 - $('#fifthTech').offset().top, 100000);
                //     move($('#sixthTech'), originalX3 - $('#sixthTech').offset().left, originalY2 - $('#sixthTech').offset().top, 100000);
                // }
                // if (($('#work').offset().top < ($(this).scrollTop() + $(this).height())) && topPartDone) {
                //     move($('#firstWork'), originalX1 - $('#firstWork').offset().left, originaly1 - $('#firstWork').offset().top, 100000);
                //     move($('#secondWork'), originalX2 - $('#secondWork').offset().left, originaly1 - $('#secondWork').offset().top, 100000);
                //     move($('#thirdWork'), originalX3 - $('#thirdWork').offset().left, originaly1 - $('#thirdWork').offset().top, 100000);                          
                //     move($('#fourthWork'), originalx1 - $('#fourthWork').offset().left, originaly2 - $('#fourthWork').offset().top, 100000);
                //     move($('#fifthWork'), originalx2 - $('#fifthWork').offset().left, originaly2 - $('#fifthWork').offset().top, 100000);
                //     topPartDone = false;
                // }   
            }           
        
        lastScrollTop = currentScroll;
    });
    // function move (element, x, y, d) {
    //     element.animate({
    //         'opacity': '1'
    //     }, {
    //         step: function () {
    //             $(this).css({"transform": "translate3d( " + x + "px, " + y + "px, 0px)"});
    //         },
    //         duration: 10000000,
    //         easing: 'linear',
    //         queue: false,
    //         complete: function () {

    //         }
    //     }, 'linear');
    // }
});
