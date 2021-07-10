import React from 'react'
import { View,TextInput, StyleSheet} from 'react-native'
var stockServer = require("yahoo-financial-data")

export default function Search({success, symbolList, fail}) {

    let textInput;
    
    const [symbol, onChangeSymbol ] = React.useState("");

    const AddSymbol = () => {
        let value = symbol;
        let allow = true;
        let msg = 'Not Found';
        value = value.toUpperCase();
        if(value.split('.')[1]!=='NS')
        {
            value =value.split('.')[0]+'.NS'
        }
        symbolList.forEach(x => {
            if(x.name === value)
            {
                allow = false; 
                msg = 'Already Exists'
            }
        });

        if(allow)
        {
            stockServer.price( value , (err, data) => {
                if(data===null)
                {
                    allow = false; 
                    msg = value + ' is not a valid symbol'
                    fail(msg);
                }else{
                    success(value);
                }
            });
        } else
        {
            fail(msg);
        }
        
       textInput.clear();
    }

    return (
        <View style={styles.search}>
            <TextInput
                ref={input => { textInput = input }}
                mode='outlined'
                style={styles.input}
                onChangeText={onChangeSymbol}
                onSubmitEditing={AddSymbol}
                value={symbol}
                placeholder="Enter Stock Symbol"
                autoCapitalize="characters"

            />
        </View>
    )
}
const styles = StyleSheet.create({
    search : {
        height: 60,
        paddingTop: 0,
        marginHorizontal: 10,
        alignItems:'center',
        justifyContent:'flex-start',
        width:'100%',
        flexDirection:'row',
        marginBottom:10,
    },
    input: {
        height: '80%',
        borderWidth: 1,
        paddingHorizontal:10,
        fontSize:20,
        width:'95%',
        borderRadius:10,
      },
})
