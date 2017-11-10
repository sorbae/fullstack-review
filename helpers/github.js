const request = require('request');
require('dotenv').config();

// const config = require('../config.js');

let getReposByUsername = (username) => {
  let options = {
    url: `https://api.github.com/users/${username}/repos`,
    headers: {
      'User-Agent': 'request',
      'Authorization': `token ${process.env.TOKEN}`
    }
  };

  return new Promise((resolve, reject) => {
    request.get(options, (err, result) => {
      err ? reject(err) : resolve(result);
    });
  });
}

module.exports.getReposByUsername = getReposByUsername;
