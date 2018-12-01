import React, { Component } from "react";
import "./App.css";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import firebase from "firebase";

// Initialize Firebase

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      cancelCode: 0,
      chatID: 0,
      isValid: true,
      tokenNumber: 0,
      currentToken: 0
    };
  }
  generateCancelCode() {
    var that = this;
    var randomCode = Math.floor(Math.random() * 1000 + 1);
    that.setState({ cancelCode: randomCode });
  }

  addToFirebase() {
    console.log("enter");
    var that = this;
    var chatid = document.getElementById("chatidField").value;
    var name = document.getElementById("nameField").value;
    var fbToken = that.state.tokenNumber;
    this.generateCancelCode();
    var fbCancelCode = that.state.cancelCode;
    Number(fbToken);
    fbToken = fbToken + 1;
    var db = firebase.database();
    db.ref(fbToken).set({
      telegramID: chatid,
      userName: name,
      cancelcode: fbCancelCode
    });
    that.setState({ tokenNumber: fbToken });
    console.log("exit");
    this.updateCurrentToken();
  }

  updateCurrentToken() {
    var that = this;
    var updateDb = firebase.database().ref("currentToken");
    updateDb.on("value", function(snapshot) {
      that.setState({ currentToken: snapshot.val() });
    });
    console.log(that.state.currentToken);
    document.getElementById("tokenField").innerHTML =
      "Current Token: " + that.state.currentToken;
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <p>
            <code>Queue.</code>
            <hr />
          </p>
          <p>
            <hr />
            <code id="tokenField">Current Token:</code>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <code>Next Token:</code>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <code>Total Tokens: </code>
            <hr />
          </p>
          <fieldset>
            <p>
              <code>Enter Your Telegram ID:</code>
              <hr />
            </p>
            <TextField id="chatidField" />
            <br />
            <p>
              <code>Enter Your Name:</code>
              <hr />
            </p>
            <TextField id="nameField" />
            <br />
            <br />
            <Button
              variant="contained"
              color="secondary"
              onClick={this.addToFirebase.bind(this)}
            >
              Get Your Token
            </Button>
          </fieldset>
          <p>
            <hr />
            <code>Your Token: </code>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <code>Cancel Code: </code>
            <hr />
          </p>
        </header>
      </div>
    );
  }
}

export default App;
