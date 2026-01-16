import bcrypt from 'bcrypt';
import prisma from '../config/database.js';
import { generateToken, generateRefreshToken } from '../middleware/authMiddleware.js';
import { getLocationFromIP, parseUserAgent, getClientIP } from '../services/geolocationService.js';

const SALT_ROUNDS = 10;

// Register new user
export const register = async (req, res) => {
    try {
        const { email, password, name, company } = req.validatedBody;

        // Check if user already exists
        const existingUser = await prisma.user.findUnique({
            where: { email }
        });

        if (existingUser) {
            return res.status(409).json({
                success: false,
                message: 'User with this email already exists'
            });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

        // Create user
        const user = await prisma.user.create({
            data: {
                email,
                password: hashedPassword,
                name,
                company: company || null,
                role: 'INVESTOR'
            },
            select: {
                id: true,
                email: true,
                name: true,
                company: true,
                role: true,
                createdAt: true
            }
        });

        res.status(201).json({
            success: true,
            message: 'Account created successfully',
            data: { user }
        });
    } catch (error) {
        console.error('Registration error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to create account'
        });
    }
};

// Login user
export const login = async (req, res) => {
    try {
        const { email, password } = req.validatedBody;

        // Find user
        const user = await prisma.user.findUnique({
            where: { email }
        });

        if (!user) {
            return res.status(401).json({
                success: false,
                message: 'Invalid email or password'
            });
        }

        // Verify password
        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return res.status(401).json({
                success: false,
                message: 'Invalid email or password'
            });
        }

        // Get IP and location
        const ipAddress = getClientIP(req);
        const location = await getLocationFromIP(ipAddress);
        const userAgentInfo = parseUserAgent(req.headers['user-agent']);

        // Create session
        const session = await prisma.session.create({
            data: {
                userId: user.id,
                token: '', // Will be updated with JWT
                ipAddress,
                city: location.city,
                country: location.country,
                latitude: location.latitude,
                longitude: location.longitude,
                userAgent: req.headers['user-agent'] || null,
                device: userAgentInfo.device,
                browser: userAgentInfo.browser,
                isActive: true
            }
        });

        // Generate JWT token
        const token = generateToken(user.id, session.id);
        const refreshToken = generateRefreshToken(user.id);

        // Update session with token
        await prisma.session.update({
            where: { id: session.id },
            data: { token }
        });

        // Return user data and token
        res.json({
            success: true,
            message: 'Login successful',
            data: {
                user: {
                    id: user.id,
                    email: user.email,
                    name: user.name,
                    company: user.company,
                    role: user.role
                },
                token,
                refreshToken,
                session: {
                    id: session.id,
                    loginTime: session.loginTime,
                    location: {
                        city: location.city,
                        country: location.country
                    }
                }
            }
        });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({
            success: false,
            message: 'Login failed'
        });
    }
};

// Logout user
export const logout = async (req, res) => {
    try {
        const sessionId = req.session.id;

        // Calculate session duration
        const session = await prisma.session.findUnique({
            where: { id: sessionId }
        });

        const duration = Math.floor((Date.now() - new Date(session.loginTime).getTime()) / 1000);

        // Update session
        await prisma.session.update({
            where: { id: sessionId },
            data: {
                isActive: false,
                logoutTime: new Date(),
                duration
            }
        });

        res.json({
            success: true,
            message: 'Logged out successfully'
        });
    } catch (error) {
        console.error('Logout error:', error);
        res.status(500).json({
            success: false,
            message: 'Logout failed'
        });
    }
};

// Get current user info
export const getCurrentUser = async (req, res) => {
    try {
        const user = await prisma.user.findUnique({
            where: { id: req.user.id },
            select: {
                id: true,
                email: true,
                name: true,
                company: true,
                role: true,
                createdAt: true
            }
        });

        res.json({
            success: true,
            data: { user }
        });
    } catch (error) {
        console.error('Get user error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to get user info'
        });
    }
};

// Refresh token
export const refreshToken = async (req, res) => {
    try {
        const { refreshToken } = req.body;

        if (!refreshToken) {
            return res.status(400).json({
                success: false,
                message: 'Refresh token required'
            });
        }

        // Verify refresh token
        const decoded = jwt.verify(refreshToken, process.env.JWT_SECRET);

        if (decoded.type !== 'refresh') {
            return res.status(401).json({
                success: false,
                message: 'Invalid refresh token'
            });
        }

        // Create new session
        const ipAddress = getClientIP(req);
        const location = await getLocationFromIP(ipAddress);
        const userAgentInfo = parseUserAgent(req.headers['user-agent']);

        const session = await prisma.session.create({
            data: {
                userId: decoded.userId,
                token: '',
                ipAddress,
                city: location.city,
                country: location.country,
                latitude: location.latitude,
                longitude: location.longitude,
                userAgent: req.headers['user-agent'] || null,
                device: userAgentInfo.device,
                browser: userAgentInfo.browser,
                isActive: true
            }
        });

        const newToken = generateToken(decoded.userId, session.id);
        const newRefreshToken = generateRefreshToken(decoded.userId);

        await prisma.session.update({
            where: { id: session.id },
            data: { token: newToken }
        });

        res.json({
            success: true,
            data: {
                token: newToken,
                refreshToken: newRefreshToken
            }
        });
    } catch (error) {
        console.error('Refresh token error:', error);
        res.status(401).json({
            success: false,
            message: 'Invalid or expired refresh token'
        });
    }
};
