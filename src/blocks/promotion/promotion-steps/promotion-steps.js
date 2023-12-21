import Swiper from 'swiper/bundle'

export default function promotionSteps() {
  const promoSteps = document.querySelector('.promotion-steps')
  if (promoSteps) {
    const slider = new Swiper(promoSteps, {
      slidesPerView: 1,
      spaceBetween: 20,
      speed: 500,
      enabled: true,
      effect: 'flip',
      flipEffect: {
        slideShadows: false
      },
      pagination: {
        el: '.promotion-steps .ui-swiper-pagination .swiper-pagination',
        type: 'bullets'
      },
      breakpoints: {
        768: {
          slidesPerView: 'auto',
          spaceBetween: 0,
          enabled: false,
          effect: 'slide'
        }
      }
    })

    const circles = [...promoSteps.querySelectorAll('.promotion-steps__circle circle')]
    for (let index = 0; index < circles.length - 1; index++) {
      calcStrokeDash(circles[index])
      setProgress(circles[index], Math.ceil((index + 1) / circles.length * 100))
    }
  }
}

function calcStrokeDash(circle) {
  circle.style.strokeDasharray = circle.getTotalLength()
}

function setProgress(circle, percent) {
  const radius = circle.getAttribute('r')
  const area = Math.PI * (radius * 2)
  circle.style.strokeDashoffset = ((100 - percent) / 100) * area
}
