'use strict';


///installs express and router
var express = require('express');
var router = express.Router();

/////connects contacts model
var Contacts = require('../models/contacts');


router.get('/', function(req, res){
  Contacts.find(function(err, contacts) {
    if(err){
      return res.status(400).send(err);
    }
      res.render('index', {title: 'Contacts List', contacts: contacts});
  });
});

router.post('/', function(req, res) {
  var contact = req.body.contact;
  Contacts.create(contact, function(err){
    if(err){
      res.status(400).send(err);
    } else {
      res.send();
    }
  });
});

router.put('/', function(req, res){
  var row= req.body.row;
  var contactNew = req.body.contact;
  Contacts.edit(contactNew, row, function(err){
    if(err){
      res.status(400).send(err);
    } else {
      res.send();
    }
  });
});


router.delete('/', function(req, res){
  var row = req.body.row;
  Contacts.delete(row, function(err){
    if(err){
      res.status(400).send(err);
    } else {
    res.send();
    }
  })
})


/////////////////////////////marker///////////////////////////////////////

module.exports= router;
