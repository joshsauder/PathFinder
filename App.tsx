import React from 'react';
import { View, Dimensions } from 'react-native';
import { Grid } from './components/Grid/Grid'
import Style from './styles/App'

export default function App() {
  return (
      <View style={[Style.header, {width: Dimensions.get('window').width - 10 }]}>
        <Grid />
      </View>
  );
}
