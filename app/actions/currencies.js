import {has} from 'lodash'

import store from 'app/store'
import {getBaseCurrency} from 'app/selectors/calculator'
import {getLatestRatesByCurrencyName} from 'app/api/rates'
import {actions} from 'app/store/modules/rates'

export async function updateRates () {
  const currency = getBaseCurrency(store.getState())
  const {data} = await getLatestRatesByCurrencyName(currency)

  if (data && has(data, 'base') && has(data, 'rates')) {
    const {base, rates} = data

    actions.setRates({base, rates})
  }
}