import React from "react";
import { Dimensions } from "react-native";
import { Picker, Icon} from 'native-base'

interface props {
    algorithm: string
    setAlgorithm: (value: string) => void
}

export default function AlgorithmPicker(props: props){

    return (
        <Picker
            selectedValue={props.algorithm}
            iosIcon={<Icon name="arrow-down" style={{color: 'white', marginLeft: 5}}/>}
            onValueChange={(value: string) => props.setAlgorithm(value)}
            style={{width: Dimensions.get("window").width/3 - 5}}
            textStyle={{ color: "white" }}
            >
                <Picker.Item label="Dijkstra" value="Dijkstra"/>
                <Picker.Item label="Bidirectional Dijkstra" value="BiD" />
                <Picker.Item label="Breadth First Search" value="BFS"/>
                <Picker.Item label="A Star (A*)" value="A*" />
        </Picker>
    )
}