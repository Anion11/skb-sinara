import { toggle } from 'slide-element'

export default function cardsCategoryGroup() {
  for (const box of document.querySelectorAll('.cards-category-group__box')) {
    box.querySelector('.cards-category-group__head').addEventListener('click', () => {
      if (window.innerWidth < 768) {
        box.classList.toggle('active')
        toggle(box.querySelector('.cards-category-group__list'), {
          display: 'grid',
          duration: 400
        })
      }
    })
  }
}
