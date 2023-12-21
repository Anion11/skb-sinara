import { up } from 'slide-element'

export default function popups() {
  const popupBlocks = document.querySelectorAll('.popups')
  if (popupBlocks) {
    for (const popupBlock of popupBlocks) {
      const popupGeo = popupBlock.querySelector('.popups-geo__ui-button.ui-button--filled')
      const popupCookies = popupBlock.querySelector('.popups-cookies__ui-button')
      const popupMobileApp = popupBlock.querySelector('.popups-mobile-app__close')
      if (popupGeo) {
        closePopup(popupGeo)
      }
      if (popupCookies) {
        closePopup(popupCookies)
      }
      if (popupMobileApp) {
        closePopup(popupMobileApp)
      }
    }
  }
}

function closePopup(element) {
  element.addEventListener('click', () => {
    up(element.closest('.popups__item'))
  })
}
