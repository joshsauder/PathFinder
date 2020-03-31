import React from "react";
import { View, Picker } from "react-native";
import Styles from '../../styles/Picker'

interface props {
    algorithm: string
    setAlgorithm: (value: string) => void
}

export default function AlgorithmPicker(props){

    return (
        <View style={Styles.container}>
            <Picker
            selectedValue={props.algorithm}
            onValueChange={(value: string) => props.setAlgorithm(value)}
            >
                <Picker.Item label="Dijkstra" value="Dijkstra"/>
                <Picker.Item label="Bidirectional Dijkstra" value="BiD" />
                <Picker.Item label="Breadth First Search" value="BFS"/>
            </Picker>
        </View>
    )
}