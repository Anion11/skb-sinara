import Swiper from 'swiper/bundle'

export default function promotionPrizes() {
  for (const sliderContainer of document.querySelectorAll('.promotion-prizes__container')) {
    const slidersCount = sliderContainer.querySelectorAll('.promotion-prizes__item').length
    const slider = new Swiper(sliderContainer, {
      slidesPerView: 'auto',
      spaceBetween: 0,
      enabled: false,
      breakpoints: {
        1366: {
          enabled: true,
          slidesPerView: slidersCount <= 3 ? slidersCount : 3,
          spaceBetween: 20
        }
      },
      scrollbar: {
        el: sliderContainer.querySelector('.ui-swiper-scrollbar .swiper-scrollbar'),
        hide: false,
        draggable: true
      }
    })
  }
}
