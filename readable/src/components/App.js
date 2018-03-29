import React, { Component } from 'react'
import '../App.css'
import { Route } from 'react-router-dom'
import AllCategories from './AllCategories'
import NewPost from './NewPost'
import EditPost from './EditPost'


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
        <Route exact path="/edit-post/:id" render={(props)=>(
            <EditPost {...props}/>
        )}/>
      </div>
    );
  }
}

export default App
