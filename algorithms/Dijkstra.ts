import Heap from 'heap';
import { node } from '../models/Graph';
import {findNeighborNodes} from './Utils';


/**
 * Dijkstra's Shortest Path Finder
 * 
 * @param start - the starting node
 * @param end - the ending node
 * @param grid - the grid of nodes 
 * @returns - a list of nodes that were visited
 */
export function Dijkstras(start: node, end: node, grid: node[][]): node[]{
    //sort by weight
    let queuedNodes = new Heap<node>(function (a, b) {
        return a.weight - b.weight;
    })

    let visitedNodes: node[] = []

    //set starting node weight to 0
    //set start and end weights to 0
    let sNode = grid[start.y][start.x]
    sNode.weight = 0
    sNode.closed = true
    queuedNodes.push(sNode)

    while (queuedNodes.size() > 0) {
        let openNode = queuedNodes.pop()

        if (openNode.key === end.key) {
             visitedNodes.push(openNode) 
             return visitedNodes
        }

        const neighborNodes = findNeighborNodes(openNode, grid[0].length, grid.length, grid);
        processNeighborNodes(openNode, queuedNodes, neighborNodes)

        visitedNodes.push(openNode)
    }

    return visitedNodes
}

/**
 * Bi-Directional Dijkstra's Shortest Path Finder
 * 
 * @param start - the starting node
 * @param end - the ending node
 * @param grid - the grid of nodes 
 * @returns - a list of nodes that were visited
 */
export function twoWayDijkstra(start: node, end: node, grid: node[][]): node[] {
    let queuedNodes = new Heap<node>(function (a, b) {
        return a.weight - b.weight;
    })

    let reverseQueuedNodes = new Heap<node>(function (a, b) {
        return a.weight - b.weight;
    })

    let reverseGrid = JSON.parse(JSON.stringify(grid))

    let visitedNodes: node[] = []

    //set start and end weights to 0
    let sNode = grid[start.y][start.x]
    sNode.weight = 0
    sNode.closed = true

    let eNode = grid[end.y][end.x]
    eNode.weight = 0
    eNode.closed = true

    //push start and end
    queuedNodes.push(sNode)
    reverseQueuedNodes.push(eNode)

    while (queuedNodes.size() > 0 && reverseQueuedNodes.size() > 0) {
        let startNode = queuedNodes.pop()
        let reverseNode = reverseQueuedNodes.pop()

        if(startNode.key === reverseNode.key || (startNode.previous && startNode.previous.key === reverseNode.key)){
            visitedNodes.push(startNode, reverseNode)
            return visitedNodes
        }

        const neighborNodes = findNeighborNodes(startNode, grid[0].length, grid.length, grid);
        processNeighborNodes(startNode, queuedNodes, neighborNodes)

        const reverseNeighborNodes = findNeighborNodes(reverseNode, reverseGrid[0].length, reverseGrid.length, reverseGrid);
        processNeighborNodes(reverseNode, reverseQueuedNodes, reverseNeighborNodes)

        visitedNodes.push(startNode, reverseNode)
    }

    return visitedNodes
}

/**
 *  Prevents each neighbor node from being processed again
 *  Sets the weight to the openNode's weight + 1
 *  Sets the previous node to the current node
 * 
 * @param openNode - the current open node
 * @param queuedNodes - Min-Heap containing the queued nodes
 * @param neighborNodes - Array of neighbor nodes to the openNode
 */
function processNeighborNodes(openNode: node, queuedNodes: Heap<node>, neighborNodes: node[]){
    neighborNodes.forEach(neighbor => {
        neighbor.weight = openNode.weight + 1
        neighbor.previous = openNode
        neighbor.closed = true

        queuedNodes.push(neighbor)
    })
}
