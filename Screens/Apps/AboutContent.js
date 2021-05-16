import React from 'react'
import Card from '../Shared/Card'
import { Text} from "react-native";

export default function AboutContent({todos}) {
    return (
        todos.map(k=>{
            return (<Card key={k.key}><Text>{k.value}</Text></Card>);
        }
    ))
}
