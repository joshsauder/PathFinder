import React, {Component} from 'react'
import {FlatList} from 'react-native';
import Style from '../../styles/Grid'
import Item from "./Item"
import {node} from '../../models/Graph';
import {findShortestPath, getPathInOrder, twoWayDijkstra} from '../../algorithms/Dijkstra'
import {BreadthFirstSearch} from '../../algorithms/BFS'

interface State {
    numCols: number,
    selected: Map<string, boolean>
    start: node,
    end: node,
    graph: node[][],
    dragging: boolean
}

interface Props {
    algorithm: string
}

export class Grid extends Component<Props, State> {
    itemRefs: any;

    constructor(props){
        super(props)
        this.state = { 
            numCols: 20, 
            start: undefined,
            end: undefined,
            selected: new Map(),
            graph: [],
            dragging: false
        }

        this.itemRefs = {}
    }

    componentDidMount(){
        this.setupGrid()
    }

    componentDidUpdate(prevProps, prevState){
        if(this.state.start && this.state.end && (this.state.start !== prevState.start || this.state.end !== prevState.end)){
            this.determinePath()
        }
    }

    determinePath = () => {
        let visitiedNodes: node[]
        switch(this.props.algorithm){
            case "Dijkstra":
                visitiedNodes = findShortestPath(this.state.start, this.state.end, this.state.graph)
                if(visitiedNodes.length > 0){
                    let path = getPathInOrder(visitiedNodes.pop())
                    this.highLightGrid(path, visitiedNodes)
                }

            case "BiD":
                visitiedNodes = twoWayDijkstra(this.state.start, this.state.end, this.state.graph)
                if(visitiedNodes.length > 0){
                    let endpath = getPathInOrder(visitiedNodes.pop())
                    let startpath = getPathInOrder(visitiedNodes.pop())
                    this.highLightGrid([...startpath, ...endpath], visitiedNodes)
                }
            
            case "BFS":
                visitiedNodes = BreadthFirstSearch(this.state.start, this.state.end, this.state.graph)
                if(visitiedNodes.length > 0){
                    let path = getPathInOrder(visitiedNodes.pop())
                    this.highLightGrid(path, visitiedNodes)
                }
        }
    }

    highLightGrid = (path: node[], visitiedNodes: node[]) => {
        visitiedNodes.forEach((node, index) => {
            setTimeout(() => {
                this.itemRefs[node.key](-1)
            }, 100*index)
        })
        path.forEach((node, index) => {
            setTimeout(() => {
                this.itemRefs[node.key](1)
            }, 100*(index + visitiedNodes.length))
        })
    }

    setupGrid = () => {
        this.setState(state => {
            for(let c = 0; c < this.state.numCols; c++){
                let row: node[] = []
                for(let r = 0; r < 20; r++){
                    row.push({key: `${r},${c}`,x: r, y: c, previous:null, weight: Infinity, closed: false, wall: false})
                }
                state.graph.push(row)
            }

            return state
        })
    }

    itemSelected = (id: string) => {
        let coordinates = id.split(',')
        let selectedNode = {x: parseInt(coordinates[0]), y: parseInt(coordinates[1]), key: id, previous:null, weight: Infinity, closed: false, wall: false}
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

    setReference = (item: (value: number) => void, id: string): void =>{
        this.itemRefs[id] = item
    }

    render(){
        return (
                <FlatList
                style={Style.MainContainer} 
                data= {this.renderData()}
                scrollEnabled = {false}
                renderItem={({item}) => 
                    <Item id={item.key} 
                        onSelect={this.itemSelected} 
                        selected={!!this.state.selected.get(item.key)} 
                        forwardRef={(c: (value: number) => void) => {this.setReference(c, item.key)}}
                        />}
                numColumns={this.state.numCols}
                extraData={this.state}
                keyExtractor={(item) => item.key}
                />
        )
    }
}