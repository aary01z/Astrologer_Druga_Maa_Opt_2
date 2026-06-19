$(document).ready(function(){

  $('.herotestimonials').owlCarousel({
    center: true,
    loop: true,
    margin: 30,
    autoplay: true,
    autoplayTimeout: 3500,
    smartSpeed: 800,
    dots: false,
    nav: false,
    responsive:{
      0:{
        items:1
      },
      768:{
        items:2
      },
      1200:{
        items:3
      }
    }
  });

});