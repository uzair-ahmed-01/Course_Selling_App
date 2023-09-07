import mongoose from "mongoose";

// Defining Schema
const courseSchema = new mongoose.Schema({
    title: String,
    description: String,
    price: Number,
    imageLink: String,
    published: Boolean
  });

// Model
const Course = mongoose.model('Course', courseSchema);

export default Course