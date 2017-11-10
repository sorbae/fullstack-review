const express = require('express');
const db = require('../database/index.js')
const github = require('../helpers/github.js')
const app = express();
const bodyParser = require('body-parser')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
app.use(express.static(__dirname + '/../client/dist'));

app.post('/repos', (req, res) => {
  let username = req.body.query;
  github.getReposByUsername(username)
    .then(results => {
      db.save(results.body)
      res.end();
    })
    .catch(err => console.log(err))
});

app.get('/repos', (req, res) => {
  db.grabRepos((err, results) => {
    res.json(results);
  });
});

let port = process.env.PORT || 1128;

app.listen(port, () => console.log(`listening on port ${port}`));
