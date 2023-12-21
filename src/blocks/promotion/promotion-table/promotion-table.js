import { toggle } from 'slide-element'

export default function promotionTable() {
  autoHeightTable()
  window.addEventListener('resize', autoHeightTable)
}

function autoHeightTable() {
  const tables = [...document.querySelectorAll('.js-table')]
  for (const table of tables) {
    const columns = [...table.querySelectorAll('.js-column')]

    const allCells = [...table.querySelectorAll('.js-cell')]
    for (const cell of allCells) {
      cell.style.minHeight = 'auto'
    }

    const media = table.dataset.media || 1365

    if (window.innerWidth > media) {
      const columnLength = [...columns[0].querySelectorAll('.js-cell')].length

      for (let index = 0; index < columnLength; index++) {
        const heights = []
        for (const column of columns) {
          heights.push([...column.querySelectorAll('.js-cell')][index].offsetHeight)
        }
        const maxHeight = `${Math.max(...heights) + 1}px`
        for (const column of columns) {
          [...column.querySelectorAll('.js-cell')][index].style.minHeight = maxHeight
        }
      }
    }
  }
}
