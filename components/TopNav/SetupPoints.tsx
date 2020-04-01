import React from "react";
import { Text } from 'react-native';
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
            break;
        case 2:
            text = "Select a Ending Point"
            break;
        case 3:
            text = "Select any walls and click \"Find Wall\" "
            break;
    }

    return (
        <Text style={Styles.textStyle}>
            {"Next Step: \n" + text}
        </Text>

    )

}