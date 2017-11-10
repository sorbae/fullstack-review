import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import Search from './components/Search.jsx';
import RepoList from './components/RepoList.jsx';
require('../dist/stylesheet.css');

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      repos: []
    }
  }

  componentDidMount() {
    this.getTop25();
  }

  getTop25() {
    let context = this;

    $.ajax({
      url: '/repos',
      dataType: 'json',
      success: function(results) {
        context.setState({repos: results});
      },
      error: function(result, status) {
        console.error('Get error occured: ', result, status);
      }
    })
  }

  search(term) {
    console.log(`${term} was searched`);
    let context = this;

    $.ajax({
      type: 'POST',
      url: '/repos',
      data: {'query': term},
      success: function(results) {
        context.getTop25();
      },
      error: function(result, status) {
        console.error('Post error occured: ', result, status);
      }
    })
  }

  render () {
    return (<div>
      <h1>Github Fetcher</h1>
      <Search onSearch={this.search.bind(this)}/>
      <RepoList repos={this.state.repos}/>
    </div>)
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
