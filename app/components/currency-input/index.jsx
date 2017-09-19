// @floww
import type {Props as ContainerProps} from 'app/containers/currency-input'

import {isNumber, last} from 'lodash'
import React, {Component} from 'react'

import {toFixed} from 'app/utils'

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
    const value = this.getModifiedUnits()

    const inputClass = classnames(style.input, {
      [style.readOnly]: readOnly
    })

    return (
      <div className={style.box}>
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
    )
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
    const {props} = this
    const {value} = event.target

    if (value === '') {
      props.changeUnits(0, props.coefficient)
      return
    }

    if (last(value) === '.') {
      this.setState({unitsTmp: parseInt(value) + '.'})
      return
    }

    const fixed2 = toFixed(value, 2)

    if (value.includes('.') && last(value) === '0') {
      this.setState({unitsTmp: fixed2})
      return
    }

    const numb = value === '' ? 0 : parseFloat(fixed2)

    if (isNumber(numb) && !isNaN(numb) && numb !== props.units) {
      this.setState({unitsTmp: null})
      props.changeUnits(numb, props.coefficient)
    }
  }
}