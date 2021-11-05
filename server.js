var express = require('express');
var app = express();
const dba = require("./rundbbuild.js");
const query = require("./dbqueries.js");
let db = dba.connect();
app.use(express.json());

app.get('/', function(req, res) {
    res.sendFile("index.html", { root: __dirname })
});

app.get('/api/messages', function(req, res) {
    query.getAllMessages(db, req, res);
});

app.get('/api/sort-users', function(req, res) {
    query.organiseUsers(db, req, res);
});

app.get('/api/get-messages-from-franklins', function(req, res) {
    query.getFromFranklins(db, req, res);
});

app.post('/api/create-user', function(req,res) {
    console.log("This is the req",req.body);
    query.createUser(db,req,res);
});

app.put('/api/update-steve', function(req,res) {
    query.updateSteveJobs(db,req,res)
});

app.put('/api/archive-steve', function(req,res) {
    query.archiveJobs(db,req,res);
});

app.delete('/api/delete-messages', function(req,res) {
    query.deleteOldMess(db,req,res)
});

app.post('/api/post-message', function(req,res) {
    console.log("This is the req",req.body);
    query.postAMessage(db,req,res);
});

app.put("/api/update-timestamp", function(req, res) {
    console.log("This is the req", req.body);
    query.updateTimeStamp(db, req, res);
}
)

app.delete("/api/remove-user-message", function(req, res) {
    console.log("This is the req",req.body);
    query.removeMessage(db,req,res);
})

app.listen(3000, function () {
    dba.init(db);
    console.log('Server is listening on port 3000. Ready to accept requests!');
});