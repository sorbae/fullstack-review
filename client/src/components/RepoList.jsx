import React from 'react';
import RepoEntry from './RepoEntry.jsx';

const RepoList = (props) => (
  <div>
    <h4> Repo List Component </h4>
    There are {props.repos.length} repos:
    {props.repos.map(repo =>
      <RepoEntry key={repo.repoId} repo={repo}/>
    )}
  </div>
)

export default RepoList;
