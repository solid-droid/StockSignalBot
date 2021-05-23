import React, {useState} from 'react'
import { View, StyleSheet, TouchableOpacity, Text, StatusBar } from 'react-native'
import {Snackbar } from 'react-native-paper'
import { SwipeListView } from 'react-native-swipe-list-view';
import Icon from "react-native-vector-icons/FontAwesome";
import SignalChart from './SignalChart';

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
                style={styles.deleteBtn}
                onPress={() => deleteRow(rowMap, data.item.key)}
            >
                <Icon name="trash" style={styles.iconStyle} size={60} color="#900" />
            </TouchableOpacity>
            <View style={styles.ChartContainer}>
            {/* <Card background={'NONE'}> */}
                <View style={styles.ChartCard}>
                <SignalChart symbol={data.item.name}></SignalChart>
                </View>
            {/* </Card> */}
            </View>
        </View>
    );

    const renderItem = data => (
        <Card background={data.item.Signal.type}>
            <SignalCard symbol={data.item} updateSymbol={setSymbolList}/>
        </Card>
    );
    return (
        <View style={styles.container}>
            <StatusBar backgroundColor='#fff' barStyle='dark-content' />
            <View style={styles.header}>
            <Text style={styles.headerTextLeft}> SIGNAL BOT</Text>
            <Text style={styles.headerTextRight}>@SolidDroid</Text>
            </View>
            
           <Search success={successNotif}></Search>
           <SwipeListView
            data={symbolList}
            renderItem={renderItem}
            renderHiddenItem={renderHiddenItem}
            leftOpenValue={100}
            rightOpenValue={-280}
            stopLeftSwipe={100}
            swipeToOpenPercent={30}
            stopRightSwipe={-280}
            onRowDidOpen={onRowDidOpen}
            closeOnRowOpen={false}
            />
            <Snackbar visible={visible}  duration={1500}  onDismiss={onDismissSnackBar}>
               {symbol} added.
            </Snackbar>
        </View>
    )

}

const styles = StyleSheet.create({
    container: {
        height:'100%', 
        backgroundColor:"#fff"
    },
    header:{
        paddingHorizontal:10,
        paddingTop:5,
        flexDirection:'row',
        justifyContent:'space-between'
    },
    headerTextLeft:{
        textAlignVertical:'bottom',
        fontSize:20,
        fontWeight:'bold'
    },
    headerTextRight:{
        textAlignVertical:'bottom',
        height:'100%',
        color:'grey',
    },
    iconStyle: {
        paddingLeft:25
    },
    rowBack: {
        justifyContent: 'center',
        alignItems:'center',
        flex:1,
        flexDirection:'row',
        marginVertical:5,
        marginHorizontal:15,
        marginLeft:20,
        justifyContent:'flex-start'

    },
    deleteBtn: {
        height:'90%',
        width:97,
        justifyContent:'center',
        borderRadius:10,
       },
    ChartContainer:{
        marginLeft:0,
    },
    ChartCard:{
        width:240,
        height:'100%',
    }
});