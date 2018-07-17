document.addEventListener('DOMContentLoaded', function() {
  const controls = document.querySelectorAll('.slider-nav a');
  const controlPrev = document.querySelector('.slider-nav a[data-action="prev"]');
  const controlNext = document.querySelector('.slider-nav a[data-action="next"]');
  const controlFirst = document.querySelector('.slider-nav a[data-action="first"]');
  const controlLast = document.querySelector('.slider-nav a[data-action="last"]');
  const images = document.querySelectorAll('.slides .slide');

  function slide() {
    let action = this.dataset.action;
    let currentSlide;
    let activeSlide = document.querySelector('.slides .slide.slide-current');

    switch (action) {
      case 'next':
        currentSlide = activeSlide.nextElementSibling;
        break;
      case 'last':
        currentSlide = images[images.length-1];
        break;
      case 'prev':
        currentSlide = activeSlide.previousElementSibling;
        break;
      case 'first':
        currentSlide = images[0];
        break;
    }
    if (currentSlide !== null) {
      activeSlide.classList.remove('slide-current');
      currentSlide.classList.add('slide-current');

      let isFirst = currentSlide.previousElementSibling === null;
      controlPrev.classList.toggle('disabled', isFirst);
      controlFirst.classList.toggle('disabled', isFirst);

      let isLast = currentSlide.nextElementSibling === null;
      controlNext.classList.toggle('disabled', isLast);
      controlLast.classList.toggle('disabled', isLast);
    }
  }

  for (let control of controls) {
    control.addEventListener('click', slide);
  }

  images[0].classList.add('slide-current');
  controlPrev.classList.add('disabled');
  controlFirst.classList.add('disabled');
});
