import Swiper from 'swiper/bundle'

export default function mainBanner() {
  const animTime = 10
  const thumbItems = document.querySelectorAll('.main-banner__thumb')
  const mainBannerThumbs = new Swiper('.main-banner__thumbs', {
    slidesPerView: thumbItems.length
  })
  const mainBannerSlider = new Swiper('.main-banner__slider', {
    loop: true,
    spaceBetween: 20,
    autoplay: {
      delay: `${animTime}000`,
      disableOnInteraction: false
    },
    thumbs: {
      swiper: mainBannerThumbs
    },
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets'
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev'
    },
    on: {
      init: function () {
        if (window.innerWidth > 768) {
          setTimeout(function () {
            document.querySelector('.swiper-slide-thumb-active .main-banner__progress-line').classList.add('main-banner__progress-line--active')
            document.querySelector('.swiper-slide-thumb-active .main-banner__progress-line--active').setAttribute('style', `transition-duration: ${animTime}s`)
          })
        }
      },
      slideChange: function () {
        if (window.innerWidth > 768) {
          const thumbSlides = document.querySelectorAll('.main-banner__thumb')
          for (const thumbSlide of thumbSlides) {
            thumbSlide.querySelector('.main-banner__progress-line').classList.remove('main-banner__progress-line--active')
            thumbSlide.querySelector('.main-banner__progress-line').setAttribute('style', 'transition-duration: 0s')
          }
          setTimeout(function () {
            document.querySelector('.swiper-slide-thumb-active .main-banner__progress-line').classList.add('main-banner__progress-line--active')
            document.querySelector('.swiper-slide-thumb-active .main-banner__progress-line').setAttribute('style', `transition-duration: ${animTime}s`)
          }, 10)
        }
      }
    }
  })
  window.globalMainBanner = mainBannerSlider
}
