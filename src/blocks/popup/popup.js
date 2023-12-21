import { Fancybox } from '@fancyapps/ui'

export default function popup() {
  window.Fancybox = Fancybox
  Fancybox.bind('.js-popup', {
    parentEl: document.querySelector('.wrapper'),
    hideScrollbar: true,
    autoFocus: false,
    trapFocus: false,
    dragToClose: false,
    on: {
      ready: (fancybox, slide) => {
        fancybox.$container.querySelector('.fancybox__slide').dataset.scrollLockScrollable = 'data-scroll-lock-scrollable'
      }
    }
  })
  Fancybox.defaults.ScrollLock = true
}
