/* eslint-disable no-unused-vars */

import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/auth';
import axios from 'axios';
import Popular_Movies from './Popular_Movies';

const Home = () => {
  import('react-router-dom').NavigateFunction = useNavigate();
  const [auth, setAuth] = useAuth();
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/v1/trendingMovies");
        console.log(response.data.movies);
        setMovies(response.data.movies);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();

    const handleBeforeUnload = (event) => {
      event.preventDefault();
      event.returnValue = '';
      return '';
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };

  }, []);
  const name = (localStorage.getItem("name"));
  const email = (localStorage.getItem("email"));
  return (
    <div className="container-fluid align-items-center d-inline-block">
        <h2 className="text-capitalize text-center text-decoration-underline strong card-header heading mb-5 mt-2">
         Popular Movies
        </h2>
    <div className='container'>
      <div className="row justify-content-center">
        {movies.map((element, index) => (
          <div className="data col-lg-4 mb-5 col-md-5 col-12" key={index}>
            <Popular_Movies
              title={element.title ? element.title.slice(0, 40) : ""}
              overview={element.overview ? element.overview.slice(0, 80) : ""}
              poster_path={element.poster_path}
              release_date={element.release_date ? element.release_date.slice(0, 10) : ""}
            />
          </div>
        ))}
      </div>
    </div>
  </div>
  );
  
}

export default Home
