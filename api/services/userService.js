
const activeUsers = new Map();

function addUser(userId, username, color) {
  const newUser = {
    id: userId,
    username,
    color,
  };
  activeUsers.set(userId, newUser);
  return newUser;
}

function removeUser(userId) {
  activeUsers.delete(userId);
}

function getActiveUsers() {
  return Array.from(activeUsers.values());
}

function checkForUsername(username) {
  const list = Array.from(activeUsers.values());
  return (
    list.findIndex(
      (usr) => usr?.username?.toLowerCase() === username?.toLowerCase()
    ) !== -1
  );
}

module.exports = { addUser, removeUser, getActiveUsers, checkForUsername };
