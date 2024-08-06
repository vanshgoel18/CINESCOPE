import { comparePassword, hashPassword } from "../helper/authHelper.js";
import UserModel from "../models/userModel.js";
import jwt from "jsonwebtoken";
import MovieModel from './../models/movieModel.js';
import FavouriteModel from './../models/FavouriteModel.js';

export const Home = async (req, res) => {
  try {
    res.send("home page");
  } catch (err) {
    console.log(err);
  }
};

export const Profile = async (req, res) => {
  try {
    const token = req.body.token;
    if (!token) {
      return res.status(400).send("Please provide a token.");
    }

    let decoded;
    try {
      decoded = jwt.verify(token, "asdfksahfsakjdfj");
    } catch (err) {
      if (err.name === "TokenExpiredError") {
        return res.status(401).send("Token has expired, please log in again.");
      } else if (err.name === "JsonWebTokenError") {
        return res.status(401).send("Invalid token, please log in again.");
      } else {
        return res
          .status(500)
          .send("An error occurred while verifying the token.");
      }
    }

    if (!decoded) {
      return res.status(401).send("Ivalid token, please log in again.");
    }

    console.log(decoded._id);
    const activeUser = await UserModel.findById(decoded._id);
    if (!activeUser) {
      return res.status(404).send("User not found.");
    }

    const { name, email } = activeUser;

    res.send({
      msg: "You are an active user",
      name,
      email,
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("An error occurred.");
  }
};
export const Unauthorize = async (req, res) => {
  try {
    await res.status(401).send("Unauthorized URL access");
  } catch (err) {
    console.log(err);
    res.status(500).send("Internal Server Error");
  }
};

export const registerController = async (req, res) => {
  try {
    const { name, email, phone, password } = req.body;
    if (!name) {
      return res.send({ error: "Name is required" });
    }
    if (!email) {
      return res.send({ error: "Email is required" });
    }
    if (!password) {
      return res.send({ error: "Password is required" });
    }

    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      return res.status(200).send({
        success: true,
        message: "Already registered, please login",
      });
    }

    const hashedPassword = await hashPassword(password);
    const user = await new UserModel({
      name,
      email,
      phone,
      password: hashedPassword,
    }).save();

    res.send({
      success: true,
      message: "User registered successfully",
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in registration",
      error,
    });
  }
};

export const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if email or password is missing
    if (!email || !password) {
      return res.status(400).send({
        success: false,
        message: "Invalid email or password",
      });
    }

    // Find the user
    const user = await UserModel.findOne({ email });

    // Check if user exists
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "Email is not registered",
      });
    }

    // Compare passwords
    const match = await comparePassword(password, user.password);
    if (!match) {
      return res.status(400).send({
        success: false,
        message: "Incorrect password",
      });
    }

    const JWT_SECRET = "asdfksahfsakjdfj";
    // Generate token
    const token = jwt.sign({ _id: user._id }, JWT_SECRET, { expiresIn: "60" });

    res.status(200).send({
      success: true,
      message: "Login successful",
      token: token,
      user: {
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in login",
      error,
    });
  }
};

export const Trending_Movies = async (req, res) => {
  try {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzZDU1ZjM5ZDQzZmFkZjAyMzI3ZWU2MTdkOTQ2Mzc5MSIsIm5iZiI6MTcyMTgwMDUwOS4wMjE1ODMsInN1YiI6IjY2YTA5NjA0OGU3NTk2YjdjN2JmNjExNCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.q8Y7t03f7zog3lf0WTzHoYJMER1S4zCLe6_wQVK7OPo",
      },
    };

    const response = await fetch(
      "https://api.themoviedb.org/3/trending/movie/day?language=en-US",
      options
    );
    const data = await response.json();
    const movies = data.results;
    res.send({
      success: true,
      movies,
    });
    // movies.forEach((movie) => {
    //   console.log(movie.title);
    // });
  } catch (error) {
    console.log(error);
  }
};



export const popular_Movies = async (req, res) => {
  try {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzZDU1ZjM5ZDQzZmFkZjAyMzI3ZWU2MTdkOTQ2Mzc5MSIsIm5iZiI6MTcyMTgwMDUwOS4wMjE1ODMsInN1YiI6IjY2YTA5NjA0OGU3NTk2YjdjN2JmNjExNCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.q8Y7t03f7zog3lf0WTzHoYJMER1S4zCLe6_wQVK7OPo",
      },
    };

    const response = await fetch("https://api.themoviedb.org/3/movie/popular?language=en-US&page=1", options);
    const data = await response.json();

    // Map results to create database entries and log movie details
    const promises = data.results.map(async (movie) => {
      
      await MovieModel.create({
        title: movie.title,
        release_date: movie.release_date,
        poster: movie.poster_path,
        overview: movie.overview,
      });
    });

    // Wait for all create operations to complete
    await Promise.all(promises);

    // Send response after all operations are complete
    res.send({
      success: true,
      message: 'Movies fetched and stored successfully.',
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      success: false,
      message: 'Failed to fetch popular movies.',
    });
  }
};

export const SearchMovie = async(req,res)=>{
  const query = req.params.query; 
  try {
    const url = `http://www.omdbapi.com/?t=${query}&apikey=c6132f0a`;
    console.log(url);
    const response = await fetch(url);
    const data = await response.json();
    // console.log(data);
    res.send(data)
  } catch (error) {
    
  }
  // res.send({movieName: req.params.query});
}


// export const FavouriteMovie = async(req,res)=>{
//   console.log(req.body[0].Title);
//   res.send("trdyfuguitdfk")
//   await FavouriteModel.create({title: req.body[0].Title,
//     release_date: req.body[0].Released,
//     overview: req.body[0].Plot
//   });
// }

export const FavouriteMovie = async (req, res) => {
  try {
    const { email, movie } = req.body;
    console.log(email);
    const m = {
      title: movie[0].Title,
      release_date: movie[0].Released,
      overview: movie[0].Plot,

    }
    // console.log(movie[0].Director);
    console.log(m);

    // Validate the incoming movie data
    // if (!movie ) {
    //     return res.status(400).json({ error: 'Invalid movie data provided.' });
    // }

    // Find the user's favourite document and update it
    const updatedFavourite = await FavouriteModel.findOneAndUpdate(
        { email: email }, // Filter by email
        { $push: { movies: m } }, // Push the new movie into the movies array
        { new: true, upsert: true } // Return the updated document, create if not exists
    );

    res.status(200).json({ message: 'Movie added successfully!', updatedFavourite });
} catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to add movie to favourites.' });
}
};




export const fetchFavourite = async (req, res) => {
  try {
  console.log(req.body.email);
    const favourites = await FavouriteModel.find({email: req.body.email});
    // console.log(favourites)
res.send(favourites);
// console.log(typeof(favourites))
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while fetching favorites.' });
  }
};

export const updateUser = async (req, res) => {
  try {
    const { email, name, phone, password } = req.body;
    console.log(req.body);

    // Check if the user exists
    const user = await UserModel.findOne({ email: email });
    if (!user) {
      return res.status(401).send("Invalid user");
    }

    const hashedPassword = await hashPassword(password);
    // Update user data
    const updatedUser = await UserModel.findOneAndUpdate(
      { email :email },
      { name, phone, password: hashedPassword, },
      { new: true } // Return the updated document
    );

    if (updatedUser) {
      res.status(200).send(updatedUser);
    } else {
      res.status(400).send("Failed to update user");
    }
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).send("Internal server error");
  }
}
