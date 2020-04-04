import React from 'react'
import {shallow, mount} from 'enzyme'
import ButtonView from '../components/BottomNav/ButtonView'
import {Button} from 'native-base'

const createTestProps = (props: Object) => ({
    onSubmit: jest.fn(),
    onReset: jest.fn(),
    step: 1,
    ...props
})

describe('ButtonView Component', () => {
    it('Renders Correctly', () => {
        let props = createTestProps({})
        const ButtonViewComponent = shallow(<ButtonView {...props} />)

        expect(ButtonViewComponent).toBeDefined()
    })

    it('Test Submit Button', () => {
        let mockFn = jest.fn()
        let props = createTestProps({onSubmit: mockFn, step:3})

        const ButtonViewComponent = mount(<ButtonView {...props} />)
        ButtonViewComponent.find(Button).at(0).props().onPress()

        expect(mockFn).toBeCalled()
    })

    it('Test Submit Button When Disabled', () => {
        let mockFn = jest.fn()
        let props = createTestProps({onSubmit: mockFn, step:1})

        const ButtonViewComponent = shallow(<ButtonView {...props} />)

        expect(ButtonViewComponent.find(Button).at(0).props().disabled).toBe(true)
    })

    it('Test Reset Button', () => {
        let mockFn = jest.fn()
        let props = createTestProps({onReset: mockFn})

        const ButtonViewComponent = shallow(<ButtonView {...props} />)
        ButtonViewComponent.find(Button).at(1).props().onPress()

        expect(mockFn).toBeCalled()
    })
})