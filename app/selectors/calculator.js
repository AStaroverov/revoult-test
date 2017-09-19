import {createSelector} from 'reselect'

export const getBaseCurrency = state => state.calculator.baseCurrency

export const getSecondCurrency = state => state.calculator.secondCurrency

export const getUnits = state => state.calculator.units
