export default function mobileLinks() {
  const mobileLinksBlock = document.querySelector('.mobile-links')
  if (mobileLinksBlock && window.innerWidth < 768) {
    const moobileLinksToggle = mobileLinksBlock.querySelector('.mobile-links__toggle')
    const mobileLinksBody = mobileLinksBlock.querySelector('.mobile-links__body')
    if (mobileLinksBody) {
      moobileLinksToggle.addEventListener('click', () => {
        moobileLinksToggle.classList.toggle('mobile-links__toggle--active')
        mobileLinksBody.classList.toggle('mobile-links__body--active')
      })
    }
  }
}
