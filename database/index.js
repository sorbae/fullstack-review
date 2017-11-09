const mongoose = require('mongoose');
const Promise = require("bluebird");
mongoose.connect('mongodb://localhost/fetcher');

mongoose.connection.on('error', console.error.bind(console, 'connection error: '));
mongoose.connection.once('open', function() {
  console.log('helloworld');
})

let repoSchema = mongoose.Schema({
  author: String,
  avatar: String,
  description: String,
  repoUrl: String,
  forks_count: Number
});

let Repo = mongoose.model('Repo', repoSchema);

let createNewEntry = (repo) => {
  let newRepoProperties = {
    author: repo.owner.login,
    avatar: repo.owner.avatar_url,
    repoName: repo.name,
    description: repo.description,
    url: repo.html_url,
    forkCount: repo.forks_count
  }
  let newRepo = new Repo(newRepoProperties);
  return newRepo.save();
}

let save = (results) => {
  results = JSON.parse(results);
  return Promise.map(results, function(repo) {
    return createNewEntry(repo);
  })
}

let grabRepos = () => {
  return Repo.find(function(err, repos) {
    if (err) {
      console.log('Cannot retrive repos from database: ', err);
    } else {
      return repos;
    }
  })
}

module.exports.save = save;
module.exports.grabRepos = grabRepos;
