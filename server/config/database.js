const mongoose = require('mongoose');

const connectDB = async ()=>{
    try{
        const conn = await mongoose.connect(process.env.MONGODB_URI);
        console.log(`connected to mongodb: ${conn.connection.host}`);                //Old Way (Concatenation):console.log('📦 Connected to MongoDB: ' + conn.connection.host);
    } catch (error) {                                                                //Template Literals (use backticks ` `):console.log(`📦 Connected: ${conn.connection.host}`);
        console.log('mongodb connection error:', error.message);                     //→ Cleaner than 'string' + variable
        process.exit(1);                                                             //conn.connection.host:Returns → MongoDB host URL (e.g., nearaid.zwrk06v.mongodb.net).
    }                                                                              //error.message → Short description
};

module.exports = connectDB;