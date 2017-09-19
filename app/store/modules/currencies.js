// @flow
import type {Currency} from 'app/types/currency'

import store from 'app/store'
import {mutateState} from 'app/utils'

export const NAMESPACE = 'CURRENCIES/'
export const SET_CURRENCIES = NAMESPACE + 'SET_CURRENCIES'

// ----- REDUCER ------
function  initialState () {
  return {
    list: []
  }
}

export function reducer (state = initialState(), action) {
  return mutateState(mutations, state, action)
}

// ----- MUTATIONS ------
const mutations = Object.create(null)

type SET_CURRENCIES_PAYLOAD = Array<Currency>
mutations[SET_CURRENCIES] = function (state, payload: SET_CURRENCIES_PAYLOAD) {
  state.list = payload

  return {...state}
}

// ----- ACTIONS ------
export const actions = Object.create(null)

actions.setCurrencies = function setCurrencies (payload: SET_CURRENCIES_PAYLOAD) {
  store.dispatch({ type: SET_CURRENCIES, payload })
}
