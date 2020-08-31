import express from 'express';
import morgan from 'morgan';
import indexRoutes from './routes/index';
import path from 'path';
import cors from 'cors';

const app = express();

// Setting
app.set('port', process.env.PORT || 4000);

// Middlewares
app.use(morgan('dev'));

app.use(express.json());

app.use(cors());

// Routes
app.use('/api', indexRoutes);

// This folder is Public
app.use('/uploads', express.static(path.resolve('uploads')));

export default app;