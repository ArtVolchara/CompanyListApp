import React from 'react';
// import ReactDOM from 'react-dom'
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import MyNavbar from '../Navbar/navbar'
import Login from '../Login/login'
import Registration from '../Registration/registration'

import PrivateRoute from '../Routes/privateRoute'
import Home from '../Home/homepage'

import './App.css';

export default class App extends React.Component {

  render() {
    return (
      <Router>
        <MyNavbar/>
        <div className={"App"}>
          <Switch>
            <Route exact path='/login' component={Login} />
            <Route exact path='/registration' component={Registration}/>
            <PrivateRoute exact path='/' Component={Home} />
          </Switch>
        </div>
      </Router>
    );
  }
}
