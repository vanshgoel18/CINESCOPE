import mongoose from "mongoose";

const movieSchema = new mongoose.Schema({
    title:{
        type: String,
        
    },
    overview:{
        type: String,
       
    },
    poster:{
        type: String,
        
    },
    release_date:{
        type: String,
       
    },
    
});

const MovieModel = mongoose.model("MovieModel", movieSchema);
export default MovieModel;

