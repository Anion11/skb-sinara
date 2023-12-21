import IMask from 'imask'
import Inputmask from 'inputmask'
import JustValidate from 'just-validate'
import JustValidatePluginDate from 'just-validate-plugin-date'

export default function uiInput() {
  inputMask()
  checkInputFill()
  validation()
  inputFiles()
}

function inputMask() {
  const inputMaskItems = document.querySelectorAll('input[type="phone"]')
  const inputSummItems = document.querySelectorAll('input[type="summ"]')
  const inputFullNameItems = document.querySelectorAll('input[type="fullName"]')
  const inputBidthDateItems = document.querySelectorAll('input[type="birthDate"]')
  const inputCodeItems = document.querySelectorAll('input[type="code"]')
  if (inputMaskItems) {
    for (const inputMaskItem of inputMaskItems) {
      Inputmask({ mask: '+7 (999) 999 99 99' }).mask(inputMaskItem)
      inputMaskItem.addEventListener('mouseover', () => {
        inputMaskItem.classList.add('filled')
      })
      inputMaskItem.addEventListener('mouseout', () => {
        if (inputMaskItem.value.length === 0) {
          inputMaskItem.classList.remove('filled')
        }
      })
    }
  }
  if (inputSummItems && window.innerWidth > 768) {
    for (const inputSummItem of inputSummItems) {
      const mask = IMask(inputSummItem, {
        mask: Number
      })
    }
  }
  if (inputFullNameItems) {
    for (const inputFullNameItem of inputFullNameItems) {
      const mask = IMask(inputFullNameItem, {
        mask: /^\W+$/
      })
    }
  }
  if (inputBidthDateItems) {
    for (const inputBidthDateItem of inputBidthDateItems) {
      Inputmask({ mask: '99.99.9999' }).mask(inputBidthDateItem)
      inputBidthDateItem.addEventListener('mouseover', () => {
        inputBidthDateItem.classList.add('filled')
      })
      inputBidthDateItem.addEventListener('mouseout', () => {
        if (inputBidthDateItem.value.length === 0) {
          inputBidthDateItem.classList.remove('filled')
        }
      })
    }
  }
  if (inputCodeItems) {
    for (const inputCodeItem of inputCodeItems) {
      const mask = IMask(inputCodeItem, {
        mask: '0'
      })
    }
  }
}

function checkInputFill() {
  const uiInputs = document.querySelectorAll('.ui-input')
  if (uiInputs) {
    for (const element of uiInputs) {
      const input = element.querySelector('input')
      input.value === '' ? input.classList.remove('filled') : input.classList.add('filled')
      input.addEventListener('input', function () {
        input.value === '' ? input.classList.remove('filled') : input.classList.add('filled')
      })
    }
  }
}

function validation() {
  const formBlocks = document.querySelectorAll('form')
  if (formBlocks) {
    for (const formBlock of formBlocks) {
      const inputs = formBlock.querySelectorAll('input[required], select[required], .ui-checkbox[required] input')
      const mailInputs = formBlock.querySelectorAll('input[type="email"]')
      const phoneInputs = formBlock.querySelectorAll('input[type="phone"]')
      const dateInputs = formBlock.querySelectorAll('input[type="birthDate"]')
      const validate = new JustValidate(formBlock)
      formBlock.justValidate = validate
      if (inputs) {
        for (const input of inputs) {
          input.addEventListener('change', () => {
            validate.revalidateField(input)
          })
          validate.addField(input, [
            {
              rule: 'required',
              errorMessage: 'Обязательное поле'
            }
          ])
        }
      }
      if (mailInputs) {
        for (const mailInput of mailInputs) {
          validate.addField(mailInput, [
            {
              rule: 'required',
              errorMessage: 'Обязательное поле'
            },
            {
              rule: 'email',
              errorMessage: 'Введите адрес электронной почты'
            }
          ])
        }
      }
      if (phoneInputs) {
        for (const phoneInput of phoneInputs) {
          validate.addField(phoneInput, [
            {
              validator: (value, context) => value.length === 18 && !value.match('_'),
              errorMessage: 'Обязательное поле'
            }
          ])
        }
      }
      if (dateInputs) {
        for (const dateInput of dateInputs) {
          validate.addField(dateInput, [
            {
              plugin: JustValidatePluginDate(() => ({
                format: 'dd.MM.yyyy',
                isBefore: '01.01.2005',
                isAfter: '01.01.1943'
              })),
              errorMessage: 'Обязательное поле'
            }
          ])
        }
      }
    }
  }
}

function inputFiles() {
  window.formFiles = new Map()

  document.addEventListener('change', (event) => {
    const inputFile = event.target.closest('.ui-input--file input')
    if (inputFile) {
      const files = inputFile.files
      if (files.length > 0) {
        const filesList = Object.keys(files).map((filesIndex) => files[filesIndex])
        const inputId = inputFile.getAttribute('id')
        addFiles(filesList, inputId)

        const filesWrapper = inputFile.closest('.ui-input--file').querySelector('.ui-input__files')
        for (let index = 0; index < Object.values(files).length; index++) {
          const fileElement = document.createElement('div')
          fileElement.classList = 'ui-input__file'
          const fileName = document.createElement('div')
          fileName.classList = 'ui-input__file-name'
          fileName.textContent = files[index].name
          const fileDeleteButton = document.createElement('button')
          fileDeleteButton.type = 'button'
          fileDeleteButton.classList = 'ui-input__file-del'
          fileDeleteButton.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none"><path fill="#038C73" fill-opacity=".4" d="M3.862 13.085c0 .953.771 1.725 1.725 1.725h4.826c.953 0 1.725-.772 1.725-1.725V4.81H3.862v8.275ZM13 3.258a.863.863 0 0 0-.864-.862H10.07V2.05a.861.861 0 0 0-.863-.86H6.793a.861.861 0 0 0-.862.86v.346H3.864A.863.863 0 0 0 3 3.258v.862h10v-.862Z"/></svg>'
          fileDeleteButton.addEventListener('click', function (event) {
            event.preventDefault()
            const index = [...fileElement.parentElement.children].indexOf(fileElement)
            removeFile(index, inputId)
            fileElement.remove()

            if (index === 0) {
              filesLabel.textContent = 'Прикрепить файл к сообщению'
              inputFile.classList.remove('filled')
            }
          })
          fileElement.append(fileName)
          fileElement.append(fileDeleteButton)
          filesWrapper.append(fileElement)
        }
        const filesLabel = inputFile.closest('.ui-input--file').querySelector('label')
        filesLabel.textContent = 'Добавить еще файл'

        inputFile.value = ''
      }
    }
  })
}

function addFiles(files, inputId) {
  if (window.formFiles.has(inputId)) {
    const newFiles = [...window.formFiles.get(inputId), ...files]
    window.formFiles.set(inputId, newFiles)
  } else {
    window.formFiles.set(inputId, files)
  }
}

function removeFile(index, inputId) {
  const files = window.formFiles.get(inputId)
  files.splice(index, 1)
  window.formFiles.set(inputId, files)
}
