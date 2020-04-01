import React from "react";
import { View, Text, Dimensions } from 'react-native';
import {Button} from 'native-base'
import Styles from '../../styles/TopNav'

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
        <View style={{flexDirection: "row"}}>
            <Text style={[Styles.itemMargin, {width: Dimensions.get("window").width/3, alignItems: "center"}]}>{text}</Text>
            <View style={[Styles.itemMargin, {width: Dimensions.get("window").width/3, alignItems: "center", flexDirection: "row"}]}>
                <View style={Styles.buttonMargin}>
                    <Button onPress={onSubmit} disabled={step < 3}><Text>Find Path</Text></Button>
                </View>
                <View style={Styles.buttonMargin}>
                    <Button onPress={() => alert("button clicked")}><Text>Reset</Text></Button>
                </View>
            </View>
        </View>

    )

}