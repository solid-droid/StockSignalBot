var RSI = require('technicalindicators').RSI;
var SMA = require('technicalindicators').SMA;
var bullish = require('technicalindicators').bullish;

var stockServer = require("yahoo-financial-data")

export const stockHistory = (symbol , setData) => {
    const today = new Date();
    today.setDate(today.getDate()-1);
    const start =  new Date();
    start.setDate(start.getDate()-360);
    let counter = 0;
    let record = {};
    const getData = (type) => {
        stockServer.history(symbol, type, formatDate(start), formatDate(today), '1d',  (err, data) => {
            counter++;
            record[type]= data.filter(x=>x!==null && x!==undefined);
            if(counter==4)
            setData(record, symbol);
        });
    }

    ['close','open','low','high'].forEach(x=> getData(x));

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

export const calculateTrend = async (data)=>{

    return await bullish(data);
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