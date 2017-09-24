// @flow
import type {Props as ContainerProps, FromTo} from 'app/containers/currency-ratio'

import React, {PureComponent} from 'react'
import Select from 'app/components/selector'

import classnames from 'classnames'
import style from './style.css'
import {tryRead} from 'app/utils/index'

type Props = ContainerProps & {
  className: string
}

export default class CurrencyRatio extends PureComponent {
  props: Props

  render () {
    const {className} = this.props

    return (
      <div className={classnames(style.box, className)}>
        {this.renderSelector()}
      </div>
    )
  }

  renderSelector () {
    const {pairs, source} = this.props

    if (!pairs) return null

    let value = null
    const options = pairs.map(pair => {
      const label = this.renderContent(pair)

      if (pair.source === source) {
        value = pair.source
      }

      return {
        value: pair.source,
        label: label
      }
    })

    return (
      <Select
        value={value}
        options={options}
        onChange={this.onChangeSource}
        className={style.select}
        clearable={false}
        inputProps={{readOnly: true}}
      />
    )
  }

  renderContent (pair) {
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

  onChangeSource = (...args) => {
    const source = tryRead(() => args[0].value)

    source && this.props.setSource(source)
  }
}