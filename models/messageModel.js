const mongoose = require('mongoose');

const message = new mongoose.Schema({
    name: String,
    email: String,
    phone: String,
    imagefile: String,
    message: String
});

const Message = mongoose.model('message', message);

module.exports = Message;