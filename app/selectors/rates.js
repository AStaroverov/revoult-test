// @flow
import {Rates} from 'app/types/rates'

import {createSelector} from 'reselect'
import {tryRead} from 'app/utils'
import * as calculator from 'app/selectors/calculator'

export const getCoefficient: (Object, { [string]: string }) => ?number = (state, { baseCurrency, secondCurrency }) => {
  return tryRead(() => state.rates[baseCurrency][secondCurrency]) || null
}

export const getCoefficientForSecondCurrency = createSelector(
  state => state.rates,
  calculator.getBaseCurrency,
  calculator.getSecondCurrency,
  (rates: Rates, baseCurrency: string, secondCurrency: string) => {
    return tryRead(() => rates[baseCurrency][secondCurrency])
  }
)