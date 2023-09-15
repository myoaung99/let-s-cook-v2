// models/User.js
import mongoose from 'mongoose';

const Bookmark = new mongoose.Schema({
    id: String,
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
});

export default mongoose.models.Bookmark ?? mongoose.model('Bookmark', Bookmark);

