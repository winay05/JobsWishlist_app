import React from 'react';
import Home from './home';
// import Signup from "./signup";
import Signup from './signup';
import Header from './header';
import Footer from './footer';
import Contact from './contact';
import SignIn from './signin';

// import axios from 'axios';

import { Switch, Route, Redirect } from 'react-router-dom';

function Main() {
  // async function verifyLogged() {
  //   try {
  //     const res = await axios({
  //       url: 'http://localhost:8000/api/v1/users/verify-logged',
  //       method: 'GET',
  //       data: null,
  //       headers: {
  //         Accept: 'application/json',
  //         'Content-Type': 'multipart/form-data',
  //       },

  //       withCredentials: true,
  //     });

  //     if (res.data.data.user) setAuthState('loggedIn');
  //     // console.log(res);
  //     // alert(`Success! Logged in`);
  //     // console.log(res);
  //   } catch (err) {
  //     // this.toggleModal();
  //     // alert(`Failed!`);
  //     // this.props.onChange('notLogged');
  //     console.log(err);
  //   }
  // }
  // verifyLogged();
  // console.log(authState);

  return (
    <div>
      <Header />
      <Switch>
        <Route path="/home" component={Home} />
        <Route exact path="/contact" component={Contact} />
        <Route exact path="/signup" component={Signup} />
        <Route exact path="/signin" component={SignIn} />
        <Redirect to="/home" />
      </Switch>
      <Footer />
    </div>
  );
}

export default Main;
