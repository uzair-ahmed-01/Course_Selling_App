import mongoose from "mongoose";
import DB_NAME from "../constants.js";

// const connectDB = async (DATABASE_URL) =>{
//     try{
//         const DB_OPTION ={
//             dbName :"courses"
//         }
//         await mongoose.connect(DATABASE_URL,DB_OPTION)
//         console.log("Connected Successfully...");
//     }catch(error){
//         console.log(error);
//     }
// }

// const connectDB = async () => {
//     try {
//         const connectionInstance = await mongoose.connect(`${process.env.DATABASE_URL}/${DB_NAME}`, {
//             useNewUrlParser: true,
//             useUnifiedTopology: true,
//         });

//         console.log(`MongoDB connected!! DB HOST: ${connectionInstance.connection.host}`);
//     } catch (error) {
//         console.error("MongoDB connection FAILED", error);
//         process.exit(1);
//     }
// };

const connectDB = async() => {
    try {
        await mongoose.connect(`${process.env.DATABASE_URL}/${DB_NAME}`, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("MongoDB connected")

    }catch(error) {
        console.error("MongoDB connection FAILED", error);
        process.exit(1);
    }
}

export default connectDB;