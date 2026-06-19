// top-services-swiper.js
document.addEventListener('DOMContentLoaded', function () {
  if (typeof Swiper === 'undefined') {
    console.error('Swiper is not loaded. Check your Swiper JS <script> tag.');
    return;
  }

  var mainSwiper = new Swiper('.main-swiper', {
    loop: true,
    speed: 700,
    autoplay: {
      delay: 3000,
      disableOnInteraction: false
    },
    slidesPerView: 3,
    spaceBetween: 30,
    pagination: {
      el: '.swiper-pagination',
      clickable: true
    },
    // navigation: {
    //   nextEl: '.icon-arrow-right',
    //   prevEl: '.icon-arrow-left'
    // },
    breakpoints: {
      0: {
        slidesPerView: 1,
        spaceBetween: 16
      },
      576: {
        slidesPerView: 2,
        spaceBetween: 20
      },
      992: {
        slidesPerView: 3,
        spaceBetween: 24
      }
    }
  });
});
