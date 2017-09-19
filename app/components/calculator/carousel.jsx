// @flow
import {isEqual} from 'lodash'
import React, {Component} from 'react'
import Carousel from 'app/components/carousel/carousel'

import CurrencyInput from 'app/containers/currency-input'

import style from './style.css'

type Props = {
  readOnly: boolean,
  index: number,
  currencies: Array<string>,
  onChange: (index: number) => void
}
export default class FilledCarousel extends Component {
  props: Props

  shouldComponentUpdate (nextProps: Props) {
    const {currencies} = this.props
    const nextCurrencies = nextProps.currencies

    if (!nextCurrencies) {
      return false
    }

    return !isEqual(currencies, nextCurrencies)
  }

  render () {
    if (!this.props.currencies) return null

    const list = this.renderCurrencies()

    return (
      <Carousel
        selectedItem={this.props.index}
        onChange={this.props.onChange}
        emulateTouch={true}
        showArrows={false}
        showStatus={false}
        showThumbs={false}
        className={style.carousel}
      >
        {list}
      </Carousel>
    )
  }

  renderCurrencies () {
    const {currencies, readOnly} = this.props

    return currencies.map(currency => {
      return (
        <CurrencyInput
          key={currency}
          readOnly={readOnly}
          currency={currency}
        />
      )
    })
  }
}