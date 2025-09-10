import mongoose from "mongoose";

const ChatSchema = new mongoose.Schema({
    messages: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'Message',
        default: []
    },
    title: {
        type: String,
        default: ''
    },
    creator: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: false,
        default: null
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

const chatModel = mongoose.model('Chat', ChatSchema)
export default chatModel