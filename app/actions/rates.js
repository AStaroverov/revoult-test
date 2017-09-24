import {has, forEach} from 'lodash'

import {toFixed} from 'app/utils'

import store from 'app/store'
import {getBaseCurrency} from 'app/selectors/calculator'

import {getLatestRatesByCurrencyName} from 'app/api/rates'
import {actions} from 'app/store/modules/rates'

const map = {
  fixer: () => updateRatesFixerWithShift('fixer', (rate) => rate),
  fixer1: () => updateRatesFixerWithShift('fixer1', (rate) => rate + rate / 8 * (Math.random() < 0.5 ? -1 : 1)),
  fixer2: () => updateRatesFixerWithShift('fixer2', (rate) => rate + rate / 11 * (Math.random() < 0.5 ? -1 : 1))
}

export function updateRates () {
  forEach(map, (fn) => fn())
}

export async function updateRatesFixer () {
  map['fixer']()
}

export async function updateRatesFixer1 () {
  map['fixer1']()
}

export async function updateRatesFixer2 () {
  map['fixer2']()
}

async function getRates () {
  const currency = getBaseCurrency(store.getState())
  const {data} = await getLatestRatesByCurrencyName(currency)

  return data
}

async function updateRatesFixerWithShift (source, shift) {
  const data = await getRates()

  if (data && has(data, 'base') && has(data, 'rates')) {
    const {base, rates} = data

    forEach(rates, (rate: number, currency: string) => {
      const newRate = shift(rate)
      rates[currency] = parseFloat(toFixed(newRate, 3))
    })

    actions.setRates({source, base, rates})
  }
}

