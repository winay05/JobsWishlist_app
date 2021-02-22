import axios from 'axios';

import React, { Component } from 'react';

import Spinner from './spinner';
import SignUpForm from './forms/signupform';

class SignUp extends Component {
  constructor(props) {
    super(props);

    this.state = {
      fullname: '',
      email: '',
      password: '',
      passwordConfirm: '',
      isLoading: false,
      touched: {
        fullname: false,
        email: false,
        password: false,
        passwordConfirm: false
      }
    };

    this.handleSignup = this.handleSignup.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
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

  handleBlur = field => evt => {
    this.setState({
      touched: { ...this.state.touched, [field]: true }
    });
  };

  validate(fullname, email, password, passwordConfirm) {
    const errors = {
      fullname: '',
      email: '',
      password: '',
      passwordConfirm: ''
    };

    if (this.state.touched.fullname && fullname.length < 3)
      errors.fullname = 'Name should  be >=3 characters';
    else if (this.state.touched.fullname && fullname.length > 10)
      errors.fullname = 'Name should  be <=10 characters';

    const re = /\S+@\S+\.\S+/;
    if (this.state.touched.email && !re.test(email))
      errors.email = 'Not a valid email';

    if (this.state.touched.password && password.length < 8)
      errors.password = 'Password should have >=8 characters';

    if (
      this.state.touched.password &&
      this.state.touched.password &&
      password !== passwordConfirm
    )
      errors.passwordConfirm = "Confirm password doesn't match";

    return errors;
  }

  handleSignup = async event => {
    event.preventDefault();

    this.setState({ isLoading: !this.state.isLoading });

    try {
      const res = await axios({
        url: '/api/v1/users/signup',
        method: 'POST',
        data: {
          name: this.state.fullname,
          email: this.state.email,
          password: this.state.password,
          passwordConfirm: this.state.passwordConfirm
        },
        headers: {
          Accept: 'application/json'
        },

        withCredentials: true
      });

      if (res.data.status === 'success') {
        this.setState({ isLoading: !this.state.isLoading });
        alert(`Success! Created user with id: ${res.data.data.user._id}`);
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
        <SignUpForm
          state={this.state}
          validate={this.validate}
          handleInputChange={this.handleInputChange}
          handleSignup={this.handleSignup}
        />
      </>
    );
  }
}

export default SignUp;
