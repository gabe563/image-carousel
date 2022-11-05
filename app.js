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

function changeCurrImage(dot) {
  const imagesSrc = [
    './assets/cat1.png',
    './assets/cat2.jpeg',
    './assets/cat3.jpeg',
    './assets/cat4.jpg',
    './assets/cat5.jpeg',
  ];

  function checkCurrSelected() {
    let currImage;
    switch (dot.dataset.id) {
      case '1':
        currImage = imagesSrc[0];
        break;
      case '2':
        currImage = imagesSrc[1];
        break;
      case '3':
        currImage = imagesSrc[2];
        break;
      case '4':
        currImage = imagesSrc[3];
        break;
      case '5':
        currImage = imagesSrc[4];
        break;
    }
    return currImage;
  }

  if (!dot.classList.contains('addCurrent')) {
    let savedImg = checkCurrSelected();
    const mainImg = document.querySelector('.slideshow img');
    mainImg.classList.add('fadeOut');
    setTimeout(() => {
      mainImg.src = savedImg;
    }, 500);
    document.querySelector('.fadeOut').addEventListener('animationend', () => {
      mainImg.style.opacity = 0;
      mainImg.classList.remove('fadeOut');
      mainImg.classList.add('fadeIn');
      document
        .querySelector('.fadeIn')
        .addEventListener('animationend', (e) => {
          e.stopPropagation();
          mainImg.style = '';
          mainImg.classList.remove('fadeIn');
        });
    });
  }
}

currentSlide();
