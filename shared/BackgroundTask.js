import * as React from "react"
import { WebView } from "react-native-webview"
import {historical, price} from "../scripts/scripts"

let CalcInProgress = false;

function BackgroundTask(props) {

    const webViewRef = React.useRef();
    const [currentData, setCurrentData] = React.useState({});
    const getRSIcolor = val => val > 70 ? 'red' :  val < 30 ? 'green': 'grey';

    const handleTask = (e) => { 
      props.symbolList.forEach(x => {
        currentStockValue(x.name);
      });
     
      finalData= props.symbolList.map((x,i)=>{
          if(currentData[x.name])
          {
 
            const record = {};
            ['close'].forEach(y=> record[y]= historical[x.name][y]);
          
            const rawData = {i}
            rawData['name']=x.name;
            rawData['data']=[...record.close,currentData[x.name]] 
            return rawData;
          }
      })

      if(finalData[0] && !CalcInProgress){
            CalcInProgress = true;
            const run = `
                        dataArr = JSON.parse('${JSON.stringify(finalData)}');
                        output = calculate(dataArr);
                        window.ReactNativeWebView.postMessage(JSON.stringify(output)); //output
                        true;
                      `;

          webViewRef.current.injectJavaScript(run);
      }
    }
 

    const sendData = (i,name, {MA20,MA200,RSID,RSIW}) => {
      historical[name]['RSID']=RSID;
      historical[name]['MA20']=MA20;
      const _rsiM = RSIW;
      const _rsiD = RSID[RSID.length-1];
      const _rsiM_color  = getRSIcolor(_rsiM);
      const _rsiD_color = getRSIcolor( _rsiD);
      const _MA20 = MA20[MA20.length-1].toFixed(2);
      let _MA200 = 0;
      if(MA200)
      _MA200 = MA200.toFixed(2);
      
      props.updateList(i, {value : currentData[name],_rsiM, _rsiD , _rsiM_color, _rsiD_color, _MA20, _MA200});
    }

    const currentStockValue = ( symbol ) => {
        price( symbol , (err, data) => {
            setCurrentData((previous)=>{
                const value = {};
                value[symbol]=data;
                return {...previous, ...value}
            })
        });
    }

    const calcIndicators = e => {
      CalcInProgress = false;
      
     JSON.parse(e.nativeEvent.data).forEach(x=>{
        const info = Object.keys(x)[0];
        const i = info.split('_')[0];
        const name = info.split('_')[1];
        sendData(i,name,x[info]);
      });
      
    }

    const formulaFunctions = ` 
const windows = (l, xs, i = 0, out = []) =>
    i > xs.length - l
      ? out
      : windows(l, xs, i + 1, [...out, xs.slice(i, i + l)]);


const calcRS = (dataArr, period = 14) =>{
  const delta = dataArr.map((x,i)=>i==0 ? 0 : x -dataArr[i-1]);
  const positive = delta.map(x=> x<0 ? 0 : x);
  const negative = delta.map(x=> x>0 ? 0 : x);

  const avg_gain = windows(period, positive).map(x=>parseFloat(((x.reduce((a,b)=>a+b))/x.length).toFixed(3)));
  const avg_loss = windows(period, negative).map(x=>Math.abs(parseFloat(((x.reduce((a,b)=>a+b))/x.length).toFixed(3))));
  
  const RS  = avg_gain.map((x,i)=>parseFloat((x/avg_loss[i]).toFixed(3)));
  return RS;
}

const getRSI = (dataArr) => {

  const period = 14;
  let RSID = [], RSIW=[], MA20 =[], MA200=[];   

  MA20 = windows(20, dataArr).map(x=>parseFloat(((x.reduce((a,b)=>a+b))/x.length).toFixed(2)));
  MA200 = windows(200, dataArr).map(x=>parseFloat(((x.reduce((a,b)=>a+b))/x.length).toFixed(2)));    

  RSID = calcRS(dataArr).map(x=> parseFloat((100-(100/(1+x))).toFixed(2)));
  RSIW = calcRS(dataArr.filter((x,i) => i%5 == 0 )).map(x=> parseFloat((100-(100/(1+x))).toFixed(2)));

  output = {}
  output['MA20'] = MA20;
  output['MA200'] = MA200[MA200.length-1];
  output['RSID'] = RSID;
  output['RSIW'] = RSIW[RSIW.length-1];

  return output;
}

const calculate = (data) => {
  const output = [];
  data.forEach(x => {
      const dt = {};
      dt[x.i+'_'+x.name] = getRSI(x.data);
      output.push(dt);
  });
  return output;
}


`;

    return (
    <>
      <WebView
        onMessage={handleTask}
        source={{
          html: `<script>
          window.ReactNativeWebView.postMessage(String(new Date()));
            setInterval(()=>{
                window.ReactNativeWebView.postMessage(String(new Date())); //output
            }, 10000)
            </script>`,
        }}
      />
            <WebView
        onMessage={calcIndicators}
        ref={(ref) => webViewRef.current = ref}
        source={{
          html: `<script>
          
          ${formulaFunctions}
                       
          </script>`,
        }}
      />
      </>
    )
  }
  export default BackgroundTask