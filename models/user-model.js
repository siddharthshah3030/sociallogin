const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const userSchema = new Schema({
    username: String,
    data: Object(),
    googleId: String,
    thumbnail: String,
    twitterId: String,
    githubId: String,
    instagramId: String,
    linkedinId: String
});


const User = mongoose.model('user', userSchema);

module.exports = User;
