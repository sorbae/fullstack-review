const express = require('express');
const db = require('../database/index.js')
const github = require('../helpers/github.js')
let app = express();
const bodyParser = require('body-parser')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
app.use(express.static(__dirname + '/../client/dist'));

app.post('/repos', function (req, res) {
  let username = req.body.query;

  db.existsInDatabase(username)
    .then(userExists => {
      if (userExists !== null) {
        console.log('username already exists in database');
        // update username
      } else {
        console.log('logging into database');
        github.getReposByUsername(username)
        .then(results => db.save(results.body))
      }
    })
    .catch(error => console.log(error));
});

app.get('/repos', function (req, res) {
  db.grabRepos(function(err, results) {
    res.json(results);
  })
});

let port = 1128;

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});
