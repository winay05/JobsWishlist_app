import React, { Component } from 'react';
import axios from 'axios';
import './../shared/main.css';
import {
  Navbar,
  NavbarBrand,
  Nav,
  NavbarToggler,
  Collapse,
  NavItem,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  FormGroup,
  Input,
  Label
} from 'reactstrap';
import { NavLink } from 'react-router-dom';
import { withRouter } from 'react-router-dom';

import Spinner from './spinner';

class Header extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isNavOpen: false,
      isModalOpen: false,
      isLoading: false
    };
    this.toggleNav = this.toggleNav.bind(this);
    this.toggleModal = this.toggleModal.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
  }

  toggleNav() {
    this.setState({
      isNavOpen: !this.state.isNavOpen
    });
  }
  toggleModal() {
    this.setState({
      isModalOpen: !this.state.isModalOpen
    });
  }

  async handleLogin(event) {
    event.preventDefault();

    this.setState({ isLoading: !this.state.isLoading });
    try {
      const res = await axios({
        url: '/api/v1/users/login',
        method: 'POST',
        data: {
          email: this.email.value,
          password: this.password.value
        },
        headers: {
          Accept: 'application/json'
        },

        withCredentials: true
      });

      if (res.data.status === 'success') {
        this.setState({ isLoading: !this.state.isLoading });

        console.log(res);
        alert(`Success! Logged in`);
      }
    } catch (err) {
      this.setState({ isLoading: !this.state.isLoading });
      console.log(err);
      alert(`Failed!`);
    }
    this.toggleModal();

    event.preventDefault();
  }

  render() {
    // const history = createBrowserHistory();

    const loginButton = (
      <Nav className="ml-auto" navbar>
        <NavItem>
          <Button outline onClick={this.toggleModal}>
            <span className="fa fa-sign-in fa-lg">Sign in</span>
          </Button>
        </NavItem>
      </Nav>
    );
    return (
      <>
        <Navbar light expand="md">
          <div className="container">
            <NavbarToggler color="secondary" onClick={this.toggleNav} />
            <NavbarBrand className="mr-auto" href="/">
              <img
                src="/assets/images/logoFinal.png"
                height="40"
                width="60"
                alt="logo"
              />
            </NavbarBrand>
            <Collapse isOpen={this.state.isNavOpen} navbar>
              <Nav navbar>
                <NavItem>
                  <NavLink className="nav-link" to="/home">
                    <span className="fa fa-home fa-lg" /> Home
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink className="nav-link" to="/contact">
                    <span className="fa fa-address-card fa-lg" /> Contact Us
                  </NavLink>
                </NavItem>
              </Nav>
              {/* dont display the login button when on signin page, else, display it */}
              {window.location.pathname.match(/signin/) ? <p /> : loginButton}
            </Collapse>
          </div>
        </Navbar>
        <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
          <ModalHeader toggle={this.toggleModal}>Sign in</ModalHeader>
          <ModalBody>
            <Form>
              <FormGroup>
                <Label htmlFor="email">Email</Label>
                <Input
                  type="text"
                  id="email"
                  name="email"
                  innerRef={input => (this.email = input)}
                />
              </FormGroup>
              <FormGroup>
                <Label htmlFor="password">Password</Label>
                <Input
                  type="password"
                  id="password"
                  name="password"
                  innerRef={input => (this.password = input)}
                />
              </FormGroup>
              <Button onClick={this.handleLogin}>Sign in</Button>
            </Form>
          </ModalBody>
        </Modal>
        <Spinner isLoading={this.state.isLoading} />
      </>
    );
  }
}
export default withRouter(Header);
