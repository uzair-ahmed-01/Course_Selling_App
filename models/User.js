import mongoose from "mongoose";

// Defining Schema
const userSchema = new mongoose.Schema({
    username: {type: String},
    password: String,
    purchasedCourses: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Course' }]
  });

// Model
const User = mongoose.model('User', userSchema);

export default User

