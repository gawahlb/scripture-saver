//var Sequence = require('../models/sequence');
//
//var maxScriptureId;
//var sequenceId = null;
//
//function SequenceGenerator() {
//  
//  Sequence.findOne()
//    .then(function(sequence) {
//      if (!sequence) {
//        console.error('An error occurred');
//      }
//
//      sequenceId = sequence._id;
//      maxScriptureId = sequence.maxScriptureId;
//    });
//}
//
//SequenceGenerator.prototype.nextId = function(collectionType) {
//
//  var updateObject = {};
//  var nextId;
//
//  switch (collectionType) {
//    case 'scriptures':
//      maxScriptureId++;
//      updateObject = {maxScriptureId: maxScriptureId};
//      nextId = maxScriptureId;
//      break;
//    default:
//      return -1;
//  }
//
//  Sequence.updateOne({_id: sequenceId}, {$set: updateObject})
//    .then(result => {
//      console.log('Updated successfully!');
//    })
//    .catch(err => {
//      console.log('Error updating:', err);
//      return null;
//    });
//}
//
//module.exports = new SequenceGenerator();


var Sequence = require('../models/sequence');

var maxScriptureId;
var sequenceId = null;

class SequenceGenerator {
  async initialize() {
    try {
      const sequence = await Sequence.findOne().exec();
      if (!sequence) {
        console.error('An error occurred: No sequence found');
        return;
      }
      sequenceId = sequence._id;
      maxScriptureId = sequence.maxScriptureId;
    } catch (error) {
      console.error('Error fetching sequence:', error);
    }
  }

  async nextId(collectionType) {
    let updateObject = {};
    let nextId;

    switch (collectionType) {
      case 'scriptures':
        maxScriptureId++;
        updateObject = { maxScriptureId };
        nextId = maxScriptureId;
        break;
      default:
        return -1;
    }

    try {
      // Use updateOne to update the sequence values
      await Sequence.updateOne({ _id: sequenceId }, { $set: updateObject });
      console.log('Updated successfully!');
      return nextId;
    } catch (err) {
      console.log('Error updating:', err);
      return null;
    }
  }
}

console.log(maxScriptureId);

// Instantiate and initialize the SequenceGenerator
const sequenceGeneratorInstance = new SequenceGenerator();
sequenceGeneratorInstance.initialize();

module.exports = sequenceGeneratorInstance;
