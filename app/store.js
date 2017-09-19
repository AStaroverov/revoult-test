import {availableCurrencies} from 'app/constants/currencies'

import {createStore} from 'redux'

import reducers from 'app/store/reducers'
import {actions as currenciesActions} from 'app/store/modules/currencies'
import {actions as calculatorActions} from 'app/store/modules/calculator'
import {updateRates} from 'app/actions/currencies'

class Store {
  store = null
  dispatch = null
  getState = null

  init () {
    this.store = createStore(reducers)
    this.dispatch = this.store.dispatch
    this.getState = this.store.getState
  }

  setDefaultData () {
    currenciesActions.setCurrencies(availableCurrencies)
    calculatorActions.setBaseCurrency(availableCurrencies[0])
    calculatorActions.setSecondCurrency(availableCurrencies[1])
    updateRates()
  }
}

const instance = window._store = new Store()

export default instance