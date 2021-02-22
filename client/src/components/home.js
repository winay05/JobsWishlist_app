import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Container } from 'reactstrap';
import './../shared/main.css';

const Home = () => {
  return (
    <Container className="container-fluid">
      <div className="row">
        <div className="col-12 col-md-6">
          <hr />
          <h1>JobsWishlist</h1>
          <h3>A solution to keep watch on desired job openings</h3>
          <hr />
          <h4>So how does it work?</h4>
          <br />
          <ul>
            <li>
              Create a wishlist for jobs you want to watch and we'll let you
              know products.
            </li>
            <li>Manage all you applications through a dashboard.</li>
          </ul>
          <p>
            It is as simple as wishlisting your favourite products. Don't miss
            out on your dream jobs, get WishListing!
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
