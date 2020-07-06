# CurrencyConversionApp

Currency conversion and currency plotting created with Node and React.
The app is deployed on http://finance.doucycorp.fr/

Run in production mode using Docker and nginx reverse proxy:
```
$ docker-compose up
```
App is running on http://localhost/

Or run in development mode:

back-end:
```
$ cd back
$ npm install
$ npm run build
$ npm run start
```
front-end:
```
$ cd front
$ npm install
$ npm run start
```

Backend is running on http://localhost:5000/
Frontend is running on http://localhost:3000/

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
