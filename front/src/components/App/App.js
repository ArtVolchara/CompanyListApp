import React from 'react';
// import ReactDOM from 'react-dom'
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import MyNavbar from '../Navbar/navbar'
import Login from '../Login/login'
import Registration from '../Registration/registration'

import PrivateRoute from '../Routes/privateRoute'
import CompanyList from '../CompanyList/companyList'
import ProductList from '../ProductList/productList'
import ErrorPage from '../ErrorPage/errorPage'
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
            <PrivateRoute exact path='/' Component={CompanyList} />
            <PrivateRoute exact path='/companies/:id/products' component={ProductList}/>
            <PrivateRoute path="*" component={ErrorPage}/>
          </Switch>
        </div>
      </Router>
    );
  }
}
