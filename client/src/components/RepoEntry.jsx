import React from 'react';

const RepoEntry = (props) => (
  <div className="entry">
    <div className="authorHeader">
      <img className="profileAvatar" width="100rem" src={props.repo.avatar} />
    </div>
    <div className="repoDetails">
      <div className="author">{props.repo.repoName}</div>
      {props.repo.author}
      <div class="description">{props.repo.description}</div>
      <a href={props.repo.repoUrl}>Visit Repo!</a>
    </div>
  </div>
)

export default RepoEntry;
