import { reducer as rates } from './modules/rates'
import { reducer as currencies } from './modules/currencies'
import { reducer as calculator } from './modules/calculator'
import { combineReducers } from 'redux'

export default combineReducers({
  rates,
  currencies,
  calculator
})
