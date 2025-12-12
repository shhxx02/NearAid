const express = require('express');
const cors = require('cors');
require('dotenv').config();
const connectDB = require('./config/database');
const donationRoutes = require('./routes/donationroutes');
const authRoutes = require('./routes/auth');
const uploadRoutes = require('./routes/upload');


const app = express();

const corsOptions = {
  origin: process.env.CLIENT_URL || 'http://localhost:3000',
  credentials: true
};
app.use(cors(corsOptions));

app.use(express.json());


connectDB();


app.get('/',(req,res)=>{
    res.json({ 
    message: 'NearAid API is running!',
    description: 'Connecting donors with nearby people in need',
    status: 'success' 
  });
})

app.get('/health', (req, res) => {
  res.json({ 
    status: 'OK',
    timestamp: new Date().toISOString()
  });
});

app.use('/api/donations', donationRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/upload', uploadRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT,()=>{
    console.log('NearAid server running!')
})