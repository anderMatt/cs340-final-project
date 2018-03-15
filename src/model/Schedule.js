/*************************************
Matthew Anderson and Christopher Piemonte
CS 340 - Final Project
March 10, 2018
*************************************/

const db = require('../dbcon');

function Schedule(){}

Schedule.prototype.getAll = function(callback) {
    var query = "SELECT e.id AS eventId, e.name AS eventName, a.first_name AS firstName, a.last_name AS lastName, a.id AS athleteId, c.name AS countryName, ci.event_date AS eventDate, l.name AS eventLocation FROM athletes a " +
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

Schedule.prototype.newSchedule = function(aid, eid, date, callback) {
    var query = "INSERT INTO competes_in (aid, eid, event_date) VALUES (?,?,?);";
    
    db.query(query, [aid, eid, date], function(err, affectedRows) {
        if(err) {
            console.log("Error unscheduling an event: " + err);
            return callback(err);
        }
        callback(null, affectedRows);
    });
}

Schedule.prototype.delete = function(aid, eid, callback) {
    var query = 'DELETE FROM competes_in WHERE aid = ? AND eid = ?';
    
    db.query(query, [aid, eid], function(err, affectedRows) {
        if(err) {
            console.log("Error unscheduling an event: " + err);
            return callback(err);
        }
        callback(null, affectedRows);
    });
}


module.exports = new Schedule();