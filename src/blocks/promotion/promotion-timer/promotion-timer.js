/* eslint-disable unicorn/numeric-separators-style */
import dayjs from 'dayjs/esm/index.js'

export default function promotionTimer() {
  if (document.querySelector('.promotion-timer__timer')) {
    makeTimer()
    setInterval(function () { makeTimer(true) }, 1000)
  }
}

function makeTimer(flip = false) {
  const timerBlock = document.querySelector('.promotion-timer__timer')
  const endTime = dayjs(timerBlock.dataset.end)
  const now = dayjs()

  const timeLeft = decomposeTime(endTime, now)

  if (timeLeft.days > -1) {
    timerUpdateValues('months', timeLeft.months, ['месяц', 'месяца', 'месяцев'], flip)
    timerUpdateValues('days', timeLeft.days, ['день', 'дня', 'дней'], flip)
    timerUpdateValues('hours', timeLeft.hours, ['час', 'часа', 'часов'], flip)
    timerUpdateValues('minutes', timeLeft.minutes, ['минута', 'минуты', 'минут'], flip)
    timerUpdateValues('seconds', timeLeft.seconds, ['секунда', 'секунды', 'секунд'], flip)
  }
}

function decOfNumber(number, titles) {
  const decCache = []
  const decCases = [2, 0, 1, 1, 1, 2]
  if (!decCache[number]) decCache[number] = number % 100 > 4 && number % 100 < 20 ? 2 : decCases[Math.min(number % 10, 5)]
  return titles[decCache[number]]
}

function timerUpdateValues(id, time, descr, flip) {
  const element = document.querySelector(`[data-timer-item="promo-timer-${id}"]`)
  const valueArray = [...String(time)]
  const valueFirst = element.querySelector('.promotion-timer__number--first')
  const valueSecond = element.querySelector('.promotion-timer__number--second')

  if (valueFirst.dataset.num !== valueArray[0]) {
    if (flip) {
      flipTo(valueFirst, valueArray[0])
    } else {
      setTo(valueFirst, valueArray[0])
    }
  }
  if (valueSecond.dataset.num !== valueArray[1]) {
    if (flip) {
      flipTo(valueSecond, valueArray[1])
    } else {
      setTo(valueSecond, valueArray[1])
    }
  }
  if (descr !== undefined) {
    element.querySelector('.ui-p5').innerHTML = decOfNumber(time, descr)
  }
}

function decomposeTime(endTime, now) {
  let months = endTime.diff(now, 'month')
  let days = endTime.subtract(months, 'month').diff(now, 'day')
  let hours = endTime.subtract(months, 'month').subtract(days, 'day').diff(now, 'hour')
  let minutes = endTime.subtract(months, 'month').subtract(days, 'day').subtract(hours, 'hour').diff(now, 'minute')
  let seconds = endTime.subtract(months, 'month').subtract(days, 'day').subtract(hours, 'hour').subtract(minutes, 'minute').diff(now, 'second')

  if (months < '10') { months = `0${months}` }
  if (days < '10') { days = `0${days}` }
  if (hours < '10') { hours = `0${hours}` }
  if (minutes < '10') { minutes = `0${minutes}` }
  if (seconds < '10') { seconds = `0${seconds}` }

  const monthsItem = document.querySelector('[data-timer-item="promo-timer-months"]')
  const secondsItem = document.querySelector('[data-timer-item="promo-timer-seconds"]')
  if (Number.parseFloat(months).toFixed(1) < 1) {
    if (monthsItem) monthsItem.setAttribute('hidden', '')
    if (secondsItem) secondsItem.removeAttribute('hidden')
  } else {
    if (monthsItem) monthsItem.removeAttribute('hidden')
    if (secondsItem) secondsItem.setAttribute('hidden', '')
  }

  return { months, days, hours, minutes, seconds }
}

function setTo(element, digit) {
  element.dataset.num = digit
  element.querySelector('.base').textContent = digit
}

function flipTo(element, digit) {
  const current = element.dataset.num
  element.dataset.num = digit
  element.querySelector('.front').dataset.content = current
  element.querySelector('.back').dataset.content = digit
  element.querySelector('.under').dataset.content = digit
  element.querySelector('.flap.front').style.display = 'block'
  element.querySelector('.flap.back').style.display = 'block'
  element.querySelector('.flap.under').style.display = 'block'
  setTimeout(function () {
    element.querySelector('.base').textContent = digit
    element.querySelector('.flap.front').style.display = 'none'
    element.querySelector('.flap.back').style.display = 'none'
    element.querySelector('.flap.under').style.display = 'none'
  }, 500)
}
