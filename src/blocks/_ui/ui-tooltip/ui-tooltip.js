import tippy from 'tippy.js'

export default function uiTooltip() {
  const maxWidth = window.innerWidth > 375 ? 475 : 250
  const trigger = window.innerWidth < 768 ? 'click' : 'mouseenter focus'
  const tooltips = document.querySelectorAll('.ui-tooltip button')
  tippy(tooltips, {
    allowHTML: true,
    arrow: false,
    interactive: true,
    maxWidth,
    trigger
  })
}
