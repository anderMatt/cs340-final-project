--Matthew Anderson --
-- Christopher Piemonte
-- CS 340 Final --


SELECT a.first_name AS First, a.last_name AS Last, e.name AS Event, m.type AS Medal, m.result AS Score FROM athletes a
INNER JOIN competes_in ci ON (a.id = ci.aid)
INNER JOIN events e ON (ci.eid = e.id)
INNER JOIN medals m ON (e.id = m.event_id)
	WHERE (m.winner = a.id);


-- Query to get Schedule of events --
-- Returns: Event, First Name, Last Name, Date, Location --
SELECT e.name AS 'Event', a.first_name AS 'First Name', a.last_name AS 'Last Name', ci.event_date AS 'Date', l.name AS 'Location' FROM athletes a 
	INNER JOIN competes_in ci ON (a.id = ci.aid)
    INNER JOIN events e ON (ci.eid = e.id)
    INNER JOIN locations l ON (e.location_id = l.id);


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

-- Selects all athletes by matching their last name against
-- a user-entered search pattern--
-- Output: {countryName, firstName, lastName, gender, age} --

SELECT a.first_name AS firstName, a.last_name AS lastName, a.age AS age,
a.gender AS gender, c.name AS countryName
FROM athletes a
INNER JOIN countries c ON a.country_id = c.id
WHERE UPPER(a.last_name) LIKE UPPER('[lastNameInput]%');

-- Creates a new athlete from form. --
INSERT INTO athletes(first_name, last_name, country_id, gender, age)
VALUES([firstName], [lastName], [countryId], [gender], [age]);

-- Deletes an athlete --
DELETE FROM athletes WHERE id = [athleteId];

-- Creates a new location from form. --
INSERT INTO locations(name)
VALUES ([locationName]);

-- Retrieves all locations --
-- Output: {locationId, locationName --
SELECT l.id AS locationId, l.name AS locationName
FROM locations l;

-- Deletes a location. --
DELETE FROM locations WHERE id = [locationId];

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

-- Schedule an athlete to an event from form. --
INSERT INTO competes_in (aid, eid, event_date)
VALUES ((SELECT id FROM athletes WHERE first_name = [firstName] AND last_name = [lastName]), (SELECT id FROM events WHERE name = [event]), STR_TO_DATE([eventDate], '%m-%d-%y'));

-- Remove an athlete from an event from form. --
DELETE FROM competes_in
WHERE aid = (SELECT id FROM athletes WHERE first_name = [firstName] AND last_name = [lastName]) AND eid = (SELECT id FROM events WHERE name = [event]);