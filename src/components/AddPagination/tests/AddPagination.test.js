import React from 'react';
import configureStore from 'redux-mock-store';
import Enzyme ,{ shallow, mount, render} from '../../../enzyme';
import { Provider } from 'react-redux';
import ConnectedAddPagination, {AddPagination} from '../index';
import { showPage } from '../../../actions/PaginationActions';

describe('should render pagination Component Test wrapped with provider', () => {
    const initialState = {};
    const mockStore = configureStore();
    let store, container;
    beforeEach(()=>{
        store = mockStore(initialState);
        container = mount( <Provider store={store}>
        <ConnectedAddPagination total={10} recordsPerPage={2} currentPageNumber={2}/>
        </Provider> );
    })

    test('should have rendered component', () => {
        expect(container.length).toEqual(1)
    });
});


describe('should properly navigate in page select', () => {
    const initialState = {}
    const mockStore = configureStore();
    let store, container;
    let mockaction = jest.fn(showPage); 
   
    beforeEach(()=>{
        store = mockStore(initialState);
        container = mount( <Provider store={store}>
        <ConnectedAddPagination total={10} recordsPerPage={2} currentPageNumber={2} onChange={mockaction}/>
        </Provider> );
    })
    
    afterEach(()=>{
        container.unmount();
    })

    test('Show have correct page label count', () => {
        expect(container.find('li').length).toBe(5);
    });

    test('should trigger page change - 1', () => {
        container.find('li').at(0).simulate('click');
        expect(mockaction).toHaveBeenCalledWith(1, 2);
    });
    test('should trigger page change', () => {
        container.find('li').at(2).simulate('click');
        expect(mockaction).toHaveBeenCalledWith(3, 2);
    });
});

