// @flow
import {Props} from 'app/containers/calculator'

import React, {PureComponent} from 'react'

import {tryRead} from 'app/utils'

import Carousel from './carousel'

import style from './style.css'

export default class Calculator extends PureComponent {
  props: Props

  render () {
    const {baseCurrencies, secondCurrencies} = this.props

    return (
      <div className={style.box}>
        <div className={style.baseCurrencies}>
          <Carousel
            readOnly={false}
            index={this.props.baseIndex}
            currencies={baseCurrencies}
            onChange={this.changeBaseCurrency}
          />
        </div>
        <div className={style.secondCurrencies}>
          <Carousel
            readOnly={true}
            index={this.props.secondIndex}
            currencies={secondCurrencies}
            onChange={this.changeSecondCurrency}
          />
        </div>
      </div>
    )
  }

  changeBaseCurrency = (index) => {
    const {changeBaseCurrency, baseCurrencies} = this.props
    const currency = tryRead(() => baseCurrencies[index])

    currency && changeBaseCurrency(currency)
  }

  changeSecondCurrency = (index) => {
    const {changeSecondCurrency, secondCurrencies} = this.props
    const currency = tryRead(() => secondCurrencies[index])

    currency && changeSecondCurrency(currency)
  }
}