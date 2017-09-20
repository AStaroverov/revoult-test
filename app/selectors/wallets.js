// @flow
import {Currency} from 'app/types/currency'

import {isNumber} from 'lodash'
import {createSelector} from 'reselect'

export const get = state => state.wallets

export const getWallets = createSelector(
  get,
  wallets => Object.keys(wallets)
)

export const getWallet = (state, {currency}: {[string]: Currency}) => {
  const wallet = state.wallets[currency]
  return isNumber(wallet) ? wallet : 0
}
