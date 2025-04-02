var express = require('express');
var router = express.Router();
const sequenceGenerator = require('./sequenceGenerator');
const Scripture = require('../models/scripture');
const { error } = require('node:console');

module.exports = router; 


router.get('/', (req, res, next) => {
  Scripture.find()
    .then(scriptures => {
      res.status(200).json({
        message: 'Scriptures fetched successfully!',
        scriptures: scriptures
      });
    })
    .catch(err => {
      res.status(500).json({
        message: 'An error occurred!',
        error: err
      });
    });
});

router.post('/', async (req, res, next) => {
  try {  
  const maxScriptureId = await sequenceGenerator.nextId("scriptures")
  
    const scripture = new Scripture({
      id: maxScriptureId,
      verse: req.body.verse,
      notes: req.body.notes,
      url: req.body.url
    });
  
    scripture.save()
      .then(createdScripture => {
        res.status(201).json({
          message: 'Scripture added successfully',
          scripture: createdScripture
        });
      })
      .catch(err => {
         res.status(500).json({
            message: 'An error occurred',
            error: err
          });
      });
    } catch (err) {
      res.status(500).json({
        message: 'An error occurred generating ID',
        error: err
      });
    }
  });

  router.put('/:id', (req, res, next) => {
    Scripture.findOne({ id: req.params.id })
      .then(scripture => {
        scripture.verse = req.body.verse;
        scripture.notes = req.body.notes;
        scripture.url = req.body.url;
  
        Scripture.updateOne({ id: req.params.id }, scripture)
          .then(result => {
            res.status(204).json({
              message: 'Scripture updated successfully'
            })
          })
          .catch(err => {
             res.status(500).json({
             message: 'An error occurred',
             error: err
           });
          });
      })
      .catch(err => {
        res.status(500).json({
          message: 'Scripture not found.',
          error: { scripture: 'Scripture not found'}
        });
      });
  });
  
  router.delete("/:id", (req, res, next) => {
    Scripture.findOne({ id: req.params.id })
      .then(scripture => {
        Scripture.deleteOne({ id: req.params.id })
          .then(result => {
            res.status(204).json({
              message: "Scripture deleted successfully"
            });
          })
          .catch(err => {
             res.status(500).json({
             message: 'An error occurred',
             error: err
           });
          })
      })
      .catch(err => {
        res.status(500).json({
          message: 'Scripture not found.',
          error: { scripture: 'Scripture not found'}
        });
      });
  });

