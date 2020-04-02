export type node = {
    key: string
    x: number
    y: number
    previous: node
    weight: number
    heuristic: number
    g: number
    f: () => number
    wall: boolean
    closed: boolean
    open: boolean
}

export function createNode(key: string, x: number, y :number): node{
    return {
        key: key, 
        x: x, 
        y: y, 
        previous:null, 
        weight: Infinity, 
        closed: false, 
        opened: false,
        wall: false, 
        heuristic: Infinity,
        g: Infinity,
        f: getF
    }
}

function getF(): number {
    return this.heuristic + this.g
}