import React, { Component } from 'react';
import { Row } from 'react-bootstrap'
import { RaisedButton } from 'material-ui'
import history from '../history'
import axios from 'axios'
import './LoginButtons.css';
import ForgotPasswordModal from './ForgotPasswordModal'

class LoginButtons extends Component {


  handleLogin = () => {
    let email = this.props.email
    let password = this.props.password
    let that = this

    if (!(new RegExp('[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+[.][A-Za-z]{2,}')).test(email)) {
      alert('Please enter a valid email')
    } else if (email != null && password != null && email != '' && password.length >= 8 && (new RegExp('[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+[.][A-Za-z]{2,}')).test(email)) {
      axios.post('/LOGIN', {
        "username": email,
        "password": password
      }).then((response) => {
        // console.log(response.data);
        if (!response.data.status) {
          alert('Username or password was incorrect, please try again')
        } else if (response.data.userID != null) {
          // this.props.updateUid(response.data.userID);
          //console.log(response.data.userID)
          that.props.updateUid(response.data.userID, response.data.authority)
          if (response.data.authority==='admin') {
            history.push('/landing/admin/complaints')
          } if (response.data.authority==='company') {
            history.push('/landing/company')
          } else if (response.data.authority==='employee') {
            //GO TO EMPLOYEE Landing Page
            history.push('/landing/employee/members')
          } else if (response.data.authority==='intern') {
            //GO TO INTERN Landing Page
            history.push('/landing/intern/members')
          }
        }
      }).catch((error) => {
        console.log(error);
      });
    } else {
      alert('Please completely fill in email and password')
    }
  }

  componentDidMount=()=>{
    let that=this
    document.addEventListener('keydown', function(event) {
      if (event.code == 'Enter' || event.code=='NumpadEnter') {
        that.handleLogin()
      }
    });
  }

  componentWillUnmount=()=>{
    let that=this
    document.removeEventListener('keydown',function(event) {
      if (event.code == 'Enter' || event.code=='NumpadEnter') {
        that.handleLogin()
      }
    });
  }

  render() {
    return (
      <div>
        <Row className='row-sm lbutton'>
          <RaisedButton
            label="Login"
            primary
            onClick={this.handleLogin}
          />
          <ForgotPasswordModal />
        </Row>
      </div>
    );
  }
}

export default LoginButtons;
