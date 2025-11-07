/*owl-carousel 設定*/


$(window).on('load', function () {
    
    $('.owltActivey').owlCarousel({
        loop: false,
        margin: 10,
        nav: false,
        dots: true,
        autoplay: false,
        autoplayTimeout: 2000,
        autoplayHoverPause: false,
        autoHeight: true,
        responsive: {
            0: {
                items: 1
            },
            1000: {
                items: 4
            }
        }
    });
});


function GoNext() {
   $('.owl-carousel').trigger('next.owl.carousel');
}

function GoPrev() {
    $('.owl-carousel').trigger('prev.owl.carousel');
}



/***跳至頂部***/
function GoTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}