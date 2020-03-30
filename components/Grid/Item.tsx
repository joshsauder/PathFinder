import React, { useState } from 'react'
import {TouchableOpacity, Dimensions, View, Animated} from 'react-native'
import Style from '../../styles/Grid'

interface props {
    id: string
    onSelect: (id: string) => void
    selected: boolean
    forwardRef: any 
}

export default function Item(props: props){

    const [color] = useState(new Animated.Value(0))

    props.forwardRef((value: number) => animateColor(value))
    
    var bgColor = color.interpolate({
        inputRange: [ -2,-1,0, 1],
        outputRange: ['black','grey' ,'#6495ED', 'yellow']
    })

    function animateColor(value: number){
        Animated.timing(
            color,
            { toValue: value, duration: 1000 }
        ).start()
    }

    if(props.selected){animateColor(-2)}

    return (
        <TouchableOpacity 
        onPress={() => props.onSelect(props.id)}
        style={[Style.Item,{height: Dimensions.get('window').width / 10}]}>
            <View  style={Style.View}>
                <Animated.View style={[Style.View, {backgroundColor: bgColor}]} />
            </View>
        </TouchableOpacity>
    )
}
