export default function mainOffer() {
  const mainOfferBlocks = document.querySelectorAll('.main-offer')
  for (const mainOfferBlock of mainOfferBlocks) {
    if (mainOfferBlock) {
      const inputs = mainOfferBlock.querySelectorAll('input[required]')
      const button = mainOfferBlock.querySelector('.main-offer__ui-button')
      const form = mainOfferBlock.querySelector('.main-offer__form')
      if (form) {
        for (const [index, input] of inputs.entries()) {
          input.addEventListener('input', () => {
            if (!input.value.includes('_') && index + 1 !== inputs.length) {
              inputs[index + 1].focus()
            }
          })
        }
        const validator = form.justValidate
        if (validator) {
          validator.onValidate(({ fields }) => {
            const isAllValid = Object.values(fields).every((field) => field.isValid === true)
            if (isAllValid) button.removeAttribute('disabled')
          })
        }
      }
    }
  }
}
