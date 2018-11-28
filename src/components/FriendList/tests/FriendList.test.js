import React from 'react';
import configureStore from 'redux-mock-store';
import Enzyme ,{ shallow, mount, render} from '../../../enzyme';
import { Provider } from 'react-redux';
import {FriendList} from '../index';
import { addFriend, deleteFriend, starFriend } from '../../../actions/FriendsActions';
import { showPage } from '../../../actions/PaginationActions';

describe('should render friends list', () => {
    let mockaction = jest.fn(showPage); 
    let actions = { addFriend, deleteFriend, starFriend, showPage : mockaction };
    let pageInfo = { }, friendsToRender = [
        { _id: 0, name: 'Theodore Roosevelt', gender: "Male", starred: true},
        { _id: 1, name: 'Abraham Lincoln', gender: "Male", starred: false },
        { _id: 2, name: 'George Washington', gender: "Male", starred: false} 
    ];
    
    let container;
    beforeEach(()=>{
        pageInfo = { allFriendsLength : 3 , pageNumber: 1, recordsPerPage : 2 }
        container = mount(<FriendList friends={friendsToRender} actions={actions} info={pageInfo} />);
    });

    afterEach(()=>{
        container.unmount();
    });

    test('should have rendered component', () => {
        expect(container.length).toEqual(1);
    });
    test('should correct number of friend items', () => {
        expect(container.find('li').length).toBe(3);
    });

});