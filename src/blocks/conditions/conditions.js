import Swiper from 'swiper/bundle'

export default function conditions() {
  const conditionsBlocks = document.querySelectorAll('.conditions')
  for (const conditionsBlock of conditionsBlocks) {
    const mainConditionsBody = conditionsBlock.querySelector('.conditions__body')
    const sliders = conditionsBlock.querySelectorAll('.conditions__slider')
    if (sliders) {
      for (const slider of sliders) {
        const mainConditionsSlider = new Swiper(slider, {
          effect: 'flip',
          speed: 500,
          followFinger: false,
          longSwipers: false,
          shortSwipes: false,
          navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev'
          },
          on: {
            slideNextTransitionStart: function () {
              slider.classList.add('conditions__slider--active')
              mainConditionsBody.classList.add('conditions__body--background')
              if (slider.querySelector('.conditions__slide--w100')) {
                slider.setAttribute('style', 'z-index: 100')
              }
            },
            slidePrevTransitionStart: function () {
              slider.classList.remove('conditions__slider--active')
              if (conditionsBlock.querySelectorAll('.conditions__slider--active').length === 0) {
                mainConditionsBody.classList.remove('conditions__body--background')
              }
              if (slider.querySelector('.conditions__slide--w100')) {
                slider.setAttribute('style', '')
              }
            }
          }
        })
        document.addEventListener('click', (event) => {
          const isClickInside = slider.contains(event.target)
          if (!isClickInside) {
            mainConditionsSlider.slidePrev()
          }
        })
        document.addEventListener('click', (event) => {
          const isClickInside = mainConditionsBody.contains(event.target)
          if (!isClickInside) {
            mainConditionsSlider.slidePrev()
          }
        })
      }
    }
  }
}
