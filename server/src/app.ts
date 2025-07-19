import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import router from './routes/routes';
import dbConnect from './config/db';
const app = express();
app.use(express.json());
dotenv.config();
app.use(cors());
dbConnect();
app.use("/api/v1", router);
app.listen(process.env.PORT, ()=>{
    console.log("Server is Running");
});