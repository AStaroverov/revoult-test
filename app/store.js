// @flow
import {Currency} from 'app/types/currency'

import {availableCurrencies} from 'app/constants/currencies'
import {allSources} from 'app/constants/rates'

import {createStore} from 'redux'

import {toFixed} from 'app/utils'

import reducers from 'app/store/reducers'
import {actions as currenciesActions} from 'app/store/modules/currencies'
import {actions as calculatorActions} from 'app/store/modules/calculator'
import {actions as walletsActions} from 'app/store/modules/wallets'
import {actions as ratesActions} from 'app/store/modules/rates'
import {updateRates} from 'app/actions/rates'

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
    availableCurrencies.forEach((currency: Currency) => {
      const units = parseFloat(toFixed(Math.random() * 10000, 2))
      walletsActions.addWallet(currency)
      walletsActions.setUnits({currency, units})
    })
    ratesActions.setSource(allSources[0])

    updateRates()
  }
}

const instance = window._store = new Store()

export default instance