import { node } from '../models/Graph';

/**
 * Finds the current nodes' neighbor nodes 
 * Neighbor nodes being the nodes above, below, left, and right.
 * 
 * @param node - Current node
 * @param width - Width of graph
 * @param height - Height of graph
 * @param allNodes - List of nodes from the graph
 * @returns - An array of neighbor nodes
 */
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

/**
 * Takes the target node and returns the nodes traversed to get to that node.
 * 
 * @param finalNode - The target node
 */
export function getPathInOrder(finalNode: node): node[]{
    let finalPath: node[] = []
    let current = {...finalNode}

    while(current.previous !== null){
        finalPath.unshift(current)
        current = current.previous
    }

    return finalPath
}