/*************************************
Matthew Anderson and Christopher Piemonte
CS 340 - Final Project
March 9, 2018
*************************************/
const express = require('express');
const Country = require('./model/Country');
const Athlete = require('./model/Athlete');
const Event = require('./model/Event');
const Location = require('./model/Location');

/************************************
DEFINE APP ROUTES HERE.
/***********************************/
module.exports.init = function(app) {

    // Overview page - countries and medal counts.
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

	// All athletes.
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

	// All events.

    app.get('/events', function(req, res, next) {
        var context = {};
        Event.getAllWithLocation(function(err, events) {
            if(err) {
                return next(err);
            }
            context.events = events;
            return res.type('text/html')
                .render('events', context);
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
     * API methods for altering tables and getting dynamic
     * values.
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

    apiRoutes.get('/events', function(req, res, next) {
        Event.getAllWithLocation(function(err, events) {
            if(err) {
                return next(err);
            }
            return res.status(200)
                .json(events);
        });
    });

    apiRoutes.get('/locations', function(req, res, next) {
        Location.getAll(function(err, locations) {
            if(err) {
                return next(err);
            }
            return res.status(200)
                .json(locations);
        });
    });

    apiRoutes.post('/event/create', function(req, res, next) {
        var newEvent = req.body;
        Event.create(newEvent, function(err, insertId) {
            if(err) {
                return next(err);
            }
            return res.status(200)
                .json({status: "success", id: insertId});
        });
    });

    apiRoutes.post('/athlete/create', function(req, res, next) {
        var newAthlete = req.body;
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
        console.log('Caught API error: ' + err.stack);
        return res.status(500)
            .json({"error": err});
    });


    // Hook up API routes to the application.
    app.use('/api', apiRoutes);
};




