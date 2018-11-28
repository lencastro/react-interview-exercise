import React from 'react';
import configureStore from 'redux-mock-store';
import Enzyme ,{ shallow, mount, render} from '../../../enzyme';
import { Provider } from 'react-redux';
import ConnectedAddFriendInput, {AddFriendInput} from '../index';
import { addFriend } from '../../../actions/FriendsActions';

describe('should render Add Friend Input Component Test wrapped with provider', () => {
    const initialState = {};
    const mockStore = configureStore();
    let store, container;
    beforeEach(()=>{
        store = mockStore(initialState);
        container = mount( <Provider store={store}>
        <ConnectedAddFriendInput addFriend={addFriend}/>
        </Provider> );
    })

    test('should have rendered component', () => {
        expect(container.length).toEqual(1)
    });
});

describe('should add a friend when provider', () => {
    const initialState = {}
    const mockStore = configureStore();
    let store, container;
    let mockaction = jest.fn(addFriend); 
   
    beforeEach(()=>{
        store = mockStore(initialState);
        container = mount( <Provider store={store}>
        <ConnectedAddFriendInput addFriend={mockaction}/>
        </Provider> );
        
    })
    afterEach(()=>{
        container.unmount();
    })

    test('friend name input', () => {
        
        container.find('input').at(0).simulate('change', {target: {value: 'HeloWorld'}});
        expect(container.find('input').at(0).props().value).toBe('HeloWorld');
        container.find('input').at(0).simulate('keyDown', { key: 'Enter', keyCode: 13, which: 13 })
        expect(container.find('input').at(0).props().value).toBe('');
        expect(mockaction).toHaveBeenCalledWith("HeloWorld", "Female");
        
        
    });
    test('friend name input with gender change', () => {
        container.find('input').at(0).simulate('change', {target: {value: 'Apple'}});
        expect(container.find('input').at(0).props().value).toBe('Apple');
        container.find('input').at(2).simulate('change');
        container.find('input').at(2).simulate('keyDown', { key: 'Enter', keyCode: 13, which: 13 })
        expect(container.find('input').at(0).props().value).toBe('');
        expect(mockaction).toHaveBeenCalledWith("Apple", "Male");
    });
    

});