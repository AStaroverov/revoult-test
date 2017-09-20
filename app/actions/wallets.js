// @flow
import {Currency} from 'app/types/currency'

import store from 'app/store'

import {actions} from 'app/store/modules/wallets'
import * as walletsSelectors from 'app/selectors/wallets'
import * as ratesSelectors from 'app/selectors/rates'
import * as calculatorSelectors from 'app/selectors/calculator'

export function convertUnitsByCurrentState () {
  const state = store.getState()
  const fromWallet: Currency = calculatorSelectors.getBaseCurrency(state)
  const toWallet: Currency = calculatorSelectors.getSecondCurrency(state)

  if (fromWallet === toWallet) return

  const units: number = calculatorSelectors.getUnits(state)
  const coefficient: number = ratesSelectors.getCoefficient(state, {baseCurrency: fromWallet, secondCurrency: toWallet})
  const fromWalletUnits: number = walletsSelectors.getWallet(state, {currency: fromWallet})

  if (units <= fromWalletUnits && coefficient) {
    actions.increaseUnits({currency: fromWallet, units: -units})
    actions.increaseUnits({currency: toWallet, units: units * coefficient})
  } else {
    if (units > fromWalletUnits) {
      throw new Error('There is not enough money in the wallet')
    }

    if (!coefficient) {
      throw new Error('Something wrong with coefficient')
    }
  }
}