import React, { Component } from 'react';
import { Row } from 'react-bootstrap'
import CodeField from './CodeField'
import NavPage from './NavPage'
import RegisterButtons from './RegisterButtons'
import './RegisterForm.css';

class RegisterForm extends Component {
  constructor(props){
    super(props)
    this.state={
      companyName:null,
      companyEmail:null,
      companyPassword:null,
      companyLocations:null,
    }
  }

  changeName=(name)=>{
    this.setState({companyName:name})
  }

  changeEmail=(email)=>{
    this.setState({companyEmail:email})
  }

  changePassword=(password)=>{
    this.setState({companyPassword:password})
  }

  changeLocations=(location)=>{
    this.setState({companyLocations:location})
  }

  render() {
    return (
      <div className="form">
      <NavPage />
        <Row className="register-title row-sm">
          Register
        </Row>

        <CodeField changeName={this.changeName} changeEmail={this.changeEmail} changePassword={this.changePassword} changeLocations={this.changeLocations}/>

        <RegisterButtons companyName={this.state.companyName} companyEmail={this.state.companyEmail} companyPassword={this.state.companyPassword} companyLocations={this.state.companyLocations}/>
      </div>
    );
  }
}

export default RegisterForm;
