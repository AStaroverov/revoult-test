import * as consts from 'app/constants/fixerio'

import { isString, isEmpty } from 'lodash'
import axios from 'axios'

export function getLatestRatesByCurrencyName (currency: string, symbols?: Array<string>) {
  if (!isString(currency) || isEmpty(currency)) {
    throw new Error('getLatestPricesByValut: incorrect currency')
  }

  return axios.get(`${consts.BASE_PATH}/${consts.LATEST}`, {
    params: {
      base: currency,
      symbols
    }
  })
}