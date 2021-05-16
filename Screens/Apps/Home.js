import React, {useState} from 'react'
import { View, Text, FlatList, TouchableOpacity } from 'react-native'
import Card from '../Shared/Card'

export default function Home({navigation}) {

    const [review, setReview] = useState([
        {title : 'hello1', key:'1'},
        {title : 'world' , key:'2'},
        {title : 'test' , key:'3'},
    ]);
    function openAbout(){
        navigation.navigate('AboutScreen');
    }

    return (
        <View>
            <FlatList
            data={review}
            renderItem={({item})=>(
                <TouchableOpacity onPress={()=>navigation.navigate('AboutScreen', item )}>
                  <Card>
                    <Text>{item.title}</Text>
                  </Card>
                </TouchableOpacity>
            )}
            />
        </View>
    )
}
