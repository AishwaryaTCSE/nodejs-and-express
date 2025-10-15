const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema({
    bio: {
        type: String
    },
    socialMediaLinks: [{
        type: String
    }],
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        unique: true
    }
}, { timestamps: true });

module.exports = mongoose.model('Profile', profileSchema);
