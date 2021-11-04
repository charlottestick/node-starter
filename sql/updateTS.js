const updateTS = `
UPDATE Users
SET lastlogin = strftime("%s", "now")
WHERE userid = ?;
`;

module.exports = { updateTS };