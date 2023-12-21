import { up, down } from 'slide-element'
import scrollLock from 'scroll-lock'

export default function parametersNew() {
  const parametersBlock = document.querySelector('.parameters-new')
  if (parametersBlock) {
    function removeClass() {
      if (window.innerWidth < 768) {
        const parametersHeadItems = parametersBlock.querySelectorAll('.parameters-new__ui-tab-head')
        const parametersBodyItems = parametersBlock.querySelector('.parameters-new__ui-tab-body').children
        for (const parametersHeadItem of parametersHeadItems) {
          let parametersBodyItemActive = parametersBlock.querySelector('.parameters-new__body > .ui-tab > .ui-tab-body > .ui-tab-body__item--active')
          parametersHeadItem.addEventListener('click', () => {
            for (const parametersBodyItem of parametersBodyItems) {
              if (!parametersBodyItem.classList.contains('ui-tab-body__item--active')) {
                up(parametersBodyItem)
              }
            }
            parametersBodyItemActive = parametersBlock.querySelector('.parameters-new__body > .ui-tab > .ui-tab-body > .ui-tab-body__item--active')
            const menuClose = parametersBodyItemActive.querySelector('.parameters-new__close')
            const activeBlock = parametersBlock.querySelector('.parameters-new__body > .ui-tab > .ui-tab-body > .ui-tab-body__item--active')
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
