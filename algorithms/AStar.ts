import { node } from '../models/Graph'
import {findNeighborNodes} from './Dijkstra'
import Heap from 'heap'

export function AStar(start: node, end: node, grid: node[][]): node[]{
    //sort based on f value
    let queuedNodes = new Heap<node>(function(a, b){
        return a.f() - b.f()
    })

    let visitedNodes: node[] = []

    let sNode = grid[start.y][start.x]
    sNode.weight = 0
    sNode.heuristic = getHueristic(sNode, end)
    sNode.closed = true
    
    queuedNodes.push(sNode)

    while(queuedNodes.size() > 0){

        let current = queuedNodes.pop()
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
        node.previous = currentNode
        node.weight = currentNode.weight + 1
        node.heuristic = getHueristic(node, end)

        queuedNodes.push(node)
    })
}


function getHueristic(currentNode: node, end: node){
    return Math.abs(currentNode.x - end.x) + Math.abs(currentNode.y - end.y)
}