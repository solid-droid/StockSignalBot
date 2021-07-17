import React, {useState, useEffect} from 'react'
import * as Notifications from 'expo-notifications';
import { View, StyleSheet, TouchableOpacity, Text, StatusBar, Dimensions } from 'react-native'
import {Snackbar } from 'react-native-paper'
import { SwipeListView } from 'react-native-swipe-list-view';
import Icon from "react-native-vector-icons/FontAwesome";
import AsyncStorage from '@react-native-async-storage/async-storage';

import {historical, findPeaksAndTroughs} from '../scripts/scripts'
import Card from '../shared/Card'
import Search from '../shared/Search'
import SignalCard from './SignalCard'
import SignalChart from './SignalChart'
import BackgroundTask from '../shared/BackgroundTask'
import { abs } from 'react-native-reanimated';

const window = Dimensions.get("window");

export default function Dashboard({navigation}) {

    const [visible, setVisible] = React.useState(false);
    const [symbol, setSymbol] = React.useState('');
    const [NotifMessage, setNotifMessage] = React.useState('');
    const [symbolList, setSymbolList] = useState([]);


    useEffect(() => {
        getData();
    }, [])

    const getData = async () => {
        try {
          let list = await AsyncStorage.getItem('signalBot_symboList')
          if(list) (JSON.parse(list)).forEach(x => createEntry(x));
        
        } catch(e) {
          // error reading value
        }
      }

    const storeData = async (value) => {
        try {
          await AsyncStorage.setItem('signalBot_symboList', JSON.stringify(value))
        } catch (e) {
          // saving error
        }
      }

    const success = (symbol) => {
        setSymbol(symbol);
        createEntry(symbol);
        const symbolNameList = [...symbolList.map(x=>x.name),symbol];
        storeData(symbolNameList);
        setNotifMessage('Added');
        setVisible(true);
    };

    const fail = (msg) => {
        setNotifMessage(msg);
        setVisible(true);
    };
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

  /////////////////////////////////////////////////////////////////
    const map = (x, a, b, c, d) => {
        return (x-a)/(b-a)*(d-c)+c;
    }
    
    //difference of items of 2 arrays
    const delta = (a,b) => {
        return a.map((x,i) => x-b[i]);
    }

    //line of best fit
    const line = (x,y) => {
        const m = (y.reduce((a,b) => a+b, 0)/y.length);
        const b = y.reduce((a,b) => a+b, 0)-m*x.reduce((a,b) => a+b, 0);
        return {m,b};
    }

    const getScore = (value, name , RSIhigh, RSIlow)=> {
        const RSIarr = historical[name].RSID;
        const MAarr = historical[name].MA20;

        const RSID = RSIarr[RSIarr.length-1];

        let RSIBuy = 0, MABuy=0, prediction = 0;
        let finalScore = 0;

        ////////////// RSI algo /////////////////////////////////
        if(RSID<30)          RSIBuy =100;      
        else if(RSID>70)     RSIBuy =0;
        else RSIBuy = map(RSID,30,70,100, 0);

        if(RSID > RSIhigh)   RSIBuy = RSIBuy < 30 ? RSIBuy : 30;

        if(RSID < RSIlow)   RSIBuy = RSIBuy > 70 ? RSIBuy : 70;

        finalScore = RSIBuy > 70 ? RSIBuy > 80 ? finalScore+2 : finalScore+1 : finalScore;
        finalScore = RSIBuy < 30 ? RSIBuy > 20 ? finalScore-2 : finalScore-1 : finalScore;

        ////////////////// Moving Average algo /////////////////////
        const last5DaysMarr = MAarr.slice(-5);
        const last5DayClose = [...historical[name].close.slice(-4), value];
        const delta5d = delta(last5DayClose,last5DaysMarr);
        const down3d = delta5d.slice(-2).every(a => a<=0);
        const up3d = delta5d.slice(-2).every(a => a>=0);
        const down5d = delta5d.every(a => a<=0);
        const up5d = delta5d.every(a => a>=0);
        //-4  -  +4
        let points = 0;
        if(down3d){
            if(down5d){
                //strong down trend
                points= delta5d.slice(0,-1).reduce((a, b, i)=> (Math.abs(b) <= Math.abs(delta5d[i+1]) ? a+1 : a-1),0);
                MABuy = map(points,5,-5, 0, 100);           
            } else {
                //week down trend
                points= delta5d.slice(-3,-1).reduce((a, b, i)=> (Math.abs(b) <= Math.abs(delta5d[i+1]) ? a+1 : a-1),0);
                MABuy = map(points,3,-3, 0, 100);   
            }
            
        }else if(up3d){
            if(up5d){
                //strong up trend
                points= delta5d.slice(0,-1).reduce((a, b, i)=> (Math.abs(b) <= Math.abs(delta5d[i+1])+1 ? a+1 : a-1),0);
                MABuy = map(points,5,-5, 0, 100);           
            } else {
                //week up trend
                points= delta5d.slice(-3,-1).reduce((a, b, i)=> (Math.abs(b) <= Math.abs(delta5d[i+1])+1 ? a+1 : a-1),0);
                MABuy = map(points,3,-3, 0, 100);   
            }
        } else {
            //No predictable trend
            MABuy = 50;
        }
        
        MABuy = MABuy.toFixed(0);
        
        finalScore = MABuy > 70 ? MABuy > 80 ? finalScore+2 : finalScore+1 : finalScore;
        finalScore = MABuy < 30 ? MABuy > 20 ? finalScore-2 : finalScore-1 : finalScore;
    ///////////////// Prediction algo //////////////////
        const predictedLine = line([0,1,2,3,4],delta5d.splice(-4));
        const predDelta = predictedLine.m*5+predictedLine.b;
        finalScore = predDelta<10 ? (down3d ? finalScore+1 : (up3d ? finalScore-1 :finalScore)) : finalScore;

        if(down3d)
        prediction = (value - predDelta).toFixed(2);
        else if(up3d)
        prediction = (value + predDelta).toFixed(2);
        else
        prediction = value
    ///////////////////////////////////////////////////
        const type = finalScore > 3 ? 'BUY' : finalScore < -3 ? 'SELL' : 'HOLD';
        let output = {}
        output = {
            RSI_score: RSIBuy.toFixed(0),
            MA_score: MABuy,
            prediction,
            Signal:{type, color:'#fff'}
        }
        
        return output;
    }

    const updateList = (i, {value,_rsiM, _rsiD , _rsiM_color, _rsiD_color, _MA20, _MA200}) =>{
      if(value!==undefined){
        setSymbolList(prev => {
            const output = findPeaksAndTroughs(historical[prev[i].name].RSID)
            //find average of array
            prev[i].RSI.D.high = (output.peaks.reduce((a, b) => a + historical[prev[i].name].RSID[b]) / output.peaks.length).toFixed(0);
            prev[i].RSI.D.low  = (output.troughs.reduce((a, b) => a + historical[prev[i].name].RSID[b]) / output.troughs.length).toFixed(0);
            
            const {RSI_score, MA_score, prediction, Signal } = getScore(value,  prev[i].name, prev[i].RSI.D.high , prev[i].RSI.D.low);

            if(prev[i].Signal.type !== Signal.type && Signal.type!=='HOLD'){
                sendNotification(prev[i].name.split(".")[0] +"   "+ value , Signal.type)
            }

            prev[i].Score.RSI = RSI_score;
            prev[i].Prediction.MA = prediction;
            prev[i].Score.MA = MA_score;
            prev[i].Signal = Signal;
            prev[i].value = value;
            prev[i].MA20 = _MA20;
            prev[i].MA200 = _MA200;
            prev[i].MA20_trend = _MA20 > value ? "down" : "up";
            prev[i].MA200_trend = _MA200 > value ? "down" : "up";
            prev[i].RSI.M.value = _rsiM;
            prev[i].RSI.D.value = _rsiD;
            prev[i].RSI.M.color = _rsiM_color;
            prev[i].RSI.D.color = _rsiD_color;
            return [...prev];
        })
      }
    }

    const createEntry = async (symbol) => {
       setSymbolList(previousList => {
            return [{
                name:symbol, 
                key:String(previousList.length), 
                value:0,
                RSI:{
                    M:{value:0,color:'#fff'},
                    D:{value:0,color:'#fff',high:0, low:0},
                    },
                MA20: 0,
                MA200: 0,
                MA20_trend:"...",
                MA200_trend:"...",
                Trend: "...",
                Support:{a:0, b: 0},
                Resistance:{a: 0, b: 0},
                Score: {RSI:0,MA:0},
                Prediction:{MA:0},
                Signal: {type:'___', color:'#fff'}
                },...previousList]
        })
    }

    const onDismissSnackBar = () => setVisible(false);

    const onRowDidOpen = rowKey => {

    };

    const closeRow = (rowMap, rowKey) => {
        if (rowMap[rowKey]) {
            rowMap[rowKey].closeRow();
        }
    };

    const deleteRow = (rowMap, rowKey) => {
        closeRow(rowMap, rowKey);
        const newData = [...symbolList];
        const prevIndex = symbolList.findIndex(item => item.key === rowKey);
        newData.splice(prevIndex, 1);
        const symbolNameList = newData.map(x=>x.name);
        storeData(symbolNameList);
        setSymbolList(newData);
    };

    const renderHiddenItem = (data, rowMap) => (
        <View style={styles.rowBack}>
            <TouchableOpacity
                style={styles.deleteBtn}
                onPress={() => deleteRow(rowMap, data.item.key)}
            >
                <Icon name="trash" style={styles.iconStyle} size={60} color="#900" />
            </TouchableOpacity>
            <View style={styles.ChartContainer}>
            {/* <Card background={'NONE'}> */}
                <View style={styles.ChartCard}>
                <SignalChart symbol={data.item.name} value={data.item.value}></SignalChart>
                </View>
            {/* </Card> */}
            </View>
        </View>
    );

    const renderItem = data => (
        <Card background={data.item.Signal.type}>
            <SignalCard symbol={data.item} />
        </Card>
    );
    return (
        <View style={styles.container}>
            <View style={{position:'absolute', overflow:'hidden', height:0}}>
                <BackgroundTask {...{symbolList,updateList}}/>
            </View>
            <StatusBar backgroundColor='#fff' barStyle='dark-content' />
            <View style={styles.header}>
            <Text style={styles.headerTextLeft}> SIGNAL BOT</Text>
            <Text style={styles.headerTextRight}>@SolidDroid</Text>
            </View>
           <Search {...{symbolList, success, fail}}></Search>
           <SwipeListView
            data={symbolList}
            renderItem={renderItem}
            renderHiddenItem={renderHiddenItem}
            leftOpenValue={100}
            rightOpenValue={-window.width+133}
            stopLeftSwipe={100}
            swipeToOpenPercent={30}
            stopRightSwipe={-window.width+133}
            onRowDidOpen={onRowDidOpen}
            closeOnRowOpen={false}
            />
            <Snackbar visible={visible}  duration={1500}  onDismiss={onDismissSnackBar}>
               {symbol} {NotifMessage}
            </Snackbar>
        </View>
    )

}

const styles = StyleSheet.create({
    container: {
        height:'100%', 
        backgroundColor:"#fff"
    },
    header:{
        paddingHorizontal:10,
        paddingTop:5,
        flexDirection:'row',
        justifyContent:'space-between'
    },
    headerTextLeft:{
        textAlignVertical:'bottom',
        fontSize:20,
        fontWeight:'bold'
    },
    headerTextRight:{
        textAlignVertical:'bottom',
        height:'100%',
        color:'grey',
    },
    iconStyle: {
        paddingLeft:25
    },
    rowBack: {
        justifyContent: 'center',
        alignItems:'center',
        flex:1,
        flexDirection:'row',
        marginVertical:5,
        marginHorizontal:15,
        marginLeft:20,
        justifyContent:'flex-start'

    },
    deleteBtn: {
        height:'90%',
        width:97,
        justifyContent:'center',
        borderRadius:10,
       },
    ChartContainer:{
        marginLeft:0,
    },
    ChartCard:{
        width:225,
        height:'100%',
    }
});