import express from 'express'
import mongoose from 'mongoose';
import User from './models/User.js';
import userRouter from './router/userRouter.js';
import cors from 'cors';

const PORT = 5000;
const DB_URL = 'mongodb+srv://viakuznetsov:WIDiqYHvn7imiOuz@cluster0.caj1cof.mongodb.net/?retryWrites=true&w=majority'

const app = express();  

app.use(cors())
app.use(express.json());
app.use('/api/users', userRouter);

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