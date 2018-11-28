import React from 'react';
import configureStore from 'redux-mock-store';
import Enzyme ,{ shallow, mount, render} from '../../../enzyme';
import { Provider } from 'react-redux';
import ConnectedFriendListItem, {FriendListItem} from '../index';
import { addFriend, deleteFriend, starFriend } from '../../../actions/FriendsActions';
import { showPage } from '../../../actions/PaginationActions';


describe('should render friend list item wrapped with provider', () => {
    const initialState = {};
    const mockStore = configureStore();
    
    let mockAddFriend = jest.fn(addFriend); 
    let mockDeleteFriend = jest.fn(deleteFriend); 
    let mockStarFriend = jest.fn(starFriend); 
    let mockShowPage = jest.fn(showPage); 

    let friend = { _id: 0, name: 'Theodore Roosevelt', gender: "Male", starred: true}
    let store, container;
    beforeEach(()=>{
        store = mockStore(initialState);
        container = mount( <Provider store={store}>
        <ConnectedFriendListItem  friend={friend}
        addFriend={mockAddFriend} deleteFriend={mockDeleteFriend} 
        starFriend={mockStarFriend} showPage={mockShowPage} />
        </Provider> );
    })

    test('should have rendered component', () => {
        expect(container.length).toEqual(1)
    });

    test('Should call star function when the icon is clicked', () => {
        container.find('button').at(0).simulate('click');
        expect(mockStarFriend).toHaveBeenCalledWith(0);
    });

    test('Should call delete function when the icon is clicked', () => {
        container.find('button').at(1).simulate('click');
        expect(mockDeleteFriend).toHaveBeenCalledWith(0);
    });
});

