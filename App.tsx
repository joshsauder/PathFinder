import React, { useState } from 'react';
import { View, Dimensions } from 'react-native';
import {AppLoading} from 'expo'
import Grid from './components/Grid/Grid'
import Nav from './components/TopNav/Nav';
import ButtonView from './components/BottomNav/ButtonView'

import Style from './styles/App'

import * as Font from 'expo-font';
import { Ionicons } from '@expo/vector-icons';

const fetchFonts = () => {
  return Font.loadAsync({
      Roboto: require('native-base/Fonts/Roboto.ttf'),
      Roboto_medium: require('native-base/Fonts/Roboto_medium.ttf'),
      ...Ionicons.font,
  })
}

export default function App() {

  const [algorithm, setAlgorithm] = useState('Dijkstra')
  const [fontsLoaded, setFontsLoaded] = useState(false)
  const [step, setStep] = useState(1)

  if(!fontsLoaded){
    return (
      <AppLoading 
      startAsync={fetchFonts}
      onFinish={() => setFontsLoaded(true)}
      />
    )
  }

  return (
    <View style={Style.background}>
      <View style={[Style.header, {width: Dimensions.get('window').width - 10 }]}>
        <Nav algorithm={algorithm} setAlgorithm={(value: string) => setAlgorithm(value)} step={step} />
        <Grid algorithm={algorithm} setStep={(step: number) => setStep(step)} step={step} />
        <ButtonView onSubmit={() => setStep(4)} onReset={() => setStep(1)} step={step}/>
      </View>
    </View>
  );
}
