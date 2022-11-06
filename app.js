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

function changeCurrImage(dot) {
  function currImage() {
    if (!dot.classList.contains('addCurrent')) {
      showImage((imageIndex = +dot.dataset.id));
    }
  }
  currImage();
}

function changeImgOnClick() {
  const leftBtn = document.querySelector('.left');
  const rightBtn = document.querySelector('.right');

  leftBtn.addEventListener('click', () => {
    showImage((imageIndex += -1));
  });

  rightBtn.addEventListener('click', () => {
    showImage((imageIndex += 1));
  });
}

function showImage(id) {
  const slides = document.querySelectorAll('.image');
  const dots = document.querySelectorAll('.dot');

  if (id > slides.length) {
    imageIndex = 1;
  }

  if (id < 1) {
    imageIndex = slides.length;
  }

  slides.forEach((slide) => {
    if (slide.classList.contains('current')) {
      slide.classList.remove('current');
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

  slides[imageIndex - 1].classList.add('current');
  dots[imageIndex - 1].classList.add('addCurrent');
}

changeImgOnClick();

currentSlide();
