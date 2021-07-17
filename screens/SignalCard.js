import React from 'react'
import {useEffect} from 'react'
import {View, Text,StyleSheet,TouchableOpacity } from 'react-native'
import {stockHistory, calculate_Res_Sup} from '../scripts/scripts';
import {historical} from '../scripts/scripts'

export default function SignalCard({symbol}) {

    const setData = async () => {
        const high = historical[symbol.name].high;
        const low = historical[symbol.name].low;
        const close = historical[symbol.name].close;

        // ////////////////////////////////////
        const High = high[high.length-1];
        const Low = low[low.length-1];
        const Close = close[close.length-1];

        const {Support, Resistance} = calculate_Res_Sup({High, Low, Close});
  
        symbol.Support = Support;
        symbol.Resistance = Resistance;
    }

    const setHistoricalData = () =>{
        stockHistory(symbol.name, setData);
      }

    useEffect(() => {
        setHistoricalData( );
    }, [])

    return (
        <TouchableOpacity>
        <View 
        style={styles.container}>
            <View style={styles.data}>
                <View style={[styles.symbol,{marginBottom:7}]}>
                    <Text style={styles.symbolName}>{symbol.name.split('.')[0]}</Text>
                    <Text style={styles.symbolValue}>{symbol.value}</Text>
                </View>
                <View style={styles.symbol}>
                    <Text style={styles.Indicator}>RSI-14</Text>
                    <Text style={styles.seperator}>:</Text>
                    <View style={styles.Indicatorvalue}>
                        <Text style={[styles.RSIbox,{backgroundColor:symbol.RSI.D.color}]}></Text>
                        <Text style={styles.RSIvalue}>{symbol.RSI.D.value}</Text>
                        <Text> - {symbol.RSI.D.value<50?'low':'high'} ( {symbol.RSI.D.value<50?symbol.RSI.D.low:symbol.RSI.D.high} )</Text>
                    </View>
                 </View>
                 <View style={styles.symbol}>
                    <Text style={styles.Indicator}>MA-20</Text>
                    <Text style={styles.seperator}>:</Text>
                    <Text style={styles.Indicatorvalue}>{symbol.MA20}  -  {symbol.MA20_trend} trend</Text>
                 </View>
                 <View style={styles.symbol}>
                    <Text style={styles.Indicator}>MA-200</Text>
                    <Text style={styles.seperator}>:</Text>
                    <Text style={styles.Indicatorvalue}>{symbol.MA200}  -  {symbol.MA200_trend} trend</Text>
                 </View>
            </View>
            <View style={styles.signal}>
                <View style={styles.support}>
                    <Text style={styles.leftPoint}>{symbol.Resistance.a}</Text>
                    <Text style={styles.rightPoint}>{symbol.Resistance.b}</Text>
                </View>
                <View style={styles.signalType}>
                    <View style={{marginBottom:5, flexDirection:'row'}}>
                        <Text style={styles.key}>RSI Buy</Text>
                        <Text style={styles.value}>: {symbol.Score.RSI}% </Text>
                    </View>
                    <View style={{marginBottom:5, flexDirection:'row'}}>
                        <Text style={[styles.key,{fontWeight:'bold'}]}>{symbol.Signal.type}</Text>
                        <Text style={styles.value}>: {symbol.Prediction.MA}</Text>
                    </View>
                    <View style={{flexDirection:'row'}}>
                         <Text style={styles.key}>MA Buy</Text>
                         <Text style={styles.value}>: {symbol.Score.MA}% </Text>
                    </View>
                </View>
                <View style={styles.support}>
                    <Text style={styles.leftPoint}>{symbol.Support.a}</Text>
                    <Text style={styles.rightPoint}>{symbol.Support.b}</Text>
                </View>
            </View>
        </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container : {
        flexDirection:'row',
        height:125,
        borderRadius:9,
        margin:10
    },
    key:{
        flex:0.9,
    },
    value:{
        flex:1,
    },
    data:{
        // backgroundColor:Colors.blue100,
        alignItems:'flex-start',
        flex: 2,
        borderRightWidth:1,
    },
    signal:{
        // backgroundColor:Colors.red400,
        flex: 1,
        paddingLeft: 5,
    },
    support: {
        flexDirection:'row'
    },
    leftPoint: {
        flex:1,
        color:'grey',
        fontSize:13,
        // backgroundColor:Colors.blue100,
    },
    rightPoint:{
        flex:1,
        textAlign:'right',
        color:'grey',
        fontSize:13,
        // backgroundColor:Colors.red400,
    },

    signalType:{
        flex:2,
        justifyContent:'center',
        // alignItems:'center',
    },

    SignalName:{
        fontSize:30,
        fontWeight:'bold'
    },
    SignalScore: {
        flexDirection:'row',
        justifyContent:'space-around',
    },

    symbol:{
        flexDirection:'row',
        alignItems:'baseline',
        marginBottom:7,
    },
    symbolName:{
        fontSize:20,
        fontWeight:'bold',
        marginLeft:-5
    },
    symbolValue:{
        paddingLeft:10,
        fontSize:15
    },
    Indicator:{
        flex:5
    },
    seperator:{
        flex:1
    },
    Indicatorvalue:{
        flex:15,
        marginRight:5,
        justifyContent:'flex-start',
        alignItems:'center',
        flexDirection:'row'
    },
    RSIvalue: {
        marginRight:6
    },
    RSIbox: {
        paddingLeft:17,
        marginRight:6,
        height:17
    }

})