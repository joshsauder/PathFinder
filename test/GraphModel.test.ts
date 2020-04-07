import {node, createNode} from '../models/Graph'

describe('Test Node Modal', () => {

    /*
    Test the creation of a node object
    */
    it('Create Node', () => {
        let expected = {
            key: 'test',
            x: 1,
            y: 2,
            previous:null, 
            closed: false, 
            open: false,
            wall: false, 
            heuristic: Infinity,
            g: Infinity
        }

        let actual: node = createNode('test', 1, 2)

        Object.keys(expected).forEach(key => {
            expect(actual[key]).toEqual(expected[key])
        })
    })

    /*
    Test the calculation of the F value for A*
    */
    it('Get F value', () => {
        let actual: node = createNode('test', 1, 2)
        actual.g = 1
        actual.heuristic = 2

        expect(actual.f()).toEqual(3)
    })
})