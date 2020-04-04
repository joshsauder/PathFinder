import {node, createNode} from '../models/Graph'

test('Test Node Modal', () => {

    /*
    Test the creation of a node object
    */
    describe('Create Node', () => {
        let expected = {
            key: 'test',
            x: 1,
            y: 2,
            previous:null, 
            weight: Infinity, 
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
    describe('Get F value', () => {
        let actual: node = createNode('test', 1, 2)

        expect(actual.f).toEqual(3)
    })
})