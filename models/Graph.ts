export type node = {
    key: string
    x: number
    y: number
    previous: node
    weight: number
    heuristic: number
    f: () => number
    wall: boolean
    closed: boolean
}

export function createNode(key: string, x: number, y :number): node{
    return {
        key: key, 
        x: x, 
        y: y, 
        previous:null, 
        weight: Infinity, 
        closed: false, 
        wall: false, 
        heuristic: Infinity,
        f: getF
    }
}

function getF(): number {
    return this.heuristic + this.weight
}