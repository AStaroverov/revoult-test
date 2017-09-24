export type Source = string

export type Rates = {
  [string]: {
    [string]: number
  }
}

type MapSourceToRates = {
  [Source]: Rates
}

export type RatesState = {
  source: string,
  map: MapSourceToRates
}

