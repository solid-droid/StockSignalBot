import React, {useState} from 'react'
import { View, Animated, TouchableOpacity, FlatList } from 'react-native'
import {Snackbar } from 'react-native-paper'

import Card from '../shared/Card'
import Search from '../shared/Search'
import SignalCard from './SignalCard'

const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);

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

    const y = new Animated.Value(0);
    const onScroll = Animated.event([{ nativeEvent: { contentOffset: { y } } }], {
      useNativeDriver: true,
    });

    return (
        <View style={{height:'100%'}}>
           <Search success={successNotif}></Search>
           <AnimatedFlatList
             scrollEventThrottle={16}
             bounces={false}
             data={symbolList}
             renderItem={({index,item})=>(
                <TouchableOpacity>
                  <Card {...{y, index}}>
                    <SignalCard symbol={item} updateSymbol={setSymbolList}/>
                  </Card>
                </TouchableOpacity>
            )}
            {...{ onScroll }}
            />
            <Snackbar visible={visible}  duration={1500}  onDismiss={onDismissSnackBar}>
               {symbol} added.
            </Snackbar>
        </View>
    )
}
