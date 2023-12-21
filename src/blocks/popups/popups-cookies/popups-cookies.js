export default function popupsCookies() {
  const popupsCookiesBlock = document.querySelector('.popups-cookies')
  if (popupsCookiesBlock) {
    const button = popupsCookiesBlock.querySelector('.popups-cookies__show')
    const text = popupsCookiesBlock.querySelector('.popups-cookies__text')
    button.addEventListener('click', () => {
      button.classList.add('popups-cookies__show--active')
      text.classList.add('popups-cookies__text--active')
    })
  }
}
