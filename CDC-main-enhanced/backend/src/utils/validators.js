import Joi from 'joi';

// User Registration Validation
export const registerSchema = Joi.object({
    email: Joi.string().email().required().messages({
        'string.email': 'Please provide a valid email address',
        'any.required': 'Email is required'
    }),
    password: Joi.string().min(8).required().messages({
        'string.min': 'Password must be at least 8 characters long',
        'any.required': 'Password is required'
    }),
    name: Joi.string().min(2).max(100).required().messages({
        'string.min': 'Name must be at least 2 characters long',
        'any.required': 'Name is required'
    }),
    company: Joi.string().max(100).optional().allow('', null)
});

// User Login Validation
export const loginSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required()
});

// Page View Tracking Validation
export const pageViewSchema = Joi.object({
    page: Joi.string().valid(
        'overview',
        'financials',
        'stores',
        'market',
        'funding',
        'team',
        'documents'
    ).required(),
    timeSpent: Joi.number().integer().min(0).default(0),
    scrollDepth: Joi.number().integer().min(0).max(100).optional(),
    interactions: Joi.number().integer().min(0).default(0)
});

// Session Heartbeat Validation
export const heartbeatSchema = Joi.object({
    sessionId: Joi.string().uuid().required()
});

// OCR Upload Validation
export const ocrUploadSchema = Joi.object({
    documentType: Joi.string().valid('PITCH_DECK', 'MIS', 'FINANCIALS', 'OTHER').required()
});

// Business Data Update Validation
export const businessDataSchema = Joi.object({
    dataKey: Joi.string().required(),
    dataValue: Joi.any().required(),
    source: Joi.string().valid('OCR', 'MANUAL', 'SHEETS', 'SYSTEM').default('MANUAL')
});

// Validate request body middleware
export const validate = (schema) => {
    return (req, res, next) => {
        const { error, value } = schema.validate(req.body, {
            abortEarly: false,
            stripUnknown: true
        });

        if (error) {
            const errors = error.details.map(detail => ({
                field: detail.path.join('.'),
                message: detail.message
            }));

            return res.status(400).json({
                success: false,
                message: 'Validation failed',
                errors
            });
        }

        req.validatedBody = value;
        next();
    };
};
