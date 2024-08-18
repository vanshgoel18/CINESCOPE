import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

const FavouriteMovie = () => {
    const [favourite, setFavourite] = useState([]);
    const navigate = useNavigate();

    const fetchFavourite = async () => {
        try {
            const email = localStorage.getItem("email");
            console.log(email);
            const res = await axios.post("http://localhost:3000/api/v1/fetchFavourite", { email });
            console.log(res.data[0].movies);
            setFavourite(res.data[0].movies);
        } catch (err) {
            console.log(err);
        }
    };
    useEffect(() => {

        fetchFavourite();
    }, []);
    
    const handleDelete = async (id) => {
        try {
            const email = localStorage.getItem("email");
            await axios.put("http://localhost:3000/api/v1/deleteFavourite", { email, movieId: id }).then((res)=>{
                console.log(res.data.updatedFavourite.movies);
                fetchFavourite();
            }).catch((err)=>{
                console.log(err);
            })
      
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <>
        <div className="container mt-5">
     <center> <h1 className="mb-5">Favorite Movies</h1></center>
      <div className="row">


            {favourite.map((e, index) => {
                return (
                    <>
                        <div key={index} className="col-md-4 mb-4">
                            <div className="card h-100">
                                <div className="card-body">
                                    <h5 className="card-title">{e.title}</h5>
                                    <p className="card-text">{e.overview}</p>
                                </div>
                                <div className="card-footer">
                                    <div className="d-flex justify-content-between align-items-center">
                                        <span className="text-muted">Rating: /5</span>
                                        <button className="btn btn-danger" onClick={()=> handleDelete(e._id)}>Remove</button>
                                    </div>
                                </div>
                            </div>
                        </div>


                 
                    </>
                )
            })}
            </div>
            </div>

        </>
    );
}

export default FavouriteMovie;
