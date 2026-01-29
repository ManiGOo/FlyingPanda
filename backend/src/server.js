import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import { connectDB } from "./config/db.js"
import alertRoutes from './routes/alerts.js'
import { errorHandler } from './utils/errorHandler.js'

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.originalUrl}`);
    next();
});

app.get('/health', (req, res) => res.json({ status: 'ok'}));

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