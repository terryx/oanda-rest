const got = require('got')

module.exports = class OandaV20 {
  constructor (accountID, apiKey, baseURL) {
    this.accountID = accountID

    this.http = got.extend({
      headers: {
        'user-agent': '',
        Authorization: `Bearer ${apiKey}`
      },
      baseUrl: baseURL,
      json: true
    })
  }

  toBody (promise) {
    return promise
      .then(res => res.body)
      .catch(err => {
        console.log(err.body)
        return err.body
      })
  }

  accounts () {
    return this.toBody(this.http.get(`/v3/accounts/${this.accountID}`))
  }

  createOrder (body) {
    return this.toBody(this.http.post(`/v3/accounts/${this.accountID}/orders`, { body }))
  }

  cancelOrder (orderID) {
    return this.toBody(this.http.put(`/v3/accounts/${this.accountID}/orders/${orderID}/cancel`))
  }

  instrumentsCandles (instrument, query) {
    return this.toBody(this.http.get(`/v3/instruments/${instrument}/candles`, { query }))
  }

  pricing (query) {
    return this.toBody(this.http.get(`/v3/accounts/${this.accountID}/pricing`, { query }))
  }

  closeTrade (tradeID) {
    return this.toBody(this.http.put(`/v3/accounts/${this.accountID}/trades/${tradeID}/close`))
  }

  openPositions () {
    return this.toBody(this.http.get(`/v3/accounts/${this.accountID}/openPositions`))
  }

  closePosition (instrument, body) {
    return this.toBody(this.http.put(`/v3/accounts/${this.accountID}/positions/${instrument}/close`, { body }))
  }
}
