import React, { Component } from 'react';
import { Link, browserHistory } from "react-router";
import RaisedButton from 'material-ui/RaisedButton';
import "./menu.css";
import AppBar from 'material-ui/AppBar';
import FlatButton from 'material-ui/FlatButton';


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
      cursor: 'pointer',
    };

    return (
      <div className="inner">
        <AppBar
        title={<span style={style.title}><Link to="/dashboard">YummyRecipes</Link></span>}
        iconElementRight={
          <div>
          <RaisedButton label="LogOut" secondary={true} onClick={this.LogOut} style={style} />
          <Link to="/login" activeClassName="active"><FlatButton label="Login" primary={true} style={style} /></Link>
          <Link to="/register" activeClassName="active"><FlatButton label="Register" primary={true} style={style} /></Link>
          </div>
        }
      />
      </div>
    );
  }
}

export default Menu;
