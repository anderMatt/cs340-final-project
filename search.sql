SELECT a.first_name AS First, a.last_name AS Last, e.name AS Event, m.type AS Medal, m.result AS Score FROM athletes a
INNER JOIN competes_in ci ON (a.id = ci.aid)
INNER JOIN events e ON (ci.eid = e.id)
INNER JOIN medals m ON (e.id = m.event_id)
	WHERE (m.winner = a.id);