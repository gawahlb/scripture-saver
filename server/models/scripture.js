const mongoose = require('mongoose');

const scriptureSchema = mongoose.Schema({
    id: { type: String, required: true },
    verse: { type: String, required: true },
    notes: { type: String, required: true },
    url: { type: String, required: false }
 });
 
 module.exports = mongoose.model('Scripture', scriptureSchema);
