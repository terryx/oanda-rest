const got = require('got')
const test = require('ava')
const sinon = require('sinon')
const OandaRest = require('./index')
const sandbox = sinon.createSandbox()

function createStub(response) {
  sandbox.stub(got, 'get').returns(Promise.resolve({ body: require(response) }))
  sandbox.stub(got, 'put').returns(Promise.resolve({ body: require(response) }))
  sandbox.stub(got, 'post').returns(Promise.resolve({ body: require(response) }))
  sandbox.stub(got, 'extend').returns(got)
  return OandaRest(config)
}

const config = {
  accountID: '123456-123456-123456',
  endpoint: 'https://api-fxpractice.oanda.com',
  apiKey: 'xxxxx-xxxxx'
}

test.afterEach(() => {
  sandbox.restore()
})

test.serial('GET accounts', t => {
  const api = createStub('./fixtures/account1.json')

  return api.accounts().then(res => {
    t.is(res.account.id !== undefined, true)
  })
})

test.serial('GET accounts summary', t => {
  const api = createStub('./fixtures/account1-summary.json')

  return api.accountsSummary().then(res => {
    t.is(res.account.id !== undefined, true)
    t.is(res.account.trades === undefined, true)
  })
})

test.serial('GET accounts instruments', t => {
  const api = createStub('./fixtures/instruments.json')

  return api.accountsInstruments().then(res => {
    t.is(res.instruments.length > 0, true)
  })
})

test.serial('POST accounts create order', t => {
  const api = createStub('./fixtures/create-order1.json')

  const form = {
    order: {
      type: 'LIMIT',
      instrument: 'NAS100_USD',
      units: 1,
      price: '1000.00',
      timeInForce: 'GTC',
      positionFill: 'DEFAULT',
      stopLossOnFill: {
        price: '800.00'
      },
      trailingStopLossOnFill: {
        distance: '1200'
      }
    }
  }

  return api.createOrder(form).then(res => {
    t.is(res.orderCreateTransaction.type === 'LIMIT_ORDER', true)
  })
})

test.serial('PUT accounts orders cancel', t => {
  const api = createStub('./fixtures/cancel-order1.json')
  const orderID = 30

  return api.cancelOrder(orderID).then(res => {
    t.is(res.orderCancelTransaction.orderID, '30')
  })
})

test.serial('GET accounts instruments pricing', t => {
  const api = createStub('./fixtures/pricing.json')

  return api.instrumentsPrice({ instruments: 'NAS100_USD' }).then(res => {
    t.is(res.prices[0].instrument, 'NAS100_USD')
  })
})

test.serial('GET instruments candles', t => {
  const api = createStub('./fixtures/candles.json')

  return api.instrumentsCandles('NAS100_USD', { granularity: 'M5' }).then(res => {
    t.is(res.instrument, 'NAS100_USD')
  })
})

test.serial('PUT trade close', t => {
  const api = createStub('./fixtures/close-trade.json')

  return api.closeTrade(4119).then(res => {
    t.is(res.orderFillTransaction.tradesClosed[0].tradeID, '4119')
  })
})

test.serial('PUT trade close', t => {
  const api = createStub('./fixtures/positions.json')

  return api.positions().then(res => {
    t.is(res.positions.length > 0, true)
  })
})

test.serial('GET trades', t => {
  const api = createStub('./fixtures/trades.json')

  return api.trades().then(res => {
    t.is(res.trades.length > 0, true)
  })
})

