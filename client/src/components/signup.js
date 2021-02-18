import axios from "axios";
import React, { Component } from "react";
import {
  Button,
  FormGroup,
  Form,
  Label,
  Input,
  Container,
  Modal,
  ModalBody,
  ModalHeader,
  ModalFooter,
  Card,
  CardBody,
  CardImg,
  Table,
  FormFeedback,
} from "reactstrap";

class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedFile: null,
      imagePreviewURL: null,
      isModalOpen: false,
      fullname: "",
      orgName: "",
      employeeId: "",
      mobile: "",
      email: "",
      password: "",
      passwordConfirm: "",
    };
    this.fileChangedHandler = this.fileChangedHandler.bind(this);
    this.toggleModal = this.toggleModal.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSignup = this.handleSignup.bind(this);
  }
  toggleModal() {
    this.setState({
      isModalOpen: !this.state.isModalOpen,
    });
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value,
    });
  }

  fileChangedHandler = (event) => {
    this.setState({
      selectedFile: event.target.files[0],
    });

    let reader = new FileReader();

    reader.onloadend = () => {
      this.setState({
        imagePreviewUrl: reader.result,
      });
    };

    reader.readAsDataURL(event.target.files[0]);
  };

  handleSignup = async (event) => {
    event.preventDefault();

    this.toggleModal();

    const formData = new FormData();
    formData.append("fullname", this.state.fullname);
    formData.append("orgName", this.state.orgName);
    formData.append("employeeId", this.state.employeeId);
    formData.append("mobile", this.state.mobile);
    formData.append("email", this.state.email);
    formData.append("password", this.state.password);
    formData.append("passwordConfirm", this.state.passwordConfirm);

    formData.append("photo", this.state.selectedFile);
    try {
      const res = await axios({
        url: "http://localhost:8000/api/v1/users/signup",
        method: "POST",
        data: formData,
        headers: {
          Accept: "application/json",
          "Content-Type": "multipart/form-data",
        },

        withCredentials: true,
      });

      if (res.data.status === "success") {
        // this.toggleModal();

        alert(`Success! Created user with id: ${res.data.data.user._id}`);
        // console.log(res);
      }
    } catch (err) {
      // this.toggleModal();
      alert(`Failed!`);
      console.log(err);
    }
  };

  render() {
    let $imagePreview = (
      <div className="previewText image-container">
        Please select an Image for Preview
      </div>
    );
    if (this.state.imagePreviewUrl) {
      $imagePreview = (
        <CardImg
          className="card-img-sm"
          width="100%"
          src={this.state.imagePreviewUrl}
          alt="Card image cap"
        />
      );
    }

    return (
      <>
        <Container className="container-fluid">
          <div className="row">
            <div className="col-12">
              <h3>Get Started</h3>
              <hr />
            </div>
          </div>
          <Form className="sm">
            <FormGroup row>
              <Label className="col-md-2">Name:</Label>
              <Input
                className="col-md-8"
                type="text"
                name="fullname"
                id="fullname"
                placeholder="your name"
                value={this.state.fullname}
                onChange={this.handleInputChange}
                required
              />
              <FormFeedback>Please enter a name</FormFeedback>
            </FormGroup>
            <FormGroup row>
              <Label className="col-md-2">Organisation:</Label>
              <Input
                className="col-md-8"
                type="text"
                name="orgName"
                id="orgName"
                placeholder="your organisation's name"
                value={this.state.orgName}
                onChange={this.handleInputChange}
                required
              />
            </FormGroup>
            <FormGroup row>
              <Label className="col-md-2">EmployeeId:</Label>
              <Input
                className="col-md-8"
                type="text"
                name="employeeId"
                id="employeeId"
                placeholder="your employee ID"
                value={this.state.employeeId}
                onChange={this.handleInputChange}
                required
              />
            </FormGroup>
            <FormGroup row>
              <Label className="col-md-2">Mobile:</Label>
              <Input
                className="col-md-8"
                type="tel"
                name="mobile"
                id="mobile"
                placeholder="your mobile number"
                value={this.state.mobile}
                onChange={this.handleInputChange}
                required
              />
            </FormGroup>
            <FormGroup row>
              <Label className="col-md-2">Email:</Label>
              <Input
                className="col-md-8"
                type="email"
                name="email"
                id="email"
                placeholder="your email"
                value={this.state.email}
                onChange={this.handleInputChange}
                required
              />
            </FormGroup>

            <FormGroup row>
              <Label className="col-md-2">Choose a photo:</Label>
              <Input
                className="col-md-8"
                type="file"
                name="photo"
                onChange={this.fileChangedHandler}
                required
              />
            </FormGroup>
            <FormGroup row>
              <Label className="col-md-2">Password:</Label>
              <Input
                className="col-md-8"
                type="password"
                name="password"
                placeholder="*********"
                onChange={this.handleInputChange}
                required
              />
            </FormGroup>
            <FormGroup row>
              <Label className="col-md-2">Password confirm:</Label>
              <Input
                className="col-md-8"
                type="password"
                name="passwordConfirm"
                placeholder="*********"
                onChange={this.handleInputChange}
                valid={
                  this.state.password !== "" &&
                  this.state.password === this.state.passwordConfirm
                }
                invalid={this.state.password !== this.state.passwordConfirm}
                required
              />
            </FormGroup>
            <FormGroup row>
              <Button
                disabled={
                  this.state.fullname === "" ||
                  this.state.orgName === "" ||
                  this.state.mobile === "" ||
                  this.state.employeeId === "" ||
                  this.state.email === "" ||
                  this.state.selectedFile == null
                }
                onClick={this.toggleModal}
              >
                Get Preview
              </Button>
            </FormGroup>
          </Form>
        </Container>

        <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
          <ModalHeader toggle={this.toggleModal}>Preview</ModalHeader>
          <ModalBody>
            <Card>
              {$imagePreview}
              <CardBody>
                <Table>
                  <tbody>
                    <tr>
                      <th>Name</th>
                      <td>{this.state.fullname}</td>
                    </tr>
                    <tr>
                      <th>Organisation's Name</th>
                      <td>{this.state.orgName}</td>
                    </tr>
                    <tr>
                      <th>Employee ID</th>
                      <td>{this.state.employeeId}</td>
                    </tr>
                    <tr>
                      <th>Mobile</th>
                      <td>{this.state.mobile}</td>
                    </tr>
                    <tr>
                      <th>Email</th>
                      <td>{this.state.email}</td>
                    </tr>
                  </tbody>
                </Table>
              </CardBody>
            </Card>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.handleSignup}>
              Signup
            </Button>{" "}
            <Button color="secondary" onClick={this.toggleModal}>
              Cancel
            </Button>
          </ModalFooter>
        </Modal>
      </>
    );
  }
}

export default Signup;
