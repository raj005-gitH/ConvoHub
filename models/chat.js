const mongoose = require("mongoose");

const chatSchema = new mongoose.Schema({
    from: {
        type: String,
        required: [true, 'Sender name is required'],
    },
    to: {
        type: String,
        required: [true, 'Receiver name is required'],
    },
    msg: {
        type: String,
        maxLength: [200, 'Message cannot exceed 200 characters'],
    },
    created_at: {
        type: Date,
        required: true,
    },
    updated_at: {
        type: Date,
        default: null,
    }
});

const Chat = mongoose.model("Chat", chatSchema);

module.exports = Chat;