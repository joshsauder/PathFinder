import React from 'react'
import {TouchableOpacity, Dimensions, View} from 'react-native'
import Style from '../../styles/Grid'

interface props {
    id: string
    onSelect: (id: string) => void
    selected: boolean
    path: boolean
    visited: boolean
    setRef: (item: TouchableOpacity, id: string) => void
}

export default function Item(props: props){

    let background = '#6495ED'
    if(props.selected){background = 'black'}
    else if(props.path){background='yellow'}
    else if(props.visited){background="grey"}

    return (
        <TouchableOpacity
        ref={(item) => {props.setRef(item, props.id)}}
        onPress={() => props.onSelect(props.id)}
        style={[Style.Item, 
            {height: Dimensions.get('window').width / 10,
            backgroundColor: background},

        ]} 
        />
    )
}
