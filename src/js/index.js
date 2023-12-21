import '../styles/style.scss'
import 'virtual:svg-icons-register'
import 'lazysizes'
import uiAccordion from '../blocks/_ui/ui-accordion/ui-accordion'
import uiDatepicker from '../blocks/_ui/ui-datepicker/ui-datepicker'
import uiInput from '../blocks/_ui/ui-input/ui-input'
import uiRange from '../blocks/_ui/ui-range/ui-range'
import uiSelect from '../blocks/_ui/ui-select/ui-select'
import uiTab from '../blocks/_ui/ui-tab/ui-tab'
import uiTable from '../blocks/_ui/ui-table/ui-table'
import uiTooltip from '../blocks/_ui/ui-tooltip/ui-tooltip'
import header from '../blocks/header/header'
import benefits from '../blocks/benefits/benefits'
import cardsCalculator from '../blocks/cards/cards-calculator/cards-calculator'
import cardsCategories from '../blocks/cards/cards-categories/cards-categories'
import cardsCategoryGroup from '../blocks/cards/cards-category-group/cards-category-group'
import conditions from '../blocks/conditions/conditions'
import instruction from '../blocks/instruction/instruction'
import mainArticles from '../blocks/main/main-articles/main-articles'
import mainBanner from '../blocks/main/main-banner/main-banner'
import mainCalculator from '../blocks/main/main-calculator/main-calculator'
import mainOffer from '../blocks/main/main-offer/main-offer'
import mainProducts from '../blocks/main/main-products/main-products'
import mainPromo from '../blocks/main/main-promo/main-promo'
import menu from '../blocks/menu/menu'
import mobileLinks from '../blocks/mobile-links/mobile-links'
import offices from '../blocks/offices/offices'
import officesBanner from '../blocks/offices/offices-banner/offices-banner'
import officesFilter from '../blocks/offices/offices-filter/offices-filter'
import parameters from '../blocks/parameters/parameters'
import parametersNew from '../blocks/parameters-new/parameters-new'
import popup from '../blocks/popup/popup'
import popupGeo from '../blocks/popup/popup-geo/popup-geo'
import popups from '../blocks/popups/popups'
import popupsCookies from '../blocks/popups/popups-cookies/popups-cookies'
import promotionPrizes from '../blocks/promotion/promotion-prizes/promotion-prizes'
import promotionSteps from '../blocks/promotion/promotion-steps/promotion-steps'
import promotionTimer from '../blocks/promotion/promotion-timer/promotion-timer'
import promotionTable from '../blocks/promotion/promotion-table/promotion-table'

document.addEventListener('DOMContentLoaded', function () {
  uiAccordion()
  uiDatepicker()
  uiInput()
  uiRange()
  uiSelect()
  uiTab()
  uiTable()
  uiTooltip()
  header()
  benefits()
  cardsCalculator()
  cardsCategories()
  cardsCategoryGroup()
  conditions()
  instruction()
  mainArticles()
  mainBanner()
  mainCalculator()
  mainOffer()
  mainProducts()
  mainPromo()
  menu()
  mobileLinks()
  offices()
  officesBanner()
  officesFilter()
  parameters()
  parametersNew()
  popup()
  popupGeo()
  popups()
  popupsCookies()
  promotionPrizes()
  promotionSteps()
  promotionTable()
  promotionTimer()
  window.addEventListener('load', () => {
    scrollBarWidth()
    checkMedia()
  }, false)
  window.addEventListener('resize', () => {
    scrollBarWidth()
    checkMedia()
  }, false)
})

function scrollBarWidth() {
  document.documentElement.style.setProperty('--scrollbar-width', `${window.innerWidth - document.documentElement.clientWidth}px`)
}

function checkMedia() {
  let isDesktop = false
  let isTablet = false
  let isMobile = false
  if (window.innerWidth > 1365) {
    isDesktop = true
  } else if (window.innerWidth > 767 && window.innerWidth < 1366) {
    isTablet = true
  } else if (window.innerWidth < 768) {
    isMobile = true
  }
  window.globalIsDesktop = isDesktop
  window.globalIsTablet = isTablet
  window.globalIsMobile = isMobile
}
