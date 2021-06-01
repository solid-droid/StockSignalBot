import React from 'react'
import { Text, StyleSheet, TouchableOpacity } from 'react-native'
import { LineChart} from 'react-native-chart-kit'

export default function SignalChart({symbol, value}) {
    const interval = ["1 Day", "1 hour", "1 minute"]
    const [intevalValue, setInteval] = React.useState(0);
    return (
        <TouchableOpacity style={styles.container}  onLongPress={()=>{
            if(intevalValue +1 == interval.length)
            {
                setInteval(0);
            } else {
                setInteval(intevalValue+1);
            }
            }}>
        <LineChart
            data={{
               datasets: [
                {
                data: [
                   1,2,3,4,5,6,7,8,9,10,11
                ],
                },
            ],
            }}
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
              <Text style={styles.interval}>{interval[intevalValue]}</Text>
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