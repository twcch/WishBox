/*banner owl 設定*/ 
$(window).on('load', function () {
  
     $('.owltActivey').owlCarousel({
         loop: false,
         margin: 10,
         nav: false,
         dots: false,
         autoplay: false,
         autoplayTimeout: 2000,
         autoplayHoverPause: false,
         autoHeight: true,
         responsive: {
             0: {
                 items: 1
             }
         }
     });  
 });