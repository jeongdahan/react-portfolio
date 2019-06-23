var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');
var Schema = mongoose.Schema;

const memberSchema = new Schema({
    username: String,
    password: String,
    created: { type: Date, default: Date.now }
});

// generates hash 생성
memberSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, 8);
};

// compares the password 비교
memberSchema.methods.validateHash = function(password) {
    return bcrypt.compareSync(password, this.password);
};


module.exports = mongoose.model('member', memberSchema);
