// @flow
import {Source} from 'app/types/rates'

import store from 'app/store'
import { mutateState } from 'app/utils'

export const NAMESPACE = 'rates/';
export const SET = NAMESPACE + 'SET';
export const SET_SOURCE = NAMESPACE + 'SET_SOURCE';

function  initialState () {
  return {
    source: null,
    map: {}
  }
}

export function reducer (state = initialState(), action) {
  return mutateState(mutations, state, action)
}

const mutations = Object.create(null)

type SET_PAYLOAD = {
  source: string,
  base: string,
  rates: {[string]: number}
}

mutations[SET] = function (state, { source, base, rates }: SET_PAYLOAD) {
  if (!state.map[source]) {
    state.map[source] = {}
  }

  state.map[source][base] = rates

  return {...state}
}

type SET_SOURCE_PAYLOAD = Source

mutations[SET_SOURCE] = function (state, source: SET_SOURCE_PAYLOAD) {
  if (state.source !== source) {
    state.source = source
    state = {...state}
  }

  return state
}

export const actions = Object.create(null)

actions.setRates = function setRates (payload: SET_PAYLOAD) {
  store.dispatch({ type: SET, payload })
}

actions.setSource = function setSource (payload: SET_SOURCE_PAYLOAD) {
  store.dispatch({ type: SET_SOURCE, payload })
}
