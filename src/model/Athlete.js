/*************************************
Matthew Anderson and Christopher Piemonte
CS 340 - Final Project
March 2, 2018
*************************************/

const db = require('../dbcon');

function Athlete(){}

Athlete.prototype.getAll = function(callback) {
    var query = "SELECT c.name AS countryName, a.id AS athleteId, " +
        "a.first_name AS firstName, " +
        "a.last_name AS lastName, " +
        "a.gender AS gender, " +
        "a.age AS age " +
        "FROM countries c " +
        "INNER JOIN athletes a ON c.id = a.country_id";
    db.query(query, function(err, results) {
        if(err) {
            console.log("An err occured getting all athletes: " + err);
            return callback(err);
        }
        callback(null, results);
    });
};

Athlete.prototype.getById = function(id, callback) {
    var query = 'SELECT a.first_name AS firstName, a.last_name AS lastName, ' +
        'a.age AS age, c.name AS countryName ' +
        'FROM athletes a ' +
        'WHERE a.id = ? ' +
        'INNER JOIN countries c ON a.country_id = c.id';
    db.query(query, [id], function(err, results) {
        if(err) {
            console.log('An err occurred getting Athlete by id: ' + err);
            return callback(err);
        }
        callback(null, results);
    });
};

Athlete.prototype.getMedalCount = function(id, callback) {
    var query = 'SELECT m.type, COUNT(m.id) AS count' +
        'FROM medals m' +
        'INNER JOIN athletes a ON m.winner = a.id' +
        'WHERE a.id = ?' +
        'GROUP BY m.type';

    db.query(query, [id], function(err, results) {
        if(err) {
            console.log('An err occurred getting Medal Counts by athlete ID: ' + err);
            return callback(err);
        }
        callback(null, results);
    });
};

Athlete.prototype.getEvents = function(id, callback) {
    //Get all events this athlete is participating in.
    return callback();
};

module.exports = new Athlete();
