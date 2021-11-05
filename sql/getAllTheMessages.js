const getAllTheMessages =`
SELECT Messages.message, Users.friendlyname, datetime(Messages.created, "unixepoch") AS created
FROM Messages
inner join Users 
ON Messages.userid = Users.userid;
`;

module.exports = { getAllTheMessages };