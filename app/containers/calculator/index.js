// @flow
import {connect} from 'react-redux'
import {createSelector} from 'reselect'

import {composeSelectors} from 'app/utils'

import * as currencies from 'app/selectors/currencies'
import * as calculator from 'app/selectors/calculator'

import {actions as calculatorActions} from 'app/store/modules/calculator'
import {updateRates} from 'app/actions/rates'
import {convertUnitsByCurrentState} from 'app/actions/wallets'

import Component from 'app/components/calculator'

type Selectors = {
  baseCurrencies: Array<string>,
  baseIndex: number,
  secondCurrencies: Array<string>,
  secondIndex: number
}
const selectors: () => Selectors = composeSelectors({
  baseCurrencies: currencies.getBaseCurrencies,
  baseIndex (state) {
    const currency = calculator.getBaseCurrency(state)
    const list = currencies.getBaseCurrencies(state)

    return list ? list.indexOf(currency) : null
  },
  secondCurrencies: currencies.getSecondCurrencies,
  secondIndex (state) {
    const currency = calculator.getSecondCurrency(state)
    const list = currencies.getSecondCurrencies(state)

    return list ? list.indexOf(currency) : null
  },
})

type Actions = {
  changeBaseCurrency: (name: string) => void,
  changeSecondCurrency: (name: string) => void,
  convert: () => void
}
const actions = (): Actions => ({
  changeBaseCurrency (name) {
    calculatorActions.setBaseCurrency(name)
    calculatorActions.setUnits(0)
    updateRates()
  },
  changeSecondCurrency: calculatorActions.setSecondCurrency,
  convert () {
    try {
      convertUnitsByCurrentState()
    } catch (e) {
      e.message && alert(e.message)
    }

    calculatorActions.setUnits(0)
  }
})

export type Props = Selectors & Actions
export default connect(selectors, actions)(Component)