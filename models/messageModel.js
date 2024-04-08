const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

const messageSchema = new mongoose.Schema({
    name: String,
    email: String,
    phone: String,
    imagefile: String,
    message: String
}, {
    timestamps: true
})

//messageSchema.plugin(mongoosePaginate);

const Message = mongoose.model('message', messageSchema);

module.exports = Message;