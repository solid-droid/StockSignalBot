import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

export default function Settings() {
    return (
        <View style={styles.aboutText}>
            <Text>No Settings available</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    aboutText : {
        marginHorizontal:20,
        marginTop:20,
    }
})