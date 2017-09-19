import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'

import store from 'app/store'

import Root from 'app/components/root'

export function render () {
  const el = document.createElement('div')
  el.classList.add('root')

  ReactDOM.render((
    <Provider store={store.store}>
      <Root />
    </Provider>
  ), el)

  document.body.appendChild(el)
}