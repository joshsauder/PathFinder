import React, { useState } from 'react';
import { View, Dimensions } from 'react-native';
import AlgorithmPicker from './components/AlgorithmPicker'
import { Grid } from './components/Grid/Grid'
import Style from './styles/App'

export default function App() {

  const [algorithm, setAlgorithm] = useState('Dijkstra')
  
  return (
      <View style={[Style.header, {width: Dimensions.get('window').width - 10 }]}>
        <AlgorithmPicker algorithm={algorithm} setAlgorithm={(value: string) => setAlgorithm(value)} />
        <Grid algorithm={algorithm} />
      </View>
  );
}
