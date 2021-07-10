import React from 'react'
import {useEffect} from 'react'
import { View, Text,StyleSheet,TouchableOpacity } from 'react-native'
import {stockHistory, calculateRSI, calculateMA, calculate_Res_Sup} from '../scripts/scripts';

export default function SignalCard({symbol}) {

    const getRSIcolor = val => val > 70 ? 'red' :  val < 30 ? 'green': 'grey';

    const setData = async ({open, high, low, close}) => {
        symbol.open = open;
        symbol.high = high;
        symbol.low = low;
        symbol.close = close;
        const {RSI_D, RSI_W} = await calculateRSI(close);
        const {MA20,MA200} = await calculateMA(close);
        symbol.MA20 = MA20[MA20.length-1].toFixed(2);
        symbol.MA200 = MA200[MA200.length-1].toFixed(2);
        symbol.MA20_trend = "...";
        symbol.MA200_trend = "...";
        symbol.RSI.M.value = RSI_W[RSI_W.length-1];
        symbol.RSI.D.value = RSI_D[RSI_D.length-1];
        symbol.RSI.M.color = getRSIcolor( symbol.RSI.M.value);
        symbol.RSI.D.color = getRSIcolor( symbol.RSI.D.value);

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
                <View style={[styles.symbol,{marginBottom:15}]}>
                    <Text style={styles.symbolName}>{symbol.name.split('.')[0]}</Text>
                    <Text style={styles.symbolValue}>{symbol.value}</Text>
                </View>
                <View style={styles.symbol}>
                    <Text style={styles.Indicator}>RSI-14</Text>
                    <Text style={styles.seperator}>:</Text>
                    <View style={styles.Indicatorvalue}>
                         <Text style={[styles.RSIbox,{backgroundColor:symbol.RSI.M.color}]}></Text>
                        <Text style={styles.RSIvalue}>{symbol.RSI.M.value}</Text>
                        <Text>   </Text>
                        <Text style={[styles.RSIbox,{backgroundColor:symbol.RSI.D.color}]}></Text>
                        <Text style={styles.RSIvalue}>{symbol.RSI.D.value}</Text>
                    </View>
                 </View>
                 <View style={styles.symbol}>
                    <Text style={styles.Indicator}>MA-20</Text>
                    <Text style={styles.seperator}>:</Text>
                    <Text style={styles.Indicatorvalue}>{symbol.MA20}  -  {symbol.MA20_trend}</Text>
                 </View>
                 <View style={styles.symbol}>
                    <Text style={styles.Indicator}>MA-200</Text>
                    <Text style={styles.seperator}>:</Text>
                    <Text style={styles.Indicatorvalue}>{symbol.MA200}  -  {symbol.MA200_trend}</Text>
                 </View>
            </View>
            <View style={styles.signal}>
                <View style={styles.support}>
                    <Text style={styles.leftPoint}>{symbol.Resistance.a}</Text>
                    <Text style={styles.rightPoint}>{symbol.Resistance.b}</Text>
                </View>
                <View style={styles.signalType}>
                    <Text style={styles.SignalName}>{symbol.Signal.type}</Text>
                    <Text style={styles.SignalScore}>{symbol.Score}</Text>
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
    data:{
        // backgroundColor:Colors.blue100,
        alignItems:'flex-start',
        flex: 2.5,
        borderRightWidth:1,
    },
    signal:{
        // backgroundColor:Colors.red400,
        flex: 1,
        paddingLeft: 10,
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
        alignItems:'center',
    },

    SignalName:{
        fontSize:30,
        fontWeight:'bold'
    },
    SignalScore: {

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