import React, { Component } from 'react'
import '../App.css'
import { Route } from 'react-router-dom'
import AllCategories from './AllCategories'
import NewPost from './NewPost'
import EditPost from './EditPost'
import Category from './Category'


class App extends Component {

  render() {
    return (
      <div className="App">
        <Route exact path="/" render={(props)=>(
            <AllCategories {...props}/>
        )}/>
        <Route exact path="/new-post" render={(props)=>(
            <NewPost {...props}/>
        )}/>
        <Route exact path="/edit-post/:id" render={(props)=>(
            <EditPost {...props}/>
        )}/>
        <Route exact path="/:category" render={(props)=>(
            <Category {...props}/>
        )}/>
      </div>
    );
  }
}

export default App
