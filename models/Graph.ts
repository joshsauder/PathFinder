export type node = {
    key: string
    x: number
    y: number
    previous: node
    weight: number
    wall: boolean
    closed: boolean
}