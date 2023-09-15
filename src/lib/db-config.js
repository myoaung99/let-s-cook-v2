import mongoose from 'mongoose';

const connection = {}
async function connectDB() {
    //*================CHECK CONDITIONS======================
    if (connection.isConnected) {
        console.log("already connected");
        return;
    }
    if (mongoose.connections.length > 0) {
        connection.isConnected = mongoose.connections[0].readyState;
        if (connection.isConnected === 1) {
            console.log("use previous connection");
            return;
        }
        await mongoose.disconnect();
    }
    //*=================NORMAL PROCESS=======================
    const db = await mongoose.connect(process.env.MONGODB_URI);
    console.log("new connection");
    connection.isConnected = db.connections[0].readyState;
}

export default connectDB;
