// @flow
import {RatesState, MapSourceToRates} from 'app/types/rates'
import {Currency} from 'app/types/currency'

import {createSelector} from 'reselect'
import {tryRead} from 'app/utils'

export function getCurrentSource (state: Object) {
  return state.rates.source
}

export const getMapSourcesToRates = createSelector(
  state => state.rates,
  (rates: RatesState) => {
    return {...rates.map}
  }
)

export const getCurrentRates = createSelector(
  getMapSourcesToRates,
  getCurrentSource,
  (map: MapSourceToRates, source: string) => {
    return {...map[source]}
  }
)

export function getCoefficient (rates: RatesState, source: string, baseCurrency: Currency, secondCurrency: Currency) {
  return tryRead(() => rates[source][baseCurrency][secondCurrency])
}

export function getCurrentCoefficient (state: Object, {baseCurrency, secondCurrency}: {[string]: Currency}) {
  return getCoefficient(state.rates.map, state.rates.source, baseCurrency, secondCurrency)
}
