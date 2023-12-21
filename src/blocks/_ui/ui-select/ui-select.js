import TomSelect from 'tom-select'

export default function uiSelect() {
  const selects = document.querySelectorAll('.ui-select select')
  for (const select of selects) {
    const renderSettings = select.hasAttribute('data-not-escape') ? renderEscapeSettings : ''
    const controlInput = select.hasAttribute('placeholder') ? '<input type="text" readonly>' : undefined
    const tomSelect = new TomSelect(select, {
      controlInput,
      onDropdownOpen() {
        const wrapper = select.parentElement.querySelector('.ts-wrapper')
        const list = select.parentElement.querySelector('.ts-dropdown')
        if ((window.innerHeight - wrapper.getBoundingClientRect().top - wrapper.clientHeight) < list.clientHeight) {
          wrapper.classList.add('dropdown-top')
        } else {
          wrapper.classList.remove('dropdown-top')
        }
      },
      onDropdownClose() {
        tomSelect.blur()
      },
      render: renderSettings
    })
  }
}

const renderEscapeSettings = {
  option: function (data, escape) {
    return '<div>' + data.text + '</div>'
  },
  item: function (data, escape) {
    return '<div>' + data.text + '</div>'
  }
}
