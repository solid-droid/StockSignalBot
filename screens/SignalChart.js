import React from 'react'
import { Text, StyleSheet, TouchableOpacity } from 'react-native'
import {useEffect} from 'react'
import { LineChart} from 'react-native-chart-kit'
import {historical} from '../scripts/scripts'

export default function SignalChart({symbol, value}) {
    const interval = ["1 Day", "1 hour", "1 minute"]
    let closeArr =[];
    const [data, setData] = React.useState( { datasets: [ {data: [0,0,0]}  ], });
    const [intevalValue, setInteval] = React.useState(0);
   
    useEffect(() => {
        if(value!==0){
            if(closeArr.length==0){
                closeArr = historical[symbol].close;
            }
            const final = [...closeArr.slice(Math.min(closeArr.length - 10, closeArr.length)),value]
            setData( { datasets: [ {data: final}  ], });
        }
    }, [value])

    return (
        <TouchableOpacity style={styles.container}  onLongPress={()=>{
            // if(intevalValue +1 == interval.length)
            // {
            //     setInteval(0);
            // } else {
            //     setInteval(intevalValue+1);
            // }
            }}>
        <LineChart
            data={data}
            width={275} // from react-native
            height={114}
            chartConfig={{
            backgroundColor: '#fff',
            backgroundGradientFrom: '#fff',
            backgroundGradientTo: '#fff',
            decimalPlaces: 1, // optional, defaults to 2dp
            color: (opacity = 255) => `rgba(0, 0, 0, ${opacity})`,
            style: {
                borderRadius: 5,
            },
            }}
            bezier
            style={{
                marginTop:10,
            borderRadius: 5,
            }}
        />
              <Text style={styles.symbol}>{symbol.split('.')[0]}</Text>
              <Text style={styles.value}>{value}</Text>
              <Text style={styles.interval}>Interval : {interval[intevalValue]}</Text>
      </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container:{
        paddingTop:15,
        marginLeft:-6
    },
    symbol:{
        position:'absolute',
        left:20,
    },
    value:{
        position:'absolute',
        right:-30
    },
    interval:{
        position:'absolute',
        right:-30,
        bottom:-10
    }
})