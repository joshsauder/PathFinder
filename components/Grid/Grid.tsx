import React, {Component} from 'react'
import {FlatList} from 'react-native';
import Item from "./Item"
import {node} from '../../models/Graph';

interface State {
    numCols: number,
    selected: Map<string, boolean>
    graph: node[][]
}

interface Props {}

export class Grid extends Component<Props, State> {

    constructor(props){
        super(props)
        this.state = { 
            numCols: 10, 
            selected: new Map(),
            graph: []
        }
    }

    componentDidMount(){
        this.setupGrid()
    }

    setupGrid = () => {
        this.setState(state => {
            for(let r = 0; r < 20; r++){
                let row: node[] = []
                for(let c = 0; c < this.state.numCols; c++){
                    row.push({key: `${r},${c}`,x: r, y: c, weight: Infinity, closed: false})
                }
                state.graph.push(row)
            }

            return state
        })
    }

    itemSelected = (id: string) => {
        this.setState(state => {
            state.selected.set(id, !state.selected.get(id))
            return state
        })

        if(this.state.selected.size == 2){}
    }

    renderData = (): node[] => {
        let nodes: node[] = []
        this.state.graph.forEach(row => {
            nodes = nodes.concat(row)
        })
        
        return nodes
    }
 
    render(){
        return (
            <FlatList 
            data= {this.renderData()}
            renderItem={({item}) => <Item id={item.key} onSelect={this.itemSelected} selected={!!this.state.selected.get(item.key)}/>}
            numColumns={this.state.numCols}
            extraData={this.state}
            keyExtractor={(item) => item.key}
            />
        )
    }
}