export type node = {
    x: number
    y: number
    weight: number
    closed: boolean
}

export default class Graph {

    nodes: node[]

    insertNode(node: node){
        this.nodes.push(node)
    }

    removeNode(node: node){
        let index = this.nodes.findIndex(n => n.x === node.x && n.y === node.y)
        this.nodes.splice(index, 1)
    }
}