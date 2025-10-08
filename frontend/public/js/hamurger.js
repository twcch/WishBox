$(window).on('load', function () {
      /***漢堡 start ***/  
      $('.hamburger-owl').owlCarousel({
         loop: false,
         margin: 10,
         nav: false,
         dots: false,
         autoplay: false,
         autoplayTimeout: 2000,
         autoplayHoverPause: false,
         autoHeight: true,
         responsive: {
             800: {
                 items: 4
             },
             400: {
                 items: 2
             },
             0: {
                 items: 1
             }
         }
     });

     /***漢堡 end ***/ 
 });