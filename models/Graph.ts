export type node = {
    key: string
    x: number
    y: number
    previous: node
    weight: number
    heuristic: number
    wall: boolean
    closed: boolean
}