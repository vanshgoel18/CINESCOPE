/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth, useMovie } from '../context/auth';
import axios from 'axios';
import { toast } from 'react-toastify';
// import { ToastContainer, toast } from 'react-toastify';


const Navbar = () => {
  const [movie, setMovie] = useMovie();
  // const [movieData, setMovieData] = useState([]);
  const [auth, setAuth] = useAuth();
  const [text, setText] = useState("");
  const [name , setName] = useState(localStorage.getItem("name"));
  const navigate = useNavigate();
  useEffect(()=>{
    setName(localStorage.getItem('name'));

  },[localStorage.getItem("name")]);
  const handleDeleteItem = () => {
    localStorage.clear();
    toast("Logout Successfully");
    navigate('/');
    console.log('Item deleted from localStorage');
  };

  const handleChange = (e) => {
    setText(e.target.value);
  };



  const submitQuery = async (e) => {
    e.preventDefault();
    const data = text;
    setText("");
    try {
      const response = await axios.get(`http://localhost:3000/api/v1/searchMovie/${data}`);

      // Inspect the response structure
      if (Array.isArray(response.data)) {
        // setMovieData(response.data);
        setMovie(response.data);
        navigate("/movie");
      } else {
        console.error('Expected an array in the response:', response.data);
        // setMovieData([response.data])
        setMovie([response.data])
        navigate("/movie");
      }
    } catch (error) {
      console.error('API request error:', error);
    }
  };


  return (
    <div>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <Link className="text-capitalize navbar-brand me-auto" id='navlogo' to="/">CineScope</Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <div className="navbar-nav me-auto">
            </div>
            <ul className='navbar-nav'>
              <li className="nav-item">
                {!localStorage.getItem('token') && <Link className="nav-link" to="/login">Login</Link>}
              </li>
            </ul>
            <form className="d-flex" role="search" onSubmit={submitQuery}>
              <input onChange={handleChange} className="form-control me-2" type="search" value={text} placeholder="Search" aria-label="Search" />
              <button className="btn btn-outline-success" type="submit">Search</button>
            </form>
            <ul className='navbar-nav'>

              <li className="nav-item">
                {localStorage.getItem('token') && <Link className="nav-link text-capitalize" to="/user-dashboard">{name} </Link>}
              </li>
            </ul>
            {localStorage.getItem('token') && <button className='btn' onClick={handleDeleteItem}><i className="bi bi-box-arrow-right"></i></button>}
          </div>
        </div>
      </nav>
    </div>
  )
}

export default Navbar;


