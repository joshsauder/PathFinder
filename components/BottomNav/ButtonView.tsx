import React from "react";
import {View} from 'react-native'
import {Button, Text} from 'native-base';
import Styles from '../../styles/TopNav'

interface props {
    onSubmit: () => void
    onReset: () => void
    step: number
}

export default function BottomNav({onSubmit, onReset, step}: props){

    return (
        <View style={Styles.buttonMargin}>
            <View style={Styles.buttonMargin}>
                <Button full onPress={onSubmit} disabled={step < 3} style={{backgroundColor: 'white'}}><Text style={{color: "black"}}>Find Path</Text></Button>
            </View>
            <View>
                <Button full onPress={onReset} style={{backgroundColor: 'white'}}><Text style={{color: "black"}}>Reset</Text></Button>
            </View>
        </View>
    )
}