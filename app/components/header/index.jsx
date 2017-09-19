import React, { PureComponent } from 'react'

import CurrencyRatio from 'app/containers/currency-ratio'

import style from './style.css'

export default class Header extends PureComponent {
  render () {
    return (
      <div className={style.box}>
        <CurrencyRatio className={style.currencyRatio} />
      </div>
    )
  }
}