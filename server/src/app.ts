import express from 'express';
import morgan from 'morgan';
import indexRoutes from './routes/index';
import path from 'path';

const app = express();

// Setting
app.set('port', process.env.PORT || 4000);

// Middlewares
app.use(morgan('dev'));

app.use(express.json());

// Routes
app.use('/api', indexRoutes);

// This folder is Public
app.use('/uploads', express.static(path.resolve('uploads')));

export default app;