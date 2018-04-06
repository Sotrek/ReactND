import React, { Component } from 'react'
import '../App.css'
import { Route, Switch } from 'react-router-dom'
import AllCategories from './AllCategories'
import NewPost from './NewPost'
import EditPost from './EditPost'
import Category from './Category'
import PostDetail from './PostDetail'
import NewComment from './NewComment'
import EditComment from './EditComment'


class App extends Component {

  render() {
    return (
      <div className="App">
        <Switch>
          <Route exact path="/" render={(props)=>(
              <AllCategories {...props}/>
          )}/>
          <Route exact path="/new-post" render={(props)=>(
              <NewPost {...props}/>
          )}/>
          <Route exact path="/edit-post/:category/:id" render={(props)=>(
              <EditPost {...props}/>
          )}/>
          <Route exact path="/new-comment" render={(props)=>(
              <NewComment {...props}/>
          )}/>
          <Route exact path="/edit-comment/:id/:cid" render={(props)=>(
              <EditComment {...props}/>
          )}/>
          <Route exact path="/:category" render={(props)=>(
              <Category {...props}/>
          )}/>
          <Route exact path="/:category/:id" render={(props)=>(
              <PostDetail {...props}/>
          )}/>

        </Switch>
      </div>
    );
  }
}

export default App
