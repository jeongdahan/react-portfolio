var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var boardSchema = new Schema({
    writer: String,
    contents: String,
    starred: [String],
    date: {
        created: { type: Date, default: Date.now },
        edited: { type: Date, default: Date.now }
    },
    is_edited: { type: Boolean, default: false }
});

module.exports = mongoose.model('board', boardSchema);
