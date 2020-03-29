import React, {Component} from 'react'
import {FlatList} from 'react-native';
import Item from "./Item"
import {node} from '../../models/Graph';
import {findShortestPath, getPathInOrder} from '../../algorithms/Dijkstra'

interface State {
    numCols: number,
    selected: Map<string, boolean>
    path: Map<string, boolean>
    visited: Map<string, boolean>
    start: node,
    end: node,
    graph: node[][]
}

interface Props {}

export class Grid extends Component<Props, State> {
    itemRefs: any[];

    constructor(props){
        super(props)
        this.state = { 
            numCols: 10, 
            start: undefined,
            end: undefined,
            selected: new Map(),
            path: new Map(),
            visited: new Map(),
            graph: []
        }
    }

    componentDidMount(){
        this.setupGrid()
    }

    componentDidUpdate(prevProps, prevState){
        if(this.state.start && this.state.end && (this.state.start !== prevState.start || this.state.end !== prevState.end)){
            let visitiedNodes: node[] = findShortestPath(this.state.start, this.state.end, this.state.graph)
            let path = getPathInOrder(visitiedNodes.pop())
            this.highLightGrid(path, visitiedNodes)
        }
    }

    highLightGrid = (path: node[], visitiedNodes: node[]) => {
        visitiedNodes.forEach(node => {
            setTimeout(() => {
                let visit = this.state.visited
                visit.set(node.key, true)
                this.setState({visited: visit})
            }, 2000)
        })
        path.forEach(node => {
            setTimeout(() => {
                let path = this.state.path
                path.set(node.key, true)
                this.setState({path: path})
            }, 2000)
        })
    }

    setupGrid = () => {
        this.setState(state => {
            for(let c = 0; c < this.state.numCols; c++){
                let row: node[] = []
                for(let r = 0; r < 10; r++){
                    row.push({key: `${r},${c}`,x: r, y: c, previous:null, weight: Infinity, closed: false})
                }
                state.graph.push(row)
            }

            return state
        })
    }

    itemSelected = (id: string) => {
        let coordinates = id.split(',')
        let selectedNode = {x: parseInt(coordinates[0]), y: parseInt(coordinates[1]), key: id, previous:null, weight: Infinity, closed: false}
        if(this.state.start === undefined){this.setState({start: {...selectedNode}})} 
        else if(this.state.start.key === id){this.setState({start: undefined})} 
        else {this.setState({end: {...selectedNode}})}

        this.setState(state =>{
            state.selected.set(id, !state.selected.get(id))
            return state
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
            <Item id={item.key} 
                onSelect={this.itemSelected} 
                selected={!!this.state.selected.get(item.key)} 
                visited={!!this.state.visited.get(item.key)}
                path = {!!this.state.path.get(item.key)} />}
            numColumns={this.state.numCols}
            extraData={this.state}
            keyExtractor={(item) => item.key}
            />
        )
    }
}