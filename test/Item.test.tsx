import React from 'react'
import {Animated} from 'react-native'
import {shallow} from 'enzyme'
import Item from '../components/Grid/Item'

const createTestProps = (props: Object) => ({
    id: '1',
    onSelect: jest.fn(),
    selected: false,
    forwardRef: jest.fn(),
    ...props
})

describe('Item Component', () => {
    it('Renders Correctly', () => {
        let props = createTestProps({})
        const ItemComponent = shallow(<Item {...props} />)

        expect(ItemComponent).toBeDefined()
    })

    it('Test Item Touched', ()=> {
        let mockFn = jest.fn()
        let props = createTestProps({onSelect: mockFn})
        const ItemComponent = shallow(<Item {...props} />)

        ItemComponent.find('TouchableOpacity').simulate("press")
        expect(mockFn).toHaveBeenCalled()
    })
})