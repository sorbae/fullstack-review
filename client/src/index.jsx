import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import Search from './components/Search.jsx';
import RepoList from './components/RepoList.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      repos: []
    }

  }

  search (term) {
    console.log(`${term} was searched`);
    $.ajax({
      headers: {
        Accept : "text/plain; charset=utf-8"
      },
      type: 'POST',
      url: '/repos',
      data: {'query': term}
    }).done(function(result) {
      console.log('results: ', result);
    }).fail(function(result, status) {
      console.log('error status: ', result, status);
    })
  }

  render () {
    return (<div>
      <h1>Github Fetcher</h1>
      <RepoList repos={this.state.repos}/>
      <Search onSearch={this.search.bind(this)}/>
    </div>)
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
