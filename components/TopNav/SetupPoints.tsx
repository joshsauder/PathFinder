import React from "react";
import { View, Button, Text } from 'react-native';

interface props {
    step: number,
    onSubmit: () => void
}

export default function SetupPoints({step, onSubmit}){

    let text: string

    switch(step){
        case 1:
            text = "Select a Starting Point"
        case 2:
            text = "Select a Ending Point"
        case 3:
            text = "Select any walls and click \"Find Wall\" "
    }

    return (
        <View>
            <Text>{text}</Text>
            <Button title="Find Path" onPress={onSubmit} disabled={step < 3}/>
        </View>

    )

}