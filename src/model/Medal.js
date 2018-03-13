/*************************************
 Matthew Anderson and Christopher Piemonte
 CS 340 - Final Project
 March 13, 2018
 *************************************/

const db = require('../dbcon');

function Medal(){}

Medal.prototype.getAll = function(callback) {
    var query = "SELECT m.type AS type, e.name AS eventName, a.first_name AS winnerFirstName, " +
        "a.last_name AS winnerLastName " +
        "FROM medals m " +
        "INNER JOIN athletes a ON m.winner = a.id " +
        "INNER JOIN events e ON m.event_id = e.id ";

    db.query(query, function(err, results) {
        if(err) {
            console.log("An err occurred getting all medals: " + err);
            return callback(err);
        }
        callback(null, results);
    });
};

module.exports = new Medal();
