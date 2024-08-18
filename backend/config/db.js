import mongoose from "mongoose";
const connectDB = async()=>{
    try{
        
        await mongoose.connect(process.env.MONGO_URL).then(()=>{
            console.log(`connected to the database successfully`);
        }).catch((err)=>{
            console.log("error in connection database" ,err);
        })

    }
    catch(error){
        console.log(error);
    }
}

export default connectDB;