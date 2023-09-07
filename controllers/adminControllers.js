import Admin from "../models/Admin.js";
import Course from "../models/Course.js";
import dotenv from 'dotenv'
import mongoose from "mongoose";
dotenv.config()
import jwt from "jsonwebtoken";

var SECRET = process.env.JWT_SECRET_KEY;

class AdminController {


    static adminRegistration = async (req, res) => {
        const { username, password } = req.body;
        function callback(admin) {
            if (admin) {
                res.status(403).json({ message: "Admin already exists" });
            } else {
                const obj = { username: username, password: password };
                const newAdmin = new Admin(obj);
                newAdmin.save();
                const token = jwt.sign({ username, role: "admin" }, SECRET, {
                    expiresIn: "1h",
                });
                res.json({ message: "Admin created successfully", token });
            }
        }
        Admin.findOne({ username }).then(callback);
    }

    static adminLogin = async (req, res) => {
        const { username, password } = req.headers;
        const admin = await Admin.findOne({ username, password });
        if (admin) {
            const token = jwt.sign({ username, role: "admin" }, SECRET, {
                expiresIn: "1h",
            });
            res.json({ message: "Logged in successfully", token });
        } else {
            res.status(403).json({ message: "Invalid username or password" });
        }
    }

    static addAdminCourses = async (req, res) => {
        const course = new Course(req.body);
        await course.save();
        res.json({ message: "Course created successfully", courseId: course.id });
    }

    static adminUpdateCourses = async (req, res) => {
        const courseId = req.params.courseId;
        // Check if courseId is a valid ObjectId
        if (!mongoose.Types.ObjectId.isValid(courseId)) {
            return res.status(400).json({ message: "Invalid courseId" });
        }
        try {
            const updatedCourse = await Course.findByIdAndUpdate(courseId, req.body, { new: true });
            if (!updatedCourse) {
                return res.status(404).json({ message: "Course not found" });
            }
            return res.json({ message: "Course updated successfully", course: updatedCourse });
        } catch (error) {
            // Handle any errors that might occur during the update process
            console.error(error);
            return res.status(500).json({ message: "Internal Server Error" });
        }
    }

    static getAllCourses = async (req, res) => {
        const courses = await Course.find({});
        res.json({ courses });
    }

}

export default AdminController;