import React from "react";
import { Picker, Dimensions } from "react-native";
import Styles from '../../styles/TopNav'

interface props {
    algorithm: string
    setAlgorithm: (value: string) => void
}

export default function AlgorithmPicker(props){

    return (
        <Picker
            selectedValue={props.algorithm}
            onValueChange={(value: string) => props.setAlgorithm(value)}
            style={[Styles.itemMargin, {width: Dimensions.get("window").width/3 - 10, alignItems: "center"}]}
            >
                <Picker.Item label="Dijkstra" value="Dijkstra"/>
                <Picker.Item label="Bidirectional Dijkstra" value="BiD" />
                <Picker.Item label="Breadth First Search" value="BFS"/>
        </Picker>
    )
}