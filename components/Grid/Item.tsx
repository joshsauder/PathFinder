import React from 'react'
import {TouchableOpacity, Dimensions} from 'react-native'
import Style from '../../styles/Grid'

interface props {
    id: string
    onSelect: (id: string) => void
    selected: boolean
}

export default function Item(props: props){

    console.log(props.selected)
    return (
        <TouchableOpacity 
        onPress={() => props.onSelect(props.id)}
        style={[Style.Item, 
            {height: Dimensions.get('window').width / 10,
            backgroundColor: props.selected ? 'black' : '#6495ED'},
        ]} 
        />
    )
}
