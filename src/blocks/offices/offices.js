import Hammer from 'hammerjs'
import scrollLock from 'scroll-lock'
import { up, down } from 'slide-element'

export default function offices() {
  const officesBlock = document.querySelector('.offices')
  if (officesBlock) {
    const officesItems = officesBlock.querySelectorAll('.offices__item')
    for (const officesItem of officesItems) {
      const buttonBack = officesItem.querySelector('.offices__back')
      const swipeClose = officesItem.querySelector('.offices__swipe')

      if (buttonBack) {
        buttonBack.addEventListener('click', () => {
          up(officesItem)
          officesItem.classList.remove('offices__item--active')
          if (!document.querySelector('offices__item--active') && window.innerWidth < 768) {
            scrollLock.enablePageScroll()
          }
        })
      }
      if (swipeClose) {
        const manager = new Hammer.Manager(swipeClose)
        const Swipe = new Hammer.Swipe()
        manager.add(Swipe)
        manager.on('swipe', function (event) {
          if (event.direction === 8) {
            officesItem.classList.add('offices__item--active')
            scrollLock.disablePageScroll()
          }
          if (event.direction === 16) {
            officesItem.classList.remove('offices__item--active')
            scrollLock.enablePageScroll()
          }
        })
      }
    }

    function atmsItemShow(element) {
      if (!element.classList.contains('offices__item--active')) {
        down(element)
        element.classList.add('offices__item--active')
        if (window.innerWidth < 768) {
          scrollLock.disablePageScroll()
        }
      }
    }
    function atmsItemHide(element) {
      up(element)
      element.classList.remove('offices__item--active')
      if (!document.querySelector('offices__item--active') && window.innerWidth < 768) {
        scrollLock.enablePageScroll()
      }
    }

    window.globalAtmsItemShow = atmsItemShow
    window.globalAtmsItemHide = atmsItemHide
    window.globalScrollLock = scrollLock.disablePageScroll

    const map = officesBlock.querySelector('.offices__map')
    if (map) {
      const buttons = map.querySelector('.offices__buttons')
      const openFullScreen = buttons.querySelector('.offices__ui-svg.ui-svg--open')
      const closeFullScreen = buttons.querySelector('.offices__ui-svg.ui-svg--close')
      const atmsMapData = {
        type: 'FeatureCollection',
        features: [
          { type: 'Feature', id: 0, geometry: { type: 'Point', coordinates: [55.8319, 37.4119] }, options: { iconLayout: 'default#image', iconImageHref: 'images/icon_menu-geo.svg', iconImageOffset: '[-10, -60]' }, properties: { balloonContentHeader: 'Заголовок балуна', balloonContentBody: 'Содержимое балуна' } },
          { type: 'Feature', id: 1, geometry: { type: 'Point', coordinates: [55.7633, 37.5654] }, options: { iconLayout: 'default#image', iconImageHref: 'images/icon_menu-geo.svg', iconImageOffset: '[-10, -60]' }, properties: { balloonContentHeader: 'Заголовок балуна', balloonContentBody: 'Содержимое балуна' } }
        ]
      }
      const mapID = map.querySelector('#officesMap')
      if (mapID) {
        ymaps.ready(() => {
          const map = new ymaps.Map('officesMap', {
            center: [55.7536, 37.6212],
            zoom: 12,
            controls: []
          }, {
            suppressMapOpenBlock: true
          })

          const objectManager = new ymaps.ObjectManager({
            clusterize: true,
            gridSize: 100,
            clusterDisableClickZoom: false
          })

          objectManager.clusters.options.set({
            clusterIcons: [{
              href: 'media/img/map-circle-red.svg',
              size: [50, 50],
              offset: [0, 0]
            }]
          })

          map.geoObjects.add(objectManager)
          objectManager.add(atmsMapData)

          openFullScreen.addEventListener('click', () => {
            buttons.classList.add('offices__buttons--active')
            map.container.enterFullscreen()
          })
          closeFullScreen.addEventListener('click', () => {
            buttons.classList.remove('offices__buttons--active')
            map.container.exitFullscreen()
          })
        })
      }
    }
  }
}
