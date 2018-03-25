import React, { Component } from 'react';
import logo from '../logo.svg';
import '../App.css';
import { Route } from 'react-router-dom';
import AllCategories from './AllCategories';
import NewPost from './NewPost';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Route exact path="/" render={()=>(
            <AllCategories />
        )}/>
        <Route exact path="/new-post" render={()=>(
            <NewPost />
        )}/>
      </div>
    );
  }
}

export default App;
