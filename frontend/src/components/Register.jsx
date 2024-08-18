/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
import { useNavigate , Link } from 'react-router-dom'
import axios from "axios"

const Register = () => {
    const navigate = useNavigate();

    const [user, setUser] = useState({
        name: "",
        email: "",
        phone:"",
        password: ""
    })

    const inputHandler = (e) => {
        const { name, value } = e.target;
        setUser({ ...user, [name]: value });
        console.log(user);
        // console.log(name);
        // console.log(value);
    }

    const submitForm = async (e) => {

        e.preventDefault();
        
        await axios.post("http://localhost:3000/api/v1/register", user).then((response) => {
            console.log(response);
            navigate("/login");
        }).catch((error) => {
            console.log(error);
        })
    }
    return (
        <div className='d-flex align-item-center justify-content-center bg-body-secondary p-2'>
           
            <form className='border border-primary p-5 m-5 w-50' onSubmit={submitForm}>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Name</label>
                    <input onChange={inputHandler} type="text" className="form-control" required name='name' id="name" />
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input onChange={inputHandler} type="email" className="form-control"  required name='email' id="email" aria-describedby="emailHelp" />
                </div>
                <div className="mb-3">
                    <label htmlFor="phone" className="form-label">Phone</label>
                    <input onChange={inputHandler} type='tel' min={10} maxLength={10} required className="form-control" name='phone' id="phone" aria-describedby="emailHelp" />
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input onChange={inputHandler} type="password" className="form-control" required name='password' id="password" />
                </div>
                <input type="reset" className='btn' value="Reset" />
               <center> <button type="submit" className="btn btn-primary">Submit</button></center>
            <center className='mt-5 p-1'>Already Registered? <Link to={'/login'}>Login</Link>  </center>
            </form>
        </div>
    )
}

export default Register
