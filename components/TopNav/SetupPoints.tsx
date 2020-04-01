import React from "react";
import { Text } from 'react-native';
import Styles from '../../styles/TopNav'

interface props {
    step: number,
}

export default function SetupPoints({step}){

    let text: string

    switch(step){
        case 1:
            text = "Select a Starting Point"
            break;
        case 2:
            text = "Select a Ending Point"
            break;
        case 3:
            text = "Select any walls and click \"Find Wall\" "
            break;
        case 4:
            text = "Let us generate a path from start to finish"
            break;
    }

    return (
        <Text style={Styles.textStyle}>
            {"Next Step: \n" + text}
        </Text>

    )

}