import React, {Component} from 'react'
import {FlatList} from 'react-native';
import Style from '../../styles/Grid'
import Item from "./Item"
import {node} from '../../models/Graph';
import {findShortestPath, getPathInOrder, twoWayDijkstra} from '../../algorithms/Dijkstra'
import {BreadthFirstSearch} from '../../algorithms/BFS'

interface State {
    numCols: number,
    start: node,
    end: node,
    graph: node[][],
}

interface Props {
    algorithm: string
    setStep: (step: number) => void
    step: number
}

export class Grid extends Component<Props, State> {
    itemRefs: any;
    wallRefs: any;

    constructor(props){
        super(props)
        this.state = { 
            numCols: 20, 
            start: undefined,
            end: undefined,
            graph: []
        }

        this.itemRefs = {}
        this.wallRefs = {}
    }

    componentDidMount(){
        this.setupGrid()
    }

    componentDidUpdate(prevProps: Props, prevState: State){
        if(this.props.step === 4 && prevProps.step !== this.props.step){
            this.determinePath()
        }
        else if(this.props.step === 1 && prevProps.step !== this.props.step){
            this.resetToInit()
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
            }, 80*index)
        })
        path.forEach((node, index) => {
            setTimeout(() => {
                this.itemRefs[node.key](1)
            }, 80*(index + visitiedNodes.length))
        })
    }

    setupGrid = () => {
        this.setState(state => {
            for(let r = 0; r < 25; r++){
                let row: node[] = []
                for(let c = 0; c < this.state.numCols; c++){
                    row.push({key: `${c},${r}`,x: c, y: r, previous:null, weight: Infinity, closed: false, wall: false, heuristic: Infinity})
                }
                state.graph.push(row)
            }

            return state
        })
    }

    resetToInit = () => {
        //callback needed to reset grid
        this.setState({start: undefined, end: undefined, graph: []}, () => {
            this.setupGrid()
        })
    }

    itemSelected = (id: string) => {
        if(this.props.step === 4) return;

        let {start, end, graph } = this.state
        let coordinates = id.split(',')
        let selectedNode = {x: parseInt(coordinates[0]), y: parseInt(coordinates[1]), key: id, previous:null, weight: Infinity, closed: false, wall: false, heuristic: Infinity}

        if(start && end){
            this.itemRefs[id](-2)
            selectedNode.wall = true

            graph[selectedNode.y][selectedNode.x] = selectedNode
        }else {
            if(start === undefined){
                this.setState({start: {...selectedNode}})
                this.props.setStep(2)
            }else if(start.key === id){
                this.setState({start: undefined})
                this.props.setStep(1)
            }else {
                this.setState({end: {...selectedNode}})
                this.props.setStep(3)
            }
        }
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
        let {start, end} = this.state
        return (
                <FlatList
                style={Style.MainContainer} 
                data= {this.renderData()}
                scrollEnabled = {false}
                renderItem={({item}) => 
                    <Item id={item.key} 
                        onSelect={this.itemSelected} 
                        selected={(start && start.key === item.key) || (end && end.key === item.key)} 
                        forwardRef={(c: (value: number) => void) => {this.setReference(c, item.key)}}
                        />}
                numColumns={this.state.numCols}
                extraData={this.state}
                keyExtractor={(item) => item.key}
                />
        )
    }
}