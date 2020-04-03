import { node } from '../models/Graph'
import {findNeighborNodes} from './Utils'

export function BreadthFirstSearch(start: node, end: node, grid: node[][]): node[]{
    //set up a queue
    //push to enqueue, and shift to dequeue
    let queuedNodes: node[] = []
    let visitedNodes: node[] = []

    //set start and end weights to 0
    let sNode = grid[start.y][start.x]
    sNode.weight = 0
    sNode.closed = true
    
    queuedNodes.push(sNode)

    while(queuedNodes.length > 0){
        let currentNode = queuedNodes.shift()
        visitedNodes.push(currentNode)

        if(currentNode.key === end.key){
            return visitedNodes
        }

        const neighborNodes = findNeighborNodes(currentNode, grid[0].length, grid.length, grid)
        processNeighborNodes(neighborNodes, currentNode)
        queuedNodes.push(...neighborNodes)

    }

    return visitedNodes
}

function processNeighborNodes(neighborNodes: node[], currentNode: node){
    neighborNodes.forEach(node => {
        node.closed = true
        node.previous = currentNode
    })
}