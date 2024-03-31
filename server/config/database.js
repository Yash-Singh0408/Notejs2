const mongoose = require('mongoose');
mongoose.set('strictQuery',false)

const connectDB = async()=>{
    try {
        const connect = await mongoose.connect(process.env.MONGO_URI);
        console.log(`DataBAse Connected: ${connect.connection.host}` )
    } catch (error) {
        console.log(error)
    }
}

module.exports = connectDB;