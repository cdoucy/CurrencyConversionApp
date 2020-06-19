# CurrencyConversionApp

Currency conversion and currency plotting created with Node and React.

Run using Docker:
```
$ docker-compose up
```

Or run locally:

back-end:
```
$ cd back
$ npm install
$ npm run build
$ npm run start
```
front-end:

Open `front/package.json` and set proxy to `http://0.0.0.0:5000`
```
$ cd front
$ npm install
$ npm run start
```

back-end endpoints:

`POST /api/convert`
`POST /api/history`

front-end features:

- Currency conversion

- history exchanges rates plotting on 1 year

Supported currencies :

BTC, CAD, HKD, ISK, PHP, DKK, HUF, CZK, AUD, RON, SEK, IDR, INR, BRL,
RUB, HRK, JPY, THB, CHF, SGD, PLN, BGN, TRY, CNY, NOK, NZD, ZAR, USD,
MXN, ILS, GBP, KRW, MYR, EUR
