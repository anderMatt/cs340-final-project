/*************************************
Matthew Anderson and Christopher Piemonte
CS 340 - Final Project
March 2, 2018
*************************************/

var mysql = require('mysql');
var pool = mysql.createPool({
  connectionLimit : 10,
  host            : 'olympics.ckmminfqws1c.us-east-1.rds.amazonaws.com',
  user            : 'piemontc',
  password        : 'CS340data',
  database        : 'olympics'
});

module.exports = pool;
