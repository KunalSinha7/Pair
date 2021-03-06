import React, { Component } from 'react';
import { Col, Row } from 'react-bootstrap'
import { DropDownMenu, MenuItem } from 'material-ui'
//import './Price.css';

class Price extends Component {

  render() {
    let labels = ['0-1250', '1250-2500', '2500-3750', '3750-5000', '5000-6250', '6250-7500', '7500-8750','8750-10000']
    let items = []
    for (let i = 1; i <= 8; i++) {
      items.push(<MenuItem value={`${i}`} key={i} primaryText={labels[i - 1]} />)
    }

    let width = window.innerWidth
      || document.documentElement.clientWidth
      || document.body.clientWidth;

    // console.log(width)
    //console.log(/Android|webOS|iPhone|iPad|iPod|BlackBerry|BB|PlayBook|IEMobile|Windows Phone|Kindle|Silk|Opera Mini|Mobile/i.test(navigator.userAgent))
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|BB|PlayBook|IEMobile|Windows Phone|Kindle|Silk|Opera Mini|Mobile/i.test(navigator.userAgent) || width < 450) {
      return (
        <Col xs={12}>
          <Row style={{ width: '90%', marginLeft: '5%' }}>What is your preferred price range? (In price per person)</Row>
          <Row style={{ width: '90%', marginLeft: '5%' }}>
            <DropDownMenu maxHeight={250} value={this.props.dv} onChange={this.props.priceChange}>
              {items}
            </DropDownMenu>
          </Row>
        </Col>
      );
    } else {
      return (
        <Col xs={12} sm={6}>
          <Col xs={7} sm={8}>What is your preferred price range? (In price per person)</Col>
          <Col xs={5} sm={4}>
            <DropDownMenu maxHeight={250} value={this.props.dv} onChange={this.props.priceChange}>
              {items}
            </DropDownMenu>
          </Col>
        </Col>
      );
    }
  }
}

export default Price;