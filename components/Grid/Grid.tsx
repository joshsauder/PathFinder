import React, {Component} from 'react'
import {FlatList} from 'react-native';
import Item from "./Item"

interface State {
    numCols: number,
    selected: Map<string, boolean>
}

interface Props {}

export class Grid extends Component<Props, State> {

    constructor(props){
        super(props)
        this.state = { numCols: 10, selected: new Map()}
    }


    formatData = () => {

        return Array.from(Array(160).keys()).map((item, index) => {
            return {key: `${Math.floor(index/10)}, ${index%10}`}
        })
    }

    itemSelected = (id: string) => {
        this.setState(state => {
            state.selected.set(id, !state.selected.get(id))
            return state
        })

        if(this.state.selected.size == 2){}
    }
 
    render(){
        return (
            <FlatList 
            data= {this.formatData()}
            renderItem={({item}) => (<Item id={item.key} onSelect={this.itemSelected} selected={!!this.state.selected.get(item.key)}/>)}
            numColumns={this.state.numCols}
            keyExtractor={item => item.key}
            extraData={this.state}
            />
        )
    }
}