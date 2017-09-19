// @flow
import type {Currency} from 'app/types/currency'

import {mapCurrencyToIconClassName} from 'app/constants/currencies'

import {connect} from 'react-redux'
import {createSelector} from 'reselect'

import {composeSelectors} from 'app/utils'

import * as rates from 'app/selectors/rates'
import * as calculator from 'app/selectors/calculator'

import Component from 'app/components/currency-ratio'

export type FromTo = {
  coefficient: number,
  symbolClassName: string
}
type Pair = {
  from: FromTo,
  to: FromTo
}
type Selectors = {
  pair: Pair
}
const selectors: () => Selectors = composeSelectors({
  pair: createSelector(
    calculator.getBaseCurrency,
    calculator.getSecondCurrency,
    rates.getCoefficientForSecondCurrency,
    (baseCurrency: string, secondCurrency: string, secondCoefficient: number) => {
      if (!secondCoefficient) {
        return null
      }

      return {
        from: {
          coefficient: 1,
          symbolClassName: mapCurrencyToIconClassName[baseCurrency]
        },
        to: {
          coefficient: secondCoefficient,
          symbolClassName: mapCurrencyToIconClassName[secondCurrency]
        }
      }
    }
  )
})

export type Props = Selectors
export default connect(selectors)(Component)