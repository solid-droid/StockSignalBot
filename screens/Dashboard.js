import React, {useState} from 'react'
import { View, StyleSheet, TouchableOpacity } from 'react-native'
import {Snackbar } from 'react-native-paper'
import { SwipeListView } from 'react-native-swipe-list-view';
import {LinearGradient} from 'expo-linear-gradient';
import Icon from "react-native-vector-icons/FontAwesome";

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
            return [{
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
                },...previousList]
        })
    }

    const onDismissSnackBar = () => setVisible(false);

    const [symbolList, setSymbolList] = useState([]);

    const onRowDidOpen = rowKey => {

    };
    const closeRow = (rowMap, rowKey) => {
        if (rowMap[rowKey]) {
            rowMap[rowKey].closeRow();
        }
    };

    const deleteRow = (rowMap, rowKey) => {
        closeRow(rowMap, rowKey);
        const newData = [...symbolList];
        const prevIndex = symbolList.findIndex(item => item.key === rowKey);
        newData.splice(prevIndex, 1);
        setSymbolList(newData);
    };

    const renderHiddenItem = (data, rowMap) => (
        <View style={styles.rowBack}>
            <TouchableOpacity
                style={styles.backRightBtn}
                onPress={() => deleteRow(rowMap, data.item.key)}
            >
                <Icon name="trash" style={styles.iconStyle} size={60} color="#900" />
            </TouchableOpacity>
        </View>
    );

    const renderItem = data => (
        <Card>
            <SignalCard symbol={data.item} updateSymbol={setSymbolList}/>
        </Card>
    );
    return (
        <View style={{height:'100%', backgroundColor:"#fff"}}>
           <Search success={successNotif}></Search>
           <SwipeListView
           disableRightSwipe
            data={symbolList}
            renderItem={renderItem}
            renderHiddenItem={renderHiddenItem}
            leftOpenValue={75}
            rightOpenValue={-100}
            previewRowKey={'0'}
            previewOpenValue={-40}
            previewOpenDelay={3000}
            onRowDidOpen={onRowDidOpen}
            />
            <Snackbar visible={visible}  duration={1500}  onDismiss={onDismissSnackBar}>
               {symbol} added.
            </Snackbar>
        </View>
    )

}

const styles = StyleSheet.create({
    iconStyle: {
        paddingRight:25
    },
    rowBack: {
        justifyContent: 'center',
        backgroundColor: '#ffd2d2',
        alignItems:'flex-end',
        flex: 1,
        margin:10,
        marginHorizontal:15,
        marginLeft:20,
        borderRadius:10
    },
    backRightBtn: {

    },
});