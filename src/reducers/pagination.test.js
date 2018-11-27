import * as types from '../constants/ActionTypes';
import pagination from './pagination';

it('should return new state based on the payload', () => {

    const _state = {
        pageNumber: 1,
        recordsPerPage : 2
    }
    const action = {
        type: types.SHOW_PAGE,
        payload: {
            pageNumber: 2,
            recordsPerPage : 2
        }
    };
    const nextState = pagination(_state, action);
    expect(nextState).toEqual({
        pageNumber: 2,
        recordsPerPage: 2
    });

});

it('should return same state when unknown action is given', () => {

    const _state = {
        pageNumber: 1,
        recordsPerPage : 2
    }
    const action = {
        type: types.ADD_FRIEND,
        payload: {
            pageNumber: 2,
            recordsPerPage : 2
        }
    };
    const nextState = pagination(_state, action);
    expect(nextState).toEqual({
        pageNumber: 1,
        recordsPerPage: 2
    });
    
});