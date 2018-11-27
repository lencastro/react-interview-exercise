import * as types from '../constants/ActionTypes';

const initialState = {
  pageNumber: 1,
  recordsPerPage : 2
};

export default function pagination(state = initialState, action) {
  switch (action.type) {
    case types.SHOW_PAGE:
    return { ...action.payload };
    
    default:
      return state;
  }
}
