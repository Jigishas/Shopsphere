


const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    confirmPassword: { type: String, required: true, validate: {
        validator: function(confirmPassword) {
            return confirmPassword === this.password;
            }}},
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
