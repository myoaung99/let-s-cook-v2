// models/User.js
import mongoose from 'mongoose';

const User = new mongoose.Schema({
    clerk_id: String,
    bookmarks: Array
});

export default mongoose.models.User ?? mongoose.model('User', User);

