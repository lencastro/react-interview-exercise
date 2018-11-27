import * as types from '../constants/ActionTypes';
import friends from './friendlist';

it('should add a friend at the end of the array', () => {

    const _state = {
        friendsById: [
          { _id: 0, name: 'Alice', gender: "Male", starred: true },
          { _id: 1, name: 'Bob', gender: "Male", starred: false },
          { _id: 2, name: 'Carol', gender: "Female", starred: false}
        ]
      }
    const action = {
        type: types.ADD_FRIEND,
        payload: {
            name: "Dave",
            gender : "Male"
        }
    };
    const nextState = friends(_state, action);
    expect(nextState.friendsById[nextState.friendsById.length-1]).toEqual({
        _id :4,
        name: "Dave",
        gender : "Male",
        starred : false
    });

});

it('should delete a friend at the given position of array', () => {

    const _state = {
        friendsById: [
          { _id: 0, name: 'Alice', gender: "Male", starred: true },
          { _id: 1, name: 'Bob', gender: "Male", starred: false },
          { _id: 2, name: 'Carol', gender: "Female", starred: false}
        ]
      }
    const action = {
        type: types.DELETE_FRIEND,
        payload: {
            id: 0
        }
    };
    const nextState = friends(_state, action);
    expect(nextState.friendsById).toHaveLength(2);

});


it('should update a firend with star mark', () => {
    const _state = {
        friendsById: [
          { _id: 0, name: 'Alice', gender: "Male", starred: true },
          { _id: 1, name: 'Bob', gender: "Male", starred: false },
          { _id: 2, name: 'Carol', gender: "Female", starred: false}
        ]
    }
    const action = {
        type: types.STAR_FRIEND,
        payload: {
            id: 0
        }
    };
    const nextState = friends(_state, action);
    expect(nextState.friendsById[0]).toEqual({ _id: 0, name: 'Alice', gender: "Male", starred: false });

});

