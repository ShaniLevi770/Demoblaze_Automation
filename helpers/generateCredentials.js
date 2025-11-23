// helpers/generateCredentials.js

function generateUniqueCredentials() {
  const id = Date.now();
  return {
    username: `user_${id}`,
    password: `Pass!${id}`,
  };
}

module.exports = { generateUniqueCredentials };
