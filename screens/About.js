import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

export default function About() {
    return (
        <View  style={styles.aboutText}>
            <Text>Developed for finding best position for BUY and SELL</Text>
            <Text>using RSI and moving average.</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    aboutText : {
        marginHorizontal:20,
        marginTop:20,
    }
})