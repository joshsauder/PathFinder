import Heap from 'heap'
import {node} from '../models/Graph'

export default class Dijkstra {
    
    findShortestPath(start: node, end: node, nodesList: node[]){

        let queuedNodes = new Heap<node>()

        while(queuedNodes.size() > 0){
            let openNode = queuedNodes.pop()

            let neighborNodes = this.findNeighborNodes(openNode);

            neighborNodes.forEach(neighbor => {

                if(!neighbor.closed){

                    let weight = openNode.weight + 1
                    neighbor.weight = weight

                    queuedNodes.push(neighbor)
                
                }
            })
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