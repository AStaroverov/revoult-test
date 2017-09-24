// @flow
import {Currency} from 'app/types/currency'
import {Rates} from 'app/types/rates'

import {isNumber} from 'lodash'
import {createSelector} from 'reselect'

import * as calcSelelctors from 'app/selectors/calculator'
import * as ratesSelelctors from 'app/selectors/rates'

export const getBaseCurrencies = createSelector(
  state => state.currencies,
  currencies => [...currencies.list]
)

export const getSecondCurrencies = createSelector(
  calcSelelctors.getBaseCurrency,
  getBaseCurrencies,
  ratesSelelctors.getCurrentRates,
  (
    currency: Currency,
    currencies: Array<Currency>,
    rates: Rates
  ): (?Array<Currency>) => {
    if (!rates) return

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
