import React, { PureComponent } from 'react'

import Header from 'app/components/header'
import Calculator from 'app/containers/calculator'

import './global.css'
import style from './style.css'

export default class Root extends PureComponent {
  render () {
    return (
      <div className={style.box}>
        <Header />
        <Calculator />
      </div>
    )
  }
}