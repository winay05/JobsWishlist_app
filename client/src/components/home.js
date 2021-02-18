import React from "react";
import { Link } from "react-router-dom";
import { Button, Container } from "reactstrap";
import "./../shared/main.css";

const Home = () => {
  return (
    <Container className="container-fluid">
      <div className="row">
        <div className="col-12 col-md-6">
          <hr />
          <h1>So how does it work?</h1>
          <br />
          <p>
            It is as simple as wishlisting your favourite products. Don't miss
            out on your dream jobs, get notified!
          </p>
          <Link to="/signup">
            <Button className="btn btn-lg">Get Started</Button>
          </Link>
        </div>
        <div className="col-12 col-md-6">
          <img
            className="img-fluid"
            src="/assets/images/cover.jpg"
            alt="logo"
          />
        </div>
      </div>
    </Container>
  );
};

export default Home;
