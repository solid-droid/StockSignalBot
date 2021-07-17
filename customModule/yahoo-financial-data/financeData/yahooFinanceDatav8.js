   const host = "https://query1.finance.yahoo.com"
   const baseUrl = "/v8/finance/chart/"  // + AAPL?symbol=AAPL&period1=0&period2=9999999999&interval=1d
 
   function request (endpoint, callback) {
    fetch(endpoint).then(res => res.json().then(res => {
                callback(res);
        }));
    }

    function convertDate(input) {
        var parts = input.trim().split(' ');
        var date = parts[0].split('-');
        var time = (parts[1] ? parts[1] : '00:00:00').split(':');
    
        // NOTE:: Month: 0 = January - 11 = December.
        var d = new Date(date[0],date[1]-1,date[2],time[0],time[1],time[2]);
        return d.getTime() / 1000;
    }
    
    function buildUrl(ticker, startDate, endDate, interval) {
        var endpoint = (host + baseUrl + ticker + "?symbol=" + ticker + "&period1=" + startDate + "&period2=" + endDate + "&interval=" + interval)
        //console.log(endpoint)
        return endpoint
    }
    export function price(ticker, startDate, endDate, interval, callback) {
        var start = convertDate(startDate)
        var end = convertDate(endDate)
        request(buildUrl(ticker, start, end, interval), function(resp) {
            var json = resp
            var quoteSummary = json["chart"]
            if (quoteSummary["error"] == null)
            {
                var result = quoteSummary["result"]
                callback(null, result)
            }
            else 
            {
                callback(quoteSummary["error"], null)
            }
        })
    }
    