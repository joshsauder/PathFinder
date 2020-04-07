import React from "react";
import { Dimensions } from "react-native";
import { Picker, Icon} from 'native-base'
import Styles from '../../styles/TopNav'

interface props {
    algorithm: string
    setAlgorithm: (value: string) => void
}

export default function AlgorithmPicker(props: props){

    return (
        <Picker
            selectedValue={props.algorithm}
            iosIcon={<Icon name="arrow-down" style={{...Styles.textWhite, marginLeft: 5}}/>}
            onValueChange={(value: string) => props.setAlgorithm(value)}
            style={{width: Dimensions.get("window").width/3 - 5}}
            textStyle={Styles.textWhite}
            >
                <Picker.Item label="Dijkstra" value="Dijkstra"/>
                <Picker.Item label="Bidirectional Dijkstra" value="BiD" />
                <Picker.Item label="A* (A Star)" value="A*" />
                <Picker.Item label="Bidirectional A* (A Star)" value="BA*" />
                <Picker.Item label="Breadth-First Search" value="BFS"/>
                <Picker.Item label="Depth-First Search" value="DFS" />
        </Picker>
    )
}