import React, {Component, PropTypes} from 'react';
import classnames from 'classnames';
import styles from './style.css';

export class FriendListItem extends Component {

  loadGenderIcon = (gender) => {
    if (!gender.length) { return null; }
    return (
      <i title={gender} className={classnames('fa', { 
        'fa-venus': gender === "Female",
        'fa-mars': gender === "Male",
        'fa-transgender': gender === "Others"
      })} />
    )
  }
  render() {
    let {friend} = this.props;
    return (
      <li className={styles.friendListItem}>
        <div className={styles.friendInfos}>
          <div><span>{friend.name}</span></div>
          {this.loadGenderIcon(friend.gender)}
          <div>
            <small>xx friends in common</small>
          </div>
          
        </div>
        
        <div className={styles.friendActions}>
          <button className={`btn btn-default ${styles.btnAction}`}
                  onClick={() => this.props.starFriend(friend._id)}>
            <i className={classnames('fa', { 'fa-star': friend.starred, 'fa-star-o': !friend.starred })} />
          </button>
          <button className={`btn btn-default ${styles.btnAction}`}
                  onClick={() => this.props.deleteFriend(friend._id)}>
            <i className="fa fa-trash" />
          </button>
        </div>
      </li>
    );
  }

}

FriendListItem.propTypes = {
  friend: PropTypes.shape({
    _id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    gender: PropTypes.string.isRequired,
    starred: PropTypes.boolean
  })
};

export default FriendListItem
