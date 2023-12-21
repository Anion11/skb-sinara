export default function popupGeo() {
  const popupGeoBlock = document.querySelector('.popup--geo')
  if (popupGeoBlock) {
    const buttons = document.querySelectorAll('[href="#popupGeo"]')
    for (const button of buttons) {
      button.addEventListener('click', () => {
        const input = popupGeoBlock.querySelector('.ui-input input')
        setTimeout(() => {
          input.focus()
        }, 100)
      })
    }
  }
}
