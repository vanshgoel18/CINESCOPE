import express from "express"
import { deleteFavourite, FavouriteMovie, fetchFavourite, loginController, popular_Movies, Profile, registerController, SearchMovie, Trending_Movies, Unauthorize, updateUser } from "../controller/authController.js";

const router = express.Router();



router.get("/", );
router.post("/register", registerController);
router.post("/login", loginController);
router.put("/user/update",updateUser );
router.post("/profile",Profile);
router.get("/trendingMovies", Trending_Movies)
router.get("/popularMovies", popular_Movies)
router.get("/searchMovie/:query" , SearchMovie);
router.post("/addToFavourite",FavouriteMovie);
router.post("/fetchFavourite",fetchFavourite);
router.put("/deleteFavourite",deleteFavourite);
router.get("/*",Unauthorize);


export default router;