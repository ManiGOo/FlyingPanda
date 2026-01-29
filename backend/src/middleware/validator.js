import Joi from "joi";

const createAlertSchema = Joi.object({
    country: Joi.string().min(2).max(60).required(),
    city: Joi.string().min(2).max(100).required(),
    visaType: Joi.string().valid('Tourist', 'Business', 'Student').required(),
    status: Joi.string().valid('Active', 'Booked', 'Expired').default('Active')
});

const updateStatusSchema = Joi.object({
    status: Joi.string().valid('Active', 'Booked', 'Expired').required()
});

export const validateCreate = (req, res, next) => {
    const { error } = createAlertSchema.validate(req.body, { abortEarly: false });
    if (error) {
        return res.status(400).json({
            error: 'Validation failed',
            details: error.details.map(d => d.message)
        });
    }
    next();
};

export const validateStatusUpdate = (req, res, next) => {
    const {error} = updateStatusSchema.validate(req.body, {abortEarly: false });
    if (error) {
        return res.status(400).json({
            error: 'Invalid status update',
            details: error.details.map(d => d.message)
        });
    }
    next();
};