import React, { useState } from 'react';
import { View, Dimensions } from 'react-native';
import { Grid } from './components/Grid/Grid'
import Style from './styles/App'
import Nav from './components/TopNav/Nav';

export default function App() {

  const [algorithm, setAlgorithm] = useState('Dijkstra')
  
  return (
      <View style={[Style.header, {width: Dimensions.get('window').width - 10 }]}>
        <Nav algorithm={algorithm} setAlgorithm={(value: string) => setAlgorithm(value)} step={1} onSubmit={() => alert('test')} />
        <Grid algorithm={algorithm} />
      </View>
  );
}
