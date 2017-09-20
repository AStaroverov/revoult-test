// @flow
import {Props} from 'app/containers/calculator'

import React, {PureComponent} from 'react'

import {tryRead} from 'app/utils'

import Carousel from './carousel'

import style from './style.css'

export default class Calculator extends PureComponent {
  props: Props

  render () {
    const {baseIndex, baseCurrencies, secondIndex, secondCurrencies} = this.props

    return (
      <div className={style.box}>
        <div className={style.carousels}>
          <div className={style.baseCurrencies}>
            <Carousel
              readOnly={false}
              index={baseIndex}
              currencies={baseCurrencies}
              onChange={this.changeBaseCurrency}
            />
          </div>
          <div className={style.secondCurrencies}>
            <Carousel
              readOnly={true}
              index={secondIndex}
              currencies={secondCurrencies}
              onChange={this.changeSecondCurrency}
            />
          </div>
        </div>
        <a
          role='button'
          className={style.convert}
          onClick={this.convert}
        >
          Convert
        </a>
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

  convert = (e) => {
    e.preventDefault()

    this.props.convert()
  }
}