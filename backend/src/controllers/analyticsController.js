import prisma from '../config/database.js';

// Track page view
export const trackPageView = async (req, res) => {
    try {
        const { page, timeSpent, scrollDepth, interactions } = req.validatedBody;
        const userId = req.user.id;
        const sessionId = req.session.id;

        const pageView = await prisma.pageView.create({
            data: {
                sessionId,
                userId,
                page,
                timeSpent: timeSpent || 0,
                scrollDepth: scrollDepth || null,
                interactions: interactions || 0
            }
        });

        res.json({
            success: true,
            data: { pageView }
        });
    } catch (error) {
        console.error('Track pageview error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to track page view'
        });
    }
};

// Update session heartbeat (keep session alive)
export const sessionHeartbeat = async (req, res) => {
    try {
        const sessionId = req.session.id;

        await prisma.session.update({
            where: { id: sessionId },
            data: { lastActivity: new Date() }
        });

        res.json({
            success: true,
            message: 'Session updated'
        });
    } catch (error) {
        console.error('Heartbeat error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to update session'
        });
    }
};

// End session manually
export const endSession = async (req, res) => {
    try {
        const sessionId = req.session.id;

        const session = await prisma.session.findUnique({
            where: { id: sessionId }
        });

        const duration = Math.floor((Date.now() - new Date(session.loginTime).getTime()) / 1000);

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
            message: 'Session ended'
        });
    } catch (error) {
        console.error('End session error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to end session'
        });
    }
};

// Get analytics dashboard (admin only)
export const getAnalyticsDashboard = async (req, res) => {
    try {
        const { startDate, endDate, userId } = req.query;

        // Build filter
        const filter = {};
        if (startDate) filter.loginTime = { gte: new Date(startDate) };
        if (endDate) filter.loginTime = { ...filter.loginTime, lte: new Date(endDate) };
        if (userId) filter.userId = userId;

        // Get all sessions with page views
        const sessions = await prisma.session.findMany({
            where: filter,
            include: {
                user: {
                    select: {
                        id: true,
                        email: true,
                        name: true,
                        company: true
                    }
                },
                pageViews: true
            },
            orderBy: { loginTime: 'desc' }
        });

        // Calculate aggregate metrics
        const totalSessions = sessions.length;
        const activeSessions = sessions.filter(s => s.isActive).length;
        const avgDuration = sessions
            .filter(s => s.duration)
            .reduce((sum, s) => sum + s.duration, 0) / (sessions.filter(s => s.duration).length || 1);

        // Page engagement metrics
        const pageEngagement = {};
        sessions.forEach(session => {
            session.pageViews.forEach(pv => {
                if (!pageEngagement[pv.page]) {
                    pageEngagement[pv.page] = {
                        views: 0,
                        totalTime: 0,
                        avgTime: 0
                    };
                }
                pageEngagement[pv.page].views++;
                pageEngagement[pv.page].totalTime += pv.timeSpent;
            });
        });

        // Calculate averages
        Object.keys(pageEngagement).forEach(page => {
            pageEngagement[page].avgTime = Math.round(
                pageEngagement[page].totalTime / pageEngagement[page].views
            );
        });

        // Location breakdown
        const locationBreakdown = {};
        sessions.forEach(session => {
            const key = `${session.city}, ${session.country}`;
            locationBreakdown[key] = (locationBreakdown[key] || 0) + 1;
        });

        res.json({
            success: true,
            data: {
                summary: {
                    totalSessions,
                    activeSessions,
                    avgDuration: Math.round(avgDuration),
                    uniqueInvestors: new Set(sessions.map(s => s.userId)).size
                },
                pageEngagement,
                locationBreakdown,
                sessions: sessions.map(s => ({
                    id: s.id,
                    user: s.user,
                    loginTime: s.loginTime,
                    logoutTime: s.logoutTime,
                    duration: s.duration,
                    location: {
                        city: s.city,
                        country: s.country
                    },
                    device: s.device,
                    browser: s.browser,
                    isActive: s.isActive,
                    pageViews: s.pageViews.length
                }))
            }
        });
    } catch (error) {
        console.error('Analytics dashboard error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to get analytics'
        });
    }
};

// Get individual investor analytics
export const getInvestorAnalytics = async (req, res) => {
    try {
        const { id } = req.params;

        // Check if user is viewing their own data or is admin
        if (req.user.id !== id && req.user.role !== 'ADMIN') {
            return res.status(403).json({
                success: false,
                message: 'Access denied'
            });
        }

        const sessions = await prisma.session.findMany({
            where: { userId: id },
            include: {
                pageViews: true
            },
            orderBy: { loginTime: 'desc' }
        });

        const user = await prisma.user.findUnique({
            where: { id },
            select: {
                id: true,
                email: true,
                name: true,
                company: true,
                createdAt: true
            }
        });

        // Calculate metrics
        const totalSessions = sessions.length;
        const totalTime = sessions.reduce((sum, s) => sum + (s.duration || 0), 0);
        const avgSessionDuration = totalSessions > 0 ? Math.round(totalTime / totalSessions) : 0;

        // Most viewed pages
        const pageViews = {};
        sessions.forEach(session => {
            session.pageViews.forEach(pv => {
                if (!pageViews[pv.page]) {
                    pageViews[pv.page] = { count: 0, totalTime: 0 };
                }
                pageViews[pv.page].count++;
                pageViews[pv.page].totalTime += pv.timeSpent;
            });
        });

        const mostViewedPages = Object.entries(pageViews)
            .map(([page, data]) => ({
                page,
                views: data.count,
                totalTime: data.totalTime,
                avgTime: Math.round(data.totalTime / data.count)
            }))
            .sort((a, b) => b.totalTime - a.totalTime);

        res.json({
            success: true,
            data: {
                user,
                summary: {
                    totalSessions,
                    totalTime,
                    avgSessionDuration,
                    firstVisit: sessions[sessions.length - 1]?.loginTime,
                    lastVisit: sessions[0]?.loginTime
                },
                mostViewedPages,
                recentSessions: sessions.slice(0, 10).map(s => ({
                    id: s.id,
                    loginTime: s.loginTime,
                    logoutTime: s.logoutTime,
                    duration: s.duration,
                    location: `${s.city}, ${s.country}`,
                    device: s.device,
                    pageViews: s.pageViews.length
                }))
            }
        });
    } catch (error) {
        console.error('Investor analytics error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to get investor analytics'
        });
    }
};
