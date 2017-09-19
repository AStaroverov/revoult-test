// @flow
import store from 'app/store'
import {mutateState} from 'app/utils'

export const NAMESPACE = 'CALCULATOR/'
export const SET_UNITS = NAMESPACE + 'SET_UNITS'
export const SET_BASE_CURRENCY = NAMESPACE + 'SET_BASE_CURRENCY'
export const SET_SECOND_CURRENCY = NAMESPACE + 'SET_SECOND_CURRENCY'

// ----- REDUCER ------
function  initialState () {
  return {
    baseCurrency: '',
    secondCurrency: '',
    units: 0
  }
}

export function reducer (state = initialState(), action) {
  return mutateState(mutations, state, action)
}

// ----- MUTATIONS ------
const mutations = Object.create(null)

type SET_CURRENCY_PAYLOAD = string
mutations[SET_BASE_CURRENCY] = function (state, name: SET_CURRENCY_PAYLOAD) {
  if (name !==  state.baseCurrency) {
    state.baseCurrency = name
    state = {...state}
  }

  return state
}

mutations[SET_SECOND_CURRENCY] = function (state, name: SET_CURRENCY_PAYLOAD) {
  if (name !==  state.secondCurrency) {
    state.secondCurrency = name
    state = {...state}
  }

  return state
}

type SET_UNITS_PAYLOAD = number
mutations[SET_UNITS] = function (state, units: SET_UNITS_PAYLOAD) {
  state.units = units

  return {...state}
}

// ----- ACTIONS ------
export const actions = Object.create(null)

actions.setBaseCurrency = function setBaseCurrency (payload: SET_CURRENCY_PAYLOAD) {
  store.dispatch({type: SET_BASE_CURRENCY, payload})
}

actions.setSecondCurrency = function setSecondCurrency (payload: SET_CURRENCY_PAYLOAD) {
  store.dispatch({type: SET_SECOND_CURRENCY, payload})
}

actions.setUnits = function setCurrencies (payload: SET_UNITS_PAYLOAD) {
  store.dispatch({type: SET_UNITS, payload})
}
