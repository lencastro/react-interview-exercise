import React, { Component } from 'react';
import styles from './style.css';
import { connect } from 'react-redux';

import {addFriend, deleteFriend, starFriend} from '../../actions/FriendsActions';
import {showPage} from '../../actions/PaginationActions';
import { FriendList, AddFriendInput, AddPagination } from '../../components';

let getStartPos = ({pageNumber, recordsPerPage}) => {
  return pageNumber * recordsPerPage - recordsPerPage;
}

let getEndPos = ({pageNumber, recordsPerPage}) => {
  return pageNumber * recordsPerPage;
}

let getFriendsList = (list, pagination) => {
  return list.slice(getStartPos(pagination), getEndPos(pagination));
}

export class FriendListApp extends Component {


  render () {
    
    let { allFriendsLength, friendsToRender, pageNumber, recordsPerPage } = this.props;

    const pageInfo = { allFriendsLength, pageNumber, recordsPerPage }
    
    const actions = {
      addFriend: this.props.addFriend,
      deleteFriend: this.props.deleteFriend,
      starFriend: this.props.starFriend,
      showPage : this.props.showPage
    };
    
    return (
      <div className={styles.friendListApp}>
        <h1>The FriendList</h1>
        <AddFriendInput addFriend={actions.addFriend} />
        <FriendList friends={friendsToRender} actions={actions} info={pageInfo} />
        <AddPagination total={allFriendsLength} recordsPerPage={recordsPerPage} currentPageNumber={pageNumber}
          onChange={(pageNumber, recordsPerPage)=>{
            this.props.showPage({ pageNumber, recordsPerPage });
          }}/>
      </div>
    );
  }
}


function mapStateToProps(state) {
  const { friendlist: { friendsById }, pagination } = state;
  let { pageNumber, recordsPerPage } = pagination
  return {
    ...state,
    allFriends : friendsById,
    allFriendsLength : friendsById.length,
    pageNumber,
    recordsPerPage,
    friendsToRender : getFriendsList(friendsById, pagination)
  };
}

export default connect(mapStateToProps, {
  addFriend,
  deleteFriend,
  starFriend,
  showPage
})(FriendListApp)
