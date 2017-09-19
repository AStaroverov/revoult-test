// @flow
import type {Props as ContainerProps, FromTo} from 'app/containers/currency-ratio'

import React, {PureComponent} from 'react'

import classnames from 'classnames'
import style from './style.css'

type Props = ContainerProps & {
  className: string
}

export default class CurrencyRatio extends PureComponent {
  props: Props

  render () {
    const {className} = this.props

    return (
      <div className={classnames(style.box, className)}>
        {this.renderContent()}
      </div>
    )
  }

  renderContent () {
    const {pair} = this.props

    if (!pair) return null

    const from = this.renderCurrency(pair.from)
    const to = this.renderCurrency(pair.to)

    return (
      <span className={style.content}>
        {from} <span className={style.equalSign}>=</span> {to}
      </span>
    )
  }

  renderCurrency (currency: FromTo) {
    const className = classnames('fa', currency.symbolClassName, style.icon)

    return (
      <span>
        <span className={className} />
        {currency.coefficient}
      </span>
    )
  }
}