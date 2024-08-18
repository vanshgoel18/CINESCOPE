/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from 'react'

const Popular_Movies = (props) => {
    let { title, overview, release_date ,poster_path , backdrop_path } = props;
    return (
      <>
        <div >
          <div className="card d-flex justify-content-center" style={{ height: "25rem" }}>
            <img src={`https://image.tmdb.org/t/p/original${poster_path}`} className="card-img-top imageHeight" alt="Loading..."/>
            {release_date}
            <div className="card-body card">
              <h5 className="card-title">{title}...</h5>
              <p className="card-text">
  
                {overview}...
              </p>
              <a href="" target="__blank" className="btn btn-secondary btn-sm buttondata">
                Read More
              </a>
            </div>
          </div>
        </div>
      </>
    );
}

export default Popular_Movies
