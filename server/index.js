const express = require('express');
const cors = require('cors');
require('dotenv').config();
const connectDB = require('./config/database');
const donationRoutes = require('./routes/donationroutes');
const authRoutes = require('./routes/auth');
const uploadRoutes = require('./routes/upload');


const app = express();
app.use(cors());

app.use(express.json());
app.use('/api/donations', donationRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/upload', uploadRoutes);

connectDB();


app.get('/',(req,res)=>{
    res.json({ 
    message: 'NearAid API is running!',
    description: 'Connecting donors with nearby people in need',
    status: 'success' 
  });
})



const PORT = process.env.PORT || 5000;

app.listen(PORT,()=>{
    console.log('NearAid server running!')
})