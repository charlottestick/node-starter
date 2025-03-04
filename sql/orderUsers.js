// Task C06
// Create a SQL query that selects all users and arranges them
// in order of administration status and then alphabetically
// in descending order by their friendly name.

const orderUsers = `
SELECT * FROM Users ORDER BY admin, friendlyname DESC;
`;

module.exports = { orderUsers };