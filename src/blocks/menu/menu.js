import scrollLock from 'scroll-lock'
import Hammer from 'hammerjs'

export default function menu() {
  const menuBlock = document.querySelector('.menu')
  if (menuBlock) {
    const menuBodys = menuBlock.querySelectorAll('.menu__body')
    const menuBodysData = []
    for (const menuBody of menuBodys) {
      menuBodysData.push(menuBody.dataset.menu)
    }
    let lastButton
    const menuButtons = menuBlock.querySelectorAll('.menu__button')
    for (const menuButton of menuButtons) {
      menuButton.addEventListener('click', () => {
        const buttonHeadData = menuButton.dataset.menu
        if (menuBodysData.includes(buttonHeadData)) {
          menuBodys[menuBodysData.indexOf(buttonHeadData)].classList.toggle('menu__body--active')
        }
        menuBlock.classList.add('menu--active')
        menuButton.classList.toggle('menu__button--active')
        scrollLock.disablePageScroll()
        for (const [index, menuButton] of menuButtons.entries()) {
          if (index !== menuBodysData.indexOf(buttonHeadData) && index < 5) {
            menuButton.classList.remove('menu__button--active')
          }
        }
        for (const [index, menuBody] of menuBodys.entries()) {
          if (index === menuBodysData.indexOf(buttonHeadData)) {
            const menuBack = menuBody.querySelector('.menu__back')
            if (menuBack) {
              menuBack.addEventListener('click', () => {
                menuBody.classList.remove('menu__body--active')
                menuBodys[menuBodysData.indexOf(buttonHeadData.split('/').slice(-2, -1)[0])].classList.add('menu__body--active')
                lastButton = buttonHeadData.split('/').slice(-2, -1)[0]
              })
            }
          } else {
            menuBody.classList.remove('menu__body--active')
            menuBody.scrollTop = 0
          }

          const swipeClose = menuBody.querySelector('.menu__swipe')
          const manager = new Hammer.Manager(swipeClose)
          const Swipe = new Hammer.Swipe()
          manager.add(Swipe)
          manager.on('swipe', function (event) {
            if (event.direction === 16) {
              menuBody.querySelector('.menu__close').click()
            }
          })

          const menuClose = menuBody.querySelector('.menu__close')
          menuClose.addEventListener('click', () => {
            menuBody.classList.remove('menu__body--active')
            menuBlock.classList.remove('menu--active')
            menuButton.classList.remove('menu__button--active')
            scrollLock.enablePageScroll()
          })
        }
        if (lastButton === buttonHeadData) {
          menuBodys[0].querySelector('.menu__close').click()
          scrollLock.enablePageScroll()
        }
        lastButton = buttonHeadData
      })
    }
  }
}
