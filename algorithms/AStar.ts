import { node } from '../models/Graph'
import {findNeighborNodes} from './Utils'
import Heap from 'heap'

export function AStar(start: node, end: node, grid: node[][]): node[]{
    //sort based on f value
    let queuedNodes = new Heap<node>(function(a, b){
        return a.f() - b.f()
    })

    let visitedNodes: node[] = []

    let sNode = grid[start.y][start.x]
    //set start node f to 0
    sNode.g = 0
    sNode.heuristic = 0
    sNode.closed = true
    
    queuedNodes.push(sNode)

    while(queuedNodes.size() > 0){

        let current = queuedNodes.pop()
        current.closed = true
        visitedNodes.push(current)

        if(current.key === end.key){
            return visitedNodes
        }

        var neighborNodes: node[] = findNeighborNodes(current, grid[0].length, grid.length, grid)
        processNeighborNodes(neighborNodes, queuedNodes, current, start, end)
    }
    
}

function processNeighborNodes(neighborNodes: node[], queuedNodes: Heap<node>, currentNode: node, start: node, end: node){
    neighborNodes.forEach(node => {
        let nodeG = currentNode.g + 1
        
        if(!node.open || node.g > nodeG){
            node.previous = currentNode
            node.g = nodeG
            node.heuristic = getHueristic(node, start, end)

            if(!node.open){
                node.open = true
                queuedNodes.push(node)
            }else {
                queuedNodes.updateItem(node)
            }
            
        }
    })
}


function getHueristic(currentNode: node, start: node, end: node){
    //get the Manhattan distance
    let dx = Math.abs(currentNode.x - end.x) 
    let dy = Math.abs(currentNode.y - end.y)

    //tie bracker that prefers straight lines
    //http://theory.stanford.edu/~amitp/GameProgramming/Heuristics.html#S7
    let dx2 = Math.abs(currentNode.x- start.x)
    let dy2 = Math.abs(currentNode.y- start.y)
    let cross = Math.abs(dx*dy2 - dx2*dy)

    return dx + dy + cross*0.001
}
