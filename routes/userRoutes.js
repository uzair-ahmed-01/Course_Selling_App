import express from 'express';
const router = express.Router();
import userControllers from '../controllers/userControllers.js';
import authenticateJwt from '../middlerwares/auth_middleware.js'


// Public Routes
router.post('/signup', userControllers.userRegistration);
router.post('/login', userControllers.userLogin);

// Private Routes
router.get('/courses', authenticateJwt, userControllers.getAllCourses);
router.post('/courses/:courseId', authenticateJwt, userControllers.buyCourses);
router.get('/courses/purchasedCourses', authenticateJwt, userControllers.purchasedCourses);

export default router;
