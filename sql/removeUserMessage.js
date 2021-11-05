const removeUserMessage = `
DELETE FROM Messages
WHERE id = ? AND userid = ?;
`;

module.exports = { removeUserMessage };