# Yahoo-Financial-Data
Node.js module for accessing real time financial data from yahoo finance.

## Installation
```bash
$ npm install yahoo-financial-data
```

## Usage

```bash
var yahoo = require('yahoo-financial-data');
```
Get the current stock price.
```bash
yahoo.price('AAPL', function (err, data) {
    // 119.65
});
```

Get historical data for a given stock
```bash
// args
// 1. Ticker symbol
// 2. Desired Value ['high', 'low', 'open', 'close', 'volume']
// 3. Start Date
// 4. End Date
// 5. Interval ["1d","5d","1mo","3mo","6mo","1y","2y","5y","10y","ytd","max"]

yahoo.history('AAPL', 'close', "2020-11-01", "2020-11-08", '1d', function (err, data) {
    //  [
    //    108.7699966430664,
    //    110.44000244140625,
    //    114.94999694824219,
    //    119.02999877929688,
    //    118.69000244140625
    //  ]
});
```

## Documentation

Choose from a wide range of available financial data to best fit your needs.\
Unit tests are currently in progress for most functions but all are currently available.

```bash
yahoo.analystRecomendation(ticker, callback)                     // Available; Not Yet Tested
yahoo.assetType(ticker, callback)                                // Available; Not Yet Tested
yahoo.companyName(ticker, callback)                              // Available; Not Yet Tested
yahoo.dividendRate(ticker, callback)                             // Available; Not Yet Tested
yahoo.dividendYield(ticker, callback)                            // Available; Not Yet Tested
yahoo.earningsGrowth(ticker, callback)                           // Available; Not Yet Tested
yahoo.exchange(ticker, callback)                                 // Available; Not Yet Tested
yahoo.fiftyDayAverage(ticker, callback)                          // Available; Not Yet Tested
yahoo.fiftyTwoWeekHigh(ticker, callback)                         // Available; Not Yet Tested
yahoo.fiftyTwoWeekLow(ticker, callback)                          // Available; Not Yet Tested
yahoo.fiveYearAvgDividendYield(ticker, callback)                 // Available; Not Yet Tested
yahoo.forwardPE(ticker, callback)                                // Available; Not Yet Tested
yahoo.freeCashflow(ticker, callback)                             // Available; Not Yet Tested
yahoo.grossMargins(ticker, callback)                             // Available; Not Yet Tested
yahoo.grossProfits(ticker, callback)                             // Available; Not Yet Tested
yahoo.history(ticker, callback)                                  // Available; 
yahoo.marketCap(ticker, callback)                                // Available; 
yahoo.marketState(ticker, callback)                              // Available; Not Yet Tested
yahoo.numberOfAnalystOpinions(ticker, callback)                  // Available; Not Yet Tested
yahoo.operatingCashflow(ticker, callback)                        // Available; Not Yet Tested
yahoo.operatingMargins(ticker, callback)                         // Available; Not Yet Tested
yahoo.postMarketPrice(ticker, callback)                          // Available; Not Yet Tested
yahoo.preMarketPrice(ticker, callback)                           // Available; Not Yet Tested
yahoo.price(ticker, callback)                                    // Available; 
yahoo.priceToBook(ticker, callback)                              // Available; Not Yet Tested
yahoo.profitMargins(ticker, callback)                            // Available; Not Yet Tested
yahoo.returnOnAssets(ticker, callback)                           // Available; Not Yet Tested
yahoo.returnOnEquity(ticker, callback)                           // Available; Not Yet Tested
yahoo.revenueGrowth(ticker, callback)                            // Available; Not Yet Tested
yahoo.revenuePerShare(ticker, callback)                          // Available; Not Yet Tested
yahoo.targetHighPrice(ticker, callback)                          // Available; Not Yet Tested
yahoo.targetLowPrice(ticker, callback)                           // Available; Not Yet Tested
yahoo.targetMeanPrice(ticker, callback)                          // Available; Not Yet Tested
yahoo.targetMedianPrice(ticker, callback)                        // Available; Not Yet Tested
yahoo.totalCash(ticker, callback)                                // Available; Not Yet Tested
yahoo.totalCashPerShare(ticker, callback)                        // Available; Not Yet Tested
yahoo.totalDebt(ticker, callback)                                // Available; Not Yet Tested
yahoo.totalRevenue(ticker, callback)                             // Available; Not Yet Tested
yahoo.trailingPE(ticker, callback)                               // Available; Not Yet Tested
yahoo.twoHundredDayAverage(ticker, callback)                     // Available; Not Yet Tested
yahoo.volume(ticker, callback)                                   // Available; 
```
