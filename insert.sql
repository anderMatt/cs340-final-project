/*----------------------------------------COUNTRIES------------------------------------------------------------*/
INSERT INTO countries (name) VALUES ('United States');
INSERT INTO countries (name) VALUES ('United Kingdom');
INSERT INTO countries (name) VALUES ('Australia');
INSERT INTO countries (name) VALUES ('Japan');
INSERT INTO countries (name) VALUES ('Switzerland');
INSERT INTO countries (name) VALUES ('China');
/*add these:*/




/*----------------------------------------ATHLETES------------------------------------------------------------*/
INSERT INTO athletes (first_name, last_name, age, gender, country_id) 
	VALUES ('Chloe', 'Kim', 17, 'female', (SELECT id FROM countries WHERE name = 'United States'));
INSERT INTO athletes (first_name, last_name, age, gender, country_id) 
	VALUES ('Billy', 'Morgan', 28, 'male', (SELECT id FROM countries WHERE name = 'United Kingdom'));
INSERT INTO athletes (first_name, last_name, age, gender, country_id) 
	VALUES ('Shaun', 'White', 31, 'male', (SELECT id FROM countries WHERE name = 'United States'));
INSERT INTO athletes (first_name, last_name, age, gender, country_id) 
	VALUES ('Scotty', 'James', 23, 'male', (SELECT id FROM countries WHERE name = 'Australia'));
INSERT INTO athletes (first_name, last_name, age, gender, country_id) 
	VALUES ('Ayumu', 'Hirano', 19, 'male', (SELECT id FROM countries WHERE name = 'Japan'));
INSERT INTO athletes (first_name, last_name, age, gender, country_id) 
	VALUES ('Ben', 'Ferguson', 23, 'male', (SELECT id FROM countries WHERE name = 'United States'));
INSERT INTO athletes (first_name, last_name, age, gender, country_id) 
	VALUES ('Patrick', 'Burgener', 23, 'male', (SELECT id FROM countries WHERE name = 'Switzerland'));
INSERT INTO athletes (first_name, last_name, age, gender, country_id) 
	VALUES ('Liu', 'Jiayu', 25, 'female', (SELECT id FROM countries WHERE name = 'China'));
INSERT INTO athletes (first_name, last_name, age, gender, country_id) 
	VALUES ('Arielle', 'Gold', 21, 'female', (SELECT id FROM countries WHERE name = 'United States'));
INSERT INTO athletes (first_name, last_name, age, gender, country_id) 
	VALUES ('Kelly', 'Clark', 34, 'female', (SELECT id FROM countries WHERE name = 'United States'));
INSERT INTO athletes (first_name, last_name, age, gender, country_id) 
	VALUES ('Cai', 'Xuetong', 24, 'female', (SELECT id FROM countries WHERE name = 'China'));
/*add these:*/




/*----------------------------------------LOCATIONS------------------------------------------------------------*/
INSERT INTO locations (name) VALUES ('Alpensia Biathlon Centre');
INSERT INTO locations (name) VALUES ('Alpensia Cross-Country Skiing Centre');
INSERT INTO locations (name) VALUES ('Alpensia Ski Jumping Centre');
INSERT INTO locations (name) VALUES ('Olympic Sliding Centre');
INSERT INTO locations (name) VALUES ('Phoenix Snow Park');
INSERT INTO locations (name) VALUES ('Jeongseon Alpine Centre');
INSERT INTO locations (name) VALUES ('Yongpyong Alpine Centre');
/*add these:*/




/*----------------------------------------EVENTS------------------------------------------------------------*/
INSERT INTO events (name, location_id) 
	VALUES ('Halfpipe', (SELECT id FROM locations WHERE name = 'Phoenix Snow Park'));
/*add these:*/





/*----------------------------------------COMPETES_IN------------------------------------------------------------*/
INSERT INTO competes_in (aid, eid, event_date) 
	VALUES ((SELECT id FROM athletes WHERE first_name = 'Chloe' AND last_name = 'Kim'), (SELECT id FROM events WHERE name = 'Halfpipe'), STR_TO_DATE('02-14-2018', '%m-%d-%y'));
INSERT INTO competes_in (aid, eid, event_date) 
	VALUES ((SELECT id FROM athletes WHERE first_name = 'Shaun' AND last_name = 'White'), (SELECT id FROM events WHERE name = 'Halfpipe'), STR_TO_DATE('02-14-2018', '%m-%d-%y'));
