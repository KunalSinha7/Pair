import React, { Component } from 'react';
import { NavLink, Switch, Route } from 'react-router-dom'
import { Col } from 'react-bootstrap'
import wordLogo from '../images/word_no_logo.png'
import { List, ListItem, Subheader, Paper } from 'material-ui'
import CommunicationChatBubble from 'material-ui/svg-icons/communication/chat-bubble'

import axios from 'axios'
import './Sidebar.css';
import history from '../history';

axios.defaults.baseURL = "https://glacial-spire-77473.herokuapp.com/";

class Sidebar extends Component {
  constructor(props) {
    super(props)
    let tempArr = []
    tempArr[parseInt(props.state.currChat)] = { style: { backgroundColor: '#EB347F' } }
    this.state = {
      cards: [],
      colors: tempArr,
    }
  }

  stylePressed = '#EB347F'

  styleNoPressed = 'white'


  handleClick = (i, name, type) => {
    // console.log(i)
    // console.log(name)
    let tempArr = this.state.colors
    tempArr[parseInt(this.props.state.currChat)] = null
    tempArr[parseInt(i)] = { style: { backgroundColor: '#EB347F' } }
    this.setState({ colors: tempArr }, this.changeColors)
    this.props.changeChat(parseInt(i), name, type)
  }

  changeColors = () => {
    //The below code is what finally got the chats to refresh with the right colors after a button click
    let that = this
    let tempCard = []
    for (let i in this.state.cards) {
      // console.log(this.state.cards[i])
      tempCard.push(
        <Paper zDepth={2} key={i}>
          <ListItem
            primaryText={this.state.cards[i].props.children.props.primaryText}
            className={this.state.cards[i].props.children.props.className}
            rightIcon={<CommunicationChatBubble />}
            onClick={this.state.cards[i].props.children.props.onClick}
            value={i}
            hoverColor='#F95498B0'
            {...that.state.colors[i]}
          />

        </Paper>
      )

    }
    that.setState({ cards: tempCard })
  }

  componentDidMount() {
    let that = this
    let tempCard = []
    if (this.props.uid != null) {
      axios.post("/GET-CHATROOM", {
        "userID": this.props.uid
      }).then(function (response) {
        // console.log(response.data)
        let tempPushed = []
        for (let i in response.data) {
          tempPushed.push(that.styleNoPressed)
          that.setState({ pressed: tempPushed })
        }

        for (let i in response.data) {
          //console.log(response.data[i])
          let k=tempCard.length
          tempCard.push(
            <Paper zDepth={2} key={i}>
              <ListItem
                primaryText={response.data[i].substring(1)}
                className={response.data[i]}
                rightIcon={<CommunicationChatBubble />}
                onClick={() => that.handleClick(k, response.data[i], response.data[i].substring(0, 1))}
                value={i}
                hoverColor='#F95498B0'
                {...that.state.colors[k]}
              />

            </Paper>
          )
          that.setState({ cards: tempCard })
        }
        that.setState({cards:tempCard},that.addMasterList)
      }).catch(function (error) {
        console.log(error);
      })
    }
  }

  addMasterList = () => {
    let that=this
    let tempCard=this.state.cards
    if (history.location.pathname.indexOf('/landing/employee/members') == 0 && this.props.type == 'employee') {
      let k=tempCard.length
      tempCard.push(
        <Paper zDepth={2} key={that.state.cards.length}>
          <ListItem
            primaryText='Intern Master List'
            className='0Intern Master List'
            rightIcon={<CommunicationChatBubble />}
            onClick={() => this.handleClick(k, '0Intern Master List', 0)}
            value={0}
            hoverColor='#F95498B0'
            {...this.state.colors[k]}
          />
        </Paper>
      )
    }
    that.setState({ cards: tempCard },this.state.cards[0].props.children.props.onClick)
  }

  render() {
    return (
      <Col xsHidden sm={2} lg={2} className='side-bar'>
        <div className='img-div'>
          <img src={wordLogo} alt="logo" className='no-word-logo' />
        </div>
        <hr />
        <List>
          {this.state.cards}
        </List>
      </Col>
    );
  }
}

export default Sidebar;