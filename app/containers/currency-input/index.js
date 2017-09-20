// @flow
import type {Currency} from 'app/types/currency'

import {connect} from 'react-redux'
import {createSelector} from 'reselect'

import {composeSelectors} from 'app/utils'

import * as calculator from 'app/selectors/calculator'
import * as rates from 'app/selectors/rates'
import * as wallets from 'app/selectors/wallets'

import {actions as calculatorActions} from 'app/store/modules/calculator'

import Component from 'app/components/currency-input'

type Selectors = {
  readOnly: boolean,
  active: boolean,
  units: number,
  currency: Currency,
  coefficient: ?number,
  wallet: number
}
const selectors: () => Selectors = composeSelectors({
  active (state, {currency}) {
    return currency === calculator.getBaseCurrency(state)
        || currency === calculator.getSecondCurrency(state)
  },
  units: calculator.getUnits,
  currency: (_, {currency}) => currency,
  coefficient: (state, { currency }) => {
    const baseCurrency = calculator.getBaseCurrency(state)

    if (baseCurrency === currency) {
      return 1
    } else {
      return rates.getCoefficient(state, {baseCurrency, secondCurrency: currency})
    }
  },
  wallet (state, {currency}) {
    return wallets.getWallet(state, {currency})
  }
})

type Actions = {
  changeUnits: (number: string) => void
}
const actions = (): Actions => ({
  changeUnits (units: number, coefficient: number) {
    calculatorActions.setUnits(units / coefficient)
  }
})

export type Props = Selectors & Actions
export default connect(selectors, actions)(Component)
