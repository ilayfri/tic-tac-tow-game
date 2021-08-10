import React from 'react';
import Login from './components/Login/Login';
import Game from './components/Game/Game';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom'

import './App.css';

function App() {
  return (
    <>
      <div className="App">
        <BrowserRouter>
          <Switch>
            <Route exact path="/">
              <Login />
            </Route>
            {sessionStorage.getItem('token') ?
              <Route path="/game">
                <Game />
              </Route> : ""}
            <Route path="*">
              <Redirect to="/" />
            </Route>
          </Switch>
        </BrowserRouter>
      </div>
    </>
  );
}

export default App;
