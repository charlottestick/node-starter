const sqlite3 = require('sqlite3').verbose();
let { orderUsers } = require('./sql/orderUsers');
let { getMessagesFromFranklins } = require('./sql/getMessagesFromFranklins');
let { updateSJobs } = require('./sql/updateSJobs');
let { deleteOldMessages } = require('./sql/deleteOldMessages');
let { archiveSteve } = require('./sql/archiveSteveJobs');
let { postMessage } = require('./sql/postMessage');
let { getAllTheMessages } = require("./sql/getAllTheMessages");
let { updateTS } = require("./sql/updateTS");
let { createAUser } = require("./sql/createAUser");
let { removeUserMessage } = require("./sql/removeUserMessage");

// Task D13
function getAllMessages(db, req, res) {
    db.all(getAllTheMessages, (err, rows) => {
        if (err) {
            console.error(err.message);
        }
        if (!rows) {
            res.send({ error: "no messages found" })
        }
        res.send(rows);
    })
}

function organiseUsers(db, req, res) {
    db.all(orderUsers, (err, rows) => {
        if (err) {
            console.error(err.message);
        }
        if (!rows) {
            res.send({ error: "no users found" })
        }
        res.send(rows);
    })
}
// Task D12
function createUser(db, req, res) {
    const { username, email, password } = req.body;
    db.run(createAUser, [username, email, password],
      function(err) {
        if (err) {
          return console.log(err.message)
        }
        console.log(`${username} added to user field at position ${this.lastID}`)
        userID = this.lastID
        console.log("created new user " + userID);
        res.send({"ok":"ok"});
    })
}

function getFromFranklins(db, req, res) {
    db.all(getMessagesFromFranklins, (err, rows) => {
        if (err) {
            console.error(err.message);
        }
        if (!rows) {
            res.send({ error: "no messages found" })
        }
        res.send(rows);
    })
}

function updateSteveJobs(db, req, res) {
    db.run(updateSJobs, function(err) {
        if (err) {
            return console.log(err.message);
        }
        console.log(`Updated the profile of Steve Jobs`);
        res.send({ "ok": "Login time for Steve Jobs has been updated" }).status(200)
    });
}

function deleteOldMess(db, req, res) {
    db.serialize(() => {
      db.run(deleteOldMessages, function(err) {
        if (err) {
          return console.log(err.message);
        }
        res.send({ "ok": "Old Messages were deleted" }).status(200)
      });
    });
}

function archiveJobs(db, req, res) {
    console.log("here");
    db.run(archiveSteve, function(err) {
        if (err) {
            return console.log(err.message);
        }
        console.log(`Archived messages from Steve Jobs`);
        res.send({ "ok": "Steve Jobs's has been updated" }).status(200);
    });
}

function postAMessage(db, req, res) {
    const { userid, message } = req.body;
    db.run(postMessage, [message, userid],
      function(err) {
        if (err) {
          return console.log(err.message)
        }
        const messg = `${userid} posted this ${message}`;
        res.send({ "ok":messg }).status(200);
    })
}

function updateTimeStamp(db, req, res) {
    const {userid} = req.body;
    db.run(updateTS, [userid],
        function(err) {
            if (err) {
                return console.log(err.message)
            }
            const messg = `User ${userid}'s last login updated`;
            res.send({ "ok":messg}).status(200);
        }
    )
}

function removeMessage(db, req, res) {
    const {messageid, userid} = req.body;
    db.run(removeUserMessage, [messageid, userid],
        function(err) {
            if (err) {
                return console.log(err.message)
            }
            const messg = `Message ${messageid} from user ${userid} removed`;
            res.send({ "ok":messg}).status(200);
        }
    )
}

module.exports = { getAllMessages, organiseUsers, createUser, getFromFranklins, updateSteveJobs, deleteOldMess, archiveJobs, postAMessage, updateTimeStamp, removeMessage }