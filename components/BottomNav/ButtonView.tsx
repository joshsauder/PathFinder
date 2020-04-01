import React from "react";
import {View} from 'react-native'
import {Button, Text} from 'native-base';
import Styles from '../../styles/TopNav'

interface props {
    onSubmit: () => void
    step: string
}

export default function BottomNav({onSubmit, step}){

    return (
        <View style={Styles.buttonMargin}>
            <View style={Styles.buttonMargin}>
                <Button full onPress={onSubmit} disabled={step < 3}><Text>Find Path</Text></Button>
            </View>
            <View>
                <Button full onPress={() => alert("button clicked")}><Text>Reset</Text></Button>
            </View>
        </View>
    )
}