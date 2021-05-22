import React, {useState} from 'react'
import { View, Text, TouchableOpacity, FlatList } from 'react-native'
import {Snackbar } from 'react-native-paper'

import Card from '../shared/Card'
import Search from '../shared/Search'
import SignalCard from './SignalCard'

export default function Dashboard({navigation}) {

    const [visible, setVisible] = React.useState(false);
    const [symbol, setSymbol] = React.useState('');

    const successNotif = (symbol) => {
        setSymbol(symbol);
        createEntry(symbol);
        setVisible(true);
    };

    const createEntry = (symbol) => {
        setSymbolList(previousList => {
            return [...previousList,{
                name:symbol, 
                key:String(previousList.length), 
                value:135,
                RSI:{
                    M:{value:22,color:'#fff'},
                    H:{value:27,color:'#fff'},
                    D:{value:55,color:'#fff'},
                    W:{value:47,color:'#fff'},
                    },
                MA: 131.75,
                Rating: {type:'BUY', rating:'80%'},
                Support:{a:125.5, b: 150.7},
                Resistance:{a:125.5, b: 150.7},
                Score: '85%',
                Signal: {type:'BUY', color:'#fff'}
                }]
        })
    }

    const onDismissSnackBar = () => setVisible(false);

    const [symbolList, setSymbolList] = useState([]);

    return (
        <View style={{height:'100%'}}>
           <Search success={successNotif}></Search>
           <FlatList
            data={symbolList}
            renderItem={({item})=>(
                <TouchableOpacity>
                  <Card>
                    <SignalCard symbol={item} updateSymbol={setSymbolList}/>
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
