const express = require('express');
const cors = require('cors');
const morgan = require('morgan')
const mongoose = require('mongoose');
const dotenv = require('dotenv');

const PORT = process.env.PORT || 5000;

const images = require('./routes/uploadRoutes')

//Allow Access to .env file
dotenv.config()

const app = express();

//Middleware
app.use(cors())
app.use(express.json())
app.use(morgan("common"))

app.use("/api",images)

//Connect to Mongodb Atlas
mongoose.set("strictQuery",false);
mongoose.connect(process.env.MONGO_URL,
    {
       useNewUrlParser: true 
    }
).then(()=>{console.log("Mongodb is connected")}).
catch((err)=>{console.log(err)})


//port
app.listen(PORT,()=>{
    console.log(`Server running on port ${PORT}`)
})