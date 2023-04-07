import express from 'express'
import mongoose from 'mongoose';
import User from './models/User.js';
import authRouter from './router/authRouter.js';
import tasksRouter from './router/tasksRouter.js';
import cors from 'cors';
import { DB_URL } from './config.js';

const PORT = 5000;

const app = express();  

app.use(cors())
app.use(express.json());
app.use('/api/auth', authRouter);
app.use('/api/tasks', tasksRouter);

async function startApp() {
    try {
        await mongoose.connect(DB_URL, { useUnifiedTopology: true, useNewUrlParser: true })
        app.listen(PORT, () => {
            console.log('server started on PORT ' + PORT);
        }) 
    } catch (error) {
        console.log(error)
    }
}

startApp();