import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { connect } from 'react-redux'

import { Header } from '../header'
import { Articles } from '../articles'
import { ArticlePage } from '../articles/article-page'
import { CreateNewAccount } from '../account'
import { Login } from '../account/login'
import { EditProfile } from '../account/edit-profile'
import { CreateArticle } from '../creacte-article/create-article'
import { MyArticles } from '../articles/my-articles'
import { EditArticle } from '../creacte-article/edit-article'
import { CheckConnection } from '../check-connection/check-connection'
import * as actions from '../actions/actions'

function AppMain({ state, logOutUser, checkLoginUser }) {
  const { loginStatus, userData } = state
  return (
    <CheckConnection>
      <Router>
        <Header loginStatus={loginStatus} logOutUser={logOutUser} userData={userData} checkLoginUser={checkLoginUser} />
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
          exact
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
        <Route
          path="/new-article"
          render={() => (
            <div className="container">
              <CreateArticle />
            </div>
          )}
        />
        <Route
          path="/my-articles"
          render={() => (
            <div className="container">
              <MyArticles />
            </div>
          )}
        />
        <Route
          path="/articles/:id/edit"
          render={({ match }) => {
            const { id } = match.params
            return (
              <div className="container">
                <EditArticle id={id} />
              </div>
            )
          }}
        />
      </Router>
    </CheckConnection>
  )
}

const mapStateToProps = (state) => ({
  state,
})

export const App = connect(mapStateToProps, actions)(AppMain)
