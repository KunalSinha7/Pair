import React, { Component } from 'react';
import { Col, Row } from 'react-bootstrap'
import { DropDownMenu, MenuItem } from 'material-ui'
//import './Clean.css';

class Clean extends Component {
  render() {
    let labels = ["1 not often", "2", '3', '4', '5 very often']
    let items = []
    for (let i = 1; i <= 5; i++) {
      items.push(<MenuItem value={`${i}`} key={i} primaryText={labels[i - 1]} />)
    }

    let width = window.innerWidth
      || document.documentElement.clientWidth
      || document.body.clientWidth;

    // console.log(width)
    //console.log(/Android|webOS|iPhone|iPad|iPod|BlackBerry|BB|PlayBook|IEMobile|Windows Phone|Kindle|Silk|Opera Mini|Mobile/i.test(navigator.userAgent))
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|BB|PlayBook|IEMobile|Windows Phone|Kindle|Silk|Opera Mini|Mobile/i.test(navigator.userAgent) || width < 450) {
      return (
        <Col xs={12} sm={6}>
          <Row style={{ width: '90%', marginLeft: '5%' }}>How often will you have guests over?</Row>
          <Row style={{ width: '90%', marginLeft: '5%' }}>
            <DropDownMenu maxHeight={250} value={this.props.dv} onChange={this.props.youBringGuestChange}>
              {items}
            </DropDownMenu>
          </Row>
        </Col>
      );
    } else {
      return (
        <Col xs={12} sm={6}>
          <Col xs={6}>How often will you have guests over?</Col>
          <Col xs={6}>
            <DropDownMenu maxHeight={250} value={this.props.dv} onChange={this.props.youBringGuestChange}>
              {items}
            </DropDownMenu>
          </Col>
        </Col>
      );
    }
  }
}

export default Clean;