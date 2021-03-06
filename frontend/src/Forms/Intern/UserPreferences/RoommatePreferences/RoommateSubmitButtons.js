import React, { Component } from 'react';
import { Row } from 'react-bootstrap'
import { RaisedButton } from 'material-ui'
import history from '../../../../history'
import axios from 'axios'
import './RoommateSubmitButtons.css';

class RoommateSubmitButtons extends Component {
  constructor(props) {
    super(props)
    this.state = {
      willRedirect: 0,
    }
  }

  backButtonSubmit = () => {
    this.setState({ willRedirect: 1 }, () => { this.bSubmit() })
  }

  buttonSubmit = () => {
    this.setState({ willRedirect: 2 }, () => { this.bSubmit() })
  }

  bSubmit = () => {
    let youguest = this.props.youBringGuest
    let themguest = this.props.themBringGuest
    let youpet = this.props.youBringPet
    let thempet = this.props.themBringPet
    let sharing = this.props.sharing
    let smoke = this.props.smoke
    let bedtime = this.props.bedtime
    let waketime = this.props.waketime
    let lights = this.props.lights
    let clean = this.props.clean

    let that = this
    axios.post('/UPDATE-PREFERENCES/ROOMMATE-PREFERENCES', {
      "userID": this.props.uid,
      "youguest": youguest,
      "themguest": themguest,
      "youpet": youpet,
      "thempet": thempet,
      "sharing": sharing,
      "smoke": smoke,
      "bedtime": bedtime,
      "waketime": waketime,
      "lights": lights,
      "clean": clean
    }).then((response) => {
      if (response.data.status == false) {
        console.log("Something went wrong :(")
      } else {
        console.log("Preferences updated!");
        //Go to preferences p3
        that.props.changeCompleted("2")
        that.props.changeChange(false)
        if (that.state.willRedirect === 1) {
          that.props.changePage(1)
          history.push('/register/intern/preferences/user-details')
        } else if (that.state.willRedirect === 2) {
          that.props.changePage(3)
          history.push('/register/intern/preferences/housing')
        }
        try {
          localStorage.removeItem('roommate-preferences')
        } catch (err) {
          //console.log('This browser does not allow localstorage and some functionalities may be impacted')
        }
      }
    }).catch(function (error) {
      console.log(error);
    });
  }

  returnDesktop() {
    return (
      <Row className="roommate-submit-buttons">
        <RaisedButton
          label="Previous"
          sytle={{ marginTop: "20px" }}
          primary
          onClick={this.backButtonSubmit}
        />
        <RaisedButton
          label="Save"
          style={{ marginTop: "20px", marginLeft: "10px" }}
          primary
          onClick={this.bSubmit}
        />
        <RaisedButton
          label="Next"
          style={{ marginTop: "20px", marginLeft: "10px" }}
          primary
          onClick={this.buttonSubmit}
        />
      </Row>
    );
  }

  returnMobile() {
    return (
      <div>
        <Row className="roommate-submit-buttons">
          <RaisedButton
            label="Previous"
            sytle={{ marginTop: "20px" }}
            primary
            onClick={this.backButtonSubmit}
          />
        </Row>
        <Row className="roommate-submit-buttons">
          <RaisedButton
            label="Save"
            style={{ marginTop: "20px", marginLeft: "10px" }}
            primary
            onClick={this.bSubmit}
          />
        </Row>
        <Row className="roommate-submit-buttons">
          <RaisedButton
            label="Next"
            style={{ marginTop: "20px", marginLeft: "10px" }}
            primary
            onClick={this.buttonSubmit}
          />
        </Row>
      </div>
    );
  }

  render() {
    let width = window.innerWidth
      || document.documentElement.clientWidth
      || document.body.clientWidth;
    // console.log(width)
    //console.log(/Android|webOS|iPhone|iPad|iPod|BlackBerry|BB|PlayBook|IEMobile|Windows Phone|Kindle|Silk|Opera Mini|Mobile/i.test(navigator.userAgent))
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|BB|PlayBook|IEMobile|Windows Phone|Kindle|Silk|Opera Mini|Mobile/i.test(navigator.userAgent) || width < 1000) {
      return this.returnMobile();
    } else {
      return this.returnDesktop();
    }
  }
}

export default RoommateSubmitButtons;