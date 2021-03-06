import React, { Component } from "react";
import { Row } from "react-bootstrap";
import { RaisedButton, Card, CardActions, CardText, CardHeader } from "material-ui";
import axios from "axios";
import "./Complaints.css";



class Complaints extends Component {
  constructor(props) {
    super(props);

    this.state = {
      uid: this.props.uid,
      complaints: [],
      viewComplaints: []
    };
  }

  handleBan = (event, index, banUid) => {
    let that = this;
    axios
      .post("/BAN-INTERN", {
        userID: banUid
      })
      .then(function (response) {
        console.log("Success");
        let msg =
          that.state.complaints[index][0] +
          "$:$" +
          that.state.complaints[index][1] +
          "$:$" +
          that.state.complaints[index][2] +
          "$:$" +
          that.state.complaints[index][3];
        axios
          .post("/REMOVE-COMPLAINT", {
            userID: that.state.uid,
            complaint: msg
          })
          .then(function (response) {
            console.log("Remove" + index + "uid" + banUid);
            // let data = that.state.complaints;
            // data.splice(index, 1);
            // let data2 = that.state.viewComplaints;
            // data2.splice(index, 1);
            // that.setState({
            //   complaints: data,
            //   viewComplaints: data2
            // });
            that.componentDidMount();
          })
          .catch(function (error) {
            console.log(error);
          });
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  handleIgnore = (event, index, banUid) => {
    let that = this;

    console.log("Remove" + index + "uid" + banUid);
    let msg =
      that.state.complaints[index][0] +
      "$:$" +
      that.state.complaints[index][1] +
      "$:$" +
      that.state.complaints[index][2] +
      "$:$" +
      that.state.complaints[index][3];
    axios
      .post("/REMOVE-COMPLAINT", {
        userID: that.state.uid,
        complaint: msg
      })
      .then(function (response) {
        console.log("Remove" + index + "uid" + banUid);
        // let data = that.state.complaints;
        // data.splice(index, 1);
        // let data2 = that.state.viewComplaints;
        // data2.splice(index, 1);
        // that.setState({
        //   complaints: data,
        //   viewComplaints: data2
        // });
        that.componentDidMount();
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  componentDidMount = () => {
    axios
      .post("/GET-EMPLOYEE", {
        userID: this.state.uid
      })
      .then(response => {
        let complaintsList = response.data.listOfComplaints;
        let ccList = [];
        for (let c in complaintsList) {
          ccList.push(complaintsList[c].split("$:$"));
        }
        this.setState(
          {
            complaints: ccList
          },
          () => {
            let msg = [];
            for (let arr in this.state.complaints) {
              msg.push(
                <Card key={arr} style={{ textAlign: 'left', marginLeft: '2%', marginRight: '2%', backgroundColor: 'aliceblue' }}>
                  <CardHeader
                    title={<span><b><em>{this.state.complaints[arr][1]}</em></b>&nbsp;reported&nbsp;<b><em>{this.state.complaints[arr][2]}</em></b>&nbsp;</span>}
                    actAsExpander
                  />
                  <CardText style={{ marginTop: '-30px' }}>
                    Reason: {this.state.complaints[arr][3]}
                  </CardText>
                  <CardActions >
                    <RaisedButton
                      label="Ban"
                      secondary={true}
                      onClick={e =>
                        this.handleBan(e, arr, this.state.complaints[arr][0])
                      }
                    />
                    <RaisedButton
                      label="Ignore"
                      secondary={true}
                      onClick={e => this.handleIgnore(e, arr, this.state.complaints[arr][0])}
                    />
                  </CardActions>
                </Card>
              );
            }
            this.setState({
              viewComplaints: msg
            });
          }
        );
      })
      .catch(error => {
        console.log(error);
      });
  };

  returnDesktop() {
    return (
      <div className="complaints2">
        <Row className="container-fluid">
          <h3 className="complaints">Complaints</h3>
        </Row>
        <Row className="overflow-prevention">{this.state.viewComplaints}</Row>
      </div>
    );
  }

  returnMobile() {
    return (
      <div className="complaints2">
        <Row className="overflow-prevention">{this.state.viewComplaints}</Row>
      </div>
    );
  }

  render() {
    let width = window.innerWidth
      || document.documentElement.clientWidth
      || document.body.clientWidth;
    // console.log(width)
    //console.log(/Android|webOS|iPhone|iPad|iPod|BlackBerry|BB|PlayBook|IEMobile|Windows Phone|Kindle|Silk|Opera Mini|Mobile/i.test(navigator.userAgent))
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|BB|PlayBook|IEMobile|Windows Phone|Kindle|Silk|Opera Mini|Mobile/i.test(navigator.userAgent) || width < 768) {
      return this.returnMobile();
    } else {
      return this.returnDesktop();
    }
  }
}

export default Complaints;
