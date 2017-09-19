import store from 'app/store'
import { mutateState } from 'app/utils'

export const NAMESPACE = 'rates/';
export const SET = NAMESPACE + 'set';

function  initialState () {
  return {}
}

export function reducer (state = initialState(), action) {
  return mutateState(mutations, state, action)
}

const mutations = Object.create(null)

type SET_PAYLOAD = {
  base: string,
  rates: { [string]: number }
}

mutations[SET] = function (state, { base, rates }: SET_PAYLOAD) {
  state[base] = rates

  return { ...state }
}

export const actions = Object.create(null)

actions.setRates = function setCurrencyPrices (payload: SET_PAYLOAD) {
  store.dispatch({ type: SET, payload })
}