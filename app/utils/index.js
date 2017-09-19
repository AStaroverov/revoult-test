import { has, forEach } from 'lodash'

// ----- tryRead -----
export function tryRead (fn: Function): any {
  let result = null

  try {
    result = fn()
  } catch (e) {}

  return result
}

// ------ mutateState ------
type State = Object
type Action = {
  type: string,
  payload?: Object
}
type Mutations = {
  [string]: (State, Action) => State
}
export function mutateState (
  mutations: Mutations,
  state: State,
  action: Action
): State {
  if (has(mutations, action.type)) {
    return mutations[action.type](state, action.payload)
  } else {
    return state
  }
}

// ------ composeSelectors ------
type Selector = (state: Object, ownProps: Object) => any
type Selectors = {
  [string]: Selector
}
export function composeSelectors (selectors: Selectors): Selector {
  return function (state: Object, ownProps: Object): any {
    let result = {}

    forEach(selectors, (fn, key) => {
      result[key] = fn(state, ownProps)
    })

    return result
  }
}

// ----- toFixed -----
export function toFixed (num: number | string, l: number): string {
  const regexp = new RegExp(`^-?\\d+(?:\\.\\d{0,${l}})?`)
  return String(num).match(regexp)[0]
}