const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const { BSONValue } = require('bson');

const userSchema = new mongoose.Schema({
    name: { type: String, require: true },
    surname: { type: String, require: true },
    gender: String,
    phone: { type: String, require: false },
    email: { type: String, require: true },
    password: { type: String, require: true},
});

userSchema.pre('save', async function () {
    if (this.isModified('password')) {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
    }
});

userSchema.methods.comparePassword = async function(password){
    return bcrypt.compare(password, this.password);
}

const Users = mongoose.model('User', userSchema);

module.exports = Users;