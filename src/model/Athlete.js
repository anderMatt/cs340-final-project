/*************************************
Matthew Anderson and Christopher Piemonte
CS 340 - Final Project
March 2, 2018
*************************************/

const db = require('../dbcon');

function Athlete(){}

Athlete.prototype.getById = function(id, callback) {
    var query = 'SELECT a.first_name, a.last_name, a.age, c.name FROM athletes a' +
        'WHERE a.id = ?' +
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
