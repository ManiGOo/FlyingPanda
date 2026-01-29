import Alert from "../models/Alert.js";

export const getAlerts = async (req, res, next) => {
    try {
        const { country, status, page = 1, limit = 10 } = req.query;

        const query = {};

        if (country) {
            query.country = { $regex: country, $options: 'i'};
        }
        if (status) {
            query.status = status;
        }

        const skip = (page - 1) * limit;
        const alerts = await Alert.find(query)
            .sort({ createdAt: -1})
            .skip(skip)
            .limit(Number(limit));

        const total = await Alert.countDocuments(query);

        res.json({
            data : alerts,
            pagination: {
                total,
                page: Number(page),
                limit: Number(limit),
                pages: Math.ceil(total / limit) || 1
            }
        });
    } catch (error) {
        next(error);
    }
};

export const createAlert = async (req, res, next) => {
    try {
        const alert = new Alert(req.body);
        await alert.save();
        res.status(201).json(alert);
    } catch (error) {
        next(error);
    }
};

export const updateAlertStatus = async (req, res, next) => {
    try {
        const alert = await Alert.findByIdAndUpdate(
            req.params.id,
            { status: req.body.status },
            { new: true, runValidators: true }
        );

        if (!alert) {
            return res.status(404).json({ error: 'Alert not found' });
        }

        res.json(alert)
    } catch (err) {
        next(err);
    }
};
export const deleteAlert = async (req, res, next) => {
    try {
        const alert = await Alert.findByIdAndDelete(req.params.id);
        if (!alert) {
            return res.status(404).json({ error: "Alert not found" });
        }
        res.status(204).send();
    } catch (error) {
        next(error);
    }
};