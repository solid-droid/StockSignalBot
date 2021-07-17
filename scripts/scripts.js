import * as v10 from '../customModule/yahoo-financial-data/financeData/yahooFinanceDataV10';
import * as v8 from '../customModule/yahoo-financial-data/financeData/yahooFinanceDatav8';

export var historical = {};

export const stockHistory = (symbol , setData) => {
    const today = new Date();
    today.setDate(today.getDate()-1);
    const start =  new Date();
    start.setDate(start.getDate()-360);
    let counter = 0;
    let record = {};
    const getData = (type) => {
        history(symbol, type, formatDate(start), formatDate(today), '1d',  (err, data) => {
            counter++;
            record[type]= data.filter(x=>x!==null && x!==undefined);
            if(counter==4)
            {
                historical[symbol] = record;
                setData();
            }
        });
    }

    ['close','open','low','high'].forEach(x=> getData(x));

}

export const price = (ticker, completion) => {
    v10.price(ticker, function (err, data) {
        if (!err) 
        {
            if (!data["regularMarketPrice"]["raw"])
            {
                completion(err, data["regularMarketPrice"])
            }
            else {
                completion(err, data["regularMarketPrice"]["raw"])
            }
        }
        else {
            completion(err, null)
        }
    });
}

export const history = (ticker, value, startDate, endDate, interval, completion) => {
    var values = ['high', 'low', 'open', 'close', 'volume']
    var intervals = ["1d","5d","1mo","3mo","6mo","1y","2y","5y","10y","ytd","max"]
    if (!values.includes(value)) {
        var err = {'code': "Bad args", 'description': "Invalid Value field"}
        completion(err, null);
        return
    }
    if (!intervals.includes(interval)) {
        var err = {'code': "Bad args", 'description': "Invalid Interval field"}
        completion(err, null);
        return
    }
    v8.price(ticker, startDate, endDate, interval, function(err, data) {
        if (!err) 
        {
            completion(err, data[0]["indicators"]["quote"][0][value])
        }
        else {
            completion(err, null)
        }
    })
}

export const calculateRSI = async (data)=>{
    
    const RSI_D = await RSI.calculate({values:data,period:14});
    skippedData = data.filter((x,i) => i%5 == 0 );
    const RSI_W = await RSI.calculate({values:skippedData, period:14});
    return {RSI_D,RSI_W}
}

export const calculateMA = async (data)=>{
   const MA20  = await SMA.calculate({period : 20, values : data});
   const MA200 = await SMA.calculate({period : 200, values : data});
   return {MA20, MA200};
}


export const calculate_Res_Sup = ({High, Low, Close})=>{

    const PP = (High + Low + Close) / 3;

    const R1 = Math.abs(2 * PP - Low).toFixed(1);
    const S1 = Math.abs(2 * PP - High).toFixed(1);;

    const R2 = Math.abs(PP + High - Low).toFixed(1);
    const S2 = Math.abs(PP - High - Low).toFixed(1);

    return {Support:{a:S1,b:S2}, Resistance:{a:R1,b:R2}}
};

const formatDate = (date, format="yy-mm-dd") => {
    const map = {
        mm: date.getMonth() + 1,
        dd: date.getDate(),
        yy: date.getFullYear().toString(),
    }

    return format.replace(/mm|dd|yy|yyy/gi, matched => map[matched])
}


export const findPeaksAndTroughs = (array) => {
    var start = 1;                        // Starting index to search
    var end = array.length - 2;           // Last index to search
    var obj = { peaks: [], troughs: []  };// Object to store the indexs of peaks/thoughs
    
    for(var i = start; i<=end; i++)
    {
      var current = array[i];
      var last = array[i-1];
      var next = array[i+1];
      
      if(current > next && current > last) 
          obj.peaks.push(i);
      else if(current < next && current < last) 
          obj.troughs.push(i);
    }
    return obj;
  }


  