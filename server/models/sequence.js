const mongoose = require('mongoose');

const sequenceSchema = mongoose.Schema({
    maxScriptureId: { type: Number, required: true }
 });
 
 module.exports = mongoose.models.Sequence || mongoose.model('Sequence', sequenceSchema);
