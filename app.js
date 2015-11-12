'use strict';

var PORT = process.env.port || 3000;

var express = require('express');
var bodyParser = require('body-parser');
var morgan = require('morgan');


var app = express();

app.set('view engine', 'jade');

////general middleware//////
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

///static files
app.use(express.static('public'));



//brings in routes//////
app.use('/', require('./routes/index'));



//////errors//////
app.use(function(req, res){
    res.status(404).send('ERROR!!!')
})

app.listen(process.env.PORT || 3000, function(){
  console.log('listening on port:', PORT)
})
