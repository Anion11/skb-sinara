export default function header() {
  const header = document.querySelector('header')
  if (header) {
    const headerSearch = document.querySelector('.header-search')
    const headerIcon = headerSearch.querySelector('.header-search__ui-svg')
    const headerInput = headerSearch.querySelector('.header-search__ui-input input')
    const headerClose = headerSearch.querySelector('.header-search__close')

    headerIcon.addEventListener('click', () => {
      headerSearch.classList.add('header-search--active')
      headerInput.focus()
    })
    headerClose.addEventListener('click', () => {
      headerSearch.classList.remove('header-search--active')
      headerInput.value = ''
    })
    document.addEventListener('click', (event) => {
      const isClickInside = headerSearch.contains(event.target)
      if (!isClickInside) {
        headerSearch.classList.remove('header-search--active')
        headerInput.value = ''
      }
    })

    const headerLinks = header.querySelectorAll('.header__item')
    for (const headerLink of headerLinks) {
      const linkDropdown = headerLink.querySelector('.header__dropdown')
      if (linkDropdown) {
        headerLink.addEventListener('mouseover', () => {
          linkDropdown.removeAttribute('hidden')
          setTimeout(() => {
            headerLink.classList.add('header__item--hover')
          }, 10)
        })
        headerLink.addEventListener('mouseout', () => {
          setTimeout(() => {
            headerLink.classList.remove('header__item--hover')
          }, 10)
        })
      }
    }
  }
}
