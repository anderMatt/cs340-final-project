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
const Medal = require('./model/Medal');
const Schedule = require('./model/Schedule');

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
        var name = req.query.lastname;
        var searchMethod;

        if(name) {
            searchMethod = Athlete.getByLastName.bind(Athlete, name);
        } else {
            searchMethod = Athlete.getAll.bind(Athlete);
        }

        searchMethod(function(err, athletes) {
            if(err) {
                return next(err);
            }
            context.athletes = athletes;
            context.lastNameSearch = name;
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

    app.get('/locations', function(req, res, next) {
        var context = {};
        Location.getAll(function(err, locations) {
            if(err) {
                return next(err);
            }
            context.locations = locations;
            return res.type('text/html')
                .render('locations', context);
        });
    });
    
    app.get('/schedule', function(req, res, next) {
        var context = {};
        Schedule.getAll(function(err, schedule) {
            if(err) {
                return next(err);
            }
            context.schedule = schedule;
            return res.type('text/html')
                .render('schedule', context);
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

    app.get('/medals', function(req, res, next) {
        var context = {};
        Medal.getAll(function(err, medals) {
            if(err) {
                return next(err);
            }
            context.medals = medals;
            return res.type('text/html')
                .render('medals', context);
        });
    });

    /*************************************************/
    /**************************************************
     * API methods for altering tables and getting dynamic
     * values.
     **************************************************/
    /*************************************************/
    var apiRoutes = express.Router();

    /**************************************************
     * Country endpoints.
     /**************************************************/

    apiRoutes.get('/countries', function(req, res, next) {
        Country.getAll(function(err, countries) {
            if(err) {
                return next(err);
            }
            return res.status(200)
                .json(countries);
        });
    });

    apiRoutes.post('/countries/create', function(req, res, next) {
        var newCountry = req.body;

        Country.create(newCountry, function(err, insertId) {
            if(err) {
                return next(err);
            }
            return res.status(200)
                .json({status: "success", id: insertId});
        });
    });

    /**************************************************
     * Event endpoints.
     /**************************************************/

    apiRoutes.get('/events', function(req, res, next) {
        Event.getAllWithLocation(function(err, events) {
            if(err) {
                return next(err);
            }
            return res.status(200)
                .json(events);
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
    
    apiRoutes.delete('/event/cancel/:event', function(req, res, next) {
         Event.delete(req.params.event, function(err, schedule){
            if(err){
                return next (err);
            }
            return res.status(200)
                .json(schedule);
        });
    });

    /**************************************************
     * Athlete endpoints.
    /**************************************************/

    apiRoutes.get('/athletes', function(req, res, next) {
        Athlete.getAll(function(err, athletes) {
            if(err) {
                return next(err);
            }
            return res.status(200)
                .json(athletes);
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

    apiRoutes.delete('/athletes/:id', function(req, res, next) {
        var athleteId = req.params.id;
        Athlete.delete(athleteId, function(err, affectedRows) {
            if(err) {
                return next(err);
            }
            return res.status(200)
                .json({status: "success"});
        });
    });

    /**************************************************
     * Location endpoints.
   /**************************************************/
    apiRoutes.get('/locations', function(req, res, next) {
        Location.getAll(function(err, locations) {
            if(err) {
                return next(err);
            }
            return res.status(200)
                .json(locations);
        });
    });

    apiRoutes.post('/location/create', function(req, res, next) {
        var newLocation = req.body;
        Location.create(newLocation, function(err, insertId) {
            if(err) {
                return next(err);
            }
            return res.status(200)
                .json({status: "success", id: insertId});
        });
    });

    apiRoutes.delete('/location/:id', function(req, res, next) {
        var locationId = req.params.id;
        Location.delete(locationId, function(err, affectedRows) {
            if(err) {
                return next(err);
            }
            return res.status(200)
                .json({status: "success"});
        });
    });
    
    /**************************************************
     * Schedule endpoints.
    /**************************************************/
    apiRoutes.get('/schedule', function(req, res, next) {
        Schedule.getAll(function(err, schedule){
            if(err){
                return next (err);
            }
            return res.status(200)
                .json(schedule);
        });
    });
    
    apiRoutes.post('/schedule/create', function(req, res, next) {
        Schedule.newSchedule(req.body.aid, req.body.eid, req.body.date, function(err, schedule){
            if(err){
                return next(err);
            }
            return res.status(200)
                .json(schedule);
        })
    });
    
    apiRoutes.delete('/unschedule/:aid&:eid', function(req, res, next) {
        Schedule.delete(req.params.aid, req.params.eid, function(err, schedule){
            if(err){
                return next (err);
            }
            return res.status(200)
                .json(schedule);
        });
    });

    /**************************************************
     * Medal endpoints.
     /**************************************************/
    apiRoutes.delete('/medal/:id', function(req, res, next) {
        var medalId = req.params.id;
        Medal.delete(medalId, function(err, affectedRows) {
            if(err) {
                return next(err);
            }
            return res.status(200)
                .json({status: "success"});
        });
    });

    /**************************************************
     * API ERROR HANDLERS
    ************************************************** /
    /* API error handler */
    apiRoutes.use(function(err, req, res, next) {
        console.log('Caught API error: ' + err.stack);
        return res.status(500)
            .json({"error": err});
    });

/**************************************************
 **************************************************/
    // Hook up API routes to the application.
    app.use('/api', apiRoutes);
};




