// Task A01
// Design a suitable, single SQL ‘CREATE TABLE’ instruction that results
// in the creation (IF NOT EXISTS) of the ‘Users’ table as illustrated in
// the AdaBoard schema; don’t forget to include the Primary Key and unique constraints.
// Use “strftime('%s','now')” rather than “CURRENT_TIMESTAMP”.
const createUsers =`
CREATE TABLE IF NOT EXISTS Users (
    userid INTEGER PRIMARY KEY NOT NULL,
    friendlyname VARCHAR(50),  
    emailaddress VARCHAR(230) UNIQUE,
    password VARCHAR(256), -- password and admin are SQL reserved words, need to ask if we should change these to non reserved
    admin INTEGER(1) NOT NULL,
    lastlogin INTEGER DEFAULT (strftime('%s','now'))
);
`
module.exports = { createUsers };
