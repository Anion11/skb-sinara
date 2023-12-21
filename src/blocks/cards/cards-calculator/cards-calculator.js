import wNumb from 'wnumb'

export default function cardsCalculator() {
  const cardsCalculatorBlock = document.querySelector('.cards-calculator')
  if (cardsCalculatorBlock) {
    const cardsCalculatorInputs = cardsCalculatorBlock.querySelectorAll('.cards-calculator__ui-input')
    for (const cardsCalculatorInput of cardsCalculatorInputs) {
      const input = cardsCalculatorInput.querySelector('input')
      const inputStep = Number(input.dataset.step)
      const inputMin = Number(input.dataset.min)
      const inputMax = Number(input.dataset.max)
      const buttonDecrease = cardsCalculatorInput.querySelector('.svg--icon_minus')
      const buttonIncrease = cardsCalculatorInput.querySelector('.svg--icon_plus')
      const wNumbConfig = wNumb({
        decimals: 0,
        thousand: ' ',
        suffix: input.dataset.currency ? ` ${input.dataset.currency}` : ' ₽'
      })
      let lastValue
      input.addEventListener('focus', () => {
        lastValue = input.value
        input.value = ''
      })
      input.addEventListener('blur', () => {
        input.value = lastValue
        if (Number(input.value.replace(/\D/g, '')) <= inputMin) {
          input.value = wNumbConfig.to(Number(inputMin))
        }
        if (Number(input.value.replace(/\D/g, '')) >= inputMax) {
          input.value = wNumbConfig.to(Number(inputMax))
        }
      })
      if (window.innerWidth > 768) {
        input.addEventListener('input', () => {
          input.value = input.value.slice(0, Math.max(0, input.value.length - 1))
        })
      }
      input.addEventListener('change', () => {
        lastValue = wNumbConfig.to(Number(input.value))
        input.value = lastValue
      })
      input.value = wNumbConfig.to(Number(input.value.replace(/\D/g, '')))
      buttonDecrease.addEventListener('click', () => {
        if (Number(input.value.replace(/\D/g, '')) <= inputMin) {
          input.value = inputMin + inputStep
        }
        input.value = wNumbConfig.to(Number(input.value.replace(/\D/g, '')) - inputStep)
      })
      buttonIncrease.addEventListener('click', () => {
        if (Number(input.value.replace(/\D/g, '')) >= inputMax) {
          input.value = inputMax - inputStep
        }
        input.value = wNumbConfig.to(Number(input.value.replace(/\D/g, '')) + inputStep)
      })
    }
  }
}
