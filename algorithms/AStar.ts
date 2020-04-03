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
        processNeighborNodes(neighborNodes, queuedNodes, current, end)
    }
    
}

function processNeighborNodes(neighborNodes: node[], queuedNodes: Heap<node>, currentNode: node, end: node){
    neighborNodes.forEach(node => {
        let nodeG = currentNode.g + 1
        
        if(!node.open || node.g > nodeG){
            node.previous = currentNode
            node.g = nodeG
            node.heuristic = getHueristic(node, end)

            if(!node.open){
                node.open = true
                queuedNodes.push(node)
            }else {
                queuedNodes.updateItem(node)
            }
            
        }
    })
}


function getHueristic(currentNode: node, end: node){
    return Math.abs(currentNode.x - end.x) + Math.abs(currentNode.y - end.y)
}
