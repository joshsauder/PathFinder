import React, {Component} from 'react'
import {FlatList} from 'react-native';
import Item from "./Item"
import {node} from '../../models/Graph';
import {findShortestPath} from '../../algorithms/Dijkstra'

interface State {
    numCols: number,
    selected: Map<string, boolean>
    start: node,
    end: node,
    graph: node[][]
}

interface Props {}

export class Grid extends Component<Props, State> {

    constructor(props){
        super(props)
        this.state = { 
            numCols: 10, 
            start: undefined,
            end: undefined,
            selected: new Map(),
            graph: []
        }
    }

    componentDidMount(){
        this.setupGrid()
    }

    componentDidUpdate(){
        if(this.state.start && this.state.end){
            console.log(findShortestPath(this.state.start, this.state.end, this.state.graph))
        }
    }

    setupGrid = () => {
        this.setState(state => {
            for(let r = 0; r < 20; r++){
                let row: node[] = []
                for(let c = 0; c < this.state.numCols; c++){
                    row.push({key: `${c},${r}`,x: c, y: r, weight: Infinity, closed: false})
                }
                state.graph.push(row)
            }

            return state
        })
    }

    itemSelected = (id: string) => {
        let coordinates = id.split(',')
        let selectedNode = {x: parseInt(coordinates[1]), y: parseInt(coordinates[0]), key: id, weight: Infinity, closed: false}
        if(this.state.start === undefined){this.setState({start: {...selectedNode}})} 
        else if(this.state.start.key === id){this.setState({start: undefined})} 
        else {this.setState({end: {...selectedNode}})}

        this.setState(state =>{
            state.selected.set(id, !state.selected.get(id))
        })
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
            renderItem={({item}) => 
            <Item id={item.key} onSelect={this.itemSelected} selected={!!this.state.selected.get(item.key)}/>}
            numColumns={this.state.numCols}
            extraData={this.state}
            keyExtractor={(item) => item.key}
            />
        )
    }
}