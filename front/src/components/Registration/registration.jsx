import React from 'react';
import { connect } from 'react-redux'
import { registerFetchAC, clearStatusAC, registerErrorAC } from '../../redux/actions/actions';

import './registration.css'; 


import Preloader from "../Preloader/preloader"
import validationErrors from "./validatationErrors"
import { Container } from 'reactstrap';



class Registration extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      usernameValid: false,
      passwordValid: false,
      formValid: false,
    }
  }
  async componentDidMount() {
    validationErrors(this.state, this.props)
  }
  handleInputChange = async (e) => {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({ [name]: value },
      () => { this.validateField(name, value) });
  }

  async validateField(fieldName, value) {
    let usernameValid = this.state.usernameValid;
    let passwordValid = this.state.passwordValid;
    switch (fieldName) {
      case 'username':
        usernameValid = value.length >= 6 && value.length <= 25 &&  /^\s*(\w+)\s*$/.test(this.state.username);
        break;
      case 'password':
        passwordValid = value.length >= 6 && value.length <= 25 &&  /^\s*(\w+)\s*$/.test(this.state.password);
        break;
      default:
        break;
    }
    if (this.state.username === this.state.password) {
      usernameValid = passwordValid = false;
    }
    await this.setState({
      usernameValid: usernameValid,
      passwordValid: passwordValid
    }, this.validateForm);
    validationErrors(this.state, this.props)
  }

  validateForm() {
    this.setState({ formValid: this.state.usernameValid && this.state.passwordValid });
  }

  handleSubmit = async (event) => {
    event.preventDefault();
    this.props.registerFetch({
      username: this.state.username,
      password: this.state.password,
    })
  }

  errorClass(validToogle) {
    return (validToogle ? '' : 'has-error');
  }

  componentWillUnmount() {
    this.props.clearStatus();
  }

  render() {
    return (
      <Container className={"auth-form"}>
        <form onSubmit={this.handleSubmit}>
          <h1 className={"h1 mb-3 font-weight-normal"}>Registration</h1>
          <p>Please register yourself</p>
          <div className={`form-group ${this.errorClass(this.state.usernameValid)}`}>
            <label htmlFor="username"><b>Username</b></label>
            <input className={'form-control'} type="text" placeholder="Username" name="username" required
            value={this.state.username} onChange={this.handleInputChange} />
          </div>
          <div className={`form-group ${this.errorClass(this.state.passwordValid)}`}>
            <label htmlFor="password"><b>Password</b></label>
            <input className={'form-control'} type="password" placeholder="Enter Password" name="password" required value={this.state.password} onChange={this.handleInputChange} />
          </div>
          <button className={'btn btn-lg btn-primary btn-block'} type="submit" disabled={!this.state.formValid}>Register</button>
          <div className={'form-group'}>
            {this.props.registrationLoadingFetch
              ? <Preloader />
              : this.props.registrationStatusError
                ? <p className={"error"} wordbreak="break-word">{this.props.registrationStatusError}</p>
                : <p className={"error"} wordbreak="break-word">{this.props.registrationStatus}</p>
            }
          </div>
        </form>
      </Container>
    )
  }
}

function mapStateToProps(store) {
  return {
    registrationLoadingFetch: store.registrationFetch,
    registrationStatusError: store.registrationStatusError,
    registrationStatus: store.registrationStatus,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    registerFetch: data => dispatch(registerFetchAC(data)),
    setRegistrationStatus: err => dispatch(registerErrorAC(err)),
    clearStatus: () => dispatch(clearStatusAC())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Registration)