const express = require('express');
const db = require('../database/index.js')
const github = require('../helpers/github.js')
let app = express();
const bodyParser = require('body-parser')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
app.use(express.static(__dirname + '/../client/dist'));

app.post('/repos', function (req, res) {
  let userName = req.body.query;
  github.getReposByUsername(userName)
    .then(results => {
      db.save(results.body)
    })
    .catch(error => {
      console.log(error);
    });
});

app.get('/repos', function (req, res) {
  db.grabRepos().then((repos) => {
    return repos;
  })
  // TODO - your code here!
  // This route should send back the top 25 repos
});

let port = 1128;

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});
