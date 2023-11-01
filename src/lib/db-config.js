import mongoose from 'mongoose';

async function connectDB() {
    // Use connect method to connect to the server
    console.log('Connected successfully to server');
    return await mongoose.connect(process.env.MONGODB_URI);
}

export default connectDB;
