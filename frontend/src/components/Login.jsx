/* eslint-disable no-unused-vars */
import React, { useState , useEffect } from 'react'
import { useNavigate ,Link } from 'react-router-dom'
import axios from "axios"
import { toast } from 'react-toastify';
  
import { useAuth } from '../context/auth';
const Login = () => {

    const [auth, setAuth]= useAuth();
        const navigate = useNavigate();

    const [user, setUser] = useState({
        email: "",
        password: ""
    })
    const inputHandler = (e) => {
        const { name, value } = e.target;
        setUser({ ...user, [name]: value });
        console.log(user);
       
    }


    const submitForm = async (e) => {
        e.preventDefault();

        
        try {
           
            await axios.post("http://localhost:3000/api/v1/login", user).then((response) => {
                toast.success(response.data.message);
                if (response.data.token) {
                    localStorage.setItem('token' , response.data.token);
                    localStorage.setItem('name' ,(response.data.user.name));
                    localStorage.setItem('email' ,(response.data.user.email));
                    setAuth({
                        ...auth , 
                        user:response.data.user,
                        token: response.data.token
                    })
                    navigate('/');
                    setUser({
                        email: "",
                        password: ""
                    });  
                }
                else{
                    localStorage.clear();
                }
            }).catch((err)=>{
                console.log(err);
            })
  


        } catch (error) {
            console.log(error);
        }
    };
    return (
        <div className='d-flex align-item-center justify-content-center p-2'>
           
        <form className='border p-5 m-5 w-50' onSubmit={submitForm}>
          
            <div className="mb-3">
                <label htmlFor="email" className="form-label">Email address</label>
                <input onChange={inputHandler} type="email" className="form-control"  required name='email' id="email" aria-describedby="emailHelp" />
            </div>
          
            <div className="mb-3">
                <label htmlFor="password" className="form-label">Password</label>
                <input onChange={inputHandler} type="password" className="form-control" required name='password' id="password" />
            </div>
            <input type="reset" className='btn' value="Reset" />
           <center> <button type="submit" className="btn btn-primary">Submit</button></center>
        <center className='mt-5 p-1'>New User? <Link to={'/register'}>Register</Link>  </center>
        </form>
    </div>
    )
}

export default Login

