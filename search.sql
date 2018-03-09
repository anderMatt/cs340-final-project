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
SELECT c.name AS countryName, c.id AS countryId, COUNT(m.id) AS medalCount FROM medals m
    INNER JOIN athletes a ON m.winner = a.id
    INNER JOIN countries c ON c.id = a.country_id
    GROUP BY countryName
    ORDER BY medalCount;


-- Selects all athletes by, plus their country name --
-- Output: {countryName, firstName, lastName, gender, age} --
SELECT c.name AS countryName, a.first_name AS firstName,
a.last_name AS lastName, a.gender AS gender, a.age AS age
FROM countries c
INNER JOIN athletes a ON c.id = a.country_id;