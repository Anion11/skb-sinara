import Swiper from 'swiper/bundle'
import scrollLock from 'scroll-lock'

export default function mainProducts() {
  const mainProductsBody = document.querySelector('.main-products__body')
  const sliders = document.querySelectorAll('.main-products__slider')
  if (sliders) {
    for (const slider of sliders) {
      const mainProductsSlider = new Swiper(slider, {
        effect: 'flip',
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev'
        },
        breakpoints: {
          0: {
            enabled: false
          },
          768: {
            enabled: true
          }
        },
        on: {
          slideNextTransitionStart: function () {
            slider.classList.add('main-products__slider--active')
            mainProductsBody.classList.add('main-products__body--background')
            scrollLock.disablePageScroll()
          },
          slidePrevTransitionStart: function () {
            slider.classList.remove('main-products__slider--active')
            if (document.querySelectorAll('.main-products__slider--active').length === 0) {
              mainProductsBody.classList.remove('main-products__body--background')
            }
            scrollLock.enablePageScroll()
          }
        }
      })
      document.addEventListener('click', (event) => {
        const isClickInside = mainProductsBody.contains(event.target)
        if (!isClickInside) {
          mainProductsSlider.slidePrev()
        }
      })
    }
  }
}
