import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { connect } from 'react-redux'

import Header from '../header'
import Articles from '../articles'
import ArticlePage from '../articles/article-page'
import CreateNewAccount from '../account'
import Login from '../account/login'
import EditProfile from '../account/edit-profile'
import * as actions from '../actions/actions'

function App({ state, logOutUser }) {
  const { loginStatus, userData } = state
  return (
    <Router>
      <Header loginStatus={loginStatus} logOutUser={logOutUser} userData={userData} />
      <Route
        path="/"
        exact
        render={() => (
          <div className="container">
            <Articles />
          </div>
        )}
      />
      <Route
        path="/articles"
        exact
        render={() => (
          <div className="container">
            <Articles />
          </div>
        )}
      />
      <Route
        path="/articles/:id"
        render={({ match }) => {
          const { id } = match.params
          return (
            <div className="container">
              <ArticlePage id={id} />
            </div>
          )
        }}
      />
      <Route
        path="/sign-up"
        render={() => (
          <div className="container">
            <CreateNewAccount />
          </div>
        )}
      />
      <Route
        path="/sign-in"
        render={() => (
          <div className="container">
            <Login />
          </div>
        )}
      />
      <Route
        path="/profile"
        render={() => (
          <div className="container">
            <EditProfile />
          </div>
        )}
      />
    </Router>
  )
}

const mapStateToProps = (state) => ({
  state,
})

export default connect(mapStateToProps, actions)(App)
