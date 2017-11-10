const request = require('request');
const config = require('../config.js');

let getReposByUsername = (username) => {
  let options = {
    url: `https://api.github.com/users/${username}/repos`,
    headers: {
      'User-Agent': 'request',
      'Authorization': `token ${config.TOKEN}`
    }
  };

  return new Promise((resolve, reject) => {
    request.get(options, (err, result) => {
      err ? reject(err) : resolve(result);
    });
  });
}

module.exports.getReposByUsername = getReposByUsername;
