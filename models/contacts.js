'use strict';

///fileshare library
var fs = require('fs');


//creates object for Contact methods
var Contacts = {};



Contacts.delete = function(row, cb){
  Contacts.find(function(err, contacts){
    if(err) return cb(err);
    contacts.splice((row-1),1);
    var data = JSON.stringify(contacts);
    fs.writeFile('db/contacts.json', data, function(err){
      if(err) return cb(err);
      cb(null);
    });
  });
};


Contacts.find = function(cb){
  fs.readFile('db/contacts.json', function(err, data){
    if(err){
      cb(err);
    } else {
      var contacts = JSON.parse(data);
      cb(null, contacts);
    };
  });
};


Contacts.create = function(contact, cb){
  Contacts.find(function(err, contacts){
    if(err) return cb(err);
    contacts.push(contact);
    var data = JSON.stringify(contacts);
    fs.writeFile('db/contacts.json', data, function(err){
      if(err) return cb(err);
      cb(null);
    });
  });
};


Contacts.edit = function(contactNew, row, cb){
  Contacts.find(function(err, contacts){
    if(err) return cb(err);
    contacts.splice((row-1),1, contactNew);
    var data = JSON.stringify(contacts);
    fs.writeFile('db/contacts.json', data, function(err){
      if(err) return cb(err);
      cb(null);
    });
  });
}

/////////////////////////marker////////////////////////////////

module.exports = Contacts;
