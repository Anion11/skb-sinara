export default function uiTable() {
  window.updateMobShortTable = (tableContainer) => {
    resetMobShortTable(tableContainer)
    calcMobShortTable(tableContainer)
  }

  for (const mobShortTable of document.querySelectorAll('.ui-table[data-mob-short]')) {
    calcMobShortTable(mobShortTable)
    window.addEventListener('load', () => window.updateMobShortTable(mobShortTable))
    const closestTabBody = mobShortTable.closest('.ui-tab-body__item')
    if (closestTabBody) {
      closestTabBody.addEventListener('ui-tab-body:open', () => window.updateMobShortTable(mobShortTable))
    }
  }
}

function calcMobShortTable(tableContainer) {
  const maxRowCount = +tableContainer.dataset.mobShort || 7

  const containerElement = tableContainer.querySelector('.ui-table__container')
  const trArray = tableContainer.querySelectorAll('tr')

  if (containerElement && trArray.length > maxRowCount && window.innerWidth < 768) {
    tableContainer.classList.add('ui-table--more-pb')
    let fullHeight = tableContainer.offsetHeight
    let hiddenHeight = Number.parseInt(window.getComputedStyle(tableContainer).paddingTop) + Number.parseInt(window.getComputedStyle(tableContainer).paddingBottom)
    for (let index = 0; index < maxRowCount; index++) {
      hiddenHeight += trArray[index].offsetHeight
    }

    tableContainer.classList.add('ui-table--rolled-up')
    tableContainer.style.transitionDuration = '0.4s'
    tableContainer.style.overflow = 'hidden'
    tableContainer.style.maxHeight = `${hiddenHeight}px`
    const [moreContainer, button] = createButton()
    button.addEventListener('click', () => {
      tableContainer.classList.toggle('ui-table--rolled-up')
      if (tableContainer.classList.contains('ui-table--rolled-up')) {
        const currentFullHeight = tableContainer.offsetHeight
        if (currentFullHeight > fullHeight) fullHeight = currentFullHeight
        tableContainer.style.maxHeight = `${fullHeight}px`

        setTimeout(() => {
          tableContainer.style.maxHeight = `${hiddenHeight}px`
          button.children[0].textContent = 'Показать еще'
        })
      } else {
        tableContainer.style.maxHeight = `${fullHeight + 10}px`
        button.children[0].textContent = 'Свернуть'
        setTimeout(() => {
          tableContainer.style.maxHeight = ''
        }, 300)
      }
    })
    tableContainer.append(moreContainer)
  }
}

function resetMobShortTable(tableContainer) {
  tableContainer.classList.remove('ui-table--more-pb')
  tableContainer.classList.remove('ui-table--rolled-up')
  const containerElement = tableContainer.querySelector('.ui-table__container')
  if (containerElement) {
    tableContainer.style = ''
    const moreContainer = tableContainer.querySelector('.ui-table__more')
    if (moreContainer) {
      moreContainer.remove()
    }
  }
}

function createButton() {
  const moreContainer = document.createElement('div')
  moreContainer.className = 'ui-table__more'
  const button = document.createElement('button')
  button.className = 'ui-button'
  button.type = 'button'
  button.innerHTML = '<div class="ui-p3 ui-p3--bold">Показать еще</div>'
  moreContainer.append(button)
  return [moreContainer, button]
}
