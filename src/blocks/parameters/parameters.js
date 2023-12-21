import { up, down } from 'slide-element'
import scrollLock from 'scroll-lock'

export default function parameters() {
  const parametersBlock = document.querySelector('.parameters')
  if (parametersBlock) {
    function removeClass() {
      if (window.innerWidth < 768) {
        const parametersHeadItems = parametersBlock.querySelectorAll('.ui-tab-head__item')
        const parametersBodyItems = parametersBlock.querySelectorAll('.ui-tab-body__item')
        for (const parametersHeadItem of parametersHeadItems) {
          let parametersBodyItemActive = parametersBlock.querySelector('.ui-tab-body__item--active')
          parametersHeadItem.addEventListener('click', () => {
            for (const parametersBodyItem of parametersBodyItems) {
              if (!parametersBodyItem.classList.contains('ui-tab-body__item--active')) {
                up(parametersBodyItem)
              }
            }
            parametersBodyItemActive = parametersBlock.querySelector('.ui-tab-body__item--active')
            const menuClose = parametersBodyItemActive.querySelector('.parameters__close')
            const activeBlock = parametersBlock.querySelector('.ui-tab-body__item--active')
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
