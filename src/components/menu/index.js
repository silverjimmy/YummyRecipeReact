import React, { Component } from 'react';
import { Link, browserHistory } from "react-router";
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';
import "./menu.css";


class Menu extends Component {

  constructor(props) {
    super(props);
    this.state = {open: false};

    this.LogOut = this.LogOut.bind(this);
  }

  handleToggle = () => this.setState({open: !this.state.open});

  LogOut(){

    localStorage.removeItem("yummy_token");
    browserHistory.push({
                       pathname: "/login"
                   });
  }
  render() {
    const style = {
      margin: 12,
    };
    return (
      <div className="inner">


        <a className="logo"><img  src={process.env.PUBLIC_URL + "/images/menu.svg"} alt="" onClick={this.handleToggle}/></a>
        <Drawer docked={false} open={this.state.open} onRequestChange={(open) => this.setState({open})}>
          <Link to="/dashboard" activeClassName="active"><RaisedButton label="Dashboard" style={style} /></Link>
          <RaisedButton label="LogOut" secondary={true} onClick={this.LogOut} style={style} />
          <br/>      
          <Link to="/login" activeClassName="active"><RaisedButton label="Login" primary={true} style={style} /></Link>
          <Link to="/register" activeClassName="active"><RaisedButton label="Register" primary={true} style={style} /></Link>
        </Drawer>
      </div>
    );
  }
}

export default Menu;
