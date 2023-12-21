import Swiper from 'swiper/bundle'

export default function benefits() {
  const benefitsBlocks = document.querySelectorAll('.benefits')
  for (const benefitsBlock of benefitsBlocks) {
    const mainbenefitsBody = benefitsBlock.querySelector('.benefits__body')
    const sliders = benefitsBlock.querySelectorAll('.benefits__slider')
    if (sliders) {
      for (const slider of sliders) {
        const mainBenefitsSlider = new Swiper(slider, {
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
              slider.classList.add('benefits__slider--active')
              mainbenefitsBody.classList.add('benefits__body--background')
            },
            slidePrevTransitionStart: function () {
              slider.classList.remove('benefits__slider--active')
              if (benefitsBlock.querySelectorAll('.benefits__slider--active').length === 0) {
                mainbenefitsBody.classList.remove('benefits__body--background')
              }
            }
          }
        })
        document.addEventListener('click', (event) => {
          const isClickInside = slider.contains(event.target)
          if (!isClickInside) {
            mainBenefitsSlider.slidePrev()
          }
        })
        document.addEventListener('click', (event) => {
          const isClickInside = mainbenefitsBody.contains(event.target)
          if (!isClickInside) {
            mainBenefitsSlider.slidePrev()
          }
        })
      }
    }
  }
}
