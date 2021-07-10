import React, {useState} from 'react'
import { View, StyleSheet, TouchableOpacity, Text, StatusBar, Dimensions } from 'react-native'
import {Snackbar } from 'react-native-paper'
import { SwipeListView } from 'react-native-swipe-list-view';
import Icon from "react-native-vector-icons/FontAwesome";

import Card from '../shared/Card'
import Search from '../shared/Search'
import SignalCard from './SignalCard'
import SignalChart from './SignalChart'
import BackgroundTask from '../shared/BackgroundTask'

const window = Dimensions.get("window");

export default function Dashboard({navigation}) {

    const [visible, setVisible] = React.useState(false);
    const [symbol, setSymbol] = React.useState('');
    const [NotifMessage, setNotifMessage] = React.useState('');
    const [symbolList, setSymbolList] = useState([]);



    const success = (symbol) => {
        setSymbol(symbol);
        createEntry(symbol);
        setNotifMessage('Added');
        setVisible(true);
    };

    const fail = (msg) => {
        setNotifMessage(msg);
        setVisible(true);
    };

    const getScore = (value, RSID, RSIM, MA20, MA200, S , R)=> {
        let Buy = 0, Sell =0;

        if(RSID<35)     Buy +=2;
        if(RSIM>45)     Buy +=2;
        
        if(RSID>70)     Sell +=2;
        if(RSIM<65)     Sell +=2;

        if(MA20<value)  Buy +=3; else Sell +=3;
        
        if(MA200<value) Buy +=2; else Sell +=2;

        if((value - (S.a+S.b)/2) > ((R.a+R.b)/2) - value) Buy+=1; else Sell+=1;
    
        let output = {}
        if(Buy>7)
        output = {
            Score: String(Buy*10)+'%',
            Signal: {type:'BUY', color:'#fff'}
        }
        else if (Sell > 7)
        output = {
            Score: String(Sell*10)+'%',
            Signal: {type:'SELL', color:'#fff'}
        }
        else 
        output = {
            Score: String((20-Sell-Buy)*5)+'%',
            Signal:{type:'HOLD', color:'#fff'}
        }
        
        return output;
    }
    const updateList = async(i, {value,_rsiM, _rsiD , _rsiM_color, _rsiD_color, _MA20, _MA200}) =>{
      if(value!==undefined){
        setSymbolList(prev => {
            const {Score, Signal } = getScore(value,_rsiD,_rsiM,_MA20,_MA200, prev[i].Support,  prev[i].Resistance);
            prev[i].Score = Score;
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
                    D:{value:0,color:'#fff'},
                    },
                open:[],
                high:[],
                low:[],
                close:[],
                MA20: 0,
                MA200: 0,
                MA20_trend:"...",
                MA200_trend:"...",
                Trend: "...",
                Support:{a:0, b: 0},
                Resistance:{a: 0, b: 0},
                Score: 'Loading',
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
                <SignalChart symbol={data.item.name} value={data.item.value} closeArr = {data.item.close}></SignalChart>
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