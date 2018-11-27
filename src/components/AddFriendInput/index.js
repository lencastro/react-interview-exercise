import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';
import styles from './style.css';

class AddFriendInput extends Component {

  render () {
    let genderOptions = ["Female", "Male", "Others"].map((gender, idx)=>{
      let valRef = this.state.gender;
      return (
        <label className="radio-inline" key={idx}>
          <input type="radio" name="optradio" checked={ valRef === gender}
          value={gender} onChange={this.handleGenderSelect} onKeyDown={ (e) => { this.handleSubmit(e) } } />
          {gender}
        </label>
      );
    });
    return (
      <div className="wrapper">
      <input
        type="text"
        autoFocus="true"
        className={classnames('form-control', styles.addFriendInput)}
        placeholder="Type the name of a friend"
        value={this.state.name}
        onChange={this.handleChange}
        onKeyDown={this.handleSubmit} />
        <div className={`${styles.genderSelect}`}>
          { genderOptions}
        </div>
      </div>
    );
  }

  constructor (props, context) {
    super(props, context);
    this.state = {
      name: this.props.name || '',
      gender : this.props.gender || 'Female'
    };
  }

  handleChange = (e) => {
    const name = e.target.value.trim();
    this.setState({ name });
  }

  handleGenderSelect = (e) => {
    const genName = e.target.value.trim();
    this.setState({ gender: genName });
  }
  handleSubmit = (e) => {
    const { name, gender } = this.state;
    if (e.which === 13 && name !== "") {
      this.props.addFriend(name, gender);
      this.setState({ name: '', gender: "Female" });
    }
  }

}

AddFriendInput.propTypes = {
  addFriend: PropTypes.func.isRequired
};

export default AddFriendInput
