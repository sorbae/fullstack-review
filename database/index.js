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
  repoName: String,
  description: String,
  repoUrl: String,
  forkCount: Number,
  repoId: {type: Number, unique: true, index: true}
});

let Repo = mongoose.model('Repo', repoSchema);

let createNewEntry = (repo) => {
  let newRepoProperties = {
    author: repo.owner.login,
    avatar: repo.owner.avatar_url,
    repoName: repo.name,
    description: repo.description,
    repoUrl: repo.html_url,
    forkCount: repo.forks,
    repoId: repo.id
  }
  let newRepo = new Repo(newRepoProperties);
  return newRepo.save();
}

module.exports.save = (results) => {
  results = JSON.parse(results);
  return Promise.map(results, function(repo) {
    return createNewEntry(repo);
  })
}

module.exports.grabRepos = (cb) => {
  Repo.find()
    .sort({'forkCount': -1})
    .limit(25)
    .exec(cb);
}
