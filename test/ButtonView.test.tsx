import React from 'react'
import {shallow} from 'enzyme'
import ButtonView from '../components/BottomNav/ButtonView'

const createTestProps = (props: Object) => ({
    onSubmit: jest.fn(),
    onReset: jest.fn(),
    step: 1
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

        const ButtonViewComponent = shallow(<ButtonView {...props} />)
        ButtonViewComponent.find('Button').at(0).simulate('press')

        expect(mockFn).toBeCalled()
    })

    it('Test Submit Button When Disabled', () => {
        let mockFn = jest.fn()
        let props = createTestProps({onSubmit: mockFn, step:1})

        const ButtonViewComponent = shallow(<ButtonView {...props} />)
        ButtonViewComponent.find('Button').at(0).simulate('press')

        expect(mockFn).not.toBeCalled()
    })

    it('Test Reset Button', () => {
        let mockFn = jest.fn()
        let props = createTestProps({onReset: mockFn})

        const ButtonViewComponent = shallow(<ButtonView {...props} />)
        ButtonViewComponent.find('Button').at(1).simulate('press')

        expect(mockFn).toBeCalled()
    })
})