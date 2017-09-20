// @flow
import {Currency} from 'app/types/currency'

import {has} from 'lodash'

import store from 'app/store'
import {mutateState} from 'app/utils'

export const NAMESPACE = 'wallets/';
export const ADD = NAMESPACE + 'ADD';
export const SET = NAMESPACE + 'SET'
export const INCREASE = NAMESPACE + 'INCREASE'

function  initialState () {
  return {}
}

export function reducer (state = initialState(), action) {
  return mutateState(mutations, state, action)
}

const mutations = Object.create(null)

type ADD_PAYLOAD = Currency

mutations[ADD] = function (state, currency: ADD_PAYLOAD) {
  if (has(state, currency)) return state

  state[currency] = 0

  return { ...state }
}

type CHANGE_PAYLOAD = {
  currency: Currency,
  units: number
}

mutations[SET] = function (state, { currency, units }: CHANGE_PAYLOAD) {
  state[currency] = units

  return { ...state }
}

mutations[INCREASE] = function (state, { currency, units }: CHANGE_PAYLOAD) {
  state[currency] += units

  return { ...state }
}

export const actions = Object.create(null)

actions.addWallet = function setCurrencyPrices (payload: ADD_PAYLOAD) {
  store.dispatch({ type: ADD, payload })
}

actions.setUnits = function setCurrencyPrices (payload: CHANGE_PAYLOAD) {
  store.dispatch({ type: SET, payload })
}

actions.increaseUnits = function setCurrencyPrices (payload: CHANGE_PAYLOAD) {
  store.dispatch({ type: INCREASE, payload })
}