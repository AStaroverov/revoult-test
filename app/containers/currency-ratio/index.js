// @flow
import type {Currency} from 'app/types/currency'
import type {MapSourceToRates, Rates, Source} from 'app/types/rates'

import {mapCurrencyToIconClassName} from 'app/constants/currencies'

import {forEach} from 'lodash'
import {connect} from 'react-redux'
import {createSelector} from 'reselect'

import {composeSelectors} from 'app/utils'

import * as ratesSelectors from 'app/selectors/rates'
import * as calculatorSelectors from 'app/selectors/calculator'

import {actions as ratesActions} from 'app/store/modules/rates'

import Component from 'app/components/currency-ratio'

export type FromTo = {
  coefficient: number,
  symbolClassName: string
}
type Pair = {
  from: FromTo,
  to: FromTo
}
type Pairs = Array<Pair>
type Selectors = {
  source: Source,
  pairs: Pairs
}
const selectors: () => Selectors = composeSelectors({
  source: ratesSelectors.getCurrentSource,
  pairs: createSelector(
    ratesSelectors.getMapSourcesToRates,
    calculatorSelectors.getBaseCurrency,
    calculatorSelectors.getSecondCurrency,
    (mapSourceToRates: MapSourceToRates, baseCurrency: Currency, secondCurrency: Currency) => {
      const result = []

      forEach(mapSourceToRates, (rates: Rates, source: Source) => {
        const coefficient = ratesSelectors.getCoefficient(mapSourceToRates, source, baseCurrency, secondCurrency)

        if (coefficient) {
          result.push({
            source,
            from: {
              coefficient: 1,
              symbolClassName: mapCurrencyToIconClassName[baseCurrency]
            },
            to: {
              coefficient: coefficient,
              symbolClassName: mapCurrencyToIconClassName[secondCurrency]
            }
          })
        }
      })

      return result.length > 0 ? result : null
    }
  )
})

type Actions = {
  setSource: (source: Source) => void
}
const actions: () => Actions = () => ({
  setSource: ratesActions.setSource
})

export type Props = Selectors & Actions
export default connect(selectors, actions)(Component)