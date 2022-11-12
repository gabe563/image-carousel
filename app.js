function currentSlide() {
  const dots = document.querySelectorAll('.dot');

  dots.forEach((dot) => {
    let clicked = false;
    dot.addEventListener('click', () => {
      changeCurrImage(dot);
      clicked = true;
      if (dot.classList.contains('addCurrent')) {
        clicked = false;
      }
      if (clicked === true) {
        dots.forEach((dot) => {
          if (dot.classList.contains('addCurrent')) {
            if (!dot.classList.contains('removeCurrent')) {
              dot.classList.add('removeCurrent');
              dot.addEventListener('animationend', () => {
                dot.classList.remove('removeCurrent');
              });
            }
          }
          dot.classList.remove('addCurrent');
        });
      }
      if (!dot.classList.contains('addCurrent')) {
        dot.classList.add('addCurrent');
      }
    });
  });
}

let imageIndex = 1;
let cooldownImage = 0;
window.onload = () => {
  imageCooldown();
};

function changeCurrImage(dot) {
  function currImage() {
    if (!dot.classList.contains('addCurrent')) {
      showImage((imageIndex = +dot.dataset.id));
    }
  }
  currImage();
}

function changeImgOnClick() {
  let counter = 0;
  const leftBtn = document.querySelector('.left');
  const rightBtn = document.querySelector('.right');

  leftBtn.addEventListener('click', () => {
    counter = counter + 1;
    if (counter !== 10) {
      showImage((imageIndex += -1));
    }
  });

  rightBtn.addEventListener('click', () => {
    counter = counter + 1;

    if (counter !== 10) {
      showImage((imageIndex += 1));
    } else {
      delete counter;
      return;
    }
  });
}

function showImage(id) {
  const slides = document.querySelectorAll('.slideshow > img');
  const dots = document.querySelectorAll('.dot');

  if (id > slides.length) {
    imageIndex = 1;
  }

  if (id < 1) {
    imageIndex = slides.length;
  }

  slides.forEach((slide) => {
    // if (slide.classList.contains('fadeIn')) {
    //   slide.classList.add('fadeOut');
    //   document
    //     .querySelector('.fadeOut')
    //     .addEventListener('animationend', () => {
    //       slide.classList.add('hidden');
    //       slide.classList.remove('fadeOut');
    //       slide.classList.remove('fadeIn');

    //       slides[imageIndex - 1].classList.add('fadeIn');
    //       slides[imageIndex - 1].classList.remove('hidden');
    //     });
    // }
    if (
      !slide.classList.contains('hidden') ||
      !slide.classList.contains('visual')
    ) {
      slide.classList.add('visual');
      slide.addEventListener('transitionend', () => {
        slide.classList.add('hidden');
        slide.offsetWidth;
        slides[imageIndex - 1].classList.remove('hidden');
        slides[imageIndex - 1].classList.remove('visual');
      });
    }
  });

  dots.forEach((dot) => {
    if (dot.classList.contains('addCurrent')) {
      if (!dot.classList.contains('removeCurrent')) {
        dot.classList.add('removeCurrent');
        dot.addEventListener('animationend', () => {
          dot.classList.remove('removeCurrent');
        });
      }
      dot.classList.remove('addCurrent');
    }
  });

  dots[imageIndex - 1].classList.add('addCurrent');
  cooldownImage = imageIndex;
}

function imageCooldown() {
  const slides = document.querySelectorAll('.slideshow > img');
  const dots = document.querySelectorAll('.dot');

  cooldownImage++;
  if (cooldownImage > slides.length) {
    cooldownImage = 1;
  }
  imageIndex = cooldownImage;

  slides.forEach((slide) => {
    if (
      !slide.classList.contains('hidden') ||
      !slide.classList.contains('visual')
    ) {
      slide.classList.add('visual');
      slide.addEventListener('transitionend', () => {
        slide.classList.add('hidden');
        slide.offsetWidth;
        slides[cooldownImage - 1].classList.remove('hidden');
        setTimeout(() => {
          slides[cooldownImage - 1].classList.remove('visual');
        }, 20);
      });
    }
  });

  dots.forEach((dot) => {
    if (dot.classList.contains('addCurrent')) {
      if (!dot.classList.contains('removeCurrent')) {
        dot.classList.add('removeCurrent');
        dot.addEventListener('animationend', () => {
          dot.classList.remove('removeCurrent');
        });
      }
      dot.classList.remove('addCurrent');
    }
  });

  dots[cooldownImage - 1].classList.add('addCurrent');

  setTimeout(imageCooldown, 5000);
}

changeImgOnClick();

currentSlide();
