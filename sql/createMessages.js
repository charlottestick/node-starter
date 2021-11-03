// Task A02
// Design a suitable, single SQL ‘CREATE TABLE’ instruction that results
// in the creation (IF NOT EXISTS) of the ‘Messages’ table as illustrated in the AdaBoard schema;
// don’t forget to include the Primary Key and Foreign Key constraint - ensure your FK cascades any user table deletes.
// Repeat the setup for “CURRENT_TIMESTAMP” as outlined in the previous requirement.

const createMessages = `
CREATE TABLE IF NOT EXISTS Messages (
    id INTEGER PRIMARY KEY NOT NULL,
    message TEXT, -- message is also a keyword?
    created INTEGER DEFAULT (strftime('%s','now')),
    archive INTEGER(1) DEFAULT 0 CHECK(archive = 0 OR archive = 1),
    userid INTEGER,
    FOREIGN KEY (userid) REFERENCES Users(userid) ON DELETE CASCADE
  );
`
module.exports = { createMessages };