import express from 'express';
const router = express.Router();
import adminController from '../controllers/adminControllers.js';
import authenticateJwt from '../middlerwares/auth_middleware.js'

// Public Routes
router.post('/signup', adminController.adminRegistration);
router.post('/login', adminController.adminLogin);

// Apply the middleware to protect private routes

// Private Routes
router.post('/courses', authenticateJwt, adminController.addAdminCourses);
router.put('/courses/:courseId', authenticateJwt, adminController.adminUpdateCourses);
router.get('/courses', authenticateJwt, adminController.getAllCourses);

export default router;
