document.addEventListener('DOMContentLoaded', function () {

  // ===================== VIDEO PLAY/PAUSE BUTTON =====================
  document.querySelectorAll('.pooja-video-wrapper').forEach(wrapper => {
    const video = wrapper.querySelector('.pooja-video');
    const btn = wrapper.querySelector('.video-play-btn');

    // Initial state
    btn.textContent = "▶";

    btn.addEventListener('click', () => {
      if (video.paused) {
        video.play();
        btn.textContent = "❚❚"; // change button to pause symbol
      } else {
        video.pause();
        btn.textContent = "▶"; // change back to play symbol
      }
    });

    // Reset button to play when video ends
    video.addEventListener('ended', () => {
      btn.textContent = "▶";
    });
  });

  // ===================== IMAGE LIGHTBOX =====================
  const lightbox = document.getElementById('image-lightbox');
  const lightboxImg = document.getElementById('lightbox-img');
  const poojaImgs = document.querySelectorAll('.pooja-img');

  if (!lightbox || !lightboxImg || !poojaImgs.length) return;

  poojaImgs.forEach(function (img) {
    img.addEventListener('click', function () {
      lightboxImg.src = this.src;
      lightboxImg.alt = this.alt || 'Pooja Image';
      lightbox.classList.add('active');
    });
  });

  lightbox.addEventListener('click', function (e) {
    if (e.target === lightbox) closeLightbox();
  });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && lightbox.classList.contains('active')) {
      closeLightbox();
    }
  });

  function closeLightbox() {
    lightbox.classList.remove('active');
    setTimeout(() => lightboxImg.src = '', 150);
  }

});
