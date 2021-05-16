import * as Notifications from 'expo-notifications';
import React, { useState, useEffect } from 'react';
import AboutContent from './AboutContent'
import BackgroundTask from '../Shared/BackgroundTask'

var stockServer = require("yahoo-financial-data")
var RSI = require('technicalindicators').RSI;

///////////////////////////////////////////////////////////////////////
const sendNotification = (title, message) => {
  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: false,
      shouldSetBadge: false,
    }),
  });

  Notifications.scheduleNotificationAsync({
    content: {
      title: title,
      body: message,
    },
    trigger: null,
  });
}
//////////////////////////////////////////////////////////////////
export default function About({navigation}) {

    const [ RSI_Data, setRSI_Data] = useState([]);
   
       useEffect(() => {
        setInterval(()=>{
            stockServer.history('SBIN.NS', 'close', "2021-3-01", "2021-3-25", '1d',  (err, data) => {
                const _data = createObjectArray(RSI.calculate({values:data, period:14}))
                setRSI_Data(_data);
                });
                // sendNotification();
            },3000);
          }, []);

    const createObjectArray = (array) =>{
        const output = [];
        array.forEach((x,i) => {
            output.push({value:x+Math.random()*10, key: String(i+1)});
        });
        return output
    }


    return (
      <>
      <AboutContent todos={RSI_Data}/>
      <BackgroundTask interval={5000} function={() => {console.log("My task " + Math.random())}} />
      </>
    )
}


  
