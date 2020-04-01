import React from "react";
import { Dimensions } from "react-native";
import { Picker, Icon} from 'native-base'
import Styles from '../../styles/TopNav'

interface props {
    algorithm: string
    setAlgorithm: (value: string) => void
}

export default function AlgorithmPicker(props){

    return (
        <Picker
            selectedValue={props.algorithm}
            iosIcon={<Icon name="arrow-down" style={{color: 'white'}}/>}
            onValueChange={(value: string) => props.setAlgorithm(value)}
            style={{width: Dimensions.get("window").width/3 - 10}}
            textStyle={{ color: "white" }}
            >
                <Picker.Item label="Dijkstra" value="Dijkstra"/>
                <Picker.Item label="Bidirectional Dijkstra" value="BiD" />
                <Picker.Item label="Breadth First Search" value="BFS"/>
        </Picker>
    )
}