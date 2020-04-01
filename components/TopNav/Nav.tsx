import React from "react";
import { View } from 'react-native';

import Styles from '../../styles/TopNav'
import AlgorithmPicker from "./AlgorithmPicker";
import SetupPoints from "./SetupPoints";

interface props {
    algorithm: string
    setAlgorithm: (value: string) => void
    step: number,
}

export default function Nav({algorithm, setAlgorithm, step}){

    return (
        <View style={Styles.container}>
            <AlgorithmPicker algorithm={algorithm} setAlgorithm={setAlgorithm}/>
            <SetupPoints step={step} />
        </View>
    )
}