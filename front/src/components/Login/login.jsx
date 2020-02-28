import React from 'react';
import { Redirect } from "react-router-dom";
import { connect } from 'react-redux'
import { loginFetchAC, clearStatusAC } from '../../redux/actions/actions';

import './login.css';

import Preloader from "../Preloader/preloader"
import { Container } from 'reactstrap';


class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
    };
  }

  handleInputChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({ [name]: value });
  }

  handleSubmit = async (event) => {
    event.preventDefault();
    this.props.loginFetch({
      username: this.state.username,
      password: this.state.password,
    })
  }

  componentWillUnmount() {
    this.props.clearStatus()
  }

  render() {
    return (
      <Container className={"auth-form"}>
        <form onSubmit={this.handleSubmit}>
          <h1 className={"h1 mb-3 font-weight-normal"}>Login</h1>
          <p>Please login</p>
          <div className='form-group'>
            <label htmlFor="username"><b>Username</b></label>
            <input className='form-control' type="text" placeholder="Username" name="username" required value={this.state.username} onChange={this.handleInputChange} />
          </div>
          <div className='form-group'>
            <label htmlFor="password"><b>Password</b></label>
            <input className='form-control' type="password" placeholder="Enter Password" name="password" required value={this.state.password} onChange={this.handleInputChange} />
          </div>
          <button className={'btn btn-lg btn-primary btn-block'} type="submit">Login</button>
          <div>
            {this.props.loginLoadingFetch
              ? <Preloader />
              : this.props.isLoggedIn
                ? <Redirect to='/' />
                : <p className={"error"}>{this.props.loginStatusError}</p>
            }
          </div>
        </form>
      </Container>
    )
  }
}

function mapStateToProps(store) {
  return {
    isLoggedIn: store.isLoggedIn,
    loginLoadingFetch: store.loginLoadingFetch,
    loginStatusError: store.loginStatusError,
  }
}


function mapDispatchToProps(dispatch) {
  return {
    loginFetch: data => dispatch(loginFetchAC(data)),
    clearStatus: () => dispatch(clearStatusAC())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)