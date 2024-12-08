import express from 'express';
import AuthRoutes from './routes/AuthRoutes.js';
import UserRoutes from './routes/UserRoutes.js';
import PropertyRoutes from './routes/PropertyRoutes.js';
import pg from 'pg';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import cors from 'cors';
dotenv.config();

const app = express();
const PORT = process.env.SERVER_PORT || 3001;

const corsOptions = {
    origin: (origin, callback) => {
        // Allow all origins - dynamically set the origin based on the incoming request
        callback(null, origin || '*');
      },
    // origin: process.env.FRONTEND_ENDPOINT || 'http://localhost:3000',
    optionsSuccessStatus: 200,
    credentials: true,
    // Some legacy browsers choke on 204
}

app.use(cors(corsOptions));

export const db = new pg.Client({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
});

db.connect();

app.use(express.json({limit:"50mb"})) // To parse json data in the req.body
app.use(express.urlencoded({ extended : true}))
app.use(cookieParser())

// routes
app.use('/api/auth', AuthRoutes); // auth routes
app.use('/api/users', UserRoutes); // user routes
app.use('/api/properties', PropertyRoutes); // property routes

app.listen(PORT, '0.0.0.0', () => console.log(`Server listening at port ${PORT}`) );