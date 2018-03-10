/*************************************
Matthew Anderson and Christopher Piemonte
CS 340 - Final Project
March 10, 2018
*************************************/

const db = require('../dbcon');

function Location(){}

Location.prototype.getAll = function(callback) {
    var query = 'SELECT l.id AS locationId, l.name AS locationName ' +
        'FROM locations l';
    db.query(query, function(err, results) {
        if(err) {
            console.log('An err occurred getting all locations: ' + err);
            return callback(err);
        }
        callback(null, results);
    });
};

module.exports = new Location();