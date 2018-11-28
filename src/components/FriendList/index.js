import React, { Component, PropTypes } from 'react';
import styles from './style.css';
import FriendListItem from '../FriendListItem';

export class FriendList extends Component {
  
  componentWillReceiveProps(props){
    const  { actions : { showPage } , info, friends }  = props;
    if(friends.length === 0 && info.pageNumber > 1 && info.allFriendsLength >= info.recordsPerPage ) {
      showPage({ pageNumber : info.pageNumber - 1, recordsPerPage:  info.recordsPerPage });
    }

  }

  render () {
    return (
      <ul className={styles.friendList}>
        {
          this.props.friends.map((friend, index) => {
            return (
              <FriendListItem
                key={index}
                {...this.props.actions} friend={friend} />
            );
          })
        }
      </ul>
    );
  }

}

FriendList.propTypes = {
  friends: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired,
  info: PropTypes.shape({
    allFriendsLength : PropTypes.number.isRequired,
    pageNumber : PropTypes.number.isRequired,
    recordsPerPage : PropTypes.number.isRequired
  })
};

export default FriendList;
