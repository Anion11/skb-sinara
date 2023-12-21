import Hammer from 'hammerjs'
import { up, down, toggle } from 'slide-element'

export default function officesFilter() {
  const filter = document.querySelector('.offices-filter')
  if (filter) {
    const button = filter.querySelector('.offices-filter__button')
    const body = filter.querySelector('.offices-filter__body')
    if (button) {
      button.addEventListener('click', () => {
        filter.classList.toggle('offices-filter--active')
        if (window.innerWidth < 1366) {
          toggle(body)
        }
      })
    }

    const closePopup = () => {
      filter.classList.remove('offices-filter--active')
      up(body)
    }

    const buttonClose = filter.querySelector('.offices-filter__close')
    if (buttonClose) {
      buttonClose.addEventListener('click', closePopup)
    }
    const swipeClose = filter.querySelector('.offices-filter__swipe')
    if (swipeClose) {
      const manager = new Hammer.Manager(swipeClose)
      const Swipe = new Hammer.Swipe()
      manager.add(Swipe)
      manager.on('swipe', function (event) {
        if (event.direction === 16) {
          buttonClose.click()
        }
      })
    }

    function toggleText(t1, t2) {
      if (this.text() === t1) this.text(t2)
      else this.text(t1)
      return this
    }

    const showMoreButton = filter.querySelector('.ui-button--show-more')
    const showMoreElements = filter.querySelector('.offices-filter__list--hidden')
    showMoreButton.addEventListener('click', () => {
      if (showMoreButton.querySelector('.ui-p3').innerHTML === 'Свернуть') {
        showMoreButton.querySelector('.ui-p3').innerHTML = 'Показать еще'
      } else {
        showMoreButton.querySelector('.ui-p3').innerHTML = 'Свернуть'
      }
      toggle(showMoreElements, {
        display: 'grid'
      })
    })

    function atmsFilterBadgeShow() {
      button.classList.add('offices-filter__button--check')
    }
    function atmsFilterBadgeHide() {
      button.classList.remove('offices-filter__button--check')
    }

    window.globalAtmsFilterBadgeShow = atmsFilterBadgeShow
    window.globalAtmsFilterBadgeHide = atmsFilterBadgeHide
  }
}
