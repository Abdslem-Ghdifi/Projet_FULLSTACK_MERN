import express from 'express' ;
import colors from 'colors' ;
import dotenv from 'dotenv' ;
import morgan from 'morgan';
import connectDB from './config/db.js';
import AuthRoute from './routes/AuthRoute.js';
import cors from 'cors'
//configure env
dotenv.config(); 
//rest object 
const app =express();
//config database
connectDB();

//middelWares
app.use(cors())
app.use(express.json())
app.use(morgan('dev'))
//routes 
app.use('/api/v1/auth' , AuthRoute)

//rest api
app.get("/" ,(req,res)=>{
    res.send( "<center><h1>welcome to Green Store</h1></center>");
}) ;
//port 
const port = process.env.port ||8084 ;
// run listen
app.listen(port ,() => {
    console.log(`server Running on ${process.env.DEV_MODE} mode on ${port}`.bgCyan.white);
}   );