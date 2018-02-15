import React, { Component } from "react";
import { browserHistory } from "react-router";
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import Dialog from 'material-ui/Dialog';
import "./signup.css"

class SignUp extends Component{
  constructor(props){
      super(props);
      // default state
      this.state = {
        "error": "",
        "open": false
      }
      this.handleNameChange = this.handleNameChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleNameChange(event){
    //capture input
    this.setState({
      [event.target.name]: event.target.value
    });

  };

  handleClose = () => {
    this.setState({open: false});
  };

  handleSubmit(event){
    // prevent the default browser action
    event.preventDefault();

    if (this.state.username === "" || this.state.password === "" || this.state.email) {
        // error empty inputs
    this.signup();
    this.state.open = false;
    }
  };

    // make request to the api
    signup(){
    const _this = this;
    const url = "http://127.0.0.1:5000/auth/register"
    fetch(url, {
        method: "POST",
        body: JSON.stringify(this.state),
        mode: 'cors',
        headers: new Headers({
          'Content-Type': 'application/json'
        })
     })
    .then((resp) => resp.json()) // Transform the data into json
    .then(function(data) {
      // Create and append the li's to the ul
        // _this.setState({
        //     "response": data
        // })
        console.log(data);
        if(data.status === "success"){
          // login was successful
            alert(data.message);
            _this.setState({
              error: data.message,
              open: true
            })
              browserHistory.push({ pathname: "/dashboard"});
            // store token in the browser localStorage

            if(typeof(localStorage) !==  undefined){
              // store the token
                localStorage.setItem("yummy_token", data.auth_token)
            }
            browserHistory.push({ pathname: "/dashboard"});
        }
        else{
          _this.setState({
            error: data.message,
            open: true
          })
        }
    }).catch((err) =>{
        console.error(err)
    })
  }

  render(){
    const actions = [
          <FlatButton
            label="Cancel"
            primary={true}
            onTouchTap={this.handleClose}
          />,
          <FlatButton
            label="Discard"
            primary={true}
            onTouchTap={this.handleClose}
          />,
        ];
    return(
      <div>
          <section className="tiles">
              <article className="style7">
                <span className="image">
                  <img src={ process.env.PUBLIC_URL + "/images/pic13.jpg"} alt="" />
                </span>
                <a>
                <h2> Yummy Recipes </h2>
                <div className="content">
                  <h4> Sign Up</h4>
                      <form method="POST" action="">
                        <div className="error">
                          <Dialog
                            actions={actions}
                            modal={false}
                            open={this.state.open}
                            onRequestClose={this.handleClose}
                          >
                            {this.state.error !== "" && this.state.error}
                          </Dialog>
                       </div>
                        <div>
                          <TextField
                              name="username"
                              hintText="username"
                              onChange={this.handleNameChange} />
                        </div>
                        <div>
                          <TextField
                              name="email"
                              hintText="Email"
                              onChange={this.handleNameChange} />
                        </div>
                        <div>
                          <TextField
                              type="password"
                              name="password"
                              hintText="password"
                              onChange={this.handleNameChange} />
                        </div>
                        <FlatButton
                            label="Sign Up"
                            type="submit"
                            onClick={this.handleSubmit} />
                      </form>
                </div>
              </a>
              </article>
            </section>
      </div>
    );
  }
}

export default SignUp;
