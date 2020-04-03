import { node } from '../models/Graph';

export function findNeighborNodes(node: node, width: number, height: number, allNodes: node[][]): node[] {
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

    return neighbors.filter(node => node.closed === false && node.wall === false)
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