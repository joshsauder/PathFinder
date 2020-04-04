import React from 'react'
import {shallow, mount} from 'enzyme'
import Grid from '../components/Grid/Grid'
import {TouchableOpacity} from 'react-native'

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
        const GridComponent = mount(<Grid {...props} />)

        //needed to allow graph to be made
        setTimeout(() => {
            expect(GridComponent.find(TouchableOpacity).length).toEqual(500)
        }, 1000)
    })

})