var router = require('express').Router();
var Character = require('../../models/character');
var auth = require('../auth');

router.get('/characters', auth.optional, function(req, res, next){
  var query = {};
  var limit = 20;
  var offset = 0;

  if(typeof req.query.limit !== 'undefined'){
    limit = req.query.limit;
  }

  if(typeof req.query.offset !== 'undefined'){
    offset = req.query.offset;
  }

  Character.find().then(function(characters){
    if(!characters){ return res.sendStatus(401); }

    return res.json({characters: characters.result});
  }).catch(next);
});

router.get('/character/profile', auth.optional, function(req, res, next){
  Character.findById(req.query.id).then(function(profile){
    if(!profile){ return res.sendStatus(401); }

    return res.json({characters: [profile.result]});
  }).catch(next);
});

module.exports = router;
