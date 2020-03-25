import React from 'react'
import {View, Dimensions} from 'react-native'
import Style from '../../styles/Grid'


export default function Item(){

    return (
        <View style={[Style.Item, {height: Dimensions.get('window').width / 10}]} />
    )
}
