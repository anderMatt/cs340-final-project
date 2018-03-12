/*************************************
Matthew Anderson and Christopher Piemonte
CS 340 - Final Project
March 10, 2018
*************************************/

const db = require('../dbcon');

function Schedule(){}

Schedule.prototype.getAll = function(callback) {
    var query = "SELECT e.name AS eventName, a.first_name AS firstName, a.last_name AS lastName, a.id AS athleteId, c.name AS countryName, ci.event_date AS eventDate, l.name AS eventLocation FROM athletes a " +
	"INNER JOIN countries c ON (a.country_id = c.id) " +
	"INNER JOIN competes_in ci ON (a.id = ci.aid) " +
    "INNER JOIN events e ON (ci.eid = e.id) " +
    "INNER JOIN locations l ON (e.location_id = l.id) " +
    "ORDER BY eventDate ASC;";
    
    db.query(query, function(err, results){
        if(err) {
            console.log("An err occured getting all events: " + err);
            return callback(err);
        }
        callback(null, results);
    });
};


module.exports = new Schedule();