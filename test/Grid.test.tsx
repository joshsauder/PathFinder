import React from 'react'
import {shallow, mount} from 'enzyme'
import Grid from '../components/Grid/Grid'

const createTestProps = (props: Object) => ({
    algorithm: 'BiD',
    setStep: jest.fn(),
    step: 1
})


describe('Grid Component', () => {
    it('Renders Correctly', () => {
        let props = createTestProps({})
        const GridComponent = shallow(<Grid {...props} />)

        expect(GridComponent).toBeDefined()
    })

    it('Test Number of Items', () => {
        let props = createTestProps({})
        const GridComponent = shallow(<Grid {...props} />)

        expect(GridComponent.find('Item').length).toEqual(500)
    })

})