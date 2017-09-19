// @flow
import {Rates} from 'app/types/rates'

import {isNumber} from 'lodash'
import {createSelector} from 'reselect'

import * as calcSelelctors from 'app/selectors/calculator'

export const getBaseCurrencies = createSelector(
  state => state.currencies,
  currencies => [...currencies.list]
)

export const getSecondCurrencies = createSelector(
  calcSelelctors.getBaseCurrency,
  getBaseCurrencies,
  state => state.rates,
  (currency: string, currencies: Array<string>, rates: Rates): (?Array<string>) => {
    const currencyRates = rates[currency]

    if (!currencyRates) return null

    const result = currencies.reduce((result, item) => {
      if (isNumber(currencyRates[item]) || item === currency) {
        result.push(item)
      }
      return result
    }, []).reverse()

    return result.length > 0 ? result : null
  }
)
