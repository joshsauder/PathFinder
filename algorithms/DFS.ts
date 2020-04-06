import { node } from '../models/Graph'
import {findNeighborNodes} from './Utils'

export function DepthFirstSearch(start: node, end: node, grid: node[][]): node[]{
    //set start and end weights to 0
    let sNode = grid[start.y][start.x]
    sNode.closed = true

    let visitedNodes: node[] = []
    let queuedNodes: node[] = []
    queuedNodes.push(sNode)

    while(queuedNodes.length > 0){
        for(let i = 0; i < queuedNodes.length; i++){
            let currentNode = queuedNodes.shift()
            visitedNodes.push(currentNode)

            if(currentNode.key === end.key){
                return visitedNodes
            }

            let neighborNodes = findNeighborNodes(currentNode, grid[0].length, grid.length, grid)
            processNeighborNodes(neighborNodes, currentNode)

            queuedNodes.push(...neighborNodes)
        }
    }

    return visitedNodes
}

/**
 * Prevents each neighbor node from being processed again 
 * Sets the previous node to the current node
 * 
 * @param neighborNodes - Array of neighbor nodes to the current node
 * @param currentNode - the current node that is opened
 */
function processNeighborNodes(neighborNodes: node[], currentNode: node){
    neighborNodes.forEach(node => {
        node.closed = true
        node.previous = currentNode
    })
}