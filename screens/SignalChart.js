import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { LineChart} from 'react-native-chart-kit'

export default function SignalChart({symbol}) {

    return (
      <View style={styles.container}>
        <LineChart
            data={{
               datasets: [
                {
                data: [
                    Math.random() * 100,
                    Math.random() * 100,
                    Math.random() * 100,
                    Math.random() * 100,
                    Math.random() * 100,
                    Math.random() * 100,
                ],
                },
            ],
            }}
            width={280} // from react-native
            height={120}
            chartConfig={{
            backgroundColor: '#fff',
            backgroundGradientFrom: '#fff',
            backgroundGradientTo: '#fff',
            decimalPlaces: 0, // optional, defaults to 2dp
            color: (opacity = 255) => `rgba(0, 0, 0, ${opacity})`,
            style: {
                borderRadius: 16,
            },
            }}
            bezier
            style={{
                marginTop:10,
            borderRadius: 16,
            }}
        />
              <Text style={styles.symbol}>{symbol}</Text>
              <Text style={styles.value}>131.22</Text>
      </View>
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
    }
})