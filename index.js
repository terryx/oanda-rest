const got = require('got')

const constructor = ({ apiKey, endpoint, accountID }) => {
  const http = got.extend({
    headers: { 
      'user-agent': null,
      'Authorization': `Bearer ${apiKey}` 
    },
    baseUrl: endpoint,
    json: true
  })

  const method = {}

  const toBody = (promise) => {
    return promise.then(res => res.body)
  }

  method.accounts = () => toBody(http.get(`/v3/accounts/${accountID}`))

  method.accountsSummary = () => toBody(http.get(`/v3/accounts/${accountID}/summary`))

  method.accountsInstruments = () => toBody(http.get(`/v3/accounts/${accountID}/instruments`))

  method.createOrder = (body) => toBody(http.post(`/v3/accounts/${accountID}/orders`, { body }))

  method.cancelOrder = (orderID) => toBody(http.put(`/v3/accounts/${accountID}/orders/${orderID}/cancel`))

  method.instrumentsCandles = (instrument, query) => toBody(http.get(`/v3/instruments/${instrument}/candles`, { query }))

  method.instrumentsPrice = (query) => toBody(http.get(`/v3/accounts/${accountID}/pricing`, { query }))

  method.closeTrade = (tradeID) => toBody(http.put(`/v3/accounts/${accountID}/trades/${tradeID}/close`))

  method.positions = () => toBody(http.get(`/v3/accounts/${accountID}/positions`))

  method.trades = () => toBody(http.get(`/v3/accounts/${accountID}/trades`))

  return method
}

module.exports = constructor