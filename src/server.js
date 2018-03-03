/*************************************
Matthew Anderson and Christopher Piemonte
CS 340 - Final Project
March 2, 2018
*************************************/

const express = require('express');
const routes = require('./routes');
const bodyParser = require('body-parser');

var app = express();
app.set('port', process.argv[2] || 3000);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));



/******************************
Hook up routes.
******************************/
routes.init(app);


/******************************
404 Handler here
******************************/



/******************************
Error Handler here
******************************/



/******************************
Spin up server
******************************/
app.listen(app.get('port'), function(){
	console.log('Express listening on port ' + app.get('port'));
});