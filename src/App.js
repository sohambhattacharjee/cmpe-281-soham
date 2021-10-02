import "./App.css";
import React ,{useState} from 'react'
import Home from './components/Home/Home';
import  Header  from "./components/Header/Header";
import Registration from "./components/Registration/Register";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import PrivateRoute from './utils/PrivateRoute';
import Login from './components/Login/Login';

import AlertComponent from './components/Alert/Alert'; 

function App() {
  const [title, updateTitle] = useState(null);
  const [errorMessage, updateErrorMessage] = useState(null);
  return (
    <Router>
    <div className="App">
      <div className="layout">
      {/* <Header title={title}/> */}
        <div className="container d-flex align-items-center flex-column">
          <Switch>
            <Route path="/" exact={true}>
              <Registration showError={updateErrorMessage} updateTitle={updateTitle}/>
            </Route>
            <Route path="/register">
              <Registration showError={updateErrorMessage} updateTitle={updateTitle}/>
            </Route>
            <Route path="/login">
              <Login showError={updateErrorMessage} updateTitle={updateTitle}/>
            </Route>
            <PrivateRoute path="/home">
              <Home/>
            </PrivateRoute>
          </Switch>
          <AlertComponent errorMessage={errorMessage} hideError={updateErrorMessage}/>
        </div>
        </div>
    </div>
    </Router>
  );
}

export default App;