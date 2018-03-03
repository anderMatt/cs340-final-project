/*************************************
Matthew Anderson and Christopher Piemonte
CS 340 - Final Project
March 2, 2018
*************************************/

const express = require('express');
const handlebars = require('express-handlebars').create({defaultLayout: 'main'});
const routes = require('./routes');
const bodyParser = require('body-parser');

var app = express();
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');
app.set('port', process.argv[2] || 3000);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));



/******************************
Hook up routes.
******************************/
routes.init(app);


/******************************
404 Handler
******************************/

app.use(function(req, res) {
	res.status(404);
	res.render('404')
});

/******************************
Error Handler
******************************/

app.use(function(err, req, res, next) {
	console.error(err.stack);
	res.status(500);
	res.render('500');
});


/******************************
Spin up server
******************************/
app.listen(app.get('port'), function(){
	console.log('Express listening on port ' + app.get('port'));
});