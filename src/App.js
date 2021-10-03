import "./App.css";
import React, { useState } from 'react'
import Home from './components/Home/Home';
import Header from "./components/Header/Header";
import Registration from "./components/Registration/Register";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import PrivateRoute from './utils/PrivateRoute';
import Login from './components/Login/Login';
import { transitions, positions, Provider as AlertProvider } from 'react-alert'
import AlertTemplate from 'react-alert-template-basic'

function App() {
  const [name, setName] = useState(null)
  const [adminMode, setAdminMode] = useState(false)

  function toggleAdminMode() {
    setAdminMode(!adminMode)
  }

  const options = {
    position: positions.BOTTOM_CENTER,
    timeout: 5000,
    offset: '10px',
    // you can also just use 'scale'
    transition: transitions.SCALE
  }
  return (
    <Router>
      <AlertProvider template={AlertTemplate} {...options}>
        <div className="App">
          <Header name={name} adminMode={adminMode} toggleAdminMode={toggleAdminMode} />
          <div className="layout">
            <div className="container d-flex align-items-center flex-column">
              <Switch>
                <Route path="/" exact={true}>
                  <Registration setName={setName} />
                </Route>
                <Route path="/register">
                  <Registration setName={setName} />
                </Route>
                <Route path="/login">
                  <Login setName={setName} />
                </Route>
                <PrivateRoute path="/home">
                  <Home adminMode={adminMode} />
                </PrivateRoute>
              </Switch>
            </div>
          </div>
        </div>
      </AlertProvider>
    </Router>
  );
}

export default App;