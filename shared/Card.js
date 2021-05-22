import React from 'react'
import { StyleSheet, View} from 'react-native'
import {LinearGradient} from 'expo-linear-gradient';

export default function Card(props) {
    const BUY = ['#f8fff4', '#e9ffdb', '#c2fb9e'];
    const SELL = ['#ffeaea', '#ffc0c0', '#ffb5b5'];
    const HOLD = ['#ebebeb', '#e3e3e3', '#d2d2d2'];

    return (

            <LinearGradient  start={{x: 0, y: 0}} end={{x: 1, y: 0}} colors={HOLD} style={styles.card}>
            <View style={styles.cardComponent}>
                    {props.children}
            </View>
        </LinearGradient>

    )
}

const styles = StyleSheet.create({
    card:{
        borderRadius:10,
        elevation:5,
        backgroundColor:'#fff',
        marginHorizontal:15,
        marginVertical:6,
    },
    cardComponent:{
        marginHorizontal:10,
        marginVertical: 10,
    }
})