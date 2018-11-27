import * as types from '../constants/ActionTypes';

export function showPage(pageInfo) {
  return {
    type: types.SHOW_PAGE,
    payload : {...pageInfo}
  };
}

