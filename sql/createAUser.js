const createAUser = `
INSERT INTO Users (friendlyname, emailaddress, password, admin) VALUES (?, ?, ?, 0);
`;

module.exports = { createAUser };