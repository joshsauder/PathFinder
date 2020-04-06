import React, { useState, useEffect } from 'react'
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
    const [rotate] = useState(new Animated.Value(0))

    useEffect(() => {
        //if selected switch, else if unselected need to switch back
        if(props.selected){
            Animated.timing(
                color,
                { toValue: -2, duration: 500 }
            ).start()
        }else if(!props.selected && color._value === -2){
            Animated.timing(
                color,
                { toValue: 0, duration: 500 }
            ).start()
        }
    }, [props.selected])

    //add reference to each node in graph
    props.forwardRef((value: number) => animateColor(value))
    
    //color changing animations
    var bgColor = color.interpolate({
        inputRange: [ -2,-1,0, 1, 2],
        outputRange: ['#FFCA28','#F06292' ,'#9575CD', 'white', '#210B2C']
    })

    //rotation animation
    var bgRotate = rotate.interpolate({
        inputRange: [0, 100],
        outputRange: ['0deg', '360deg']
    })

    function animateColor(value: number){
        if(!props.selected){
            Animated.parallel([
                Animated.timing(
                    color,
                    { toValue: value, duration: 500 }
                ),
                Animated.timing(
                    rotate,
                    {toValue: 100, duration: 500} 
                )
            ]).start()
        }
    }

    return (
        <TouchableOpacity 
        onPress={() => props.onSelect(props.id)}
        style={[Style.Item,{height: Dimensions.get('window').width / 20}]}>
            <View style={Style.View} >
                <Animated.View 
                    style={[Style.View, 
                        {backgroundColor: bgColor, 
                        transform: [{ rotate: bgRotate  }]}]} 
                    />
            </View>
        </TouchableOpacity>
    )
}
