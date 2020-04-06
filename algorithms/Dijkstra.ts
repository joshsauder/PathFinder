import { node } from '../models/Graph';
import { AStar, TwoWayAStar } from './AStar';


/**
 * Dijkstra's Shortest Path Finder
 * 
 * @param start - the starting node
 * @param end - the ending node
 * @param grid - the grid of nodes 
 * @returns - a list of nodes that were visited
 */
export function Dijkstras(start: node, end: node, grid: node[][]): node[]{
    return AStar(start, end, grid, getHueristic)
}

/**
 * Bi-Directional Dijkstra's Shortest Path Finder
 * 
 * @param start - the starting node
 * @param end - the ending node
 * @param grid - the grid of nodes 
 * @returns - a list of nodes that were visited
 */
export function TwoWayDijkstra(start: node, end: node, grid: node[][]): node[] {
    return TwoWayAStar(start, end, grid, getHueristic)
}


function getHueristic(current: node, start: node, end: node): number{
    return 0
}