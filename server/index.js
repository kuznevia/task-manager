import express from 'express'
import mongoose from 'mongoose';
import User from './models/User.js';
import authRouter from './router/authRouter.js';
import tasksRouter from './router/tasksRouter.js';
import cors from 'cors';

const PORT = 5000;
const DB_URL = 'mongodb+srv://viakuznetsov:WIDiqYHvn7imiOuz@cluster0.caj1cof.mongodb.net/?retryWrites=true&w=majority'

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