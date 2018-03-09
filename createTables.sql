CREATE TABLE countries(
	id INT NOT NULL AUTO_INCREMENT,
	name VARCHAR (255) NOT NULL,
	PRIMARY KEY (id)
) ENGINE = INNODB;

CREATE TABLE athletes(
	id INT NOT NULL AUTO_INCREMENT,
	first_name VARCHAR (255) NOT NULL,
	last_name VARCHAR (255) NOT NULL,
	age INT NOT NULL,
	gender ENUM('male', 'female') NOT NULL,
	country_id INT NOT NULL,
	PRIMARY KEY (id),
	CONSTRAINT FOREIGN KEY (country_id) REFERENCES countries (id) ON DELETE CASCADE,
	UNIQUE KEY (first_name, last_name)
) ENGINE = INNODB;

CREATE TABLE locations(
	id INT NOT NULL AUTO_INCREMENT,
	name VARCHAR (255) NOT NULL,
	PRIMARY KEY (id)
) ENGINE = INNODB;

CREATE TABLE events(
	id INT NOT NULL AUTO_INCREMENT,
	name VARCHAR (255) NOT NULL,
	location_id INT NOT NULL,
	PRIMARY KEY (id),
	CONSTRAINT FOREIGN KEY (location_id) REFERENCES locations (id) ON DELETE CASCADE
) ENGINE = INNODB;

CREATE TABLE medals(
	id INT NOT NULL AUTO_INCREMENT,
	type ENUM('gold', 'silver', 'bronze') NOT NULL,
	event_id INT NOT NULL,
	winner INT,
	result INT,
	PRIMARY KEY (id),
	CONSTRAINT FOREIGN KEY (event_id) REFERENCES events (id) ON DELETE CASCADE,
	CONSTRAINT FOREIGN KEY (winner) REFERENCES athletes (id) ON DELETE CASCADE
) ENGINE = INNODB;

CREATE TABLE competes_in(
	aid INT,
	eid INT,
	event_date DATE,
	PRIMARY KEY (aid, eid),
	CONSTRAINT FOREIGN KEY (aid) REFERENCES athletes (id) ON DELETE CASCADE,
	CONSTRAINT FOREIGN KEY (eid) REFERENCES events (id) ON DELETE CASCADE
) ENGINE = INNODB;