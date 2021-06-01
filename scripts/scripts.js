var RSI = require('technicalindicators').RSI;
var stockServer = require("yahoo-financial-data")

export const stockHistory = (symbol) => {
    const today = new Date();
    const last30day =  new Date();
    last30day.setDate(last30day.getDate()-30);
    stockServer.history(symbol, 'close', formatDate(last30day), formatDate(today), '1d',  (err, data) => {

    });
}

const formatDate = (date, format="yy-mm-dd") => {
    const map = {
        mm: date.getMonth() + 1,
        dd: date.getDate(),
        yy: date.getFullYear().toString(),
    }

    return format.replace(/mm|dd|yy|yyy/gi, matched => map[matched])
}