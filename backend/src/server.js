import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import { connectDB } from "./config/db.js"
import alertRoutes from './routes/alerts.js'
import { errorHandler } from './utils/errorHandler.js'


dotenv.config();

const app = express();

const allowedOrigins = [
    'https://theflyingpanda.netlify.app',
    'http://localhost:5173'
];

app.use(cors({
    origin: function (origin, callback) {
        if (!origin) return callback(null, true);

        if (allowedOrigins.indexOf(origin) !== -1) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'))
        }
    },
    credentials: true,
    optionsSuccessStatus: 200
}));

app.use(express.json());

app.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.originalUrl}`);
    next();
});

app.get('/api/health', (req, res) => {
    res.status(200).json({ 
        status: 'ok',
        timestamp: new Date().toISOString() 
    });
});

app.use('/api/alerts', alertRoutes);
app.use(errorHandler);

const PORT = process.env.PORT || 4000;

const startServer = async () => {
    await connectDB();
    app.listen(PORT, () => {
        console.log(`Visa Alert API - http://localhost:${PORT}`);
        console.log(`Health check - http://localhost:${PORT}/health`);
    });
};

startServer();