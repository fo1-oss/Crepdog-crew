import { analyticsAPI } from './api';

class AnalyticsClient {
    constructor() {
        this.currentPage = null;
        this.pageStartTime = null;
        this.heartbeatInterval = null;
        this.isTracking = false;
    }

    // Start tracking session
    startTracking() {
        if (this.isTracking) return;

        this.isTracking = true;

        // Send heartbeat every 30 seconds
        this.heartbeatInterval = setInterval(() => {
            this.sendHeartbeat();
        }, 30000);

        // Track page unload
        window.addEventListener('beforeunload', () => {
            this.endSession();
        });
    }

    // Stop tracking
    stopTracking() {
        if (this.heartbeatInterval) {
            clearInterval(this.heartbeatInterval);
            this.heartbeatInterval = null;
        }
        this.isTracking = false;
    }

    // Track page view
    async trackPageView(page) {
        try {
            // If there's a previous page, send its time spent
            if (this.currentPage && this.pageStartTime) {
                const timeSpent = Math.floor((Date.now() - this.pageStartTime) / 1000);

                await analyticsAPI.trackPageView({
                    page: this.currentPage,
                    timeSpent,
                    scrollDepth: this.getScrollDepth(),
                    interactions: 0
                });
            }

            // Start tracking new page
            this.currentPage = page;
            this.pageStartTime = Date.now();
        } catch (error) {
            console.error('Failed to track page view:', error);
        }
    }

    // Send heartbeat to keep session alive
    async sendHeartbeat() {
        try {
            await analyticsAPI.sessionHeartbeat();
        } catch (error) {
            console.error('Failed to send heartbeat:', error);
        }
    }

    // End session
    async endSession() {
        try {
            // Send final page view
            if (this.currentPage && this.pageStartTime) {
                const timeSpent = Math.floor((Date.now() - this.pageStartTime) / 1000);

                await analyticsAPI.trackPageView({
                    page: this.currentPage,
                    timeSpent,
                    scrollDepth: this.getScrollDepth(),
                    interactions: 0
                });
            }

            await analyticsAPI.endSession();
            this.stopTracking();
        } catch (error) {
            console.error('Failed to end session:', error);
        }
    }

    // Get scroll depth percentage
    getScrollDepth() {
        const windowHeight = window.innerHeight;
        const documentHeight = document.documentElement.scrollHeight;
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

        const scrollPercentage = (scrollTop / (documentHeight - windowHeight)) * 100;
        return Math.min(Math.round(scrollPercentage), 100);
    }
}

// Export singleton instance
export default new AnalyticsClient();
