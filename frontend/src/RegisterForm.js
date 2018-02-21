import React, { Component } from 'react';
import { NavLink, Switch, Route, Redirect } from 'react-router-dom'
import { Grid, Row, Col, Image } from 'react-bootstrap'
import PasswordField from 'material-ui-password-field'
import { TextField, RaisedButton } from 'material-ui'
import RegisterFormField from './RegisterFormField.js'
import RegisterParagraph from './RegisterParagraph.js'
import './form.css';
import history from './history'

class RegisterForm extends Component {
  state={
    companyCode:null,
  }

  getUser=(username)=>{
    this.setState({username})
  }

  getCompanyCode=(companyCode)=>{
    this.setState({companyCode})
  }

  getPass=(password)=>{
    this.setState({password})
  }

  handleLogin=()=>{
    const companyCode=this.state.companyCode
    //kunal code submit here
    this.redirect(null)
    //if doing a fetch use this at the end .then(this.redirect(classification))
    //where classification is whether it is an employee or intern, change the variable however you want
  }

  redirect=(uid)=>{
    this.setState({companyCode:null})
    this.props.updateUid(uid)
    history.push('/register/account')
  }

  goToLogin=()=>{
    history.push('/login')
  }

  render() {
    return (
      <Col xs={12} sm={4} md={4} className="loginForm">
        <div className="co">
          <Row className="rtitle row-sm">
            Register
          </Row>

          <RegisterFormField getUser={this.getUser} getPass={this.getPass} getCompanyCode={this.getCompanyCode}/>

          <Row className='row-sm lbutton'>
            <RaisedButton
              label="Register"
              primary={true}
              onClick={this.handleLogin}
            />
          </Row>

          <Row className='row-sm lbutton'>
            <RaisedButton
              label="Login Page"
              primary={true}
              onClick={this.goToLogin}
            />
          </Row>

          <Row className="row-sm item">
            <RegisterParagraph />
          </Row>
        </div>
      </Col>
    );
  }
}

export default RegisterForm;