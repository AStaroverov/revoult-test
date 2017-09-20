// @floww
import type {Props as ContainerProps} from 'app/containers/currency-input'

import {mapCurrencyToIconClassName} from 'app/constants/currencies'

import {isNumber, last} from 'lodash'
import React, {Component} from 'react'

import {toFixed, tryRead} from 'app/utils'

import classnames from 'classnames'
import style from './style.css'

type Props = ContainerProps & {readOnly: boolean}
type State = {
  unitsTmp: ?string
}
export default class CurrencyInput extends Component {
  static defaultProps = {
    coefficient: 0
  }

  props: Props
  state: State = {
    unitsTmp: null
  }

  shouldComponentUpdate (nextProps: Props) {
    return nextProps.active
  }

  render () {
    const {currency, readOnly} = this.props
    const value: string = this.getModifiedUnits()
    const wallet: string = this.getWallet()

    const inputClass = classnames(style.input, {
      [style.readOnly]: readOnly
    })
    const iconClass = classnames('fa', mapCurrencyToIconClassName[currency], style.walletIcon)
    const walletClass = classnames(style.row, style.wallet)

    return (
      <div className={style.box}>
        <div className={style.row}>
          <div className={style.name}>
            {currency}
          </div>
          <div className={style.wrapper}>
            <input
              readOnly={readOnly}
              type='text'
              value={value || ''}
              onChange={this.change}
              className={inputClass}
              maxLength={6}
            />
          </div>
        </div>
        <div className={walletClass}>
          You have
          <span className={iconClass} />
          {wallet}
        </div>
      </div>
    )
  }

  getWallet () {
    const {wallet} = this.props
    return wallet === 0
      ? wallet
      : parseFloat(toFixed(this.props.wallet, 2))
  }

  getModifiedUnits () {
    const {unitsTmp} = this.state

    if (unitsTmp) {
      return unitsTmp
    }

    const {units, coefficient} = this.props
    const value = parseFloat(toFixed(units * coefficient, 2))
    const intValue = parseInt(value)

    if (value !== intValue) {
      return value
    } else {
      return intValue
    }
  }

  change = (event) => {
    this.checkValue(tryRead(() => event.target.value) || '')
  }

  checkValue (value: string) {
    if (this.checkAtEmpty(value) || this.checkAtLastDot(value)) return

    const max = this.getMaximum(parseFloat(toFixed(value, 2)))
    let fixed2Str: string = String(max)
    let fixed2Numb: number = max

    if (this.checkAtFloatWithLastZero(value, fixed2Str)) return

    this.checkAtCorrect(value, fixed2Numb)
  }

  checkAtEmpty (value: string): boolean {
    if (value === '') {
      this.props.changeUnits(0, 1)

      return true
    }

    return false
  }

  checkAtLastDot (value: string): boolean {
    const dot = '.'

    if (last(value) === dot && value.indexOf(dot) === value.length - 1) {
      this.setState({unitsTmp: parseInt(value) + dot})

      return true
    }

    return false
  }

  getMaximum (float: number): boolean {
    return Math.min(float, this.props.wallet)
  }

  checkAtFloatWithLastZero (value: string, unitsTmp: string): boolean {
    if (value.includes('.') && last(value) === '0') {
      this.setState({unitsTmp})
      return true
    }

    return false
  }

  checkAtCorrect (value: string, units: number) {
    const {props} = this
    const numb = value === '' ? 0 : units

    if (isNumber(numb) && !isNaN(numb) && numb !== props.units) {
      this.setState({unitsTmp: null})
      props.changeUnits(numb, props.coefficient)
    }
  }
}