/* eslint-disable react/jsx-key */
/* eslint-disable no-unused-vars */
// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';
import { useMovie } from '../context/auth'; // Ensure this is correctly imported
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Modal, Button, Form } from 'react-bootstrap';

const Movie = () => {
  const [movie, setMovie] = useMovie(); // Get the movie data from context
  const [bgColor, setBgColor] = useState('');
  const handleClick = async () => {
    const t = confirm("do you want to add this to your favourite")

    console.log(movie);
    if (t) {
      const email = localStorage.getItem("email");
      await axios.post("http://localhost:3000/api/v1/addToFavourite", { email, movie }).then((res) => {
        console.log(res);
        setBgColor("danger");
      }).catch((err) => {
        console.error(err);
      })
    }
    else {
      setBgColor("");
    }

  }

  const [showModal, setShowModal] = useState(false);
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState('');

  const handleShow = () => setShowModal(true);
  const handleClose = () => setShowModal(false);

  const handleRatingChange = (newRating) => {
    setRating(newRating);
  };

  const handleReviewChange = (e) => {
    setReview(e.target.value);
  };

  const handleSubmit = () => {
    // Submit the rating and review
    console.log("Rating:", rating);
    console.log("Review:", review);
    handleClose();
  };


  return (
    <div>
      {/* <h1>Movies</h1> */}
      <div className="container-fluid mt-5">
        <div className="container p-5">
          <div className="row">
            <ul className="navbar-nav me-auto">
              <li className="nav-item">

                {Array.isArray(movie) && movie.map((e, index) => (


                  <div className="row mt-4">
                    <div className="col-md-4">
                      <img src={e.Poster} alt="Movie Poster" className="img-fluid" />
                    </div>
                    <div className="col-md-8">
                      <h2>{e.Title} (Movie Duration)</h2>
                      <div className="mb-2">
                        <span>Our Rating: 4.5/5</span> <br />
                        <span className="ml-3">Your Rating: _</span>
                      </div>
                      <div>  <Button variant="primary" onClick={handleShow}>
                        Rate & Review
                      </Button> </div> <br />
                      <div className="mb-3">
                        <button onClick={handleClick} className={`btn btn-outline-secondary bg-${bgColor}`}>
                          <i className="fas fa-heart"></i> Add to Favourites
                        </button>
                      </div>
                      <div>
                        <p>Description : {e.Plot}</p>
                      </div>
                      <div>
                        <p>Release Date: {e.Released}</p>


                      </div>
                    </div>
                  </div>

                  // <div key={index}>
                  //   <img src={e.Poster} alt="loading" />
                  //   <h3>{e.Title}</h3>
                  //   <button onClick={handleClick} className={`btn bg-${bgColor}`}><i  className="bi bi-heart-fill"></i></button>
                  //   <p>Year: {e.Year}</p>
                  //   <p>Genre: {e.Released}</p>
                  //   <p>Description: {e.Plot}</p>
                  // </div>
                ))}
                <Modal show={showModal} onHide={handleClose}>
                  <Modal.Header closeButton>
                    <Modal.Title>Rate & Review</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    <div className="text-center mb-3">

                    </div>
                    <h5 className="text-center">Movie Name</h5>
                    <div className="mb-3 text-center">
                      <span>Rate it: </span>
                      {[1, 2, 3, 4, 5].map((star) => (
                        <span
                          key={star}
                          style={{ cursor: 'pointer', color: star <= rating ? 'gold' : 'grey' }}
                          onClick={() => handleRatingChange(star)}
                        >
                          ★
                        </span>
                      ))}
                    </div>
                    <Form>
                      <Form.Group controlId="formReview">
                        <Form.Label>Review</Form.Label>
                        <Form.Control
                          as="textarea"
                          rows={3}
                          value={review}
                          onChange={handleReviewChange}
                        />
                      </Form.Group>
                    </Form>
                  </Modal.Body>
                  <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                      Close
                    </Button>
                    <Button variant="primary" onClick={handleSubmit}>
                      Submit
                    </Button>
                  </Modal.Footer>
                </Modal>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Movie;


