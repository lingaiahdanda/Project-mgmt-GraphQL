const mongoose = require('mongoose')

const connectDB = async()=>{
    const conn = await mongoose.connect(process.env.MONGO_URI);

    console.log(`Connected to Mongo DB : ${conn.connection.host}`.cyan.underline.bold);
}

module.exports = connectDB