/* eslint-disable no-unused-vars */
// import React, { useState } from 'react'
// import { Link, useNavigate } from 'react-router-dom';
// import { useAuth, useMovie } from '../context/auth';

// import axios from 'axios';
// const Navbar = () => {
//   const [movie, setMovie] = useMovie();
// const [movieData, setMovieData] = useState([]);
//   const [auth, setAuth] = useAuth();
//   const name = localStorage.getItem('name');
//   const [text, setText] = useState("");
//   const navigate = useNavigate();
//   const handleDeleteItem = () => {
//     localStorage.clear();
//     navigate('/');

//     console.log('Item deleted from localStorage');
//   };
//   const handleChange = (e) => {
//     // console.log(e.target.value);
//     setText(e.target.value);
//   };


//   const submitQuery = async (e) => {
//     e.preventDefault();
//     // console.log(text);
//     const data = text;
//     setText("")
//     try {
//       await axios.get(`http://localhost:3000/api/v1/searchMovie/${data}`).then((response) => {
//         console.log(response.data);


//         setMovieData(response.data);
//         console.log("hgfjk");

//       }).catch((err) => {
//         console.log(err);
//       })

//       console.log(movieData);

//     } catch (error) {
//       console.log(error)
//     }

//   }
//   return (
//     <div>
//       <nav className="navbar navbar-expand-lg bg-body-tertiary">
//         <div className="container-fluid">
//           <Link className="text-capitalize navbar-brand me-auto  " to="/">CineScope</Link>
//           <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
//             <span className="navbar-toggler-icon"></span>
//           </button>
//           <div className="collapse navbar-collapse " id="navbarNav">

//             <div className="navbar-nav me-auto">
//             </div>
//             <ul className='navbar-nav'>
//               {/* <li className="nav-item">
//         <Link className="nav-link" aria-current="page" to="/register">Register</Link>
//         </li> */}
//               <li>
//                 <h1>Movie Information</h1>

//               {movieData}

//               </li>

//               <li className="nav-item">
//                 {!localStorage.getItem('token') && <Link className="nav-link" to="/login">Login</Link>}
//               </li>
//               <li className="nav-item">
//                 {localStorage.getItem('token') && <Link className="nav-link" to="/user-dashboard">{name} </Link>}
//               </li>
//             </ul>
//             <form className="d-flex" role="search" onSubmit={submitQuery}>
//               <input onChange={handleChange} className="form-control me-2" type="search" value={text} placeholder="Search" aria-label="Search" />
//               <button className="btn btn-outline-success" type="submit">Search</button>
//             </form>
//             {localStorage.getItem('token') && <button className='btn' onClick={handleDeleteItem}><i class="bi bi-box-arrow-right"></i></button>}
//           </div>

//         </div>
//       </nav>
//     </div>
//   )
// }

// export default Navbar


// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth, useMovie } from '../context/auth';
import axios from 'axios';

const Navbar = () => {
  const [movie, setMovie] = useMovie();
  // const [movieData, setMovieData] = useState([]);
  const [auth, setAuth] = useAuth();
  const name = localStorage.getItem('name');
  const [text, setText] = useState("");
  const navigate = useNavigate();

  const handleDeleteItem = () => {
    localStorage.clear();
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
          <Link className="text-capitalize navbar-brand me-auto" to="/">CineScope</Link>
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


