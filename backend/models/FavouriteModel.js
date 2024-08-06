// import mongoose from "mongoose";

// const favouriteMovieSchema = new mongoose.Schema({
//     email:{
//         type:String,
//         require: true
//     },
//     movies: [

//         title:{
//             type: String,
            
//         },
//         overview:{
//             type: String,
           
//         },
//         // poster:{
//         //     type: String,
            
//         // },
//         release_date:{
//             type: String,
           
//         },
//     ]

    
// });

// const FavouriteModel = mongoose.model("FavouriteModel", favouriteMovieSchema);
// export default FavouriteModel;
import mongoose from "mongoose";

// Define the schema for a single movie object
const movieSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    overview: {
        type: String,
        required: true,
    },
    release_date: {
        type: String,
        required: true,
    },
});

const favouriteMovieSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
    },
    movies: [movieSchema], 
});

const FavouriteModel = mongoose.model("FavouriteModel", favouriteMovieSchema);
export default FavouriteModel;


