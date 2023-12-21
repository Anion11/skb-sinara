import { up, down } from 'slide-element'
import scrollLock from 'scroll-lock'

export default function cardsCategories() {
  const cardsCategoriesBlock = document.querySelector('.cards-categories')
  if (cardsCategoriesBlock) {
    const tabHeadItems = cardsCategoriesBlock.querySelectorAll('.ui-tab-head__item')
    const tabBodyItems = cardsCategoriesBlock.querySelectorAll('.ui-tab-body__item')
    const closeButtons = cardsCategoriesBlock.querySelectorAll('.cards-categories__close')
    for (const tabHeadItem of tabHeadItems) {
      tabHeadItem.addEventListener('click', () => {
        for (const tabHeadItem of tabHeadItems) {
          tabHeadItem.classList.add('ui-tab-head__item--disabled')
        }
        tabHeadItem.classList.remove('ui-tab-head__item--disabled')
      })
    }
    for (const closeButton of closeButtons) {
      closeButton.addEventListener('click', () => {
        for (const tabHeadItem of tabHeadItems) {
          tabHeadItem.classList.remove('ui-tab-head__item--active', 'ui-tab-head__item--disabled')
        }
        for (const tabBodyItem of tabBodyItems) {
          tabBodyItem.classList.remove('ui-tab-body__item--active')
        }
      })
    }
    function removeClass() {
      if (window.innerWidth < 768) {
        for (const tabHeadItem of tabHeadItems) {
          let parametersBodyItemActive = cardsCategoriesBlock.querySelector('.ui-tab-body__item--active')
          tabHeadItem.addEventListener('click', () => {
            for (const tabBodyItem of tabBodyItems) {
              if (!tabBodyItem.classList.contains('ui-tab-body__item--active')) {
                up(tabBodyItem)
              }
            }
            parametersBodyItemActive = cardsCategoriesBlock.querySelector('.ui-tab-body__item--active')
            const menuClose = parametersBodyItemActive.querySelector('.cards-categories__close')
            const activeBlock = cardsCategoriesBlock.querySelector('.ui-tab-body__item--active')
            scrollLock.getScrollState() === true ? scrollLock.disablePageScroll() : scrollLock.enablePageScroll()
            down(parametersBodyItemActive)
            menuClose.addEventListener('click', () => {
              scrollLock.enablePageScroll()
              up(activeBlock)
            })
          })
          if (parametersBodyItemActive) {
            parametersBodyItemActive.classList.remove('ui-tab-body__item--active')
          }
        }
      }
    }
    window.addEventListener('load', removeClass, false)
    window.addEventListener('resize', removeClass, false)
  }
}
