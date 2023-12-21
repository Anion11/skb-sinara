import { up, down } from 'slide-element'

export default function officesBanner() {
  const officesBannerBlocks = document.querySelectorAll('.offices-banner')
  if (officesBannerBlocks) {
    for (const officesBannerBlock of officesBannerBlocks) {
      const closeButton = officesBannerBlock.querySelector('.offices-banner__close')
      if (officesBannerBlock.classList.contains('offices-banner--map')) {
        const body = officesBannerBlock.querySelector('.offices-banner__body')
        const openButton = officesBannerBlock.querySelector('.offices-banner__image')
        openButton.addEventListener('click', (event) => {
          event.preventDefault()
          down(body)
        })
        closeButton.addEventListener('click', (event) => {
          event.preventDefault()
          up(body)
        })
      } else {
        closeButton.addEventListener('click', (event) => {
          event.preventDefault()
          up(officesBannerBlock)
        })
      }
    }
  }
}

function closeBanner(banner) {
  if (banner.classList.contains('offices-banner--map')) {
    const body = banner.querySelector('.offices-banner__body')
    up(body)
  } else {
    up(banner)
  }
}
window.globalCloseOfficesBanner = closeBanner