INSERT INTO competes_in (aid, eid, event_date) 
	VALUES ((SELECT id FROM athletes WHERE first_name = 'Scotty' AND last_name = 'James'), (SELECT id FROM events WHERE name = 'Halfpipe'), STR_TO_DATE('02-14-2018', '%m-%d-%y'));
INSERT INTO competes_in (aid, eid, event_date) 
	VALUES ((SELECT id FROM athletes WHERE first_name = 'Ayumu' AND last_name = 'Hirano'), (SELECT id FROM events WHERE name = 'Halfpipe'), STR_TO_DATE('02-14-2018', '%m-%d-%y'));
INSERT INTO competes_in (aid, eid, event_date) 
	VALUES ((SELECT id FROM athletes WHERE first_name = 'Ben' AND last_name = 'Ferguson'), (SELECT id FROM events WHERE name = 'Halfpipe'), STR_TO_DATE('02-14-2018', '%m-%d-%y'));
INSERT INTO competes_in (aid, eid, event_date) 
	VALUES ((SELECT id FROM athletes WHERE first_name = 'Patrick' AND last_name = 'Burgener'), (SELECT id FROM events WHERE name = 'Halfpipe'), STR_TO_DATE('02-14-2018', '%m-%d-%y'));
INSERT INTO competes_in (aid, eid, event_date) 
	VALUES ((SELECT id FROM athletes WHERE first_name = 'Liu' AND last_name = 'Jiayu'), (SELECT id FROM events WHERE name = 'Halfpipe'), STR_TO_DATE('02-14-2018', '%m-%d-%y'));
INSERT INTO competes_in (aid, eid, event_date) 
	VALUES ((SELECT id FROM athletes WHERE first_name = 'Arielle' AND last_name = 'Gold'), (SELECT id FROM events WHERE name = 'Halfpipe'), STR_TO_DATE('02-14-2018', '%m-%d-%y'));
INSERT INTO competes_in (aid, eid, event_date) 
	VALUES ((SELECT id FROM athletes WHERE first_name = 'Kelly' AND last_name = 'Clark'), (SELECT id FROM events WHERE name = 'Halfpipe'), STR_TO_DATE('02-14-2018', '%m-%d-%y'));
INSERT INTO competes_in (aid, eid, event_date) 
	VALUES ((SELECT id FROM athletes WHERE first_name = 'Cai' AND last_name = 'Xuetong'), (SELECT id FROM events WHERE name = 'Halfpipe'), STR_TO_DATE('02-14-2018', '%m-%d-%y'));
/*add these:*/







/*----------------------------------------MEDALS------------------------------------------------------------*/
INSERT INTO medals (type, event_id, winner, result) 
	VALUES ('gold', (SELECT id FROM events WHERE name = 'Halfpipe'), (SELECT id FROM athletes WHERE first_name = 'Chloe' AND last_name = 'Kim'), 98);
INSERT INTO medals (type, event_id, winner, result) 
	VALUES ('silver', (SELECT id FROM events WHERE name = 'Halfpipe'), (SELECT id FROM athletes WHERE first_name = 'Liu' AND last_name = 'Jiayu'), 90);
INSERT INTO medals (type, event_id, winner, result) 
	VALUES ('bronze', (SELECT id FROM events WHERE name = 'Halfpipe'), (SELECT id FROM athletes WHERE first_name = 'Arielle' AND last_name = 'Gold'), 86);
	/*need to add -> change medals to get rid of unique key*/
INSERT INTO medals (type, event_id, winner, result) 
	VALUES ('gold', (SELECT id FROM events WHERE name = 'Halfpipe'), (SELECT id FROM athletes WHERE first_name = 'Shaun' AND last_name = 'White'), 98);
INSERT INTO medals (type, event_id, winner, result) 
	VALUES ('silver', (SELECT id FROM events WHERE name = 'Halfpipe'), (SELECT id FROM athletes WHERE first_name = 'Ayumu' AND last_name = 'Hirano'), 95);
INSERT INTO medals (type, event_id, winner, result) 
	VALUES ('bronze', (SELECT id FROM events WHERE name = 'Halfpipe'), (SELECT id FROM athletes WHERE first_name = 'Scotty' AND last_name = 'James'), 92);
/*add these:*/
