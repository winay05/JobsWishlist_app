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
  Jumbotron,
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
class Header extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isNavOpen: false,
      isModalOpen: false
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

    console.log(this.props.authState);

    this.props.onChange('logging');

    console.log(this.props.authState);

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
        // this.toggleModal();
        this.props.onChange('loggedIn');
        console.log(res);
        alert(`Success! Logged in`);
        // console.log(res);
      }
    } catch (err) {
      // this.toggleModal();
      alert(`Failed!`);
      this.props.onChange('notLogged');
      console.log(err);
    }
    // alert(`Username: ${this.username.value} \nPassword: ${this.password.value}
    //         \nRemeber: ${this.remember.checked}`);
    console.log(this.props.authState);
    this.toggleModal();

    event.preventDefault();
  }

  render() {
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
              <Nav className="ml-auto" navbar>
                <NavItem>
                  <Button outline onClick={this.toggleModal}>
                    <span className="fa fa-sign-in fa-lg">Login</span>
                  </Button>
                </NavItem>
              </Nav>
            </Collapse>
          </div>
        </Navbar>
        <Jumbotron jumbotron color="secondary">
          <div className="container">
            <div className="row row-header">
              <div className="col-12 col-sm-6">
                <h1>JobsWishlist</h1>
                <p>
                  Create a wishlist for jobs you want to watch and we'll let you
                  know as soon as one opens!
                </p>
              </div>
            </div>
          </div>
        </Jumbotron>

        <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
          <ModalHeader toggle={this.toggleModal}>Login</ModalHeader>
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
              <Button onClick={this.handleLogin}>Login</Button>
              {/* <Button type="submit" value="submit" color="primary">
                Login
              </Button> */}
            </Form>
          </ModalBody>
        </Modal>
      </>
    );
  }
}
export default Header;
