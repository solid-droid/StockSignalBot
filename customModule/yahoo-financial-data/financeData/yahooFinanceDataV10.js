   const host = "https://query1.finance.yahoo.com"
   const baseUrl = "/v10/finance/quoteSummary/"  // + AAPL?modules=assetProfile%2CsummaryProfile (%2C is hex - ,)
  

    function request(endpoint, callback) {
        fetch(endpoint).then(res => res.json().then(res => {
            callback(res);
        }));
    }

    function buildUrl(ticker, module) {
        return (host + baseUrl + ticker + "?modules=" + module)
    }
    export function price(ticker, callback) {
        request(buildUrl(ticker, "price"), function(resp) {
            var json = resp
            var quoteSummary = json["quoteSummary"]
            if (quoteSummary["error"] == null)
            {
                var result = quoteSummary["result"][0]["price"]
                callback(null, result)
            }
            else 
            {
                callback(quoteSummary["error"], null)
            }
        })
    }


