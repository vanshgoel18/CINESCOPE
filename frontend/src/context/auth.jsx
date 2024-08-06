/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import axios from "axios";
import React, { useState, useContext, createContext, useEffect } from "react";

const AuthContext = createContext();
const MovieContext = createContext();

const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState({
        user: null,
        token: ""
    });

    const [movie , setMovie] = useState([]);

    axios.defaults.headers.common["Authorization"]=auth?.token;

    useEffect(()=>{
       const data = localStorage.getItem('auth');
       if(data){
        const parseData = JSON.parse(data);
        setAuth({
            ...auth,
            user:parseData.user,
            token: parseData.token
        })
        
       } 
    }, []);

    return (
        <>
       <AuthContext.Provider value={[auth, setAuth]}>
            <MovieContext.Provider value={[movie, setMovie]}>
                {children}
            </MovieContext.Provider>
        </AuthContext.Provider>
        </>
    );
};

const useAuth = () => useContext(AuthContext);
const useMovie =()=> useContext(MovieContext);

export { useAuth, AuthProvider ,useMovie};
