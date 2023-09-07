import User from "../models/User.js";
import Course from "../models/Course.js";
import dotenv from 'dotenv'
dotenv.config()
import jwt from "jsonwebtoken";

var SECRET = process.env.JWT_SECRET_KEY;

class UserController {

    static userRegistration = async (req, res) => {
        const { username, password } = req.body;
        const user = await User.findOne({ username });
        if (user) {
            res.status(403).json({ message: "User already exists" });
        } else {
            const newUser = new User({ username, password });
            await newUser.save();
            const token = jwt.sign({ username, role: "user" }, SECRET, {
                expiresIn: "1h",
            });
            res.json({ message: "User created successfully", token });
        }
    }

    static userLogin = async (req, res) => {
        const { username, password } = req.headers;
        const user = await User.findOne({ username, password });
        if (user) {
            const token = jwt.sign({ username, role: "user" }, SECRET, {
                expiresIn: "1h",
            });
            res.json({ message: "Logged in successfully", token });
        } else {
            res.status(403).json({ message: "Invalid username or password" });
        }
    }

    static getAllCourses = async (req, res) => {
        const courses = await Course.find({ published: true });
        res.json({ courses });
    }

    static buyCourses = async (req, res) => {
        const course = await Course.findById(req.params.courseId);
        console.log(course);
        if (course) {
            const user = await User.findOne({ username: req.user.username });
            if (user) {
                user.purchasedCourses.push(course);
                await user.save();
                res.json({ message: "Course purchased successfully" });
            } else {
                res.status(403).json({ message: "User not found" });
            }
        } else {
            res.status(404).json({ message: "Course not found" });
        }
    }

    static purchasedCourses = async (req, res) => {
        try {
          const user = await User.findOne({ username: req.user.username }).populate('purchasedCourses');
          if (user) {
            res.json({ purchasedCourses: user.purchasedCourses || [] });
          } else {
            res.status(403).json({ message: "User not found" });
          }
        } catch (error) {
          console.error(error);
          res.status(500).json({ message: "Internal Server Error" });
        }
      }

}

export default UserController;