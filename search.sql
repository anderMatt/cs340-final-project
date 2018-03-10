--Matthew Anderson --
-- Christopher Piemonte
-- CS 340 Final --


SELECT a.first_name AS First, a.last_name AS Last, e.name AS Event, m.type AS Medal, m.result AS Score FROM athletes a
INNER JOIN competes_in ci ON (a.id = ci.aid)
INNER JOIN events e ON (ci.eid = e.id)
INNER JOIN medals m ON (e.id = m.event_id)
	WHERE (m.winner = a.id);



-- Selects medal counts by country. --
-- Does not distinguish type of medal. --
-- Output: {countryName: "United States", medalCount: "1"}
SELECT c.name AS countryName, c.id AS countryId, IFNULL(tmp.medalsCount, 0) AS medalsCount
FROM countries c
LEFT JOIN
(SELECT athletes.country_id AS cid, COUNT(medals.id) AS medalsCount
FROM athletes
INNER JOIN medals ON athletes.id = medals.winner
GROUP BY cid
) AS tmp ON c.id = tmp.cid
GROUP BY c.name;



-- Selects all athletes by, plus their country name --
-- Output: {countryName, firstName, lastName, gender, age} --
SELECT c.name AS countryName, a.first_name AS firstName,
a.last_name AS lastName, a.gender AS gender, a.age AS age
FROM countries c
INNER JOIN athletes a ON c.id = a.country_id;

-- Creates a new athlete from form. --
INSERT INTO athletes(first_name, last_name, country_id, gender, age)
VALUES([firstName], [lastName], [countryId], [gender], [age]);

-- Creates a new location from form. --
INSERT INTO locations(name)
VALUES ([locationName]);

-- Retrieves all locations --
-- Output: {locationId, locationName --
SELECT l.id AS locationId, l.name AS locationName
FROM locations l;

-- Gets all events plus the name of the location where the event is occurring. --
-- Output: {locationName, eventId, eventName} --
SELECT l.name AS locationName, e.id AS eventId, e.name AS eventName
FROM events e
INNER JOIN location l ON e.location_id = l.id;

-- Creates a new event from form. --
INSERT INTO events(name, location_id)
VALUES ([eventName], [eventLocationId]);

-- Creates a new country from form. --
INSERT INTO countries(name)
VALUES [countryName];

