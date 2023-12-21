import Swiper from 'swiper/bundle'

export default function mainPromo() {
  const mainPromoSlider = new Swiper('.main-promo__slider', {
    navigation: {
      nextEl: '.main-promo__ui-swiper-buttons .swiper-button-next',
      prevEl: '.main-promo__ui-swiper-buttons .swiper-button-prev'
    },
    breakpoints: {
      320: {
        slidesPerView: 1.2,
        spaceBetween: 20
      },
      768: {
        slidesPerView: 1.7,
        spaceBetween: 20
      },
      1500: {
        slidesPerView: 3,
        spaceBetween: 20
      }
    }
  })
}
