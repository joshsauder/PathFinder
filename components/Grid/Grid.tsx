import React, {Component} from 'react'
import { View, FlatList, Text} from 'react-native';
import Item from "./Item"

import { Style } from '../../styles/Grid'

export interface State {
    numCols: number
 }

export class Grid extends Component<{}, State> {

    componentWillMount(){
        this.setState({numCols: 5})
    }

    renderList: number[] = Array.from(Array(30).keys())

    formatData = (data, numColumns) => {

        return data.map((item, index) => {
            return {key: `blank-${index}`, empty: true}
        })

    }

    render(){
        return (
            <FlatList 
            data= {this.formatData(this.renderList, this.state.numCols)}
            renderItem={() => <Item />}
            numColumns={this.state.numCols}
            style={Style.MainContainer}
            />
        )
    }
}