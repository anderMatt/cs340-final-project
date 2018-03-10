/*************************************
Matthew Anderson and Christopher Piemonte
CS 340 - Final Project
March 2, 2018
*************************************/

const db = require('../dbcon');

function Country(){}

Country.prototype.getAll = function(callback) {
    var query = 'SELECT c.id AS countryId, c.name AS countryName ' +
        'FROM countries c';
    db.query(query, function(err, results) {
        if(err) {
            console.log('An err occured getting all countries: ' + err);
            return callback(err);
        }
        callback(null, results);
    });
};

Country.prototype.create = function(newCountry, callback) {
    var query = 'INSERT INTO countries SET ?';

    db.query(query, newCountry, function(err, results) {
        if(err) {
            console.log('Error inserting new country: ' + err);
            return callback(err);
        }
        callback(null, results.insertId);
    });
};

Country.prototype.getById = function(id, callback) {
	var query = 'SELECT * FROM countries WHERE `id` = ?';
	db.query(query, [id], function(err, results) {
		if(err) {
			console.log('An err occured getting Country by id: ' + err);
			return callback(err);
		}
		callback(null, results);
	});
};

// TODO: get counts by medal type?
Country.prototype.getMedalCountsAllCountries = function(callback) {

    var query = "SELECT c.name AS countryName, c.id AS countryId, IFNULL(tmp.medalsCount, 0) AS medalCount " +
        "FROM countries c " +
        "LEFT JOIN " +
        "(SELECT athletes.country_id AS cid, COUNT(medals.id) AS medalsCount " +
        "FROM athletes " +
        "INNER JOIN medals ON athletes.id = medals.winner " +
        "GROUP BY cid " +
        ") AS tmp ON c.id = tmp.cid " +
        "GROUP BY c.name " +
        "ORDER BY medalCount DESC";

    // var query = "SELECT c.id AS countryId, " +
    //     "c.name AS countryName, COUNT(m.id) AS medalCount " +
    //     " FROM countries c " +
    //     "RIGHT JOIN athletes a ON a.country_id = c.id " +
    //     "RIGHT JOIN medals m ON m.winner = a.id " +
    //     "GROUP BY countryName " +
    //     "ORDER BY medalCount DESC";
    db.query(query, function(err, results) {
        if(err) {
            console.log('An err occurred getting Country medal counts: ' + err);
            return callback(err);
        }
        callback(null, results);
    });
};

Country.prototype.getAthletes = function(countryId, callback) {
    var query = "SELECT * FROM athletes a " +
        "WHERE a.country_id = ?";
    db.query(query, [countryId], function(err, results) {
        if(err) {
            return callback(err);
        }
        callback(null, results);
    });
};

/*****
GOLD MEDALS PER COUNTRY - can also get Silver and Bronze. How to combine? How to show 0 is no medals match criteria?
*****/

// SELECT countries.name, tmp.c FROM countries
// INNER JOIN(
//     SELECT athletes.country_id AS cid, golds.gc AS c
// FROM athletes
// INNER JOIN (
//     SELECT athletes.id AS aid, COUNT(medals.id) AS gc FROM athletes INNER JOIN medals ON athletes.id = medals.winner AND medals.type = 'gold'
// ) AS golds ON athletes.id = golds.aid
// ) AS tmp ON countries.id = tmp.cid
// GROUP BY countries.name
module.exports = new Country();