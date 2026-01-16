// Geolocation service to get location from IP address
// Uses ipapi.co free tier (no API key needed for basic usage)

const GEOLOCATION_CACHE = new Map();
const CACHE_DURATION = 24 * 60 * 60 * 1000; // 24 hours

export const getLocationFromIP = async (ipAddress) => {
    // Handle localhost/private IPs
    if (!ipAddress || ipAddress === '::1' || ipAddress === '127.0.0.1' || ipAddress.startsWith('192.168.')) {
        return {
            city: 'Local',
            country: 'Local',
            latitude: null,
            longitude: null
        };
    }

    // Check cache first
    const cacheKey = ipAddress;
    const cached = GEOLOCATION_CACHE.get(cacheKey);
    if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
        return cached.data;
    }

    try {
        // Use ipapi.co free API (1000 requests/day, no key needed)
        const response = await fetch(`https://ipapi.co/${ipAddress}/json/`);

        if (!response.ok) {
            throw new Error(`Geolocation API error: ${response.status}`);
        }

        const data = await response.json();

        const location = {
            city: data.city || 'Unknown',
            country: data.country_name || 'Unknown',
            latitude: data.latitude || null,
            longitude: data.longitude || null,
            region: data.region || null,
            countryCode: data.country_code || null
        };

        // Cache the result
        GEOLOCATION_CACHE.set(cacheKey, {
            data: location,
            timestamp: Date.now()
        });

        return location;
    } catch (error) {
        console.error('Geolocation error:', error);

        // Return fallback data
        return {
            city: 'Unknown',
            country: 'Unknown',
            latitude: null,
            longitude: null
        };
    }
};

// Extract device info from User-Agent
export const parseUserAgent = (userAgent) => {
    if (!userAgent) {
        return {
            device: 'Unknown',
            browser: 'Unknown',
            os: 'Unknown'
        };
    }

    // Simple parsing (for production, consider using a library like 'ua-parser-js')
    let device = 'Desktop';
    let browser = 'Unknown';
    let os = 'Unknown';

    // Detect mobile
    if (/mobile|android|iphone|ipad|tablet/i.test(userAgent)) {
        device = 'Mobile';
    }

    // Detect browser
    if (userAgent.includes('Chrome')) browser = 'Chrome';
    else if (userAgent.includes('Safari')) browser = 'Safari';
    else if (userAgent.includes('Firefox')) browser = 'Firefox';
    else if (userAgent.includes('Edge')) browser = 'Edge';

    // Detect OS
    if (userAgent.includes('Windows')) os = 'Windows';
    else if (userAgent.includes('Mac')) os = 'macOS';
    else if (userAgent.includes('Linux')) os = 'Linux';
    else if (userAgent.includes('Android')) os = 'Android';
    else if (userAgent.includes('iOS') || userAgent.includes('iPhone')) os = 'iOS';

    return { device, browser, os };
};

// Get client IP address (handles proxies)
export const getClientIP = (req) => {
    return (
        req.headers['x-forwarded-for']?.split(',')[0] ||
        req.headers['x-real-ip'] ||
        req.connection?.remoteAddress ||
        req.socket?.remoteAddress ||
        req.ip
    );
};
