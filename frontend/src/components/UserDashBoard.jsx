// UserDashboard.jsx
// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const UserDashBoard = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState({
        email: localStorage.getItem("email"),
        name: '',
        phone: '',
        password: ""
    });


    const inputHandler = (e) => {
        const { name, value } = e.target;
        setUser({ ...user, [name]: value });
       
    };

    const submitForm = async (e) => {
        e.preventDefault();
       
        console.log(user)
        try {
            await axios.put('http://localhost:3000/api/v1/user/update', user)
                .then(response => {
                    console.log(response);

                    localStorage.setItem("name" , response.data.name);
                    setUser({
                        email: localStorage.getItem("email"),
                        name: '',
                        phone: '',
                        password: ""
                    });
                }).catch(err => {
                    console.log(err);
                });
        } catch (error) {
            alert("error");
            console.log(error);
        }
    };

    const handleLogout = () => {
        localStorage.clear();
        navigate("/");
    }

    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-3 bg-light p-3">
                    <div className="mb-3">
                        <h2>Logo</h2>
                    </div>
                    <ul className="nav flex-column">
                        <li className="nav-item">
                            <a className="nav-link active" href="/">Home</a>
                        </li>

                        <li className="nav-item">
                            <a className="nav-link" href="/user/favourite">Favourite</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="/user/rated">Rated</a>
                        </li>
                    </ul>
                    <button onClick={handleLogout} className="btn btn-danger mt-3">Logout</button>
                </div>
                <div className="col-md-9 p-4">
                    <h1>User Dashboard</h1>
                    <form onSubmit={submitForm}>
                        <div className="mb-3 row">
                            <label htmlFor="email" className="col-sm-2 col-form-label">Email</label>
                            <div className="col-sm-10">
                                <input type="email" className="form-control" id="email" value={user.email} readOnly name="email" onChange={inputHandler} />
                            </div>
                        </div>
                        <div className="mb-3 row">
                            <label htmlFor="name" className="col-sm-2 col-form-label">Name</label>
                            <div className="col-sm-10">
                                <input type="text" className="form-control" id="name" name="name" required  value={user.name} onChange={inputHandler} />
                            </div>
                        </div>

                        <div className="mb-3 row">
                            <label htmlFor="phone" className="col-sm-2 col-form-label">Phone</label>
                            <div className="col-sm-10">
                                <input type="text" className="form-control" id="phone" required name="phone" value={user.phone} onChange={inputHandler} />
                            </div>
                        </div>
                        <div className="mb-3 row">
                            <label htmlFor="password" className="col-sm-2 col-form-label">Password</label>
                            <div className="col-sm-10">
                                <input type="password" className="form-control" id="password" required value={user.password} name="password" onChange={inputHandler} />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-sm-10 offset-sm-2">
                                <button type="submit" className="btn btn-primary">Update/Save</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default UserDashBoard;
