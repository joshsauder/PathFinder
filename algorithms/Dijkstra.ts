import Heap from 'heap';
import { node } from '../models/Graph'


export function findShortestPath(start: node, end: node, grid: node[][]): node[]{
    //sort by weight
    let queuedNodes = new Heap<node>(function (a, b) {
        return a.weight - b.weight;
    })

    let visitedNodes: node[] = []

    //set starting node weight to 0
    start.weight = 0
    queuedNodes.push(start)

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

    return []
}

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
    start.weight = 0
    end.weight = 0

    //push start and end
    queuedNodes.push(start)
    reverseQueuedNodes.push(end)

    while (queuedNodes.size() > 0) {
        let startNode = queuedNodes.pop()
        let reverseNode = reverseQueuedNodes.pop()

        if(startNode.key === reverseNode.key){
            visitedNodes.push(startNode, reverseNode)
            return visitedNodes
        }

        const neighborNodes = findNeighborNodes(startNode, grid[0].length, grid.length, grid);
        processNeighborNodes(startNode, queuedNodes, neighborNodes)

        const reverseNeighborNodes = findNeighborNodes(reverseNode, reverseGrid[0].length, reverseGrid.length, reverseGrid);
        processNeighborNodes(reverseNode, reverseQueuedNodes, reverseNeighborNodes)

        visitedNodes.push(startNode, reverseNode)
    }

    return []
}

function processNeighborNodes(openNode: node, queuedNodes: Heap<node>, neighborNodes: node[]){
    neighborNodes.forEach(neighbor => {
        if (!neighbor.closed) {
            let weight = openNode.weight + 1
            neighbor.weight = weight
            neighbor.previous = openNode

            queuedNodes.push(neighbor)
        }
    })

    openNode.closed = true
}

function findNeighborNodes(node: node, width: number, height: number, allNodes: node[][]): node[] {
    let neighbors: node[] = []

    if (node.x + 1 < width) {
        neighbors.push(allNodes[node.y][node.x+1])
    }

    if (node.x - 1 > -1) {
        neighbors.push(allNodes[node.y][node.x-1])
    }

    if (node.y + 1 < height) {
        neighbors.push(allNodes[node.y+1][node.x])
    }

    if (node.y - 1 > -1) {
        neighbors.push(allNodes[node.y-1][node.x])
    }

    return neighbors.filter(node => node.closed == false)
}

export function getPathInOrder(finalNode: node): node[]{
    let finalPath: node[] = []
    let current = {...finalNode}

    while(current.previous !== null){
        finalPath.unshift(current)
        current = current.previous
    }

    return finalPath
}