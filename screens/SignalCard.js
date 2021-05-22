import React from 'react'
import { View, Text,StyleSheet,TouchableOpacity } from 'react-native'

export default function SignalCard({symbol, updateSymbol}) {
    return (
        <TouchableOpacity>
        <View 
        style={styles.container}>
            <View style={styles.data}>
                <View style={[styles.symbol,{marginBottom:10}]}>
                    <Text style={styles.symbolName}>{symbol.name}</Text>
                    <Text style={styles.symbolValue}>{symbol.value}</Text>
                </View>
                <View style={styles.symbol}>
                    <Text style={styles.Indicator}>RSI-14</Text>
                    <Text style={styles.seperator}>:</Text>
                    <View style={styles.Indicatorvalue}>
                        <Text style={styles.RSIbox}></Text>
                        <Text style={styles.RSIvalue}>{symbol.RSI.M.value}</Text>
                        <Text style={styles.RSIbox}></Text>
                        <Text style={styles.RSIvalue}>{symbol.RSI.H.value}</Text>
                        <Text style={styles.RSIbox}></Text>
                        <Text style={styles.RSIvalue}>{symbol.RSI.D.value}</Text>
                        <Text style={styles.RSIbox}></Text>
                        <Text style={styles.RSIvalue}>{symbol.RSI.W.value}</Text>
                    </View>
                 </View>
                 <View style={styles.symbol}>
                    <Text style={styles.Indicator}>MA</Text>
                    <Text style={styles.seperator}>:</Text>
                    <Text style={styles.Indicatorvalue}>{symbol.MA}</Text>
                 </View>
                 <View style={styles.symbol}>
                    <Text style={styles.Indicator}>Rating</Text>
                    <Text style={styles.seperator}>:</Text>
                    <Text style={styles.Indicatorvalue}>{symbol.Rating.type}({symbol.Rating.rating})</Text>
                 </View>
            </View>
            <View style={styles.signal}>
                <View style={styles.support}>
                    <Text style={styles.leftPoint}>{symbol.Support.a}</Text>
                    <Text style={styles.rightPoint}>{symbol.Support.b}</Text>
                </View>
                <View style={styles.signalType}>
                    <Text style={styles.SignalName}>{symbol.Signal.type}</Text>
                    <Text style={styles.SignalScore}>{symbol.Score}</Text>
                </View>
                <View style={styles.support}>
                    <Text style={styles.leftPoint}>{symbol.Resistance.a}</Text>
                    <Text style={styles.rightPoint}>{symbol.Resistance.b}</Text>
                </View>
            </View>
        </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container : {
        flexDirection:'row',
        height:120,
        borderRadius:10
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
        marginBottom:3,
    },
    symbolName:{
        fontSize:30,
        fontWeight:'bold'
    },
    symbolValue:{
        paddingLeft:10,
        fontSize:25
    },
    Indicator:{
        flex:5
    },
    seperator:{
        flex:1
    },
    Indicatorvalue:{
        flex:18,
        marginRight:5,
        justifyContent:'flex-start',
        alignItems:'center',
        flexDirection:'row'
    },
    RSIvalue: {
        marginRight:6
    },
    RSIbox: {
        backgroundColor:'red',
        paddingLeft:17,
        marginRight:6,
        height:17
    }

})