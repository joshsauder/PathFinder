import Heap, { heapify } from 'heap'
import {node} from '../models/Graph'

export default class Dijkstra {
    
    findShortestPath(start: node, end: node, nodesList: node[]){

        let queuedNodes = new Heap()

        while(queuedNodes.size() > 0){

        }
    }


    findNeighborNodes(node: node): node[]{
        let neighbors: node[] = []

        if(node.x + 1 < width){
            neighbors.push({...node, x: node.x + 1})
        }

        if(node.x - 1 > -1){
            neighbors.push({...node, x: node.x - 1})
        }

        if(node.y + 1 < height){
            neighbors.push({...node, x: node.y + 1})
        }

        if(node.y - 1 > -1){
            neighbors.push({...node, x: node.y - 1})
        }

        return neighbors
    }

}