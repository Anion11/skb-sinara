import Swiper from 'swiper/bundle'

export default function instruction() {
  for (const instructionBlock of document.querySelectorAll('.instruction')) {
    const txtSlider = new Swiper(instructionBlock.querySelector('.instruction__text'), {
      slidesPerView: 1,
      spaceBetween: 20,
      enabled: true,
      effect: 'fade',
      fadeEffect: {
        crossFade: true
      },
      navigation: {
        nextEl: instructionBlock.querySelector('.swiper-button-next'),
        prevEl: instructionBlock.querySelector('.swiper-button-prev')
      },
      pagination: window.innerWidth < 768
        ? {
          el: instructionBlock.querySelector('.ui-swiper-pagination .swiper-pagination'),
          type: 'bullets'
        }
        : {
          el: instructionBlock.querySelector('.ui-swiper-fraction .swiper-pagination'),
          type: 'fraction',
          formatFractionTotal: (number) => +number < 10 ? `0${number}` : number,
          formatFractionCurrent: (number) => +number < 10 ? `0${number}` : number,
          renderFraction: (currentClass, totalClass) => `<span class="${currentClass}"></span>/<span class="${totalClass}"></span>`
        },
      breakpoints: {
        1366: {
          enabled: false,
          slidesPerView: 'auto',
          effect: 'slide'
        },
        768: {
          slidesPerView: 1,
          enabled: true,
          effect: 'fade'
        }
      }
    })

    const imgSlider = new Swiper(instructionBlock.querySelector('.instruction__images'), {
      slidesPerView: 1,
      allowTouchMove: true,
      spaceBetween: 60,
      breakpoints: {
        768: {
          allowTouchMove: false
        }
      }
    })

    txtSlider.controller.control = imgSlider
    imgSlider.controller.control = txtSlider

    for (const [index, step] of instructionBlock.querySelectorAll('.instruction__step').entries()) {
      step.addEventListener('click', () => {
        imgSlider.slideTo(index)
      })
    }
  }
}
