$(document).ready(function(){

  $(".features-carousel").owlCarousel({
    loop: true,
    margin: 25,
    nav: false,
    dots: true,
    autoplay: true,
    autoplayTimeout: 3500,
    autoplayHoverPause: true,
    smartSpeed: 800,
    responsive:{
      0:{ items:1 },
      600:{ items:2 },
      992:{ items:3 }
    }
  });

});