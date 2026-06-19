document.addEventListener('DOMContentLoaded', function () {
  $('.more-carousel').owlCarousel({
    loop: true,
    margin: 24,
    nav: false,
    dots: true,
    autoplay: true,
    autoplayTimeout: 3500,
    autoplayHoverPause: true,
    responsive: {
      0: { items: 1 },
      576: { items: 2 },
      992: { items: 4 }
    }
  });
});
