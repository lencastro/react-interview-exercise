import * as types from '../constants/ActionTypes';

const initialState = {
  friendsById: [
    {
      _id: 0,
      name: 'Theodore Roosevelt',
      gender: "Male",
      starred: true
    },
    {
      _id: 1,
      name: 'Abraham Lincoln',
      gender: "Male",
      starred: false
    },
    {
      _id: 2,
      name: 'George Washington',
      gender: "Male",
      starred: false
    }
  ]
};

export default function friends(state = initialState, action) {
  switch (action.type) {
    case types.ADD_FRIEND:
      let nextId = state.friendsById.length + 1;
      return {
        ...state,
        friendsById: [
          ...state.friendsById,
          {
            _id: nextId,
            ...action.payload,
            starred: false
          }
        ]
      };
    case types.DELETE_FRIEND:
      return {
        ...state,
        friendsById: state.friendsById.filter((item, index) => item._id !== action.payload.id)
      };
    case types.STAR_FRIEND:
      let friends = [...state.friendsById];
      let friend = friends.find((item, index) => item._id === action.payload.id);
      friend.starred = !friend.starred;
      return {
        ...state,
        friendsById: friends
      };

    default:
      return state;
  }
}
