/*************************************
Matthew Anderson and Christopher Piemonte
CS 340 - Final Project
March 10, 2018
*************************************/

const db = require('../dbcon');

function Event(){}

Event.prototype.getAllWithLocation = function(callback) {
    var query = "SELECT l.name AS locationName, e.id AS eventId, e.name AS eventName " +
        "FROM events e " +
        "INNER JOIN locations l ON e.location_id = l.id";
    db.query(query, function(err, results) {
        if(err) {
            console.log("An err occurred getting all events: " + err);
            return callback(err);
        }
        callback(null, results);
    });
};

Event.prototype.create = function(newEvent, callback) {
    var query = 'INSERT INTO events SET ?';

    db.query(query, newEvent, function(err, results) {
        if(err) {
            console.log("Error inserting new event: " + err);
            return callback(err);
        }
        callback(null, results.insertId);
    });
};

Event.prototype.delete = function(event, callback) {
    var query = "DELETE FROM events WHERE id = ?";
    
    db.query(query, event, function(err, affectedRows) {
        if(err) {
            console.log("Error canceling an event: " + err);
            return callback(err);
        }
        callback(null, affectedRows);
    });
}

module.exports = new Event();