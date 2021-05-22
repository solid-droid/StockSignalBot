import React from 'react'
import { StyleSheet, View, Text } from 'react-native'
import {MaterialIcons} from '@expo/vector-icons'
export default function Header({navigation}) {

    const openMenu = () => {
        navigation.openDrawer();
    }

    return (
        <View style={styles.header}>
            <MaterialIcons style={styles.icon} name='menu' onPress={openMenu} />
            <Text style={styles.text}>SIGNAL BOT</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    header:{
        flexDirection:'row',
        height:'100%',
        width:'100%',
        alignItems:'center',
        justifyContent:'center',
    },
    icon:{
        fontSize:35,
        position:'absolute',
        left:5
    },
    text:{
        fontWeight:'bold',
        fontSize:27
    }
})