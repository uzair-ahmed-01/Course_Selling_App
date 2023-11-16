import dotenv from 'dotenv'
dotenv.config()
import express from 'express'
import cors from 'cors'
import connectDB from './config/connectdb.js'
import userRoutes from './routes/userRoutes.js'
import adminRoutes from './routes/adminRoutes.js'


const app = express()
const port = process.env.PORT
const DATABASE_URL = process.env.DATABASE_URL

// CORS Policy
app.use(cors())

// Dabase Connection
connectDB(DATABASE_URL);

// Json
app.use(express.json());

// Load Routes
app.use("/users",userRoutes);
app.use("/admin",adminRoutes);

app.get("/",(req,res)=>{
res.send("Welcome to Course Selling App")
})

app.listen(port, () => {
    console.log(`Server Listening at http://localhost:${port}`)
})