### Overview
Oanda Rest is a api wrapper for [oanda rest-v20](http://developer.oanda.com/rest-live-v20/introduction/) with [got](https://github.com/sindresorhus/got) serving as underlying HTTP requests library
### Getting started
Requires NodeJS >= v10

```
$ npm install @terryx/oanda-rest
```

### Usage
```
const OandaRest = require('@terryx/oanda-rest')
const api = OandaRest({
  accountID: 'OANDA_ACCOUNT_ID',
  endpoint: 'https://api-fxpractice.oanda.com',
  apiKey: 'API_KEY'
})

api.accounts().then(res => {
  // account details
  console.log(res.account)
})
```

### API
**api.accounts()**

**api.accountsSummary()**

**api.accountsInstruments()**

**api.createOrder([OrderRequest](http://developer.oanda.com/rest-live-v20/order-df/#OrderRequest))**

**api.cancelOrder(OrderID)**

**api.instrumentsCandles = ([InstrumentName](http://developer.oanda.com/rest-live-v20/primitives-df/#InstrumentName), additionalParams = {})**

**api.instrumentsPrice = (additionalParams = {})**
