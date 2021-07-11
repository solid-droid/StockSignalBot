import * as React from "react"
import { WebView } from "react-native-webview"
import {calculateRSI, calculateMA} from '../scripts/scripts';

var stockServer = require("yahoo-financial-data")

function BackgroundTask(props) {

    const [currentData, setCurrentData] = React.useState({});
    const getRSIcolor = val => val > 70 ? 'red' :  val < 30 ? 'green': 'grey';

    const handleTask = (e) => {    
      props.symbolList.forEach(async (x,i)=>{
          if(currentData[x.name])
          {
            
             const record = {};
            ['close','open','low','high'].forEach(x=> record[x]= props.symbolList[i][x])
            
              const {RSI_D, RSI_W} = await calculateRSI( [...record.close,currentData[x.name]]);
              const {MA20,MA200} = await calculateMA([...record.close,currentData[x.name]]);
              const _rsiM = RSI_W[RSI_W.length-1];
              const _rsiD = RSI_D[RSI_D.length-1];
              const _rsiM_color  = getRSIcolor(_rsiM);
              const _rsiD_color = getRSIcolor( _rsiD);
              const _MA20 = MA20[MA20.length-1].toFixed(2);
              const _MA200 = MA200[MA200.length-1].toFixed(2);
    
            props.updateList(i, {value : currentData[x.name],_rsiM, _rsiD , _rsiM_color, _rsiD_color, _MA20, _MA200});
          }
      })

      props.symbolList.forEach(x => {
        currentStockValue(x.name);
      });
    }
 
    const currentStockValue = ( symbol ) => {
        stockServer.price( symbol , (err, data) => {
            setCurrentData((previous)=>{
                const value = {};
                value[symbol]=data;
                return {...previous, ...value}
            })
        });
    }

    return (
      <WebView
        onMessage={handleTask}
        source={{
          html: `<script>
            setInterval(()=>{
                window.ReactNativeWebView.postMessage(String(new Date())); //output
            }, 6000)
            </script>`,
        }}
      />
    )
  }
  export default BackgroundTask