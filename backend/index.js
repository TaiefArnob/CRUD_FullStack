import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import { configDotenv } from 'dotenv';
import route from './routes/patientRoute.js';
import cors from 'cors'

const app = express();

app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
}));

app.use(bodyParser.json())
configDotenv();

const PORT=process.env.PORT||7000;
const URL=process.env.MONGOURL;

app.use('/api',route)

mongoose.connect(URL,{useNewUrlParser:true,
 useUnifiedTopology:true   
}).then(()=>{
    console.log('MongoDB connected succesfully');
    
    app.listen(PORT,()=>{
        console.log(`Server is listening on port : ${PORT}`);
    })
}).catch((error)=>{
    console.error('Connection error:',error)
})