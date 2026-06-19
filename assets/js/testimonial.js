$(document).ready(function () {
  $('.testimonial-carousel').owlCarousel({
    loop: true,
    margin: 30,
    center: true,
    autoplay: true,
    autoplayTimeout: 3000,
    smartSpeed: 800,
    dots: true,
    nav: false,
    responsive: {
      0: {
        items: 1
      },
      768: {
        items: 3
      },
      1200: {
        items: 3
      }
    }
  });
});