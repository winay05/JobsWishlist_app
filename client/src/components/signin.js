import axios from 'axios';

import React, { Component } from 'react';

import Spinner from './spinner';
import SignInForm from './forms/signinform';

class SignIn extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
      rememberme: false,
      isLoading: false
    };
  }
  handleInputChange = event => {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });

    // console.log(name, value);
  };

  handleSignin = async event => {
    event.preventDefault();

    this.setState({ isLoading: !this.state.isLoading });

    try {
      const res = await axios({
        url: '/api/v1/users/login',
        method: 'POST',
        data: {
          email: this.state.email,
          password: this.state.password
        },
        headers: {
          Accept: 'application/json'
        },

        withCredentials: true
      });

      if (res.data.status === 'success') {
        this.setState({ isLoading: !this.state.isLoading });
        alert(`Success! Signed In`);
        // console.log(this.state.isLoading);
      }
    } catch (err) {
      this.setState({ isLoading: !this.state.isLoading });

      alert(`Failed! `);
      // console.log(this.state.isLoading);
      console.log(err);
    }
  };

  render() {
    return (
      <>
        <Spinner isLoading={this.state.isLoading} />
        <SignInForm
          state={this.state}
          handleInputChange={this.handleInputChange}
          handleSignin={this.handleSignin}
        />
      </>
    );
  }
}

export default SignIn;
