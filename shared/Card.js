import React from 'react'
import { StyleSheet, View} from 'react-native'
import {LinearGradient} from 'expo-linear-gradient';

export default function Card(props) {
    const colors ={
    BUY : ['#f8fff4', '#e9ffdb', '#c2fb9e'],
    SELL : ['#ffeaea', '#ffc0c0', '#ffb5b5'],
    HOLD : ['#ebebeb', '#e3e3e3', '#d2d2d2'],
    ___ : ['#fff','#fff','#fff']
    }
    return (

            <LinearGradient  start={{x: 0, y: 0}} end={{x: 1, y: 0}} colors={colors[props.background]} style={styles.card}>
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
        marginHorizontal:1,
        marginVertical: 1,
        overflow:'hidden'
    }
})