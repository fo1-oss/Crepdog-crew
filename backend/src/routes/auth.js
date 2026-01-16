import express from 'express';
import { authMiddleware, adminOnly } from '../middleware/authMiddleware.js';
import { validate, registerSchema, loginSchema } from '../utils/validators.js';
import * as authController from '../controllers/authController.js';

const router = express.Router();

// Public routes
router.post('/register', validate(registerSchema), authController.register);
router.post('/login', validate(loginSchema), authController.login);

// Protected routes
router.post('/logout', authMiddleware, authController.logout);
router.get('/me', authMiddleware, authController.getCurrentUser);
router.post('/refresh', authController.refreshToken);

export default router;
