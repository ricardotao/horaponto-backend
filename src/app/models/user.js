const mongoose = require('../../app/database/connection');

const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    Name: {
        type: String,
        required: true,
        maxlength: 150,
    },
    Email: {
        type: String,
        unique: true,
        required: true,
        lowercase: true,
        maxlength: 150,
    },
    Password: {
        type: String,
        required: true,
        select: false,
    },
    Avatar: {
        type: Buffer,
        required: false,
    }
});

userSchema.pre('save', async function(next) {
    const hash = await bcrypt.hash(this.Password, 12);
    this.Password = hash;
    next();
});

/*userSchema.pre('updateOne', async function(next) {
    const hash = await bcrypt.hash(this.Password, 12);
    this.set({Password: hash});
    next();
});*/

const User = mongoose.model('User', userSchema);

module.exports = User;