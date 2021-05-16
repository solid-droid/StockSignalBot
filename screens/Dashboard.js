import React, {useState} from 'react'
import { View, Text, TouchableOpacity, FlatList } from 'react-native'
import {Snackbar } from 'react-native-paper'

import Card from '../shared/Card'
import Search from '../shared/Search'

export default function Dashboard({navigation}) {

    const [visible, setVisible] = React.useState(false);
    const [symbol, setSymbol] = React.useState('');

    const successNotif = (symbol) => {
        setSymbol(symbol);
        setVisible(true);
    };

    const onDismissSnackBar = () => setVisible(false);

    const [symbolList, setSymbolList] = useState([
        {title : 'hello1', key:'1'},
        {title : 'world' , key:'2'},
        {title : 'test' , key:'3'},

    ]);

    return (
        <View style={{height:'100%'}}>
           <Search success={successNotif}></Search>
           <FlatList
            data={symbolList}
            renderItem={({item})=>(
                <TouchableOpacity>
                  <Card>
                    <Text>{item.title}</Text>
                  </Card>
                </TouchableOpacity>
            )}
            />
            <Snackbar visible={visible}  duration={1500}  onDismiss={onDismissSnackBar}>
               {symbol} added.
            </Snackbar>
        </View>
    )
}
