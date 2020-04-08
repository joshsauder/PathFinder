import React from "react";
import { Text, Dimensions } from 'react-native';
import Styles from '../../styles/TopNav'

interface props {
    step: number,
}

export default function SetupPoints({step}: props){

    let text: string

    switch(step){
        case 1:
            text = "Select a Starting Point"
            break;
        case 2:
            text = "Select a Ending Point"
            break;
        case 3:
            text = "Select any walls and click \"Find Path\" "
            break;
        case 4:
        case 5:
            text = "Let us generate a path from start to finish"
            break;
        case 6:
            text = "Press \"Reset\" to generate another path"
            break;
    }

    return (
        <Text style={[Styles.textStyle, {width: Dimensions.get('window').width/2}]}>
            {"Next Step: \n" + text}
        </Text>

    )

}