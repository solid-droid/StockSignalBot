import React from 'react'
import { View,TextInput, StyleSheet, TouchableOpacity } from 'react-native'
import {IconButton, Colors, } from 'react-native-paper'

export default function Search({success}) {

    let textInput;
    
    const [symbol, onChangeSymbol ] = React.useState("");

    const AddSymbol = () => {
        // navigation.navigate('AboutScreen');
        success(symbol);
        textInput.clear();
    }

    return (
        <View style={styles.search}>
            <TextInput
                ref={input => { textInput = input }}
                mode='outlined'
                style={styles.input}
                onChangeText={onChangeSymbol}
                value={symbol}
                placeholder="Enter Stock Symbol"
                autoCapitalize="characters"

            />
             <TouchableOpacity onPress={AddSymbol}>
                <IconButton icon="plus-circle" color={Colors.red500}  size={40} />
            </TouchableOpacity>
        </View>
    )
}
const styles = StyleSheet.create({
    search : {
        height: 60,
        paddingTop: 10,
        marginHorizontal: 10,
        alignItems:'center',
        justifyContent:'flex-start',
        width:'100%',
        flexDirection:'row'
    },
    input: {
        height: '90%',
        borderWidth: 1,
        paddingHorizontal:10,
        fontSize:20,
        width:'80%',
        borderRadius:10,
      },
})
