/*************************************
Matthew Anderson and Christopher Piemonte
CS 340 - Final Project
March 9, 2018
*************************************/
const express = require('express');
const Country = require('./model/Country');
const Athlete = require('./model/Athlete');

/************************************
DEFINE APP ROUTES HERE.
/***********************************/
module.exports.init = function(app) {

	app.get('/', function(req, res, next) {
	    var context = {};
		Country.getMedalCountsAllCountries(function(err, countries) {
			if(err) {
				return next(err);
			}
			context.countries = countries;
			return res.type('text/html')
                .render('home', context);
		});
	});

	app.get('/athletes', function(req, res, next) {
        var context = {};
        Athlete.getAll(function(err, athletes) {
            if(err) {
                return next(err);
            }
            context.athletes = athletes;
            return res.type('text/html')
                .render('athletes', context);
        });
    });

	//Country page - show its athletes?

    app.get('/country/:countryId', function(req, res, next) {
	    var countryId = req.params.countryId;
	    var context = {};

	    Country.getAthletes(countryId, function(err, athletes) {
	        if(err) {
	            return next(err);
            }
            context.athletes = athletes;
	        return res.type('text.html')
                .render('country', context);
        });
    });

    app.get('/profile/:athleteId', function(req, res, next) {
        var athleteId = req.params.athleteId;
        var context = {};

        Athlete.getEvents(athleteId, function(err, events) {
            if(err) {
                return next(err);
            }
            context.events = events;
            return res.type('text/html')
                .render('profile', context);
        });
    });




    /**************************************************
     * API methods for altering tables.
     **************************************************/
    var apiRoutes = express.Router();

    apiRoutes.get('/countries', function(req, res, next) {
        Country.getAll(function(err, countries) {
            if(err) {
                return next(err);
            }
            return res.status(200)
                .json(countries);
        });
    });

    apiRoutes.post('/athlete/create', function(req, res, next) {
        var newAthlete = req.body;
        console.log("REQ.BODY: " + JSON.stringify(req.body));
        Athlete.create(newAthlete, function(err, insertId) {
            if(err) {
                return next(err);
            }
            return res.status(200)
                .json({status: "success", id: insertId});
        });
    });

    /* API error handler */
    apiRoutes.use(function(err, req, res, next) {
        return res.status(500)
            .json({"error": err});
    });


    // Hook up API routes to the application.
    app.use('/api', apiRoutes);
};




