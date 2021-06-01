import * as React from "react"
import { WebView } from "react-native-webview"
var stockServer = require("yahoo-financial-data")

function BackgroundTask(props) {

    const [currentData, setCurrentData] = React.useState({});

    const handleTask = (e) => {
      const currentTime = e.nativeEvent.data;
      props.symbolList.forEach((x,i)=>{
          if(currentData[x.name]!==undefined || currentData[x.name]!==null)
          {
            props.updateList(i, currentData[x.name])
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
            }, 5000)
            </script>`,
        }}
      />
    )
  }
  export default BackgroundTask