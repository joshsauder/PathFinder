import React from 'react'
import {TouchableOpacity, Dimensions, View} from 'react-native'
import Style from '../../styles/Grid'

interface props {
    id: string
    onSelect: (id: string) => void
    selected: boolean
    path: boolean
}

export default function Item(props: props){

    let background = '#6495ED'
    if(props.selected){background = 'black'}
    else if(props.path){background='yellow'}
    console.log(props.path)

    return (
        <TouchableOpacity 
        onPress={() => props.onSelect(props.id)}
        style={[Style.Item, 
            {height: Dimensions.get('window').width / 10,
            backgroundColor: background},

        ]} 
        />
    )
}
