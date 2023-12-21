import Swiper from 'swiper/bundle'

export default function mainArticles() {
  const mainArticlesSlider = new Swiper('.main-articles__slider', {
    breakpoints: {
      320: {
        slidesPerView: 1.2,
        spaceBetween: 20
      },
      768: {
        enabled: true,
        slidesPerView: 1.7,
        spaceBetween: 20
      },
      1366: {
        enabled: false,
        slidesPerView: 4,
        spaceBetween: 20
      }
    }
  })
}
