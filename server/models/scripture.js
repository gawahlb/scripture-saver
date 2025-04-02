const mongoose = require('mongoose');

const scriptureSchema = mongoose.Schema({
    id: { type: String, required: true },
    verse: { type: String, required: true },
    notes: { type: String, required: true },
    url: { type: String, required: false, default: "https://www.churchofjesuschrist.org/study/scriptures/bofm?lang=eng" }
 });
 
 module.exports = mongoose.model('Scripture', scriptureSchema);
