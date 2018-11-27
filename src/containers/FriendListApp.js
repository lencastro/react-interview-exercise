import React, { Component } from 'react';
import styles from './FriendListApp.css';
import { connect } from 'react-redux';

import {addFriend, deleteFriend, starFriend} from '../actions/FriendsActions';
import { FriendList, AddFriendInput, AddPagination } from '../components';

class FriendListApp extends Component {

  constructor(props) {
    super(props);
    this.state = {
      pageNumber: 1,
      recordsPerPage : 2
    };

    
  }

  render () {
    const { friendlist: { friendsById }} = this.props;
    let { pageNumber, recordsPerPage } = this.state;

    const actions = {
      addFriend: this.props.addFriend,
      deleteFriend: this.props.deleteFriend,
      starFriend: this.props.starFriend
    };
    
    return (
      <div className={styles.friendListApp}>
        <h1>The FriendList</h1>
        <AddFriendInput addFriend={actions.addFriend} />
        <FriendList friends={friendsById} actions={actions} />
        <AddPagination total={friendsById.length} recordsPerPage={recordsPerPage} 
          onChange={(pageNumber, recordsPerPage)=>{
            this.setState({ pageNumber: pageNumber, recordsPerPage: recordsPerPage });
          }}/>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return state
}

export default connect(mapStateToProps, {
  addFriend,
  deleteFriend,
  starFriend
})(FriendListApp)
